const {ALLOWED_IMAGE_SIZE, ALLOWED_IMAGE_BASE64_SIZE} = require('../../constants/platformIconUploadConstants')

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
    return /^[A-Za-z0-9+/=]+$/.test(base64)
}

module.exports = {
    validatePlatformName,
    validateAccount,
    validatePlatformIconType,
    validatePlatformIconSize,
    validateRemark,
    validatePlatformIcon,
    validatePlatformIconBase64Size,
    validateBase64
}