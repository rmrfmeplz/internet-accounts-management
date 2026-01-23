<script setup>
import {useInternetAccountsStore} from '@/store/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/store/platformIconMaps.js'
import {EditNoteFilled, DeleteSweepOutlined, CallMissedOutlined} from '@vicons/material'
import {deleteInternetAccountById} from '@/api/modules/internet-account-api.js'
import {useDialog} from 'naive-ui'

const dialog = useDialog()
const internetAccountsStore = useInternetAccountsStore()
const platformIconMapsStore = usePlatformIconMapsStore()
internetAccountsStore.fetchInternetAccounts()
platformIconMapsStore.fetchPlatformIconMaps()

function deleteInternetAccount(internetAccount) {
  dialog.warning({
    title: '警告！',
    content: `你确定要删除平台 ${internetAccount.platformName} 下的账号 ${internetAccount.account} 吗？`,
    positiveText: '确认删除',
    negativeText: '取消',
    closable: false,
    closeOnEsc: false,
    maskClosable: false,
    onPositiveClick: async () => {
      await deleteInternetAccountById(internetAccount.id)
      await internetAccountsStore.fetchInternetAccounts()
      await platformIconMapsStore.fetchPlatformIconMaps()
    }
  })
}
</script>


<template>
  <n-table :single-line="false">
    <thead>
    <tr>
      <th>平台</th>
      <th>账号</th>
      <th>备注</th>
      <th>创建时间</th>
      <th>更新时间</th>
      <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="!internetAccountsStore.internetAccounts.length">
      <td colspan="6">
        <n-empty description="暂未添加互联网账号">
          <template #icon>
            <n-icon>
              <CallMissedOutlined/>
            </n-icon>
          </template>
        </n-empty>
      </td>
    </tr>
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
      <td>{{ internetAccount.remark || "暂无备注信息" }}</td>
      <td>
        <n-time :time="internetAccount.createTime"/>
      </td>
      <td>
        <n-time :time="internetAccount.updateTime"/>
      </td>
      <td>
        <n-button quaternary circle type="primary">
          <template #icon>
            <n-icon>
              <EditNoteFilled/>
            </n-icon>
          </template>
        </n-button>
        <n-button @click="deleteInternetAccount(internetAccount)" quaternary circle type="error">
          <template #icon>
            <n-icon>
              <DeleteSweepOutlined/>
            </n-icon>
          </template>
        </n-button>
      </td>
    </tr>
    </tbody>
  </n-table>
</template>


<style scoped>
th {
  font-weight: bold;
}
</style>