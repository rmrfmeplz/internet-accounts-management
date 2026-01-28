<script setup>
import {useUserStore} from '@/stores/user.js'
import {createNotificationConfig} from '@/utils/notification.js'
import {useRouter} from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const username = userStore.userInfo['username']

function logout() {
  userStore.clearLoginInfo()
  localStorage.removeItem('USER_TOKEN')
  localStorage.removeItem('USER_INFO')
  $notification.success(createNotificationConfig('Success!', 'Logout Successful!'))
  router.push('/login')
}
</script>


<template>
  <header>
    <span>Welcome {{ username }}</span>
    <n-button @click="logout" quaternary type="warning">Logout</n-button>
  </header>
</template>


<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  margin-bottom: 3vh;

  & > span {
    margin-right: 15px;
  }
}
</style>