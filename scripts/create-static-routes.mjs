import { copyFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const routes = [
  'termos-sgedu-escola',
  'politica-privacidade-sgedu-escola',
  'eula-sgedu-escola',
]

const distDir = join(process.cwd(), 'dist')
const source = join(distDir, 'index.html')

await Promise.all(
  routes.map(async (route) => {
    const routeDir = join(distDir, route)
    await mkdir(routeDir, { recursive: true })
    await copyFile(source, join(routeDir, 'index.html'))
  }),
)
