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
    notification.error(retMsgObj('Error!', 'Please enter the platform name'))
    return
  }
  const account = String(internetAccount.value.account).trim()
  if (!account) {
    notification.error(retMsgObj('Error!', 'Please enter the corresponding account'))
    return
  }
  const platformIcon = internetAccount.value.platformIcon
  const remark = internetAccount.value.remark
  const {code, message} = await createInternetAccount({platformName, account, platformIcon, remark})
  if (code) {
    await internetAccountsStore.fetchInternetAccounts()
    await platformIconMapsStore.fetchPlatformIconMaps()
    notification.success(retMsgObj('Success!', `The account ${account} for platform ${platformName} has been saved`))
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
    notification.error(retMsgObj('Error!', `Only supports uploading images in the formats of ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()}`))
    return false
  }
  if (file.file.file.size > ALLOWED_IMAGE_SIZE) {
    notification.error(retMsgObj('Error!', `Only supports uploading images of ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB or smaller`))
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
  <n-button type="primary" @click="addInternetAccount">New Internet Account</n-button>
  <n-modal
      v-model:show="showAddInternetAccountModal"
      :close-on-esc="false"
      :mask-closable="false"
      :closable="false"
      :show-icon="false"
      preset="dialog"
  >
    <n-flex vertical>
      <n-input v-model:value="internetAccount.platformName" placeholder="Enter platform name" @blur="getPlatformIcon"/>
      <n-input v-model:value="internetAccount.account" placeholder="Enter corresponding account"/>
      <n-input v-model:value="internetAccount.remark" placeholder="Enter remarks (optional)"/>
      <n-upload list-type="image-card" :max="1" :on-before-upload="validatePlatformIconBeforeUpload"
                v-show="isUploadPlatformIconEntryVisible">
        Upload platform icon (optional)
      </n-upload>
      <n-image width="95" :src="uploadedPlatformIconSrc" v-show="!isUploadPlatformIconEntryVisible" preview-disabled/>
      <n-flex justify="end">
        <n-button @click="onCancelAddInternetAccount">Cancel</n-button>
        <n-button type="primary" @click="onConfirmAddInternetAccount">Confirm</n-button>
      </n-flex>
    </n-flex>
  </n-modal>
</template>


<style scoped>
</style>