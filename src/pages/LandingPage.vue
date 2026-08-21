<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LandingRenderer from '../components/LandingRenderer.vue'
import SiteHeader from '../components/SiteHeader.vue'
import { loadContent } from '../services/contentService'
import type { LandingPage, SiteContent } from '../types/content'

const route = useRoute()
const content = ref<SiteContent | null>(null)
const isLoading = ref(true)

const currentSlug = computed(() => {
  const value = route.path === '' ? '/' : route.path
  return value.endsWith('/') && value !== '/' ? value.slice(0, -1) : value
})

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

async function refreshContent() {
  isLoading.value = true
  content.value = await loadContent()
  isLoading.value = false
}

onMounted(refreshContent)
watch(() => route.path, refreshContent)
</script>

<template>
  <div class="min-h-screen bg-[#f6f4ef] text-zinc-900">
    <div v-if="isLoading" class="grid min-h-screen place-items-center px-5 text-center">
      <p class="font-bold text-zinc-600">Carregando conteudo...</p>
    </div>

    <template v-else-if="content && page">
      <SiteHeader :brand="content.site.brand" :menu="page.menu" />
      <main>
        <LandingRenderer :page="page" />
      </main>
      <footer class="border-t border-zinc-200 bg-[#f6f4ef] px-5 py-8 text-center text-sm text-zinc-500">
        {{ content.site.brand }} - Todos os direitos reservados.
      </footer>
    </template>

    <div v-else class="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <h1 class="text-3xl font-black text-zinc-950">Pagina nao encontrada</h1>
        <p class="mt-3 text-zinc-600">Verifique o slug cadastrado no gestor de conteudo.</p>
      </div>
    </div>
  </div>
</template>
