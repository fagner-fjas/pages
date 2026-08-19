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
const password = process.env.CMS_PASSWORD ?? 'admin123'
const tokens = new Set()
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
  if (request.body?.password !== password) {
    response.status(401).json({ error: 'Invalid password' })
    return
  }

  const token = crypto.randomBytes(32).toString('hex')
  tokens.add(token)
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

  if (!token || !tokens.has(token)) {
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
