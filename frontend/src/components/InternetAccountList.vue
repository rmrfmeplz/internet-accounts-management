<script setup>
import {useInternetAccountsStore} from '@/store/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/store/platformIconMaps.js'
import {CallMissedOutlined, DeleteSweepOutlined, EditNoteFilled} from '@vicons/material'
import {deleteInternetAccountById} from '@/api/modules/internet-account-api.js'
import {useDialog} from 'naive-ui'
import {ref} from "vue";

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
  internetAccount.value.platformName = editedInternetAccount.platformName
  internetAccount.value.account = editedInternetAccount.account
  internetAccount.value.remark = editedInternetAccount.remark
  const platformIcon = getPlatformIcon(editedInternetAccount.platformName)
  if (platformIcon) editInternetAccountDefaultFileList.value.push({status: 'pending', url: platformIcon})
  showEditInternetAccountModal.value = true
}

const showEditInternetAccountModal = ref(false)
const internetAccount = ref({platformName: '', account: '', platformIcon: '', remark: ''})

function onCancelEditInternetAccount() {
  showEditInternetAccountModal.value = false
}

const editInternetAccountDefaultFileList = ref([])

function getPlatformIcon(platformName) {
  return platformIconMapsStore.platformIconMaps[platformName]
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
        <n-upload list-type="image-card" :max="1" :default-file-list="editInternetAccountDefaultFileList"/>
      </n-form-item>
    </n-form>
    <n-flex justify="end">
      <n-button @click="onCancelEditInternetAccount">Cancel</n-button>
      <n-button type="primary">Confirm</n-button>
    </n-flex>
  </n-modal>
</template>


<style scoped>
th {
  font-weight: bold;
}
</style>