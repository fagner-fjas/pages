import defaultContent from '../../content/site.json'
import type { SiteContent } from '../types/content'

const jsonHeaders = {
  'Content-Type': 'application/json',
}

export async function loadContent(): Promise<SiteContent> {
  try {
    const response = await fetch('/api/content')

    if (!response.ok) {
      throw new Error('Content API unavailable')
    }

    return (await response.json()) as SiteContent
  } catch {
    return structuredClone(defaultContent) as SiteContent
  }
}

export async function login(password: string): Promise<string> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify({ password }),
  })

  if (!response.ok) {
    throw new Error('Senha invalida ou servidor do CMS indisponivel.')
  }

  const payload = (await response.json()) as { token: string }
  return payload.token
}

export async function saveContent(content: SiteContent, token: string): Promise<void> {
  const response = await fetch('/api/content', {
    method: 'PUT',
    headers: {
      ...jsonHeaders,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  })

  if (!response.ok) {
    throw new Error('Nao foi possivel salvar o conteudo.')
  }
}

export async function uploadImage(file: File, token: string, width?: number, height?: number): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  if (width) {
    formData.append('width', String(width))
  }

  if (height) {
    formData.append('height', String(height))
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Nao foi possivel enviar a imagem.')
  }

  const payload = (await response.json()) as { url: string }
  return payload.url
}
