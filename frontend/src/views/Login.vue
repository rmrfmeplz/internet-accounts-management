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
    notification.error(createNotificationConfig('错误', res.errMsg))
    return
  }
  if (initialPassword.value !== confirmInitialPassword.value) {
    notification.error(createNotificationConfig('错误', '确认密码与原密码不一致，请确保两次输入相同'))
    return
  }
  const {code, data, message} = await reqInitialPassword(initialPassword.value)
  if (code) {
    notification.success(createNotificationConfig('成功', data))
    isInitialPasswordSet.value = true
  } else {
    notification.error(createNotificationConfig('错误', message))
  }
}

async function login() {
  const uRes = validators.username(username.value)
  if (!uRes.success) {
    notification.error(createNotificationConfig('错误', uRes.errMsg))
    return
  }
  const pRes = validators.password(password.value)
  if (!pRes.success) {
    notification.error(createNotificationConfig('错误', pRes.errMsg))
    return
  }
  const {code, data, message} = await reqLogin({username: username.value, password: password.value})
  if (code) {
    const {token, userInfo} = data
    localStorage.setItem('USER_TOKEN', token)
    localStorage.setItem('USER_INFO', JSON.stringify(userInfo))
    userStore.setLoginInfo(token, userInfo)
    await router.push('/home')
    notification.success(createNotificationConfig('成功', '登录成功'))
  } else {
    notification.error(createNotificationConfig('错误', message))
  }
  username.value = ''
  password.value = ''
}
</script>


<template>
  <n-card embedded :bordered="false" class="n-card" v-if="isInitialPasswordSet">
    <n-form>
      <n-form-item label="用户名">
        <n-input placeholder="请输入用户名" v-model:value="username"/>
      </n-form-item>
      <n-form-item label="密码">
        <n-input placeholder="请输入密码"
                 v-model:value="password"
                 :class="password ? 'font-times' : ''"
                 type="password"
                 :input-props="{autocomplete: 'off'}"/>
      </n-form-item>
      <n-form-item>
        <n-button @click="login" type="primary">登录</n-button>
      </n-form-item>
    </n-form>
  </n-card>
  <n-card embedded :bordered="false" class="n-card" v-if="!isInitialPasswordSet">
    <n-form>
      <n-form-item label="初始密码">
        <n-input placeholder="设置您的初始密码"
                 v-model:value="initialPassword"
                 :class="initialPassword ? 'font-times' : ''"
                 type="password"
                 :input-props="{autocomplete: 'off'}"/>
      </n-form-item>
      <n-form-item label="确认初始密码">
        <n-input placeholder="再次输入您的初始密码"
                 v-model:value="confirmInitialPassword"
                 :class="confirmInitialPassword ? 'font-times' : ''"
                 type="password"
                 :input-props="{autocomplete: 'off'}"/>
      </n-form-item>
      <n-form-item>
        <n-button type="primary" @click="handleInitialPassword">确认初始化</n-button>
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

.font-times {
  font-family: "Times New Roman", Times, serif;
}
</style>