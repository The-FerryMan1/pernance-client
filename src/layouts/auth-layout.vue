<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authClient } from '../../lib/auth-client'

const route = useRoute()

const router = useRouter()

const toast = useToast()
const items = computed<NavigationMenuItem[]>(() => [

    {
        label: 'Dashboard',
        to: { name: 'dashboard' },
        active: route.name === 'dashboard',
        icon: "i-lucide-home"
    },
    {
        label: 'Expenses',
        icon: "i-lucide-banknote-arrow-down"
        // to: { name: 'login' },
        // active: route.name === 'login',
    },
    {
        label: 'Trasanction history',
        icon: "i-lucide-arrow-left-right"
        // to: { name: 'login' },
        // active: route.name === 'login',
    },
    {
        label: 'Categories',
        icon: "i-lucide-chart-bar-stacked"
        // to: { name: 'login' },
        // active: route.name === 'login',
    },

    {
        label: 'Settings',
        icon: "i-lucide-settings",
        children: [
            {
                label: "Profile",
                icon: "i-lucide-circle-user",

            },
            {
                label: "Logout",
                icon: "i-lucide-log-out",
                onSelect: async () => {
                    await authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                toast.add({ title: "Account has been signed out successfully", color: "success" })
                                router.push({ name: 'login' })
                            },
                            onError: () => {
                                toast.add({ title: "Unable to sign out. Please try again later", color: "error" })
                            }

                        }
                    })
                }

            }
        ]
        // to: { name: 'login' },
        // active: route.name === 'login',
    },

])
</script>

<template>
    <UDashboardGroup>
        <UDashboardSidebar>
            <template #header="{ collapsed }">
                <h1 v-if="!collapsed" class="h-5 w-auto shrink-0 font-bold">Pernace</h1>
            </template>

            <template #default="{ collapsed }">
                <UNavigationMenu :collapsed="collapsed" :items="items" orientation="vertical" />

            </template>
        </UDashboardSidebar>

        <UDashboardPanel>
            <template #header>
                <UDashboardNavbar title="Dashboard" />
            </template>
            <template #body>
                <slot />
            </template>
        </UDashboardPanel>
    </UDashboardGroup>
</template>