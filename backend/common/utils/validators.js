// noinspection DuplicatedCode

const platformIconUploadConstants = require('../../constants/platformIconUploadConstants')

function validatePlatformName(platformName) {
    return typeof platformName === 'string' && platformName.trim()
}

function validateAccount(account) {
    return typeof account === 'string' && account.trim()
}

function validatePlatformIconType(data) {
    const isJPG = data.length >= 3 && data[0] === 0xFF && data[1] === 0xD8 && data[2] === 0xFF
    const isPNG = data.length >= 8 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4E && data[3] === 0x47 && data[4] === 0x0D && data[5] === 0x0A && data[6] === 0x1A && data[7] === 0x0A
    const isGIF = data.length >= 6 && data[0] === 0x47 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x38 && (data[4] === 0x37 || data[4] === 0x39) && data[5] === 0x61
    const isWebP = data.length >= 12 && data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46 && data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50
    return isJPG || isPNG || isGIF || isWebP
}

function validatePlatformIconSize(size) {
    return size <= platformIconUploadConstants.ALLOWED_IMAGE_SIZE
}

function validatePlatformIconBase64Size(size) {
    return size <= platformIconUploadConstants.ALLOWED_IMAGE_BASE64_SIZE
}

function validateRemark(remark) {
    return typeof remark === 'string'
}

function validatePlatformIcon(platformIcon) {
    return typeof platformIcon === 'string'
}

function validateBase64(base64) {
    return typeof base64 === 'string' && /^[A-Za-z0-9+/=]+$/.test(base64)
}

function validateInternetAccountId(id) {
    const uuidV4HyphenatedRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return typeof id === 'string' && uuidV4HyphenatedRegex.test(id)
}

function validatePlatformIconBase64(platformIcon) {
    const regexStr = `^data:image\\/(${platformIconUploadConstants.ALLOWED_IMAGE_SUFFIXS.join('|')});base64,(.+)$`
    const matchResult = platformIcon.match(new RegExp(regexStr))
    if (!matchResult) return {
        success: false,
        errMsg: `Only supports uploading images in ${platformIconUploadConstants.ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} formats.`
    }
    const base64Data = matchResult[2]
    if (!validateBase64(base64Data)) return {success: false, errMsg: 'Please upload a valid image file'}
    if (!validatePlatformIconBase64Size(base64Data.length)) return {
        success: false,
        errMsg: `Only Base64 encoded images with ${platformIconUploadConstants.ALLOWED_IMAGE_BASE64_SIZE} characters or fewer are supported. The current encoding length has exceeded the limit.`
    }
    const data = Buffer.from(base64Data, 'base64')
    if (!validatePlatformIconType(data)) return {
        success: false,
        errMsg: `Only supports uploading images in ${platformIconUploadConstants.ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} formats.`
    }
    if (!validatePlatformIconSize(data.length)) return {
        success: false,
        errMsg: `Only supports uploading images of ${platformIconUploadConstants.ALLOWED_IMAGE_SIZE / 1024 / 1024} MB or smaller.`
    }
    return {success: true, errMsg: ''}
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

module.exports = {
    platformName: validatePlatformName,
    account: validateAccount,
    remark: validateRemark,
    platformIcon: validatePlatformIcon,
    internetAccountId: validateInternetAccountId,
    platformIconBase64: validatePlatformIconBase64,
    password: validatePassword,
    username: validateUsername
}