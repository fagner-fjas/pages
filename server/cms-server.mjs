import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'

const rootDir = process.cwd()
const contentPath = path.join(rootDir, 'content', 'site.json')
const uploadDir = path.join(rootDir, 'public', 'uploads')
const distDir = path.join(rootDir, 'dist')
const port = Number(process.env.PORT ?? 4174)
const configPath = path.join(rootDir, 'config', 'cms.json')
let config
try {
  config = JSON.parse(await fs.readFile(configPath, 'utf8'))
} catch {
  throw new Error('Configure a senha em config/cms.json antes de iniciar o CMS. Use config/cms.example.json como modelo.')
}
if (typeof config.password !== 'string' || config.password.trim().length < 12) {
  throw new Error('Defina uma senha com pelo menos 12 caracteres em config/cms.json.')
}
const passwordHash = crypto.createHash('sha256').update(config.password).digest()
delete config.password
const tokens = new Map()
const loginAttempts = new Map()
const sessionDuration = 8 * 60 * 60 * 1000
const loginWindow = 15 * 60 * 1000
setInterval(() => {
  const now = Date.now()
  for (const [token, expiresAt] of tokens) if (expiresAt <= now) tokens.delete(token)
  for (const [ip, attempt] of loginAttempts) if (attempt.expiresAt <= now) loginAttempts.delete(ip)
}, 60_000).unref()
const isApiOnly = process.argv.includes('--api-only')

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
})

app.use(express.json({ limit: '2mb' }))
app.use('/uploads', express.static(uploadDir))

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/login', (request, response) => {
  response.set('Cache-Control', 'no-store')
  const now = Date.now()
  const ip = request.ip
  let attempt = loginAttempts.get(ip)
  if (!attempt || attempt.expiresAt <= now) {
    attempt = { count: 0, expiresAt: now + loginWindow }
    loginAttempts.set(ip, attempt)
  }
  if (attempt.count >= 5) {
    response.set('Retry-After', String(Math.ceil((attempt.expiresAt - now) / 1000)))
    response.status(429).json({ error: 'Too many login attempts' })
    return
  }
  const candidate = request.body?.password
  if (typeof candidate !== 'string' || !crypto.timingSafeEqual(crypto.createHash('sha256').update(candidate).digest(), passwordHash)) {
    attempt.count += 1
    response.status(401).json({ error: 'Invalid password' })
    return
  }

  const token = crypto.randomBytes(32).toString('hex')
  loginAttempts.delete(ip)
  tokens.set(token, now + sessionDuration)
  response.json({ token })
})

app.get('/api/content', async (_request, response) => {
  try {
    response.json(await readContent())
  } catch (error) {
    response.status(500).json({ error: getErrorMessage(error) })
  }
})

app.put('/api/content', requireAuth, async (request, response) => {
  try {
    const content = request.body
    validateContent(content)
    await fs.mkdir(path.dirname(contentPath), { recursive: true })
    await fs.writeFile(contentPath, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
    response.json({ ok: true })
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) })
  }
})

app.post('/api/upload', requireAuth, upload.single('image'), async (request, response) => {
  try {
    if (!request.file) {
      response.status(400).json({ error: 'Missing image file' })
      return
    }

    const width = parseDimension(request.body?.width)
    const height = parseDimension(request.body?.height)
    const name = `${Date.now()}-${slugify(request.file.originalname.replace(/\.[^.]+$/, ''))}.webp`
    const targetPath = path.join(uploadDir, name)

    await fs.mkdir(uploadDir, { recursive: true })

    let pipeline = sharp(request.file.buffer).rotate()
    if (width || height) {
      pipeline = pipeline.resize({
        width,
        height,
        fit: 'inside',
        withoutEnlargement: true,
      })
    }

    await pipeline.webp({ quality: 86 }).toFile(targetPath)
    response.json({ url: `/uploads/${name}` })
  } catch (error) {
    response.status(400).json({ error: getErrorMessage(error) })
  }
})

if (!isApiOnly) {
  app.use(express.static(distDir))
  app.get(/.*/, (_request, response) => {
    response.sendFile(path.join(distDir, 'index.html'))
  })
}

app.listen(port, () => {
  const mode = isApiOnly ? 'API' : 'site'
  console.log(`CMS ${mode} running on http://localhost:${port}`)
})

async function readContent() {
  const raw = await fs.readFile(contentPath, 'utf8')
  const content = JSON.parse(raw)
  validateContent(content)
  return content
}

function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '')

  if (!token || (tokens.get(token) ?? 0) <= Date.now()) {
    if (token) tokens.delete(token)
    response.status(401).json({ error: 'Unauthorized' })
    return
  }

  next()
}

function validateContent(content) {
  if (!content || typeof content !== 'object') {
    throw new Error('Content must be an object')
  }

  if (!content.site || !Array.isArray(content.pages)) {
    throw new Error('Content must include site and pages')
  }

  for (const page of content.pages) {
    if (!page.id || !page.slug || !Array.isArray(page.sections) || !Array.isArray(page.menu)) {
      throw new Error('Each page must include id, slug, menu and sections')
    }
  }
}

function parseDimension(value) {
  const dimension = Number(value)
  return Number.isFinite(dimension) && dimension > 0 ? Math.round(dimension) : undefined
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 60)
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : 'Unexpected error'
}
