import axios from 'axios'
import {useUserStore} from '@/stores/user.js'
import {createNotificationConfig} from '@/utils/notification.js'
import router from '@/router/index.js'

const request = axios.create({
    baseURL: 'http://localhost:9528/api',
    timeout: 10000
})

request.interceptors.request.use(
    config => {
        const userStore = useUserStore()
        if (userStore.token) config.headers.Authorization = 'Bearer ' + userStore.token
        return config
    }
)

request.interceptors.response.use(
    async resp => {
        const {code, message} = resp.data
        if (code === 401) {
            $notification.error(createNotificationConfig('Error!', message))
            const userStore = useUserStore()
            userStore.clearLoginInfo()
            localStorage.removeItem('USER_TOKEN')
            localStorage.removeItem('USER_INFO')
            await router.push('/login')
            return Promise.reject(new Error(message))
        }
        return resp.data
    },
    err => {
        $notification.error(createNotificationConfig('Error!', err.message))
        return Promise.reject(err)
    }
)

export default request