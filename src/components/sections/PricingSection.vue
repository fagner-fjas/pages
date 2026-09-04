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
  <section class="bg-[var(--section-bg,var(--site-bg))] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <h2 class="text-4xl font-black leading-tight text-[var(--site-heading)] md:text-5xl">{{ data.title }}</h2>
          <p class="mt-5 max-w-2xl text-lg leading-8 text-[var(--site-soft)]">{{ data.text }}</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div v-for="feature in data.features" :key="feature" class="flex items-center gap-3 rounded border border-[color:var(--site-border)] bg-[var(--site-surface)] p-4 font-bold text-[var(--site-text)]">
            <Check class="text-[var(--site-accent)]" :size="18" />
            {{ feature }}
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-px overflow-hidden rounded bg-[var(--site-border)] md:grid-cols-2 xl:grid-cols-4">
        <article v-for="plan in data.plans" :key="plan.name" class="bg-[var(--site-surface)] p-8">
          <p class="font-bold text-[var(--site-soft)]">{{ plan.name }}</p>
          <div class="mt-5 flex items-end gap-2">
            <strong class="text-5xl font-black text-[var(--site-heading)]">{{ plan.price }}</strong>
            <span class="pb-2 text-[var(--site-soft)]">{{ plan.period }}</span>
          </div>
          <ul class="mt-8 space-y-3 text-[var(--site-soft)]">
            <li v-for="feature in plan.features" :key="feature" class="flex gap-2">
              <Check class="mt-1 shrink-0 text-[var(--site-accent)]" :size="16" />
              {{ feature }}
            </li>
          </ul>
          <a href="#contact" class="mt-8 inline-flex min-h-11 w-full items-center justify-center rounded bg-[var(--site-dark)] px-4 font-bold text-white transition hover:bg-[var(--site-accent)]">
            {{ plan.action }}
          </a>
        </article>
      </div>
    </div>
  </section>
</template>
