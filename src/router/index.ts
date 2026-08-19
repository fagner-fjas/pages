import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '../pages/AdminPage.vue'
import LandingPage from '../pages/LandingPage.vue'
import TermsPage from '../pages/TermsPage.vue'
import PrivacyPage from '../pages/PrivacyPage.vue'
import EulaPage from '../pages/EulaPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/admin', component: AdminPage },
    { path: '/termos-sgedu-escola', component: TermsPage },
    { path: '/politica-privacidade-sgedu-escola', component: PrivacyPage },
    { path: '/eula-sgedu-escola', component: EulaPage },
    { path: '/:pathMatch(.*)*', component: LandingPage },
  ],
})
