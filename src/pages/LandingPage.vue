<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LandingRenderer from '../components/LandingRenderer.vue'
import SiteFooter from '../components/SiteFooter.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { loadContent } from '../services/contentService'
import type { CSSProperties } from 'vue'
import type { LandingPage, PaletteConfig, SiteContent } from '../types/content'

const route = useRoute()
const content = ref<SiteContent | null>(null)
const isLoading = ref(true)

const defaultPalette: PaletteConfig = {
  pageBackground: '#f6f4ef',
  surface: '#ffffff',
  mutedSurface: '#f6f4ef',
  text: '#18181b',
  heading: '#09090b',
  softText: '#52525b',
  border: '#d4d4d8',
  accent: '#e85d3f',
  dark: '#09090b',
  darkSoftText: '#a1a1aa',
  highlight: '#ffcf56',
}

const currentSlug = computed(() => {
  const value = route.path === '' ? '/' : route.path
  return value.endsWith('/') && value !== '/' ? value.slice(0, -1) : value
})

const palette = computed<PaletteConfig>(() => ({
  ...defaultPalette,
  ...content.value?.site.palette,
}))

const pageStyle = computed<CSSProperties>(() => ({
  '--site-bg': palette.value.pageBackground,
  '--site-surface': palette.value.surface,
  '--site-muted': palette.value.mutedSurface,
  '--site-text': palette.value.text,
  '--site-heading': palette.value.heading,
  '--site-soft': palette.value.softText,
  '--site-border': palette.value.border,
  '--site-accent': palette.value.accent,
  '--site-dark': palette.value.dark,
  '--site-dark-soft': palette.value.darkSoftText,
  '--site-highlight': palette.value.highlight,
  '--site-bg-rgb': hexToRgb(palette.value.pageBackground),
  '--header-opacity': String(content.value?.site.header?.backgroundOpacity ?? 0.9),
  '--header-blur': `${content.value?.site.header?.blur ?? 24}px`,
} as CSSProperties))

const page = computed<LandingPage | undefined>(() => {
  const pages = content.value?.pages ?? []
  return pages.find((item) => normalizeSlug(item.slug) === currentSlug.value) ?? pages.find((item) => item.id === content.value?.site.defaultPageId)
})

function normalizeSlug(slug: string) {
  if (slug === '/') {
    return slug
  }

  const withSlash = slug.startsWith('/') ? slug : `/${slug}`
  return withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash
}

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '').trim()
  const value = normalized.length === 3
    ? normalized.split('').map((char) => `${char}${char}`).join('')
    : normalized

  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return '246 244 239'
  }

  const numberValue = Number.parseInt(value, 16)
  const red = (numberValue >> 16) & 255
  const green = (numberValue >> 8) & 255
  const blue = numberValue & 255

  return `${red} ${green} ${blue}`
}

async function refreshContent() {
  isLoading.value = true
  content.value = await loadContent()
  isLoading.value = false
}

onMounted(refreshContent)
watch(() => route.path, refreshContent)
</script>

<template>
  <div class="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)]" :style="pageStyle">
    <div v-if="isLoading" class="grid min-h-screen place-items-center px-5 text-center">
      <p class="font-bold text-[var(--site-soft)]">Carregando conteudo...</p>
    </div>

    <template v-else-if="content && page">
      <SiteHeader :brand="content.site.brand" :header="content.site.header" :menu="page.menu" />
      <main>
        <LandingRenderer :page="page" />
      </main>
      <SiteFooter :brand="content.site.brand" :footer="page.footer" />
    </template>

    <div v-else class="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 class="text-3xl font-black text-[var(--site-heading)]">Pagina nao encontrada</h1>
        <p class="mt-3 text-[var(--site-soft)]">Verifique o slug cadastrado no gestor de conteudo.</p>
      </div>
    </div>
  </div>
</template>
