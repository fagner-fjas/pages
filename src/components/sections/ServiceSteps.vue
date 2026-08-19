<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import type { LinkField } from '../../types/content'

defineProps<{
  data: {
    eyebrow?: string
    title?: string
    action?: LinkField
    items?: Array<{ number: string; title: string; text: string }>
  }
}>()
</script>

<template>
  <section class="bg-white px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="mb-10 flex flex-col justify-between gap-5 border-b border-zinc-200 pb-8 md:flex-row md:items-end">
        <div>
          <p class="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[#e85d3f]">{{ data.eyebrow }}</p>
          <h2 class="max-w-2xl text-4xl font-black leading-tight text-zinc-950 md:text-5xl">{{ data.title }}</h2>
        </div>
        <a v-if="data.action" :href="data.action.href" class="inline-flex items-center gap-2 font-bold text-zinc-950">
          {{ data.action.label }}
          <ArrowRight :size="18" />
        </a>
      </div>

      <div class="grid gap-px overflow-hidden rounded bg-zinc-200 md:grid-cols-4">
        <article v-for="item in data.items" :key="item.number" class="bg-[#f6f4ef] p-8">
          <p class="text-5xl font-black text-[#e85d3f]">{{ item.number }}</p>
          <h3 class="mt-10 text-xl font-black text-zinc-950">{{ item.title }}</h3>
          <p class="mt-4 leading-7 text-zinc-600">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
