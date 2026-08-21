<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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

const isAuthenticated = computed(() => token.value.length > 0)
const selectedPage = computed(() => content.value?.pages.find((page) => page.id === selectedPageId.value))
const selectedSection = computed(() => selectedPage.value?.sections.find((section) => section.id === selectedSectionId.value))

onMounted(async () => {
  content.value = await loadContent()
  selectedPageId.value = content.value.pages[0]?.id ?? ''
  selectedSectionId.value = selectedPage.value?.sections[0]?.id ?? ''
})

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

async function persist() {
  if (!content.value) {
    return
  }

  error.value = ''
  status.value = ''

  try {
    await saveContent(content.value, token.value)
    status.value = 'Conteudo salvo no arquivo content/site.json.'
  } catch (saveError) {
    error.value = saveError instanceof Error ? saveError.message : 'Nao foi possivel salvar.'
  }
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
    sections: [],
  }

  content.value.pages.push(page)
  selectedPageId.value = id
  selectedSectionId.value = ''
}

function removePage(pageId: string) {
  if (!content.value || content.value.pages.length <= 1) {
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

function addSection(type: string) {
  const definition = sectionDefinitions.find((item) => item.type === type)

  if (!definition || !selectedPage.value) {
    return
  }

  const section = structuredClone(definition.defaults)
  section.id = `${definition.defaults.id}-${Date.now()}`
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

function addArrayItem(target: unknown[]) {
  const sample = target[0]

  if (typeof sample === 'string') {
    target.push('Novo item')
    return
  }

  if (sample && typeof sample === 'object') {
    target.push(structuredClone(sample))
    return
  }

  target.push('')
}

function removeArrayItem(target: unknown[], index: number) {
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

    <section v-else-if="content" class="mx-auto grid max-w-[1500px] gap-5 px-5 py-5 xl:grid-cols-[340px_1fr]">
      <aside class="rounded bg-white p-5 shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-[0.2em] text-[#e85d3f]">Micro CMS</p>
            <h1 class="text-2xl font-black">Landing pages</h1>
          </div>
          <button type="button" class="rounded border border-zinc-300 px-3 py-2 text-sm font-bold" @click="logout">Sair</button>
        </div>

        <button type="button" class="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded bg-zinc-950 px-4 font-bold text-white" @click="addPage">
          <Plus :size="17" />
          Nova pagina
        </button>

        <div class="mt-5 space-y-2">
          <button
            v-for="page in content.pages"
            :key="page.id"
            type="button"
            class="w-full rounded border px-4 py-3 text-left"
            :class="page.id === selectedPageId ? 'border-[#e85d3f] bg-orange-50' : 'border-zinc-200 bg-white'"
            @click="selectedPageId = page.id; selectedSectionId = page.sections[0]?.id ?? ''"
          >
            <strong class="block">{{ page.title }}</strong>
            <span class="text-sm text-zinc-500">{{ page.slug }}</span>
          </button>
        </div>
      </aside>

      <main v-if="selectedPage" class="grid gap-5">
        <div class="rounded bg-white p-5 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 class="text-xl font-black">Configuração da página</h2>
            <div class="flex flex-wrap gap-2">
              <a :href="selectedPage.slug" target="_blank" class="inline-flex min-h-10 items-center gap-2 rounded border border-zinc-300 px-4 font-bold">
                <Eye :size="17" />
                Visualizar
              </a>
              <button type="button" class="inline-flex min-h-10 items-center gap-2 rounded bg-[#e85d3f] px-4 font-bold text-white" @click="persist">
                <Save :size="17" />
                Salvar
              </button>
            </div>
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
              <input v-model="selectedPage.id" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
            </label>
          </div>

          <button type="button" class="mt-4 rounded border border-red-300 px-4 py-2 text-sm font-bold text-red-700" @click="removePage(selectedPage.id)">
            Remover página
          </button>
        </div>

        <div class="grid gap-5 xl:grid-cols-[360px_1fr]">
          <aside class="rounded bg-white p-5 shadow-sm">
            <h2 class="text-xl font-black">Menu superior</h2>
            <div class="mt-4 space-y-3">
              <div v-for="(item, index) in selectedPage.menu" :key="index" class="rounded border border-zinc-200 p-3">
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
            <button type="button" class="mt-4 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded border border-zinc-300 font-bold" @click="addMenuItem">
              <Plus :size="16" />
              Adicionar link
            </button>

            <h2 class="mt-8 text-xl font-black">Seções</h2>
            <select class="mt-4 w-full rounded border border-zinc-300 px-3 py-2" @change="addSection(($event.target as HTMLSelectElement).value)">
              <option value="">Adicionar componente</option>
              <option v-for="definition in sectionDefinitions" :key="definition.type" :value="definition.type">
                {{ definition.label }}
              </option>
            </select>

            <div class="mt-4 space-y-2">
              <div
                v-for="(section, index) in selectedPage.sections"
                :key="section.id"
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
                  <input v-model="selectedSection.id" class="rounded border border-zinc-300 px-3 py-2 font-normal" />
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
        </div>

        <p v-if="status" class="rounded bg-green-50 p-4 text-green-800">{{ status }}</p>
        <p v-if="error" class="rounded bg-red-50 p-4 text-red-800">{{ error }}</p>
      </main>
    </section>
  </div>
</template>
