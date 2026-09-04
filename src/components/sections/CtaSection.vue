<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import type { LinkField } from '../../types/content'

defineProps<{
  data: {
    cards?: Array<{ title: string; text: string; action: LinkField }>
  }
}>()
</script>

<template>
  <section class="bg-[var(--section-bg,var(--site-dark))] px-5 py-12 text-white md:px-8">
    <div class="mx-auto grid max-w-7xl gap-px overflow-hidden rounded bg-[var(--site-border)] md:grid-cols-2">
      <article v-for="card in data.cards" :key="card.title" class="bg-[var(--site-dark)] p-8 md:p-10">
        <h2 class="text-2xl font-black">{{ card.title }}</h2>
        <p class="mt-4 max-w-xl leading-7 text-[var(--site-dark-soft)]">{{ card.text }}</p>
        <a :href="card.action.href" class="mt-7 inline-flex items-center gap-2 font-bold text-[var(--site-highlight)]">
          {{ card.action.label }}
          <ArrowRight :size="18" />
        </a>
      </article>
    </div>
  </section>
</template>
