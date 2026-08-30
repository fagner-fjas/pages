<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ArrowDown, ArrowUp, Eye, Plus, Save, Trash2 } from '@lucide/vue'
import RecursiveField from '../components/admin/RecursiveField.vue'
import { loadContent, login, saveContent, uploadImage } from '../services/contentService'
import { sectionDefinitions } from '../data/sectionRegistry'
import type { LandingPage, SiteContent } from '../types/content'

const content = ref<SiteContent | null>(null)
const token = ref(sessionStorage.getItem('cms-token') ?? '')
const password = ref('')
const selectedPageId = ref('')
const selectedSectionId = ref('')
const status = ref('')
const error = ref('')
const uploadWidth = ref(1200)
const uploadHeight = ref(0)
const activeTab = ref<'content' | 'site'>('content')
const originalContentSnapshot = ref('')
const adminSelectionStorageKey = 'cms-admin-selection'
const paletteFields = [
  { key: 'pageBackground', label: 'Fundo da pagina' },
  { key: 'surface', label: 'Superficie clara' },
  { key: 'mutedSurface', label: 'Superficie suave' },
  { key: 'text', label: 'Texto' },
  { key: 'heading', label: 'Titulos' },
  { key: 'softText', label: 'Texto suave' },
  { key: 'border', label: 'Bordas' },
  { key: 'accent', label: 'Destaque' },
  { key: 'dark', label: 'Bloco escuro' },
  { key: 'darkSoftText', label: 'Texto no escuro' },
  { key: 'highlight', label: 'Destaque secundario' },
] as const

const isAuthenticated = computed(() => token.value.length > 0)
const selectedPage = computed(() => content.value?.pages.find((page) => page.id === selectedPageId.value))
const selectedSection = computed(() => selectedPage.value?.sections.find((section) => section.id === selectedSectionId.value))
const hasUnsavedChanges = computed(() => Boolean(content.value) && JSON.stringify(content.value) !== originalContentSnapshot.value)

onMounted(async () => {
  content.value = await loadContent()
  ensureContentDefaults()
  originalContentSnapshot.value = JSON.stringify(content.value)
  restoreAdminSelection()
})

watch([selectedPageId, selectedSectionId, activeTab], saveAdminSelection)

async function handleLogin() {
  error.value = ''
  status.value = ''

  try {
    token.value = await login(password.value)
    sessionStorage.setItem('cms-token', token.value)
    password.value = ''
    status.value = 'Acesso liberado.'
  } catch (loginError) {
    error.value = loginError instanceof Error ? loginError.message : 'Falha no login.'
  }
}

function logout() {
  token.value = ''
  sessionStorage.removeItem('cms-token')
}

function ensureContentDefaults() {
  if (!content.value) {
    return
  }

  content.value.site.header ??= {
    brandName: content.value.site.brand,
    useLogo: false,
    logo: {
      src: '',
      alt: content.value.site.brand,
      width: 132,
      height: 48,
    },
  }
  content.value.site.header.backgroundOpacity ??= 0.9
  content.value.site.header.blur ??= 24
  content.value.site.palette ??= {
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

  for (const page of content.value.pages) {
    page.footer ??= {
      enabled: true,
      text: `${content.value.site.brand} - Todos os direitos reservados.`,
      links: [
        { label: 'EULA', href: '/eula-sgedu-escola' },
        { label: 'Politica de privacidade', href: '/politica-privacidade-sgedu-escola' },
        { label: 'Termos de uso', href: '/termos-sgedu-escola' },
      ],
    }

    for (const section of page.sections) {
      section.marginTop ??= 0
      section.marginBottom ??= 0
      section.backgroundColor ??= ''
      section.backgroundTransparent ??= false

      if (section.type === 'ProductShowcase' && Array.isArray(section.data.items)) {
        section.data.items = section.data.items.map((item) =>
          typeof item === 'string'
            ? { title: item, text: '', href: '' }
            : item,
        )
      }
    }
  }
}

async function persist() {
  if (!content.value) {
    return
  }

  error.value = ''
  status.value = ''

  try {
    saveAdminSelection()
    await saveContent(content.value, token.value)
    originalContentSnapshot.value = JSON.stringify(content.value)
    status.value = 'Conteudo salvo no arquivo content/site.json.'
  } catch (saveError) {
    error.value = saveError instanceof Error ? saveError.message : 'Nao foi possivel salvar.'
  }
}

function restoreAdminSelection() {
  if (!content.value) {
    return
  }

  const fallbackPage = content.value.pages[0]
  let storedSelection: { pageId?: string; sectionId?: string; activeTab?: 'content' | 'site' } = {}

  try {
    storedSelection = JSON.parse(sessionStorage.getItem(adminSelectionStorageKey) || '{}')
  } catch {
    storedSelection = {}
  }

  const page = content.value.pages.find((item) => item.id === storedSelection.pageId) ?? fallbackPage
  selectedPageId.value = page?.id ?? ''

  const section =
    page?.sections.find((item) => item.id === storedSelection.sectionId) ??
    page?.sections[0]
  selectedSectionId.value = section?.id ?? ''

  if (storedSelection.activeTab === 'content' || storedSelection.activeTab === 'site') {
    activeTab.value = storedSelection.activeTab
  }
}

function saveAdminSelection() {
  sessionStorage.setItem(
    adminSelectionStorageKey,
    JSON.stringify({
      pageId: selectedPageId.value,
      sectionId: selectedSectionId.value,
      activeTab: activeTab.value,
    }),
  )
}

function addPage() {
  if (!content.value) {
    return
  }

  const id = `page-${Date.now()}`
  const page: LandingPage = {
    id,
    title: 'Nova landing page',
    slug: `/${id}`,
    menu: [{ label: 'Inicio', href: '#home', kind: 'section' }],
    footer: {
      enabled: true,
      text: `${content.value.site.brand} - Todos os direitos reservados.`,
      links: [
        { label: 'EULA', href: '/eula-sgedu-escola' },
        { label: 'Politica de privacidade', href: '/politica-privacidade-sgedu-escola' },
        { label: 'Termos de uso', href: '/termos-sgedu-escola' },
      ],
    },
    sections: [],
  }

  content.value.pages.push(page)
  selectedPageId.value = id
  selectedSectionId.value = ''
}

function removePage(pageId: string) {
  if (!content.value || content.value.pages.length <= 1) {
    window.alert('Nao e possivel remover a ultima landing page.')
    return
  }

  const page = content.value.pages.find((item) => item.id === pageId)
  const pageName = page?.title || pageId

  if (!window.confirm(`Deseja remover a landing page "${pageName}"?`)) {
    return
  }

  content.value.pages = content.value.pages.filter((page) => page.id !== pageId)
  selectedPageId.value = content.value.pages[0]?.id ?? ''
  selectedSectionId.value = selectedPage.value?.sections[0]?.id ?? ''
}

function addMenuItem() {
  selectedPage.value?.menu.push({ label: 'Novo link', href: '#section', kind: 'section' })
}

function removeMenuItem(index: number) {
  selectedPage.value?.menu.splice(index, 1)
}

function moveMenuItem(index: number, direction: -1 | 1) {
  const menu = selectedPage.value?.menu
  const target = index + direction

  if (!menu || target < 0 || target >= menu.length) {
    return
  }

  const [item] = menu.splice(index, 1)
  menu.splice(target, 0, item)
}

function updateSelectedPageId(nextId: string) {
  const page = selectedPage.value

  if (!page) {
    return
  }

  page.id = nextId
  selectedPageId.value = nextId
}

function updateSelectedSectionId(nextId: string) {
  const section = selectedSection.value

  if (!section) {
    return
  }

  section.id = nextId
  selectedSectionId.value = nextId
}

function updateSelectedSectionBackgroundColor(nextColor: string) {
  if (!selectedSection.value) {
    return
  }

  selectedSection.value.backgroundColor = nextColor
}

function addSection(type: string) {
  const definition = sectionDefinitions.find((item) => item.type === type)

  if (!definition || !selectedPage.value) {
    return
  }

  const section = structuredClone(definition.defaults)
  section.id = `${definition.defaults.id}-${Date.now()}`
  section.marginTop ??= 0
  section.marginBottom ??= 0
  section.backgroundColor ??= ''
  section.backgroundTransparent ??= false
  selectedPage.value.sections.push(section)
  selectedSectionId.value = section.id
}

function removeSection(sectionId: string) {
  if (!selectedPage.value) {
    return
  }

  selectedPage.value.sections = selectedPage.value.sections.filter((section) => section.id !== sectionId)
  selectedSectionId.value = selectedPage.value.sections[0]?.id ?? ''
}

function moveSection(index: number, direction: -1 | 1) {
  const page = selectedPage.value
  const target = index + direction

  if (!page || target < 0 || target >= page.sections.length) {
    return
  }

  const [section] = page.sections.splice(index, 1)
  page.sections.splice(target, 0, section)
}

function addArrayItem(target: unknown[], fieldKey?: string | number) {
  if (!window.confirm('Deseja adicionar um novo item?')) {
    return
  }

  if (selectedSection.value?.type === 'ProductShowcase' && fieldKey === 'items') {
    target.push({ title: 'Novo item', text: 'Descricao do item.', href: '' })
    return
  }

  const sample = target[0]

  if (typeof sample === 'string') {
    target.push('Novo item')
    return
  }

  if (sample && typeof sample === 'object') {
    target.push(JSON.parse(JSON.stringify(sample)))
    return
  }

  target.push('')
}

function removeArrayItem(target: unknown[], index: number) {
  if (!window.confirm(`Deseja remover o item ${index + 1}?`)) {
    return
  }

  target.splice(index, 1)
}

async function onImageSelected(event: Event, object: Record<string, unknown>) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) {
    return
  }

  error.value = ''
  status.value = ''

  try {
    object.src = await uploadImage(file, token.value, uploadWidth.value, uploadHeight.value || undefined)
    status.value = 'Imagem enviada e vinculada ao campo selecionado.'
  } catch (uploadError) {
    error.value = uploadError instanceof Error ? uploadError.message : 'Falha ao enviar imagem.'
  } finally {
    input.value = ''
  }
}

function fieldLabel(key: string) {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase())
}
</script>

<template>
  <div class="min-h-screen bg-zinc-100 text-zinc-950">
    <section v-if="!isAuthenticated" class="grid min-h-screen place-items-center px-5">
      <form class="w-full max-w-md rounded bg-white p-8 shadow-xl shadow-zinc-900/10" @submit.prevent="handleLogin">
        <p class="text-sm font-bold uppercase tracking-[0.24em] text-[#e85d3f]">Micro CMS</p>
        <h1 class="mt-3 text-3xl font-black">Entrar no gestor</h1>
        <p class="mt-3 text-zinc-600">Use a senha configurada no servidor. Padrao local: admin123.</p>
        <input
          v-model="password"
          type="password"
          class="mt-6 w-full rounded border border-zinc-300 px-4 py-3 outline-none focus:border-[#e85d3f]"
          placeholder="Senha"
          autocomplete="current-password"
        />
        <button type="submit" class="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded bg-zinc-950 px-5 font-bold text-white">
          Entrar
        </button>
        <p v-if="error" class="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{{ error }}</p>
      </form>
    </section>

    <section v-else-if="content" class="mx-auto grid max-w-[1500px] gap-5 px-5 py-5">
      <header class="sticky top-0 z-40 -mx-5 border-b border-zinc-200 bg-zinc-100/95 px-5 py-4 backdrop-blur">
        <div class="mx-auto flex max-w-[1500px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#e85d3f]">Micro CMS</p>
            <h1 class="text-2xl font-black">Micro CMS</h1>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex min-h-10 items-center gap-2 rounded bg-[#e85d3f] px-4 font-bold text-white"
              @click="persist"
            >
              <span
                v-if="hasUnsavedChanges"
                class="grid size-5 place-items-center rounded-full bg-white text-sm font-black leading-none text-[#e85d3f]"
                aria-label="Alteracoes nao salvas"
              >
                !
              </span>
              <Save v-else :size="17" />
              Salvar
            </button>
            <button type="button" class="rounded border border-zinc-300 bg-white px-4 py-2 text-sm font-bold" @click="logout">
              {{ hasUnsavedChanges ? 'Descartar alteracões e sair!' : 'Sair' }}
            </button>
          </div>
        </div>
      </header>

      <div class="rounded bg-white p-2 shadow-sm">
        <div class="grid gap-2 sm:inline-grid sm:grid-cols-2">
          <button
            type="button"
            class="rounded px-5 py-3 text-sm font-black"
            :class="activeTab === 'content' ? 'bg-zinc-950 text-white' : 'text-zinc-600 hover:bg-zinc-100'"
            @click="activeTab = 'content'"
          >
            Configurações de conteúdo
          </button>
          <button
            type="button"
            class="rounded px-5 py-3 text-sm font-black"
            :class="activeTab === 'site' ? 'bg-zinc-950 text-white' : 'text-zinc-600 hover:bg-zinc-100'"
            @click="activeTab = 'site'"
          >
            Configurações do site
          </button>
        </div>
      </div>

      <div v-if="status" class="rounded bg-green-50 p-4 text-green-800">{{ status }}</div>
      <div v-if="error" class="rounded bg-red-50 p-4 text-red-800">{{ error }}</div>

      <main v-if="selectedPage && activeTab === 'content'" class="grid gap-5 xl:grid-cols-[340px_360px_1fr]">
        <aside class="rounded bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between gap-4">
            <h2 class="text-xl font-black">Landing pages</h2>
            <button type="button" class="inline-flex min-h-10 items-center justify-center gap-2 rounded bg-zinc-950 px-3 font-bold text-white" @click="addPage">
              <Plus :size="16" />
              Nova
            </button>
          </div>

          <div class="mt-5 space-y-2">
            <div
              v-for="page in content.pages"
              :key="page.id"
              class="grid grid-cols-[1fr_auto] items-center gap-2 rounded border p-2"
              :class="page.id === selectedPageId ? 'border-[#e85d3f] bg-orange-50' : 'border-zinc-200 bg-white'"
            >
              <button
                type="button"
                class="min-w-0 rounded px-2 py-1 text-left hover:bg-white/70"
                @click="selectedPageId = page.id; selectedSectionId = page.sections[0]?.id ?? ''"
              >
                <strong class="block truncate">{{ page.title }}</strong>
                <span class="block truncate text-sm text-zinc-500">{{ page.slug }}</span>
              </button>
              <button
                type="button"
                class="rounded border border-red-300 p-2 text-red-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Remover landing page"
                :disabled="content.pages.length <= 1"
                @click="removePage(page.id)"
              >
                <Trash2 :size="15" />
              </button>
            </div>
          </div>
        </aside>

        <aside class="rounded bg-white p-5 shadow-sm">
          <h2 class="text-xl font-black">Seções</h2>
          <select class="mt-4 w-full rounded border border-zinc-300 px-3 py-2" @change="addSection(($event.target as HTMLSelectElement).value)">
            <option value="">Adicionar componente</option>
            <option v-for="definition in sectionDefinitions" :key="definition.type" :value="definition.type">
              {{ definition.label }}
            </option>
          </select>

          <div class="mt-4 space-y-2">
            <div
              v-for="(section, index) in selectedPage.sections"
              :key="index"
              class="rounded border p-3"
              :class="section.id === selectedSectionId ? 'border-[#e85d3f] bg-orange-50' : 'border-zinc-200'"
            >
              <button type="button" class="block w-full text-left" @click="selectedSectionId = section.id">
                <strong>{{ section.type }}</strong>
                <span class="block text-sm text-zinc-500">#{{ section.id }}</span>
              </button>
              <div class="mt-3 flex flex-wrap items-center gap-2">
                <label class="flex items-center gap-2 text-sm">
                  <input v-model="section.enabled" type="checkbox" />
                  Ativa
                </label>
                <button type="button" class="rounded border border-zinc-300 p-2" aria-label="Subir secao" @click="moveSection(index, -1)">
                  <ArrowUp :size="15" />
                </button>
                <button type="button" class="rounded border border-zinc-300 p-2" aria-label="Descer secao" @click="moveSection(index, 1)">
                  <ArrowDown :size="15" />
                </button>
                <button type="button" class="rounded border border-red-300 p-2 text-red-700" aria-label="Remover secao" @click="removeSection(section.id)">
                  <Trash2 :size="15" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        <section class="rounded bg-white p-5 shadow-sm">
          <template v-if="selectedSection">
            <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 class="text-xl font-black">Editar componente</h2>
                <p class="text-sm text-zinc-500">{{ selectedSection.type }} / #{{ selectedSection.id }}</p>
              </div>
              <label class="grid gap-1 text-sm font-bold">
                ID da seção
                <input
                  :value="selectedSection.id"
                  class="rounded border border-zinc-300 px-3 py-2 font-normal"
                  @input="updateSelectedSectionId(($event.target as HTMLInputElement).value)"
                />
              </label>
            </div>

            <div class="mb-5 grid gap-3 rounded bg-zinc-100 p-4 md:grid-cols-2">
              <label class="grid gap-1 text-sm font-bold">
                Margem superior da seção
                <input v-model.number="selectedSection.marginTop" type="number" min="0" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
                <span class="text-xs font-normal text-zinc-500">Distancia em pixels antes deste componente.</span>
              </label>
              <label class="grid gap-1 text-sm font-bold">
                Margem inferior da seção
                <input v-model.number="selectedSection.marginBottom" type="number" min="0" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
                <span class="text-xs font-normal text-zinc-500">Distancia em pixels depois deste componente.</span>
              </label>
            </div>

            <div class="mb-5 grid gap-3 rounded bg-zinc-100 p-4 md:grid-cols-[1fr_auto]">
              <label class="grid gap-1 text-sm font-bold">
                Cor de fundo da seção
                <span class="flex overflow-hidden rounded border border-zinc-300 bg-white">
                  <input
                    :value="selectedSection.backgroundColor || '#ffffff'"
                    type="color"
                    class="h-11 w-14 shrink-0 cursor-pointer border-0 bg-transparent p-1 disabled:cursor-not-allowed disabled:opacity-40"
                    :disabled="selectedSection.backgroundTransparent"
                    @input="updateSelectedSectionBackgroundColor(($event.target as HTMLInputElement).value)"
                  />
                  <input
                    v-model="selectedSection.backgroundColor"
                    class="min-w-0 flex-1 px-3 py-2 font-normal outline-none disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-400"
                    placeholder="Vazio usa a cor padrão do componente"
                    :disabled="selectedSection.backgroundTransparent"
                  />
                </span>
              </label>
              <label class="flex items-end gap-2 pb-3 text-sm font-bold">
                <input v-model="selectedSection.backgroundTransparent" type="checkbox" />
                Fundo transparente
              </label>
            </div>

            <div class="mb-5 grid gap-3 rounded bg-zinc-100 p-4 md:grid-cols-2">
              <label class="grid gap-1 text-sm font-bold">
                Largura max. upload
                <input v-model.number="uploadWidth" type="number" min="0" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
              </label>
              <label class="grid gap-1 text-sm font-bold">
                Altura max. upload
                <input v-model.number="uploadHeight" type="number" min="0" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
              </label>
            </div>

            <div class="space-y-4">
              <template v-for="(_, key) in selectedSection.data" :key="key">
                <div class="rounded border border-zinc-200 p-4">
                  <RecursiveField
                    :label="fieldLabel(String(key))"
                    :model="selectedSection.data"
                    :field-key="String(key)"
                    @add-item="addArrayItem"
                    @remove-item="removeArrayItem"
                    @image-selected="onImageSelected"
                  />
                </div>
              </template>
            </div>
          </template>
          <div v-else class="rounded border border-dashed border-zinc-300 p-10 text-center text-zinc-500">
            Adicione ou selecione uma seção para editar.
          </div>
        </section>
      </main>

      <main v-else-if="selectedPage && activeTab === 'site'" class="grid gap-5">
        <div class="rounded bg-white p-5 shadow-sm">
          <h2 class="text-xl font-black">Marca do topo</h2>
          <p class="mt-1 text-sm text-zinc-500">Configure o texto da marca ou habilite uma logo no lugar do texto.</p>

          <div class="mt-5 grid gap-4 md:grid-cols-3">
            <label class="grid gap-2 text-sm font-bold">
              Marca padrao
              <input v-model="content.site.brand" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
            </label>
            <label class="grid gap-2 text-sm font-bold">
              Texto no topo
              <input v-model="content.site.header!.brandName" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
            </label>
            <label class="flex items-end gap-2 text-sm font-bold">
              <input v-model="content.site.header!.useLogo" type="checkbox" />
              Usar logo no topo
            </label>
            <label class="grid gap-2 text-sm font-bold">
              Transparencia do topo
              <input v-model.number="content.site.header!.backgroundOpacity" type="range" min="0" max="1" step="0.05" />
              <span class="text-xs font-normal text-zinc-500">{{ Math.round((content.site.header!.backgroundOpacity ?? 0.9) * 100) }}%</span>
            </label>
            <label class="grid gap-2 text-sm font-bold">
              Fosco do topo
              <input v-model.number="content.site.header!.blur" type="range" min="0" max="40" step="1" />
              <span class="text-xs font-normal text-zinc-500">{{ content.site.header!.blur ?? 24 }}px</span>
            </label>
          </div>

          <div class="mt-5 grid gap-4 rounded bg-zinc-100 p-4 md:grid-cols-[160px_1fr]">
            <img
              v-if="content.site.header?.logo.src"
              :src="content.site.header.logo.src"
              alt=""
              class="h-24 w-full rounded bg-white object-contain p-3"
            />
            <div class="grid gap-3 md:grid-cols-3">
              <label class="grid gap-2 text-sm font-bold md:col-span-3">
                URL da logo
                <input v-model="content.site.header!.logo.src" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
              </label>
              <label class="grid gap-2 text-sm font-bold">
                Alt
                <input v-model="content.site.header!.logo.alt" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
              </label>
              <label class="grid gap-2 text-sm font-bold">
                Largura da logo
                <input v-model.number="content.site.header!.logo.width" type="number" min="0" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
              </label>
              <label class="grid gap-2 text-sm font-bold">
                Altura da logo
                <input v-model.number="content.site.header!.logo.height" type="number" min="0" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
              </label>
              <label class="inline-flex cursor-pointer items-center justify-center rounded border border-zinc-300 bg-white px-4 py-3 text-sm font-bold md:col-span-3">
                Enviar logo
                <input type="file" accept="image/*" class="hidden" @change="onImageSelected($event, content.site.header!.logo)" />
              </label>
            </div>
          </div>
        </div>

        <div class="rounded bg-white p-5 shadow-sm">
          <h2 class="text-xl font-black">Paleta de cores</h2>
          <div class="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <label v-for="field in paletteFields" :key="field.key" class="grid gap-2 text-sm font-bold">
              {{ field.label }}
              <span class="flex overflow-hidden rounded border border-zinc-300 bg-white">
                <input v-model="content.site.palette![field.key]" type="color" class="h-11 w-14 shrink-0 cursor-pointer border-0 bg-transparent p-1" />
                <input v-model="content.site.palette![field.key]" class="min-w-0 flex-1 px-3 py-2 font-normal outline-none" />
              </span>
            </label>
          </div>
        </div>

        <div class="rounded bg-white p-5 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-xl font-black">Configuração da página</h2>
            <a :href="selectedPage.slug" target="_blank" class="inline-flex min-h-10 items-center gap-2 rounded border border-zinc-300 px-4 font-bold">
              <Eye :size="17" />
              Visualizar
            </a>
          </div>

          <div class="mt-5 grid gap-4 md:grid-cols-3">
            <label class="grid gap-2 text-sm font-bold">
              Titulo
              <input v-model="selectedPage.title" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
            </label>
            <label class="grid gap-2 text-sm font-bold">
              Slug
              <input v-model="selectedPage.slug" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
            </label>
            <label class="grid gap-2 text-sm font-bold">
              ID
              <input
                :value="selectedPage.id"
                class="rounded border border-zinc-300 px-3 py-2 font-normal"
                @input="updateSelectedPageId(($event.target as HTMLInputElement).value)"
              />
            </label>
          </div>

          <button type="button" class="mt-4 rounded border border-red-300 px-4 py-2 text-sm font-bold text-red-700" @click="removePage(selectedPage.id)">
            Remover página
          </button>
        </div>

        <div class="rounded bg-white p-5 shadow-sm">
          <h2 class="text-xl font-black">Menu superior</h2>
          <div class="mt-4 grid gap-3 md:grid-cols-2">
            <div v-for="(item, index) in selectedPage.menu" :key="index" class="rounded border border-zinc-200 p-3">
              <div class="mb-3 flex items-center justify-between gap-3">
                <span class="grid size-8 place-items-center rounded bg-zinc-100 text-sm font-black text-zinc-700">
                  {{ index + 1 }}
                </span>
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="rounded border border-zinc-300 p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Subir item do menu"
                    :disabled="index === 0"
                    @click="moveMenuItem(index, -1)"
                  >
                    <ArrowUp :size="15" />
                  </button>
                  <button
                    type="button"
                    class="rounded border border-zinc-300 p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Descer item do menu"
                    :disabled="index === selectedPage.menu.length - 1"
                    @click="moveMenuItem(index, 1)"
                  >
                    <ArrowDown :size="15" />
                  </button>
                </div>
              </div>
              <div class="grid gap-2">
                <input v-model="item.label" class="rounded border border-zinc-300 px-3 py-2" placeholder="Rotulo" />
                <input v-model="item.href" class="rounded border border-zinc-300 px-3 py-2" placeholder="#secao, /pagina ou https://..." />
                <select v-model="item.kind" class="rounded border border-zinc-300 px-3 py-2">
                  <option value="section">Seção da página</option>
                  <option value="page">Página interna</option>
                  <option value="external">Link externo</option>
                </select>
              </div>
              <button type="button" class="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-700" @click="removeMenuItem(index)">
                <Trash2 :size="15" />
                Remover
              </button>
            </div>
          </div>
          <button type="button" class="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded border border-zinc-300 px-4 font-bold" @click="addMenuItem">
            <Plus :size="16" />
            Adicionar link
          </button>
        </div>

        <div class="rounded bg-white p-5 shadow-sm">
          <h2 class="text-xl font-black">Rodape da página</h2>
          <div class="mt-4 grid gap-4">
            <label class="flex items-center gap-2 text-sm font-bold">
              <input v-model="selectedPage.footer!.enabled" type="checkbox" />
              Exibir rodape nesta página
            </label>
            <label class="grid gap-2 text-sm font-bold">
              Texto
              <input v-model="selectedPage.footer!.text" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
            </label>
          </div>

          <div class="mt-4 space-y-3">
            <div v-for="(link, index) in selectedPage.footer!.links" :key="index" class="grid gap-2 rounded border border-zinc-200 p-3 md:grid-cols-[1fr_1fr_auto]">
              <input v-model="link.label" class="rounded border border-zinc-300 px-3 py-2" placeholder="Rotulo" />
              <input v-model="link.href" class="rounded border border-zinc-300 px-3 py-2" placeholder="/pagina ou https://..." />
              <button type="button" class="inline-flex items-center gap-2 text-sm font-bold text-red-700" @click="selectedPage.footer!.links.splice(index, 1)">
                <Trash2 :size="15" />
                Remover
              </button>
            </div>
          </div>
          <button
            type="button"
            class="mt-4 inline-flex min-h-10 items-center justify-center gap-2 rounded border border-zinc-300 px-4 font-bold"
            @click="selectedPage.footer!.links.push({ label: 'Novo link', href: '/' })"
          >
            <Plus :size="16" />
            Adicionar link do rodape
          </button>
        </div>
      </main>
    </section>
  </div>
</template>
