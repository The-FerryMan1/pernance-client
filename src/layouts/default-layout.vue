<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const links = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: { name: 'home' },
    icon: 'i-lucide-house',
    active: route.name === 'home',
  },
  {
    label: 'Sign in',
    to: { name: 'login' },
    icon: 'i-lucide-door-open',
    active: route.name === 'login',
  },
  {
    label: 'Sign up',
    to: { name: 'register' },
    icon: 'i-lucide-pen',
    active: route.name === 'register',
  },
])
</script>

<template>
  <UHeader>
    <template #title>
      <h1>Pernace</h1>
    </template>
    <UNavigationMenu :items="links" />
    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <UNavigationMenu :items="links" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
  <UPage>
    <UPageBody>
      <slot />
    </UPageBody>
  </UPage>
</template>
