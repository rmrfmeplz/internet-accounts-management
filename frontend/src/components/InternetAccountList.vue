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
    title: 'Warning!',
    content: `Are you sure you want to delete the account ${internetAccount.account} under the platform ${internetAccount.platformName}?`,
    positiveText: 'Confirm Deletion',
    negativeText: 'Cancel',
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
      <th>Platform</th>
      <th>Account</th>
      <th>Remarks</th>
      <th>Creation Time</th>
      <th>Update Time</th>
      <th>Operations</th>
    </tr>
    </thead>
    <tbody>
    <tr v-if="!internetAccountsStore.internetAccounts.length">
      <td colspan="6">
        <n-empty description="No internet accounts added">
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
      <td>{{ internetAccount.remark || "No remarks" }}</td>
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