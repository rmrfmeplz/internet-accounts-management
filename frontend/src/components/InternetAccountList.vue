<script setup>
import {ref} from 'vue'
import {listInternetAccounts} from '@/api/modules/internet-account-api.js'

const internetAccounts = ref([])
fetchInternetAccounts()

async function fetchInternetAccounts() {
  const {data} = await listInternetAccounts()
  internetAccounts.value = data
}
</script>


<template>
  <n-table :single-line="false">
    <thead>
    <tr>
      <th>所属平台</th>
      <th>账号名称</th>
      <th>创建时间</th>
      <th>最后更新时间</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="internetAccount in internetAccounts" :key="internetAccount.id">
      <td>{{ internetAccount.platform }}</td>
      <td>{{ internetAccount.account }}</td>
      <td>
        <n-time :time="internetAccount.createTime"/>
      </td>
      <td>
        <n-time :time="internetAccount.updateTime"/>
      </td>
    </tr>
    </tbody>
  </n-table>
</template>


<style scoped>
</style>