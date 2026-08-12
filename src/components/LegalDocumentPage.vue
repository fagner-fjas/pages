<script setup lang="ts">
import { RouterLink } from 'vue-router'
import fjasLogo from '../assets/fjas-logo.png'
import type { LegalDocument } from '../data/legalDocuments'
import { legalLinks } from '../data/legalDocuments'

defineProps<{
  document: LegalDocument
}>()
</script>

<template>
  <main class="legal-page">
    <header class="legal-hero">
      <RouterLink class="brand-link" to="/" aria-label="Voltar para a página inicial da FJAS TI">
        <img :src="fjasLogo" alt="FJAS TI" />
      </RouterLink>
      <p class="eyebrow">{{ document.eyebrow }}</p>
      <h1 :id="document.slug">{{ document.title }}</h1>
      <p class="legal-subtitle">{{ document.subtitle }}</p>
      <div class="legal-meta">
        <span>SGEdu Escola</span>
        <span>SGEdu Aluno</span>
        <span>Atualizado em {{ document.updatedAt }}</span>
      </div>
    </header>

    <article class="legal-document" :aria-labelledby="document.slug">
      <div class="legal-notice">
        <strong>Nota de escopo:</strong>
        este texto é uma minuta institucional para publicação e deve ser revisado
        pela assessoria jurídica da empresa antes de uso como contrato definitivo.
      </div>

      <section class="intro-section">
        <p v-for="paragraph in document.intro" :key="paragraph">
          {{ paragraph }}
        </p>
      </section>

      <section
        v-for="section in document.sections"
        :key="section.title"
        class="legal-section"
      >
        <h2>{{ section.title }}</h2>
        <p v-for="paragraph in section.paragraphs" :key="paragraph">
          {{ paragraph }}
        </p>
        <ul v-if="section.items">
          <li v-for="item in section.items" :key="item">{{ item }}</li>
        </ul>
      </section>
    </article>

    <footer class="legal-footer">
      <RouterLink class="legal-home-link" to="/">Voltar para FJAS TI</RouterLink>
      <nav aria-label="Documentos legais">
        <RouterLink v-for="link in legalLinks" :key="link.href" :to="link.href">
          {{ link.label }}
        </RouterLink>
      </nav>
    </footer>
  </main>
</template>
