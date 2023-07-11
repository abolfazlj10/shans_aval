import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./pages/home.vue')
    },
    {
      path: '/login',
      component: () => import('./pages/login.vue')
    },
  ]
})

export default router
