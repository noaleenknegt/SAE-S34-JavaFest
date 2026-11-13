import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'home', component: HomeView },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/billets', name: 'billets', component: () => import('@/views/TicketsView.vue') },
    { path: '/merch', name: 'merch', component: () => import('@/views/MerchView.vue') },
    { path: '/panier', name: 'panier', component: () => import('@/views/CartView.vue') },
    { path: '/paiement', name: 'paiement', component: () => import('@/views/CheckoutView.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/views/ContactView.vue') },
  ],
})

export default router
