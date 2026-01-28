import {createApp} from 'vue'
import App from './App.vue'
import '@/assets/styles/main.css'
import {createPinia} from 'pinia'
import router from '@/router'
import {createDiscreteApi} from 'naive-ui'
import {useUserStore} from '@/stores/user.js'

const {notification} = createDiscreteApi(['notification'])
const app = createApp(App)
app.config.globalProperties.$notification = notification
window.$notification = notification
app.use(createPinia())
app.use(router)

const userStore = useUserStore()
const token = localStorage.getItem('USER_TOKEN')
const userInfoStr = localStorage.getItem('USER_INFO')
if (token && userInfoStr) {
    const userInfo = JSON.parse(userInfoStr)
    userStore.setLoginInfo(token, userInfo)
}

app.mount('#app')