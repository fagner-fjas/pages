<script setup lang="ts">
import { Star } from '@lucide/vue'

defineProps<{
  data: {
    title?: string
    items?: Array<{ name: string; meta: string; quote: string; avatar: string }>
  }
}>()
</script>

<template>
  <section class="bg-[var(--site-surface)] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto max-w-7xl">
      <h2 class="text-4xl font-black leading-tight text-[var(--site-heading)] md:text-5xl">{{ data.title }}</h2>
      <div class="mt-10 grid gap-px overflow-hidden rounded bg-[var(--site-border)] md:grid-cols-3">
        <article v-for="item in data.items" :key="item.name" class="bg-[var(--site-muted)] p-8">
          <div class="mb-6 flex gap-1 text-[var(--site-accent)]" aria-label="Cinco estrelas">
            <Star v-for="index in 5" :key="index" :size="17" fill="currentColor" />
          </div>
          <blockquote class="text-lg leading-8 text-[var(--site-text)]">"{{ item.quote }}"</blockquote>
          <div class="mt-8 flex items-center gap-4">
            <img :src="item.avatar" :alt="item.name" class="size-14 rounded-full object-cover" />
            <div>
              <strong class="block text-[var(--site-heading)]">{{ item.name }}</strong>
              <span class="text-sm text-[var(--site-soft)]">{{ item.meta }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
