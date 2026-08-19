<script setup lang="ts">
import { Check } from '@lucide/vue'

defineProps<{
  data: {
    title?: string
    text?: string
    features?: string[]
    plans?: Array<{ name: string; price: string; period: string; features: string[]; action: string }>
  }
}>()
</script>

<template>
  <section class="bg-[#f6f4ef] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <h2 class="text-4xl font-black leading-tight text-zinc-950 md:text-5xl">{{ data.title }}</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">{{ data.text }}</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="feature in data.features" :key="feature" class="flex items-center gap-3 rounded border border-zinc-300 bg-white p-4 font-bold text-zinc-800">
            <Check class="text-[#e85d3f]" :size="18" />
            {{ feature }}
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-px overflow-hidden rounded bg-zinc-200 md:grid-cols-2 xl:grid-cols-4">
        <article v-for="plan in data.plans" :key="plan.name" class="bg-white p-8">
          <p class="font-bold text-zinc-500">{{ plan.name }}</p>
          <div class="mt-5 flex items-end gap-2">
            <strong class="text-5xl font-black text-zinc-950">{{ plan.price }}</strong>
            <span class="pb-2 text-zinc-500">{{ plan.period }}</span>
          </div>
          <ul class="mt-8 space-y-3 text-zinc-600">
            <li v-for="feature in plan.features" :key="feature" class="flex gap-2">
              <Check class="mt-1 shrink-0 text-[#e85d3f]" :size="16" />
              {{ feature }}
            </li>
          </ul>
          <a href="#contact" class="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded bg-zinc-950 px-4 font-bold text-white transition hover:bg-[#e85d3f]">
            {{ plan.action }}
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
