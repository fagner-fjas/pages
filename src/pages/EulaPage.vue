<script setup lang="ts">
import LegalDocumentPage from '../components/LegalDocumentPage.vue'
import { legalDocuments } from '../data/legalDocuments'

const document = legalDocuments['/eula-sgedu-escola']
</script>

<template>
  <LegalDocumentPage :document="document" />
</template>
