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
  <section class="bg-white px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto max-w-7xl">
      <h2 class="text-4xl font-black leading-tight text-zinc-950 md:text-5xl">{{ data.title }}</h2>
      <div class="mt-10 grid gap-px overflow-hidden rounded bg-zinc-200 md:grid-cols-3">
        <article v-for="item in data.items" :key="item.name" class="bg-[#f6f4ef] p-8">
          <div class="mb-6 flex gap-1 text-[#e85d3f]" aria-label="Cinco estrelas">
            <Star v-for="index in 5" :key="index" :size="17" fill="currentColor" />
          </div>
          <blockquote class="text-lg leading-8 text-zinc-700">"{{ item.quote }}"</blockquote>
          <div class="mt-8 flex items-center gap-4">
            <img :src="item.avatar" :alt="item.name" class="size-14 rounded-full object-cover" />
            <div>
              <strong class="block text-zinc-950">{{ item.name }}</strong>
              <span class="text-sm text-zinc-500">{{ item.meta }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
