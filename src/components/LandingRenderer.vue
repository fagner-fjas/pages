<script setup lang="ts">
import { computed } from 'vue'
import { sectionComponents } from '../data/sectionRegistry'
import type { LandingPage } from '../types/content'

const props = defineProps<{
  page: LandingPage
}>()

const visibleSections = computed(() => props.page.sections.filter((section) => section.enabled))
</script>

<template>
  <component
    :is="sectionComponents[section.type as keyof typeof sectionComponents]"
    v-for="section in visibleSections"
    :id="section.id"
    :key="section.id"
    :data="section.data"
  />
</template>
