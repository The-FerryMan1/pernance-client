import { useAxios } from "@/axios/axios";
import { defineStore } from "pinia";
import { ref } from "vue";


interface Transaction {
    id: number,
    userID: string,
    amount: number,
    categoryID: number,
    date: string,
    description: string,
    financialID: number,
    isDeleted: boolean
    originalCurrency: string | null
    receiptURL: string | null
    status: string
}

export const useTransactioStore = defineStore('transaction', () => {
    const transactions = ref<Transaction[]>([])


    async function readTransactions(): Promise<void> {
        try {
            const { data, status } = await useAxios.get('/transactions')
            console.log(data, status)
            transactions.value = data
        } catch (error) {
            console.log(error)
        }
    }

    return {
        transactions,
        readTransactions
    }
})