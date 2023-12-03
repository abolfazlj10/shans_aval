import { createRouter, createWebHistory } from 'vue-router'
import alert from './components/alert.vue'

async function sendReq (){
  const url = 'http://localhost:3000/auth'
  const req = await fetch(url,{
    credentials:'include'
  })
  const res = await req.json()
  return res.status
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('./pages/home.vue')
    },
    {
      path: '/login',
      component: () => import('./pages/auth/login.vue'),
    },
    {
      path: '/register',
      component: () => import('./pages/auth/register.vue')
    },
    {
      path: '/forgot',
      component: () => import('./pages/auth/forgot.vue')
    },
    {
      path: '/dashboard',
      component: () => import('./pages/dashboard.vue'),
      beforeEnter:async (to,from,next)=>{
        if(await sendReq())
          next()
        else
          next('/login')
      }
    },
    {
      path: '/New',
      component: () => import('./pages/new.vue'),
      beforeEnter:async (to,from,next)=>{
        if(await sendReq())
          next()
        else
          next('/login')
      }
    },
    {
      path:'/Lotterys',
      component:()=> import('./pages/Lotterys.vue')
    }
  ]
})

export default router