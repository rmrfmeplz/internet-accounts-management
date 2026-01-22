<script setup>
import {useInternetAccountsStore} from '@/store/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/store/platformIconMaps.js'

const internetAccountsStore = useInternetAccountsStore()
const platformIconMapsStore = usePlatformIconMapsStore()
internetAccountsStore.fetchInternetAccounts()
platformIconMapsStore.fetchPlatformIconMaps()
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
    <tr v-for="internetAccount in internetAccountsStore.internetAccounts" :key="internetAccount.id">
      <td>
        <n-flex align="center">
          <n-avatar v-if="internetAccount.platformName in platformIconMapsStore.platformIconMaps"
                    :src="platformIconMapsStore.platformIconMaps[internetAccount.platformName]"
                    size="small"
                    round
          />
          <span>{{ internetAccount.platformName }}</span>
        </n-flex>
      </td>
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