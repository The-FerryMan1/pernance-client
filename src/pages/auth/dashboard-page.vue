<script setup lang="ts">
import authLayout from '@/layouts/auth-layout.vue';
import dashboardTable from '@/components/dashboard/dashboard-table.vue';
import { useTransactioStore } from '@/stores/transaction';
import { onMounted } from 'vue';

const transanction = useTransactioStore()
const items = [
    'burat',
    'bilat',
    'etits',
    'tite',
]

onMounted(async () => {
    await transanction.readTransactions()
})
</script>

<template>
    <authLayout>
        <UPageGrid class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px">
            <UPageCard title="Current Balance" description="Account current balance" icon="i-lucide-banknote" spotlight
                spotlight-color="primary" orientation="horizontal">
                <h1 class=" text-2xl font-bold">2,0000,0.00</h1>
            </UPageCard>
            <UPageCard title="Total Transactions" description="Account total transactions" icon="i-lucide-coins"
                spotlight spotlight-color="primary" orientation="horizontal">
                <h1 class=" text-2xl font-bold">2,0000,0.00</h1>
            </UPageCard>
            <UPageCard title="Total Expenses" description="Total Account Expenses" icon="i-lucide-circle-dollar-sign"
                spotlight spotlight-color="primary" orientation="horizontal">
                <h1 class=" text-2xl font-bold">2,0000,0.00</h1>
            </UPageCard>
            <UPageCard title="Total Expenses" description="Total Account Expenses" icon="i-lucide-circle-dollar-sign"
                spotlight spotlight-color="primary" orientation="horizontal">
                <h1 class=" text-2xl font-bold">2,0000,0.00</h1>
            </UPageCard>
        </UPageGrid>


        <div>
            <h2 class="text-xl font-bold my-5">Categories</h2>
            <UCarousel v-slot="{ item }" :items="items" :ui="{ item: 'basis-1/3 py-3 px-5 ' }">
                <UPageCard title="Total Expenses" description="Total Account Expenses"
                    icon="i-lucide-circle-dollar-sign" spotlight spotlight-color="primary" orientation="horizontal">
                    <h1 class=" text-3xl font-bold">{{ item }}</h1>
                </UPageCard>

            </UCarousel>
        </div>



        <div>
            <h2 class="text-xl font-bold my-5">Transactions</h2>
            <dashboardTable v-if="transanction.transactions" :data="transanction.transactions" />
        </div>


    </authLayout>
</template>