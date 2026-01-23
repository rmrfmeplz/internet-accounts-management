<script setup>
import {ref} from 'vue'
import {useNotification} from 'naive-ui'
import {createInternetAccount} from '@/api/modules/internet-account-api.js'
import {useInternetAccountsStore} from '@/store/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/store/platformIconMaps.js'

const internetAccountsStore = useInternetAccountsStore()
const platformIconMapsStore = usePlatformIconMapsStore()
const notification = useNotification()
const showAddInternetAccountModal = ref(false)
const internetAccount = ref({platformName: '', account: '', platformIcon: '', remark: ''})

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
  const platformIcon = internetAccount.value.platformIcon
  const remark = internetAccount.value.remark
  const {code, message} = await createInternetAccount({platformName, account, platformIcon, remark})
  if (code) {
    await internetAccountsStore.fetchInternetAccounts()
    await platformIconMapsStore.fetchPlatformIconMaps()
    notification.success(retMsgObj('Success!', `平台 ${platformName} 的账号 ${account} 已保存`))
  } else {
    notification.error(retMsgObj('Error!', message))
  }
  showAddInternetAccountModal.value = false
}

function addInternetAccount() {
  internetAccount.value.platformName = ''
  internetAccount.value.account = ''
  internetAccount.value.platformIcon = ''
  internetAccount.value.remark = ''
  isUploadPlatformIconEntryVisible.value = true
  showAddInternetAccountModal.value = true
}

const ALLOWED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp']
const ALLOWED_IMAGE_SUFFIXS = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const ALLOWED_IMAGE_SIZE = 2 * 1024 * 1024

function validatePlatformIconBeforeUpload(file) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.file.type)) {
    notification.error(retMsgObj('Error!', `仅支持上传 ${ALLOWED_IMAGE_SUFFIXS.join('、').toUpperCase()} 格式的图片`))
    return false
  }
  if (file.file.file.size > ALLOWED_IMAGE_SIZE) {
    notification.error(retMsgObj('Error!', `仅支持上传 ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB 及以下的图片`))
    return false
  }
  const reader = new FileReader()
  reader.onload = e => internetAccount.value.platformIcon = e.target.result
  reader.readAsDataURL(file.file.file)
}

function getPlatformIcon() {
  const platformIcon = platformIconMapsStore.platformIconMaps[internetAccount.value.platformName]
  if (platformIcon) {
    isUploadPlatformIconEntryVisible.value = false
    internetAccount.value.platformIcon = ''
    uploadedPlatformIconSrc.value = platformIcon
  } else {
    isUploadPlatformIconEntryVisible.value = true
  }
}

const isUploadPlatformIconEntryVisible = ref(true)
const uploadedPlatformIconSrc = ref('')
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
      <n-input v-model:value="internetAccount.platformName" placeholder="请输入平台名称" @blur="getPlatformIcon"/>
      <n-input v-model:value="internetAccount.account" placeholder="请输入对应账号"/>
      <n-input v-model:value="internetAccount.remark" placeholder="请输入备注信息（可选）"/>
      <n-upload list-type="image-card" :max="1" :on-before-upload="validatePlatformIconBeforeUpload"
                v-show="isUploadPlatformIconEntryVisible">
        <n-flex justify="center">
          <span>点击上传</span>
          <span>平台图标</span>
          <span>（可选）</span>
        </n-flex>
      </n-upload>
      <n-image width="95" :src="uploadedPlatformIconSrc" v-show="!isUploadPlatformIconEntryVisible" preview-disabled/>
      <n-flex justify="end">
        <n-button @click="onCancelAddInternetAccount">取消</n-button>
        <n-button type="primary" @click="onConfirmAddInternetAccount">确认</n-button>
      </n-flex>
    </n-flex>
  </n-modal>
</template>


<style scoped>
</style>