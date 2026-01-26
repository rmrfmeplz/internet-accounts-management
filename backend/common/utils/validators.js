const {
    ALLOWED_IMAGE_SIZE,
    ALLOWED_IMAGE_BASE64_SIZE,
    ALLOWED_IMAGE_SUFFIXS
} = require('../../constants/platformIconUploadConstants')

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
    return size <= ALLOWED_IMAGE_SIZE
}

function validatePlatformIconBase64Size(size) {
    return size <= ALLOWED_IMAGE_BASE64_SIZE
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
    const regexStr = `^data:image\\/(${ALLOWED_IMAGE_SUFFIXS.join('|')});base64,(.+)$`
    const matchResult = platformIcon.match(new RegExp(regexStr))
    if (!matchResult) return {
        success: false,
        errMsg: `Only supports uploading images in ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} formats.`
    }
    const base64Data = matchResult[2]
    if (!validateBase64(base64Data)) return {success: false, errMsg: 'Please upload a valid image file'}
    if (!validatePlatformIconBase64Size(base64Data.length)) return {
        success: false,
        errMsg: `Only Base64 encoded images with ${ALLOWED_IMAGE_BASE64_SIZE} characters or fewer are supported. The current encoding length has exceeded the limit.`
    }
    const data = Buffer.from(base64Data, 'base64')
    if (!validatePlatformIconType(data)) return {
        success: false,
        errMsg: `Only supports uploading images in ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} formats.`
    }
    if (!validatePlatformIconSize(data.length)) return {
        success: false,
        errMsg: `Only supports uploading images of ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB or smaller.`
    }
    return {success: true, errMsg: ''}
}

module.exports = {
    validatePlatformName,
    validateAccount,
    validateRemark,
    validatePlatformIcon,
    validateInternetAccountId,
    validatePlatformIconBase64
}