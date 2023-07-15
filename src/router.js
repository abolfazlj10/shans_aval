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
      component: () => import('./pages/auth/login.vue')
    },
    {
      path: '/register',
      component: () => import('./pages/auth/register.vue')
    },
    {
      path: '/forgot',
      component: () => import('./pages/auth/forgot.vue')
    }
  ]
})

export default router
