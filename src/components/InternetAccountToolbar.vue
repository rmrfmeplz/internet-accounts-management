<script setup>
import {ref} from 'vue'
import {useNotification} from 'naive-ui'

const notification = useNotification()
const showAddInternetAccountModal = ref(false)
const internetAccount = ref({platform: '', account: ''})

function onCancelAddInternetAccount() {
  showAddInternetAccountModal.value = false
}

function onConfirmAddInternetAccount() {
  if (!internetAccount.value.platform) {
    notification.error({
      content: "说点啥呢",
      meta: "想不出来",
      duration: 2500,
      keepAliveOnHover: true
    })
    return
  }
  showAddInternetAccountModal.value = false
}

function addInternetAccount() {
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
      <n-input v-model:value="internetAccount.platform" placeholder="请输入平台名称"/>
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