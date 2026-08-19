<script setup lang="ts">
import { Menu, X } from '@lucide/vue'
import { ref } from 'vue'
import type { MenuItem } from '../types/content'

defineProps<{
  brand: string
  menu: MenuItem[]
}>()

const isOpen = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#f6f4ef]/90 backdrop-blur-xl">
    <div class="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-5 md:px-8">
      <a href="/" class="text-xl font-black tracking-[0.32em] text-zinc-950">{{ brand }}</a>

      <nav class="hidden items-center gap-8 text-sm font-semibold text-zinc-700 lg:flex" aria-label="Menu principal">
        <a
          v-for="item in menu"
          :key="`${item.label}-${item.href}`"
          :href="item.href"
          :target="item.kind === 'external' ? '_blank' : undefined"
          :rel="item.kind === 'external' ? 'noreferrer' : undefined"
          class="transition hover:text-[#e85d3f]"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        type="button"
        class="grid size-11 place-items-center rounded border border-zinc-300 text-zinc-950 lg:hidden"
        aria-label="Abrir menu"
        @click="isOpen = !isOpen"
      >
        <X v-if="isOpen" :size="20" />
        <Menu v-else :size="20" />
      </button>
    </div>

    <nav v-if="isOpen" class="border-t border-zinc-200 bg-[#f6f4ef] px-5 py-4 lg:hidden" aria-label="Menu movel">
      <a
        v-for="item in menu"
        :key="`${item.label}-${item.href}-mobile`"
        :href="item.href"
        :target="item.kind === 'external' ? '_blank' : undefined"
        :rel="item.kind === 'external' ? 'noreferrer' : undefined"
        class="block border-b border-zinc-200 py-3 text-base font-semibold text-zinc-800 last:border-0"
        @click="isOpen = false"
      >
        {{ item.label }}
      </a>
    </nav>
  </header>
</template>
