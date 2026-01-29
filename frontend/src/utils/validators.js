// noinspection DuplicatedCode

import {ALLOWED_IMAGE_TYPES, ALLOWED_IMAGE_SIZE} from '@/constants/platformIconUploadConstants.js'

function validatePlatformName(platformName) {
    return typeof platformName === 'string' && platformName.trim()
}

function validateAccount(account) {
    return typeof account === 'string' && account.trim()
}

function validatePlatformIconType(type) {
    return ALLOWED_IMAGE_TYPES.includes(type)
}

function validatePlatformIconSize(size) {
    return size <= ALLOWED_IMAGE_SIZE
}

function validatePassword(password) {
    if (typeof password !== 'string' || !password.trim()) return {
        success: false,
        errMsg: '密码不能为空且不能仅包含空白字符'
    }
    if (password.length < 8 || password.length > 16) return {
        success: false,
        errMsg: '密码长度必须在8-16个字符之间'
    }
    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.?~]{8,16}$/.test(password)) return {
        success: false,
        errMsg: '密码仅支持字母、数字和以下特殊字符：!@#$%^&*()_+-=[]{}|;:,.?~'
    }
    const regexList = [
        /[A-Z]/,
        /[a-z]/,
        /[0-9]/,
        /[!@#$%^&*()_+\-=\[\]{}|;:,.?~]/
    ]
    const matchCount = regexList.reduce((count, regex) => {
        return regex.test(password) ? count + 1 : count
    }, 0)
    if (matchCount < 3) return {
        success: false,
        errMsg: '密码必须至少包含大写字母、小写字母、数字、允许的特殊字符中的三种'
    }
    return {success: true, errMsg: ''}
}

function validateUsername(username) {
    if (typeof username !== 'string' || !username.trim()) return {
        success: false,
        errMsg: '用户名不能为空且不能仅包含空白字符'
    }
    if (username.length < 5 || username.length > 15) return {
        success: false,
        errMsg: '用户名长度必须在5-15个字符之间'
    }
    if (!/^[A-Za-z0-9_]{5,15}$/.test(username)) return {
        success: false,
        errMsg: '用户名仅支持大小写字母、数字和下划线(_)'
    }
    return {success: true, errMsg: ''}
}

export default {
    platformName: validatePlatformName,
    account: validateAccount,
    platformIconSize: validatePlatformIconSize,
    platformIconType: validatePlatformIconType,
    password: validatePassword,
    username: validateUsername
}