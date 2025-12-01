<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { computed, shallowRef, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { authClient } from '../lib/auth-client'
import { sub } from 'date-fns'
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
        label: 'Balances',
        icon: "i-lucide-banknote-arrow-down",
        to: { name: 'balances' },
        active: route.name === 'balances',
    },
    {
        label: 'Transanction history',
        icon: "i-lucide-arrow-left-right",
        to: { name: 'transactions' },
        active: route.name === 'transactions',
    },
    {
        label: 'Categories',
        icon: "i-lucide-chart-bar-stacked",
        to: { name: 'categories' },
        active: route.name === 'categories',
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
        <UDashboardSidebar collapsible resizable>
            <template #header="{ collapsed }">
                <h1 v-if="!collapsed" class="h-5 w-auto shrink-0 font-bold">Pernace</h1>
            </template>

            <template #default="{ collapsed }">
                <UNavigationMenu :collapsed="collapsed" :items="items" orientation="vertical" />

            </template>
        </UDashboardSidebar>

        <UDashboardPanel :id="String(route.name)">
            <template #header>
                <UDashboardNavbar :title="String(route.name)">
                    <template #leading>
                        <UDashboardSidebarCollapse variant="subtle" />
                    </template>
                    <template #right>
                        <UColorModeButton />
                    </template>
                </UDashboardNavbar>
            </template>
            <template #body>
                <slot />
            </template>

        </UDashboardPanel>
    </UDashboardGroup>
</template>