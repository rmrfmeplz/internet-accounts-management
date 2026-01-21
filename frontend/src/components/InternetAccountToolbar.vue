<script setup>
import {ref} from 'vue'
import {useNotification} from 'naive-ui'
import {createInternetAccount} from '@/api/modules/internet-account-api.js'
import {useInternetAccountsStore} from '@/store/internetAccounts.js'

const internetAccountsStore = useInternetAccountsStore()
const notification = useNotification()
const showAddInternetAccountModal = ref(false)
const internetAccount = ref({platformName: '', account: ''})

function retMsgObj(title, content) {
  return {title, content, duration: 10000, keepAliveOnHover: true}
}

function onCancelAddInternetAccount() {
  showAddInternetAccountModal.value = false
}

async function onConfirmAddInternetAccount() {
  const platformName = String(internetAccount.value.platformName).trim()
  if (!platformName) {
    notification.error(retMsgObj('Error!', '请输入平台名称'))
    return
  }
  const account = String(internetAccount.value.account).trim()
  if (!account) {
    notification.error(retMsgObj('Error!', '请输入对应账号'))
    return
  }
  const {code, message} = await createInternetAccount({platformName, account})
  if (code) {
    await internetAccountsStore.fetchInternetAccounts()
    notification.success(retMsgObj('Success!', `平台 ${platformName} 的账号 ${account} 已保存`))
  } else {
    notification.error(retMsgObj('Error!', message))
  }
  showAddInternetAccountModal.value = false
}

function addInternetAccount() {
  internetAccount.value.platformName = ''
  internetAccount.value.account = ''
  showAddInternetAccountModal.value = true
}
</script>


<template>
  <n-button type="primary" @click="addInternetAccount">新增互联网账号</n-button>
  <n-modal
      v-model:show="showAddInternetAccountModal"
      :close-on-esc="false"
      :mask-closable="false"
      :closable="false"
      :show-icon="false"
      preset="dialog"
  >
    <n-flex vertical>
      <n-input v-model:value="internetAccount.platformName" placeholder="请输入平台名称"/>
      <n-input v-model:value="internetAccount.account" placeholder="请输入对应账号"/>
      <n-flex justify="end">
        <n-button @click="onCancelAddInternetAccount">取消</n-button>
        <n-button type="primary" @click="onConfirmAddInternetAccount">确认</n-button>
      </n-flex>
    </n-flex>
  </n-modal>
</template>


<style scoped>
</style>