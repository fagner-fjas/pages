<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { ImageField } from '../../types/content'

defineProps<{
  data: {
    title?: string
    text?: string
    image?: ImageField
    items?: Array<{ title: string; text: string }>
  }
}>()
</script>

<template>
  <section class="bg-[#f6f4ef] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
      <img
        v-if="data.image"
        :src="data.image.src"
        :alt="data.image.alt"
        class="h-[520px] w-full rounded object-cover shadow-2xl shadow-zinc-900/10"
        :style="{ maxHeight: `${data.image.height || 520}px` }"
      />
      <div>
        <h2 class="text-4xl font-black leading-tight text-zinc-950 md:text-5xl">{{ data.title }}</h2>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">{{ data.text }}</p>
        <div class="mt-10 divide-y divide-zinc-300 border-y border-zinc-300">
          <a v-for="item in data.items" :key="item.title" href="#" class="flex items-center justify-between gap-5 py-6">
            <span>
              <strong class="block text-xl text-zinc-950">{{ item.title }}</strong>
              <span class="mt-1 block text-zinc-600">{{ item.text }}</span>
            </span>
            <ArrowUpRight class="shrink-0 text-[#e85d3f]" :size="24" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
