<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUpRight } from '@lucide/vue'
import type { ImageField } from '../../types/content'

const props = defineProps<{
  data: {
    title?: string
    text?: string
    image?: ImageField
    imagePosition?: 'left' | 'right'
    items?: Array<{ title: string; text: string; href?: string } | string>
  }
}>()

const imageOnRight = computed(() => props.data.imagePosition === 'right')
const showcaseItems = computed(() =>
  (props.data.items ?? []).map((item) =>
    typeof item === 'string'
      ? { title: item, text: '', href: '' }
      : item,
  ),
)
</script>

<template>
  <section class="bg-[var(--section-bg,var(--site-bg))] px-5 py-16 md:px-8 md:py-24">
    <div
      class="mx-auto grid max-w-7xl items-start gap-12"
      :class="imageOnRight ? 'lg:grid-cols-[1.05fr_0.95fr]' : 'lg:grid-cols-[0.95fr_1.05fr]'"
    >
      <img
        v-if="data.image"
        :src="data.image.src"
        :alt="data.image.alt"
        class="h-[520px] w-full rounded object-cover shadow-2xl shadow-zinc-900/10"
        :class="imageOnRight ? 'lg:order-2' : 'lg:order-1'"
        :style="{ maxHeight: `${data.image.height || 520}px` }"
      />
      <div :class="imageOnRight ? 'lg:order-1' : 'lg:order-2'">
        <h2 class="text-4xl font-black leading-tight text-[var(--site-heading)] md:text-5xl">{{ data.title }}</h2>
        <p class="mt-6 max-w-2xl text-lg leading-8 text-[var(--site-soft)]">{{ data.text }}</p>
        <div class="mt-10 divide-y divide-[color:var(--site-border)] border-y border-[color:var(--site-border)]">
          <template v-for="item in showcaseItems" :key="item.title">
            <a v-if="item.href" :href="item.href" class="flex items-center justify-between gap-5 py-6">
              <span>
                <strong class="block text-xl text-[var(--site-heading)]">{{ item.title }}</strong>
                <span class="mt-1 block text-[var(--site-soft)]">{{ item.text }}</span>
              </span>
              <ArrowUpRight class="shrink-0 text-[var(--site-accent)]" :size="24" />
            </a>
            <div v-else class="flex items-center justify-between gap-5 py-6">
              <span>
                <strong class="block text-xl text-[var(--site-heading)]">{{ item.title }}</strong>
                <span class="mt-1 block text-[var(--site-soft)]">{{ item.text }}</span>
              </span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
