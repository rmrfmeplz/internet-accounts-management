<script setup>
import {ref} from 'vue'
import {useNotification} from 'naive-ui'
import {createInternetAccount} from '@/api/modules/internet-account-api.js'
import {useInternetAccountsStore} from '@/stores/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/stores/platformIconMaps.js'
import {ALLOWED_IMAGE_SUFFIXS, ALLOWED_IMAGE_SIZE} from '@/constants/platformIconUploadConstants.js'
import validators from '@/utils/validators.js'
import {createNotificationConfig} from '@/utils/notification.js'
import InternetAccountFilter from './components/InternetAccountFilter.vue'
import AppHeader from './components/AppHeader.vue'

const internetAccountsStore = useInternetAccountsStore()
const platformIconMapsStore = usePlatformIconMapsStore()
const notification = useNotification()
const showAddInternetAccountModal = ref(false)
const internetAccount = ref({platformName: '', account: '', platformIcon: '', remark: ''})

function onCancelAddInternetAccount() {
  showAddInternetAccountModal.value = false
}

async function onConfirmAddInternetAccount() {
  if (!validators.platformName(internetAccount.value.platformName)) {
    notification.error(createNotificationConfig('错误', '请输入平台名称'))
    return
  }
  if (!validators.account(internetAccount.value.account)) {
    notification.error(createNotificationConfig('错误', '请输入对应账号'))
    return
  }
  const {code, message} = await createInternetAccount(internetAccount.value)
  if (code) {
    await internetAccountsStore.fetchInternetAccounts()
    await platformIconMapsStore.fetchPlatformIconMaps()
    notification.success(createNotificationConfig('成功', `平台 ${internetAccount.value.platformName} 下的账号 ${internetAccount.value.account} 已保存`))
  } else {
    notification.error(createNotificationConfig('错误', message))
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

function validatePlatformIconBeforeUpload(file) {
  if (!validators.platformIconType(file.file.type)) {
    notification.error(createNotificationConfig('错误', `仅支持上传 ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} 格式的图片`))
    return false
  }
  if (!validators.platformIconSize(file.file.file.size)) {
    notification.error(createNotificationConfig('错误', `仅支持上传 ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB 及以下的图片`))
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
  <AppHeader/>
  <div class="internet-account-actions">
    <n-button type="primary" @click="addInternetAccount" class="internet-account-add-btn">
      新增互联网账号
    </n-button>
    <InternetAccountFilter/>
  </div>
  <n-divider/>
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
      <n-input v-model:value="internetAccount.remark" placeholder="填写备注（选填）"/>
      <n-upload list-type="image-card" :max="1" :on-before-upload="validatePlatformIconBeforeUpload"
                v-show="isUploadPlatformIconEntryVisible">
        上传平台图标（选填）
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
.internet-account-actions {
  display: flex;
  width: 100%;

  .internet-account-add-btn {
    margin-right: 30px;
  }
}
</style>