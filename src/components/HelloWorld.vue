<script setup lang="ts">
// import { ref } from 'vue'
// import viteLogo from '../assets/vite.svg'
// import heroImg from '../assets/hero.png'
import fjasLogo from '../assets/fjas-logo.png'
import sgeduIcon from '../assets/sgedu-icon.png'
import appleIcon from '../assets/icons8-ios-100.png'
import androidIcon from '../assets/android-icon.png'
import whatsappIcon from '../assets/whatsapp.png'
// import vueLogo from '../assets/vue.svg'

// const count = ref(0)
</script>

<template>
  <section id="center">
    <div class="hero">
      <!-- <img :src="heroImg" class="base" width="170" height="179" alt="" /> -->
      <img :src="fjasLogo" class="base" alt="Vue logo" />
      <!-- <img :src="viteLogo" class="vite" alt="Vite logo" /> -->
    </div>
    <div>
      <!-- <h1>FJAS TI</h1> -->
      <p>Desenvolvemos e forencemos software e serviços em teconlogia.</p>
        <!-- <code>src/App.vue</code> and save to test <code>HMR</code></p> -->
    </div>
    <!-- <button class="counter" @click="count++">Count is {{ count }}</button> -->
  </section>

  <div class="ticks"></div>

  <section id="next-steps">
    <div id="docs">
      <!-- <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#documentation-icon"></use>
      </svg> -->

      <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon" role="presentation" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg> -->

      <h2>SGEdu</h2>
      <p>Sistema para gestão educacional</p>
      <ul>
        <li>
          <a href="https://sgedu.com.br/" target="_blank">
            <img class="logo" :src="sgeduIcon" alt="" />
            Web
          </a>
        </li>
        <li>
          <a href="https://play.google.com/store/apps/details?id=br.com.sgedu&pcampaignid=web" target="_blank">
            <img class="logo" :src="androidIcon" alt="" />
            App Android
          </a>
        </li>
         <li>
          <a href="https://apps.apple.com/br/app/sgedu-aluno/id6745787998" target="_blank">
            <img class="logo" :src="appleIcon" alt="" />
            App IOS
          </a>
        </li>
      </ul>
    </div>
    <div id="social">
      <!-- <svg class="icon" role="presentation" aria-hidden="true">
        <use href="/icons.svg#social-icon"></use>
      </svg> -->
      <h2>Entre em contato</h2>
      <p>Nos envie um e-mail ou mensagem pelo whatsapp.</p>
      <ul>
        <li>
            <a target="_blank" href="mailto:contato@fjas.com.br">
            <!-- <svg class="button-icon" role="presentation" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg> -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="button-icon" role="presentation" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>

            Contato@fjas.com.br
            </a>
        </li>
        
        <li>
          <a href="https://w.app/ui0drq" target="_blank">
            <img class="logo" :src="whatsappIcon" alt="" />
            Whatsapp
          </a>
        </li>
      </ul>
    </div>
  </section>

  <div class="ticks"></div>
  <section id="spacer"></section>
</template>
