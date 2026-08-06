<script setup lang="ts">
import { RouterLink } from 'vue-router'
import fjasLogo from '../assets/fjas-logo.png'
import sgeduIcon from '../assets/sgedu-icon.png'
import appleIcon from '../assets/icons8-ios-100.png'
import androidIcon from '../assets/android-icon.png'
import whatsappIcon from '../assets/whatsapp.png'
import { legalLinks } from '../data/legalDocuments'
</script>

<template>
  <main class="home-page">
    <section class="home-center">
      <div class="hero-mark">
        <img :src="fjasLogo" alt="FJAS TI" />
      </div>
      <div class="home-copy">
        <h1>FJAS TI V2</h1>
        <p>Desenvolvemos e fornecemos software e serviços em tecnologia.</p>
      </div>
    </section>

    <section class="home-grid" aria-label="Links principais">
      <div class="home-panel">
        <h2>SGEdu</h2>
        <p>Sistema para gestão educacional.</p>
        <ul class="action-links">
          <li>
            <a href="https://sgedu.com.br/" target="_blank" rel="noreferrer">
              <img :src="sgeduIcon" alt="" />
              Web
            </a>
          </li>
          <li>
            <a
              href="https://play.google.com/store/apps/details?id=br.com.sgedu&pcampaignid=web"
              target="_blank"
              rel="noreferrer"
            >
              <img :src="androidIcon" alt="" />
              App Android
            </a>
          </li>
          <li>
            <a
              href="https://apps.apple.com/br/app/sgedu-aluno/id6745787998"
              target="_blank"
              rel="noreferrer"
            >
              <img :src="appleIcon" alt="" />
              App iOS
            </a>
          </li>
        </ul>
      </div>

      <div class="home-panel">
        <h2>Entre em contato</h2>
        <p>Nos envie um e-mail ou mensagem pelo WhatsApp.</p>
        <ul class="action-links">
          <li>
            <a href="mailto:contato@fjas.com.br">contato@fjas.com.br</a>
          </li>
          <li>
            <a href="https://w.app/ui0drq" target="_blank" rel="noreferrer">
              <img :src="whatsappIcon" alt="" />
              WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </section>

    <footer class="home-legal">
      <nav aria-label="Documentos legais do SGEdu">
        <RouterLink v-for="link in legalLinks" :key="link.href" :to="link.href">
          {{ link.label }}
        </RouterLink>
      </nav>
    </footer>
  </main>
</template>
