import { authClient } from '@/lib/auth-client'

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
    {
      path: '/auth/dashboard',
      name: 'dashboard',
      component: () => import('../pages/auth/dashboard-page.vue'),
      meta: {
        title: 'Dashboard',
        requiresAuth: true
      },
    },
    {
      path: '/auth/balances',
      name: 'balances',
      component: () => import('../pages/auth/balances-page.vue'),
      meta: {
        title: 'Balancesenses',
        requiresAuth: true
      },
    },
    {
      path: '/auth/transactions',
      name: 'transactions',
      component: () => import('../pages/auth/transaction-page.vue'),
      meta: {
        title: 'Transactions',
        requiresAuth: true
      },
    },
    {
      path: '/auth/categories',
      name: 'categories',
      component: () => import('../pages/auth/categories-page.vue'),
      meta: {
        title: 'Categories',
        requiresAuth: true
      },
    },

  ],
})


router.beforeEach((to) => {
  const appName = `Pernance| ${to.meta.title}`
  document.title = appName
})

router.beforeEach(async (to, from) => {
  const requiresAuth = to.matched.some((to) => to.meta.requiresAuth)

  const { data, error } = await authClient.getSession()

  if (!data?.session && requiresAuth) return { name: "login", query: { redirect: to.fullPath } }

  if (data?.session && !requiresAuth) return { name: "dashboard", query: { redirect: to.fullPath } }



})



export default router
