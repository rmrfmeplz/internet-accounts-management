<script setup>
import {ref, onMounted} from 'vue'
import {getIsInitialPasswordSet, reqInitialPassword, reqLogin} from '@/api/modules/auth.js'
import validators from '@/utils/validators.js'
import {useNotification} from 'naive-ui'
import {createNotificationConfig} from '@/utils/notification.js'
import {useUserStore} from '@/stores/user.js'
import {useRouter} from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
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

async function login() {
  const uRes = validators.username(username.value)
  if (!uRes.success) {
    notification.error(createNotificationConfig('Error!', uRes.errMsg))
    return
  }
  const pRes = validators.password(password.value)
  if (!pRes.success) {
    notification.error(createNotificationConfig('Error!', pRes.errMsg))
    return
  }
  const {code, data, message} = await reqLogin({username: username.value, password: password.value})
  if (code) {
    const {token, userInfo} = data
    localStorage.setItem('USER_TOKEN', token)
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo))
    userStore.setLoginInfo(token, userInfo)
    await router.push('/home')
    notification.success(createNotificationConfig('Success!', 'Login Successful!'))
  } else {
    notification.error(createNotificationConfig('Error!', message))
  }
  username.value = ''
  password.value = ''
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
        <n-button @click="login" type="primary">Login</n-button>
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