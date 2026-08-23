<script setup lang="ts">
import { ArrowRight, Globe2 } from '@lucide/vue'
import type { ImageField, LinkField } from '../../types/content'

defineProps<{
  data: {
    eyebrow?: string
    title?: string
    text?: string
    primaryAction?: LinkField
    secondaryAction?: LinkField
    badgeTitle?: string
    badgeText?: string
    images?: ImageField[]
  }
}>()
</script>

<template>
  <section class="relative overflow-hidden bg-[var(--site-bg)] px-5 py-16 md:px-8 md:py-24">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
      <div>
        <p class="mb-5 text-sm font-bold uppercase tracking-[0.24em] text-[var(--site-accent)]">{{ data.eyebrow }}</p>
        <h1 class="max-w-4xl text-5xl font-black leading-[0.95] text-[var(--site-heading)] sm:text-6xl lg:text-7xl">
          {{ data.title }}
        </h1>
        <p class="mt-7 max-w-2xl text-lg leading-8 text-[var(--site-soft)]">{{ data.text }}</p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            v-if="data.primaryAction"
            :href="data.primaryAction.href"
            class="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[var(--site-accent)] px-6 font-bold text-white transition hover:bg-[var(--site-dark)]"
          >
            {{ data.primaryAction.label }}
            <ArrowRight :size="18" />
          </a>
          <a
            v-if="data.secondaryAction"
            :href="data.secondaryAction.href"
            class="inline-flex min-h-12 items-center justify-center rounded border border-[color:var(--site-border)] px-6 font-bold text-[var(--site-heading)] transition hover:border-[color:var(--site-heading)]"
          >
            {{ data.secondaryAction.label }}
          </a>
        </div>

        <div class="mt-12 flex max-w-xl items-start gap-4 border-t border-[color:var(--site-border)] pt-6">
          <div class="grid size-12 shrink-0 place-items-center rounded bg-[var(--site-dark)] text-white">
            <Globe2 :size="22" />
          </div>
          <div>
            <h2 class="text-lg font-black text-[var(--site-heading)]">{{ data.badgeTitle }}</h2>
            <p class="mt-1 text-sm leading-6 text-[var(--site-soft)]">{{ data.badgeText }}</p>
          </div>
        </div>
      </div>

      <div class="grid min-h-[480px] grid-cols-[0.85fr_1fr] items-end gap-5">
        <img
          v-if="data.images?.[0]"
          :src="data.images[0].src"
          :alt="data.images[0].alt"
          class="h-[min(68vw,540px)] w-full rounded object-cover shadow-2xl shadow-zinc-900/10"
          :style="{ maxWidth: `${data.images[0].width || 420}px` }"
        />
        <img
          v-if="data.images?.[1]"
          :src="data.images[1].src"
          :alt="data.images[1].alt"
          class="mb-16 h-[min(54vw,410px)] w-full rounded object-cover shadow-2xl shadow-zinc-900/10"
          :style="{ maxWidth: `${data.images[1].width || 320}px` }"
        />
      </div>
    </div>
  </section>
</template>
