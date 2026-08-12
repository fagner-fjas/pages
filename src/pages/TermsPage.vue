<script setup lang="ts">
import LegalDocumentPage from '../components/LegalDocumentPage.vue'
import { legalDocuments } from '../data/legalDocuments'

const document = legalDocuments['/termos-sgedu-escola']
</script>

<template>
  <LegalDocumentPage :document="document" />
</template>
