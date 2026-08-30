<script setup lang="ts">
import { computed } from 'vue'
import { sectionComponents } from '../data/sectionRegistry'
import type { LandingPage } from '../types/content'

const props = defineProps<{
  page: LandingPage
}>()

const visibleSections = computed(() => props.page.sections.filter((section) => section.enabled))

function sectionSpacing(value?: number) {
  return `${Math.max(0, Number(value) || 0)}px`
}

function sectionStyles(section: LandingPage['sections'][number]) {
  const styles: Record<string, string> = {
    marginTop: sectionSpacing(section.marginTop),
    marginBottom: sectionSpacing(section.marginBottom),
  }

  if (section.backgroundTransparent) {
    styles['--section-bg'] = 'transparent'
  } else if (section.backgroundColor) {
    styles['--section-bg'] = section.backgroundColor
  }

  return styles
}
</script>

<template>
  <div
    v-for="section in visibleSections"
    :id="section.id"
    :key="section.id"
    :style="sectionStyles(section)"
  >
    <component
      :is="sectionComponents[section.type as keyof typeof sectionComponents]"
      :data="section.data"
    />
  </div>
</template>
