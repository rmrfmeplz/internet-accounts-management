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

export default {
    platformName: validatePlatformName,
    account: validateAccount,
    platformIconSize: validatePlatformIconSize,
    platformIconType: validatePlatformIconType
}