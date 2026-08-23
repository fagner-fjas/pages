<script setup lang="ts">
import { Menu, X } from '@lucide/vue'
import { computed, ref } from 'vue'
import type { CSSProperties } from 'vue'
import type { HeaderConfig, MenuItem } from '../types/content'

const props = defineProps<{
  brand: string
  header?: HeaderConfig
  menu: MenuItem[]
}>()

const isOpen = ref(false)
const brandName = computed(() => props.header?.brandName || props.brand)
const shouldUseLogo = computed(() => Boolean(props.header?.useLogo && props.header.logo?.src))
const headerStyle = computed<CSSProperties>(() => ({
  backgroundColor: 'rgb(var(--site-bg-rgb) / var(--header-opacity))',
  backdropFilter: 'blur(var(--header-blur))',
  WebkitBackdropFilter: 'blur(var(--header-blur))',
}))
const logoStyle = computed(() => {
  const width = props.header?.logo?.width
  const height = props.header?.logo?.height

  return {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  }
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-[color:var(--site-border)]" :style="headerStyle">
    <div class="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
      <a href="/" class="inline-flex min-h-12 items-center text-xl font-black tracking-[0.32em] text-[var(--site-heading)]">
        <img
          v-if="shouldUseLogo"
          :src="header?.logo.src"
          :alt="header?.logo.alt || brandName"
          :style="logoStyle"
          class="max-h-14 max-w-[220px] object-contain"
        />
        <span v-else>{{ brandName }}</span>
      </a>

      <nav class="hidden items-center gap-8 text-sm font-semibold text-[var(--site-soft)] lg:flex" aria-label="Menu principal">
        <a
          v-for="item in menu"
          :key="`${item.label}-${item.href}`"
          :href="item.href"
          :target="item.kind === 'external' ? '_blank' : undefined"
          :rel="item.kind === 'external' ? 'noreferrer' : undefined"
          class="transition hover:text-[var(--site-accent)]"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        type="button"
        class="grid size-11 place-items-center rounded border border-[color:var(--site-border)] text-[var(--site-heading)] lg:hidden"
        aria-label="Abrir menu"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <nav v-if="isOpen" class="border-t border-[color:var(--site-border)] bg-[var(--site-bg)] px-5 py-4 lg:hidden" aria-label="Menu movel">
      <a
        v-for="item in menu"
        :key="`${item.label}-${item.href}-mobile`"
        :href="item.href"
        :target="item.kind === 'external' ? '_blank' : undefined"
        :rel="item.kind === 'external' ? 'noreferrer' : undefined"
        class="block border-b border-[color:var(--site-border)] py-3 text-base font-semibold text-[var(--site-text)] last:border-0"
        @click="isOpen = false"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
