<script setup>
import {useInternetAccountsStore} from '@/stores/internetAccounts.js'
import {usePlatformIconMapsStore} from '@/stores/platformIconMaps.js'
import {CallMissedOutlined, DeleteSweepOutlined, EditNoteFilled} from '@vicons/material'
import {updateInternetAccountByOd, deleteInternetAccountById} from '@/api/modules/internet-account-api.js'
import {useDialog} from 'naive-ui'
import {ref} from 'vue'
import {useNotification} from 'naive-ui'
import {ALLOWED_IMAGE_SIZE, ALLOWED_IMAGE_SUFFIXS} from '@/constants/platformIconUploadConstants.js'
import validators from '@/utils/validators.js'
import {createNotificationConfig} from '@/utils/notification.js'

const notification = useNotification()
const dialog = useDialog()
const internetAccountsStore = useInternetAccountsStore()
const platformIconMapsStore = usePlatformIconMapsStore()
internetAccountsStore.fetchInternetAccounts()
platformIconMapsStore.fetchPlatformIconMaps()

function deleteInternetAccount(internetAccount) {
  dialog.warning({
    title: '警告',
    content: `确定要删除平台 ${internetAccount.platformName} 下的账号 ${internetAccount.account} 吗？`,
    positiveText: '确认删除',
    negativeText: '取消',
    closable: false,
    closeOnEsc: false,
    maskClosable: false,
    onPositiveClick: async () => {
      try {
        await deleteInternetAccountById(internetAccount.id)
        await internetAccountsStore.fetchInternetAccounts()
        await platformIconMapsStore.fetchPlatformIconMaps()
      } catch (err) {
      }
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

async function onConfirmEditInternetAccount() {
  if (!validators.platformName(internetAccount.value.platformName)) {
    notification.error(createNotificationConfig('错误', '请输入平台名称'))
    return
  }
  if (!validators.account(internetAccount.value.account)) {
    notification.error(createNotificationConfig('错误', '请输入对应账号'))
    return
  }
  const {code, message} = await updateInternetAccountByOd(internetAccount.value)
  if (code) {
    await internetAccountsStore.fetchInternetAccounts()
    await platformIconMapsStore.fetchPlatformIconMaps()
    notification.success(createNotificationConfig('成功', '更新成功'))
  } else {
    notification.error(createNotificationConfig('错误', message))
  }
  showEditInternetAccountModal.value = false
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
        <n-empty description="暂无已添加的互联网账号">
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
                    style="background-color: transparent"
          />
          <span>{{ internetAccount.platformName }}</span>
        </n-flex>
      </td>
      <td>{{ internetAccount.account }}</td>
      <td>{{ internetAccount.remark || "无备注" }}</td>
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
      <n-form-item label="平台名称">
        <n-input v-model:value="internetAccount.platformName" placeholder=""/>
      </n-form-item>
      <n-form-item label="对应账号">
        <n-input v-model:value="internetAccount.account" placeholder=""/>
      </n-form-item>
      <n-form-item label="备注">
        <n-input v-model:value="internetAccount.remark" placeholder=""/>
      </n-form-item>
      <n-form-item label="平台图标">
        <n-upload list-type="image-card" :max="1" :default-file-list="editInternetAccountDefaultFileList"
                  :on-before-upload="validatePlatformIconBeforeUpload"/>
      </n-form-item>
    </n-form>
    <n-flex justify="end">
      <n-button @click="onCancelEditInternetAccount">取消</n-button>
      <n-button @click="onConfirmEditInternetAccount" type="primary">确认</n-button>
    </n-flex>
  </n-modal>
</template>


<style scoped>
th {
  font-weight: bold;
}
</style>