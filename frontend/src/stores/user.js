import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    const token = ref('')
    const userInfo = ref({})
    const isLogin = ref(false)

    const setLoginInfo = (newToken, newUserInfo) => {
        token.value = newToken
        userInfo.value = newUserInfo
        isLogin.value = true
        localStorage.setItem('USER_TOKEN', newToken)
        localStorage.setItem('USER_INFO', JSON.stringify(newUserInfo))
    }

    const clearLoginInfo = () => {
        token.value = ''
        userInfo.value = {}
        isLogin.value = false
        localStorage.removeItem('USER_TOKEN')
        localStorage.removeItem('USER_INFO')
    }

    return {
        token,
        userInfo,
        isLogin,
        setLoginInfo,
        clearLoginInfo
    }
})