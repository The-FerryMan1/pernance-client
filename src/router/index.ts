import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home-page.vue'),
      meta: {
        title: 'Home',
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login-page.vue'),
      meta: {
        title: 'Login',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/register-page.vue'),
      meta: {
        title: 'Register',
      },
    },
  ],
})

export default router
