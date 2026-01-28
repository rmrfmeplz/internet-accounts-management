import {defineStore} from 'pinia'
import {ref} from 'vue'
import {listInternetAccounts} from '@/api/modules/internet-account-api.js'


export const useInternetAccountsStore = defineStore('internetAccounts', () => {
    const internetAccounts = ref([])
    let internetAccountsBak = []

    async function fetchInternetAccounts() {
        const {data} = await listInternetAccounts()
        internetAccounts.value = data
        internetAccountsBak = data
    }

    function filterInternetAccounts(filters) {
        internetAccounts.value = internetAccountsBak
        if (filters.platformName.trim()) internetAccounts.value = internetAccounts.value.filter(internetAccount => internetAccount['platformName'].includes(filters.platformName))
        if (filters.account.trim()) internetAccounts.value = internetAccounts.value.filter(internetAccount => internetAccount['account'].includes(filters.account))
        if (filters.remark.trim()) internetAccounts.value = internetAccounts.value.filter(internetAccount => internetAccount['remark'].includes(filters.remark))
        if (Array.isArray(filters.createTimeRange) && filters.createTimeRange.length === 2) internetAccounts.value = internetAccounts.value.filter(internetAccount => internetAccount['createTime'] >= filters.createTimeRange[0] && internetAccount['createTime'] <= filters.createTimeRange[1])
        if (Array.isArray(filters.updateTimeRange) && filters.updateTimeRange.length === 2) internetAccounts.value = internetAccounts.value.filter(internetAccount => internetAccount['updateTime'] >= filters.updateTimeRange[0] && internetAccount['updateTime'] <= filters.updateTimeRange[1])
    }

    return {
        internetAccounts,
        fetchInternetAccounts,
        filterInternetAccounts
    }
})