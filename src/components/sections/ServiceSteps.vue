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
  <section class="bg-[var(--site-surface)] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="mb-10 flex flex-col justify-between gap-5 border-b border-[color:var(--site-border)] pb-8 md:flex-row md:items-end">
        <div>
          <p class="mb-3 text-sm font-bold uppercase tracking-[0.22em] text-[var(--site-accent)]">{{ data.eyebrow }}</p>
          <h2 class="max-w-2xl text-4xl font-black leading-tight text-[var(--site-heading)] md:text-5xl">{{ data.title }}</h2>
        </div>
        <a v-if="data.action" :href="data.action.href" class="inline-flex items-center gap-2 font-bold text-[var(--site-heading)]">
          {{ data.action.label }}
          <ArrowRight :size="18" />
        </a>
      </div>

      <div class="grid gap-px overflow-hidden rounded bg-[var(--site-border)] md:grid-cols-4">
        <article v-for="item in data.items" :key="item.number" class="bg-[var(--site-muted)] p-8">
          <p class="text-5xl font-black text-[var(--site-accent)]">{{ item.number }}</p>
          <h3 class="mt-10 text-xl font-black text-[var(--site-heading)]">{{ item.title }}</h3>
          <p class="mt-4 leading-7 text-[var(--site-soft)]">{{ item.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
