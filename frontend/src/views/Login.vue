<script setup>
import {ref, onMounted} from 'vue'
import {getIsInitialPasswordSet, reqInitialPassword} from '@/api/modules/auth.js'
import validators from '@/utils/validators.js'
import {useNotification} from 'naive-ui'
import {createNotificationConfig} from '@/utils/notification.js'

const notification = useNotification()
const isInitialPasswordSet = ref(false)

onMounted(async () => {
  const {data} = await getIsInitialPasswordSet()
  isInitialPasswordSet.value = data
})

const username = ref('admin')
const password = ref('')
const initialPassword = ref('')
const confirmInitialPassword = ref('')

async function handleInitialPassword() {
  const res = validators.password(initialPassword.value)
  if (!res.success) {
    notification.error(createNotificationConfig('Error!', res.errMsg))
    return
  }
  if (initialPassword.value !== confirmInitialPassword.value) {
    notification.error(createNotificationConfig('Error!', 'The confirm password does not match the initial password. Please ensure both entries are identical'))
    return
  }
  const {code, data, message} = await reqInitialPassword(initialPassword.value)
  if (code) {
    notification.success(createNotificationConfig('Success!', data))
    isInitialPasswordSet.value = true
  } else {
    notification.error(createNotificationConfig('Error!', message))
  }
}
</script>


<template>
  <n-card embedded :bordered="false" class="n-card" v-if="isInitialPasswordSet">
    <n-form>
      <n-form-item label="Username">
        <n-input placeholder="Enter your username" v-model:value="username"/>
      </n-form-item>
      <n-form-item label="Password">
        <n-input placeholder="Enter your password"
                 v-model:value="password"
                 type="password"
                 :input-props="{autocomplete: 'off'}"/>
      </n-form-item>
      <n-form-item>
        <n-button type="primary">Login</n-button>
      </n-form-item>
    </n-form>
  </n-card>
  <n-card embedded :bordered="false" class="n-card" v-if="!isInitialPasswordSet">
    <n-form>
      <n-form-item label="Initial Password">
        <n-input placeholder="Create your initial password"
                 v-model:value="initialPassword"
                 type="password"
                 :input-props="{autocomplete: 'off'}"/>
      </n-form-item>
      <n-form-item label="Confirm Initial Password">
        <n-input placeholder="Re-enter your initial password"
                 v-model:value="confirmInitialPassword"
                 type="password"
                 :input-props="{autocomplete: 'off'}"/>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleInitialPassword">Confirm Initialization</n-button>
      </n-form-item>
    </n-form>
  </n-card>
</template>


<style scoped>
.n-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
}
</style>