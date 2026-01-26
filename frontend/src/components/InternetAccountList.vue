<script setup>
import {useInternetAccountsStore} from '@/store/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/store/platformIconMaps.js'
import {CallMissedOutlined, DeleteSweepOutlined, EditNoteFilled} from '@vicons/material'
import {reqEditInternetAccount, deleteInternetAccountById} from '@/api/modules/internet-account-api.js'
import {useDialog} from 'naive-ui'
import {ref} from "vue"
import {
  validateAccount,
  validatePlatformName,
  validatePlatformIconSize,
  validatePlatformIconType
} from "@/utils/validators.js"
import {useNotification} from 'naive-ui'
import {ALLOWED_IMAGE_SIZE, ALLOWED_IMAGE_SUFFIXS} from '@/constants/platformIconUploadConstants.js'

const notification = useNotification()
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

function editInternetAccount(editedInternetAccount) {
  editInternetAccountDefaultFileList.value = []
  internetAccount.value.id = editedInternetAccount.id
  internetAccount.value.platformName = editedInternetAccount.platformName
  internetAccount.value.account = editedInternetAccount.account
  internetAccount.value.remark = editedInternetAccount.remark
  const platformIcon = getPlatformIcon(editedInternetAccount.platformName)
  if (platformIcon) editInternetAccountDefaultFileList.value.push({status: 'pending', url: platformIcon})
  showEditInternetAccountModal.value = true
}

const showEditInternetAccountModal = ref(false)
const internetAccount = ref({id: '', platformName: '', account: '', platformIcon: '', remark: ''})

function onCancelEditInternetAccount() {
  showEditInternetAccountModal.value = false
}

const editInternetAccountDefaultFileList = ref([])

function getPlatformIcon(platformName) {
  return platformIconMapsStore.platformIconMaps[platformName]
}

function retMsgObj(title, content) {
  return {title, content, duration: 10000, keepAliveOnHover: true}
}

async function onConfirmEditInternetAccount() {
  if (!validatePlatformName(internetAccount.value.platformName)) {
    notification.error(retMsgObj('Error!', 'Please enter the platform name'))
    return
  }
  if (!validateAccount(internetAccount.value.account)) {
    notification.error(retMsgObj('Error!', 'Please enter the corresponding account'))
    return
  }
  const {code, message} = await reqEditInternetAccount(internetAccount.value)
  if (code) {
    await internetAccountsStore.fetchInternetAccounts()
    await platformIconMapsStore.fetchPlatformIconMaps()
    notification.success(retMsgObj('Success!', 'Successfully updated'))
  } else {
    notification.error(retMsgObj('Error!', message))
  }
  showEditInternetAccountModal.value = false
}

function validatePlatformIconBeforeUpload(file) {
  if (!validatePlatformIconType(file.file.type)) {
    notification.error(retMsgObj('Error!', `Only supports uploading images in the formats of ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()}`))
    return false
  }
  if (!validatePlatformIconSize(file.file.file.size)) {
    notification.error(retMsgObj('Error!', `Only supports uploading images of ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB or smaller`))
    return false
  }
  const reader = new FileReader()
  reader.onload = e => internetAccount.value.platformIcon = e.target.result
  reader.readAsDataURL(file.file.file)
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
        <n-button @click="editInternetAccount(internetAccount)" quaternary circle type="primary">
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
  <n-modal
      v-model:show="showEditInternetAccountModal"
      :close-on-esc="false"
      :mask-closable="false"
      :closable="false"
      :show-icon="false"
      preset="dialog"
  >
    <n-form>
      <n-form-item label="Edit Platform Name">
        <n-input v-model:value="internetAccount.platformName" placeholder=""/>
      </n-form-item>
      <n-form-item label="Edit Corresponding Account">
        <n-input v-model:value="internetAccount.account" placeholder=""/>
      </n-form-item>
      <n-form-item label="Edit Remarks">
        <n-input v-model:value="internetAccount.remark" placeholder=""/>
      </n-form-item>
      <n-form-item label="Edit Platform Icon">
        <n-upload list-type="image-card" :max="1" :default-file-list="editInternetAccountDefaultFileList"
                  :on-before-upload="validatePlatformIconBeforeUpload"/>
      </n-form-item>
    </n-form>
    <n-flex justify="end">
      <n-button @click="onCancelEditInternetAccount">Cancel</n-button>
      <n-button @click="onConfirmEditInternetAccount" type="primary">Confirm</n-button>
    </n-flex>
  </n-modal>
</template>


<style scoped>
th {
  font-weight: bold;
}
</style>