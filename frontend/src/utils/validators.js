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
        errMsg: 'Password cannot be empty or contain only whitespace'
    }
    if (password.length < 8 || password.length > 16) return {
        success: false,
        errMsg: 'Password length must be between 8 and 16 characters'
    }
    if (!/^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{}|;:,.?~]{8,16}$/.test(password)) return {
        success: false,
        errMsg: 'Password can only contain letters, numbers, and the following special characters: !@#$%^&*()_+-=[]{}|;:,.?~'
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
        errMsg: 'Password must contain at least three of the following character types: uppercase letters (A-Z), lowercase letters (a-z), numeric digits (0-9), and allowed special characters (!@#$%^&*()_+-=[]{}|;:,.?~)'
    }
    return {success: true, errMsg: ''}
}

function validateUsername(username) {
    if (typeof username !== 'string' || !username.trim()) return {
        success: false,
        errMsg: 'Username cannot be empty or contain only whitespace'
    }
    if (username.length < 5 || username.length > 15) return {
        success: false,
        errMsg: 'Username length must be between 5 and 15 characters'
    }
    if (!/^[A-Za-z0-9_]{5,16}$/.test(username)) return {
        success: false,
        errMsg: 'Username can only contain uppercase/lowercase letters, numbers (0-9), and underscore (_)'
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