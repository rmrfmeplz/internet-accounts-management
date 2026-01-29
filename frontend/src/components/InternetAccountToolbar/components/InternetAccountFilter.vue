<script setup>
import {ref} from 'vue'
import {useInternetAccountsStore} from '@/stores/internetAccounts.js'

const internetAccountsStore = useInternetAccountsStore()
const internetAccount = ref({
  platformName: '',
  account: '',
  remark: '',
  createTimeRange: 0,
  updateTimeRange: 0
})

function filterInternetAccounts() {
  internetAccountsStore.filterInternetAccounts(internetAccount.value)
}
</script>


<template>
  <div class="internet-account-filter-conditions">
    <div class="internet-account-filter-text-group">
      <n-input placeholder="按平台筛选"
               clearable
               v-model:value="internetAccount.platformName"
               @input="filterInternetAccounts"/>
      <n-input placeholder="按账号筛选"
               clearable
               v-model:value="internetAccount.account"
               @input="filterInternetAccounts"/>
      <n-input placeholder="按备注筛选"
               clearable
               v-model:value="internetAccount.remark"
               @input="filterInternetAccounts"/>
    </div>
    <div class="internet-account-filter-datetime-group">
      <n-date-picker type="datetimerange" clearable
                     v-model:value="internetAccount.createTimeRange"
                     start-placeholder="创建时间开始"
                     @update:value="filterInternetAccounts"
                     end-placeholder="创建时间结束"/>
      <n-date-picker type="datetimerange" clearable
                     v-model:value="internetAccount.updateTimeRange"
                     start-placeholder="更新时间开始"
                     @update:value="filterInternetAccounts"
                     end-placeholder="更新时间结束"/>
    </div>
  </div>
</template>


<style scoped>
.internet-account-filter-conditions {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 15px;

  .internet-account-filter-text-group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 30px;
  }

  .internet-account-filter-datetime-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
  }
}
</style>