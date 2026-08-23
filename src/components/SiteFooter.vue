<script setup lang="ts">
import type { FooterConfig } from '../types/content'

defineProps<{
  brand: string
  footer?: FooterConfig
}>()
</script>

<template>
  <footer
    v-if="footer?.enabled !== false"
    class="border-t border-[color:var(--site-border)] bg-[var(--site-bg)] px-5 py-8 text-sm text-[var(--site-soft)]"
  >
    <div class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
      <p>{{ footer?.text || `${brand} - Todos os direitos reservados.` }}</p>

      <nav
        v-if="footer?.links?.length"
        class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-semibold text-[var(--site-text)]"
        aria-label="Links do rodape"
      >
        <a
          v-for="link in footer.links"
          :key="`${link.label}-${link.href}`"
          :href="link.href"
          class="transition hover:text-[var(--site-accent)]"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </footer>
</template>
