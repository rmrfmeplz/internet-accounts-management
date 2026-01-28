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
    }

    const clearLoginInfo = () => {
        token.value = ''
        userInfo.value = {}
        isLogin.value = false
    }

    return {
        token,
        userInfo,
        isLogin,
        setLoginInfo,
        clearLoginInfo
    }
})