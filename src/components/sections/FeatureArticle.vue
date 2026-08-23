<script setup lang="ts">
import type { ImageField } from '../../types/content'

defineProps<{
  data: {
    date?: string
    title?: string
    text?: string
    image?: ImageField
    posts?: Array<{ title: string; text: string }>
  }
}>()
</script>

<template>
  <section class="bg-[var(--site-surface)] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <p class="mb-5 font-bold text-[var(--site-accent)]">{{ data.date }}</p>
        <h2 class="text-4xl font-black leading-tight text-[var(--site-heading)] md:text-5xl">{{ data.title }}</h2>
        <p class="mt-6 text-lg leading-8 text-[var(--site-soft)]">{{ data.text }}</p>
        <img
          v-if="data.image"
          :src="data.image.src"
          :alt="data.image.alt"
          class="mt-10 h-[520px] w-full rounded object-cover"
          :style="{ maxHeight: `${data.image.height || 520}px` }"
        />
      </div>
      <div class="grid content-start gap-px overflow-hidden rounded bg-[var(--site-border)] sm:grid-cols-2">
        <article v-for="post in data.posts" :key="post.title" class="min-h-64 bg-[var(--site-muted)] p-8">
          <h3 class="text-xl font-black leading-snug text-[var(--site-heading)]">{{ post.title }}</h3>
          <p class="mt-5 leading-7 text-[var(--site-soft)]">{{ post.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
