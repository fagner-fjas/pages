<script setup lang="ts">
import type { ImageField } from '../../types/content'

defineProps<{
  data: {
    kicker?: string
    title?: string
    text?: string
    images?: ImageField[]
  }
}>()
</script>

<template>
  <section class="bg-zinc-950 px-5 py-16 text-white md:px-8 md:py-24">
    <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.72fr_1.28fr]">
      <div class="self-end">
        <p class="text-6xl font-black text-[#e85d3f]">{{ data.kicker }}</p>
        <h2 class="mt-3 text-4xl font-black md:text-5xl">{{ data.title }}</h2>
        <p class="mt-5 leading-7 text-zinc-400">{{ data.text }}</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <img
          v-for="image in data.images"
          :key="image.src"
          :src="image.src"
          :alt="image.alt"
          class="h-64 w-full rounded object-cover"
          :style="{ height: `${image.height || 260}px` }"
        />
      </div>
    </div>
  </section>
</template>
