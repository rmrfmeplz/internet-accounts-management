<script setup>
import {ref} from 'vue'
import {useInternetAccountsStore} from '@/store/internetAccounts.js'

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
      <n-input placeholder="Filter by Platform"
               clearable
               v-model:value="internetAccount.platformName"
               @input="filterInternetAccounts"/>
      <n-input placeholder="Filter by Account"
               clearable
               v-model:value="internetAccount.account"
               @input="filterInternetAccounts"/>
      <n-input placeholder="Filter by Remarks"
               clearable
               v-model:value="internetAccount.remark"
               @input="filterInternetAccounts"/>
    </div>
    <div class="internet-account-filter-datetime-group">
      <n-date-picker type="datetimerange" clearable
                     v-model:value="internetAccount.createTimeRange"
                     start-placeholder="Start Creation Time"
                     @update:value="filterInternetAccounts"
                     end-placeholder="End Creation Time"/>
      <n-date-picker type="datetimerange" clearable
                     v-model:value="internetAccount.updateTimeRange"
                     start-placeholder="Start Update Time"
                     @update:value="filterInternetAccounts"
                     end-placeholder="End Update Time"/>
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
    grid-column-gap: 15px;
  }

  .internet-account-filter-datetime-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 15px;
  }
}
</style>