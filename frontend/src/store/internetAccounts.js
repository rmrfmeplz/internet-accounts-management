import {defineStore} from 'pinia'
import {ref} from 'vue'
import {listInternetAccounts} from '@/api/modules/internet-account-api.js'


export const useInternetAccountsStore = defineStore('internetAccounts', () => {
    const internetAccounts = ref([])

    async function fetchInternetAccounts() {
        const {data} = await listInternetAccounts()
        internetAccounts.value = data
    }

    return {
        internetAccounts,
        fetchInternetAccounts
    }
})