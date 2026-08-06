 import { createRouter, createWebHistory } from 'vue-router'
  import HomePage from '../pages/HomePage.vue'
  import TermsPage from '../pages/TermsPage.vue'
  import PrivacyPage from '../pages/PrivacyPage.vue'
  import EulaPage from '../pages/EulaPage.vue'

  export const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: HomePage },
      { path: '/termos-sgedu-escola', component: TermsPage },
      { path: '/politica-privacidade-sgedu-escola', component: PrivacyPage },
      { path: '/eula-sgedu-escola', component: EulaPage },
    ],
  })