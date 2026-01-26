import {ALLOWED_IMAGE_TYPES, ALLOWED_IMAGE_SIZE} from '@/constants/platformIconUploadConstants.js'

export function validatePlatformName(platformName) {
    return typeof platformName === 'string' && platformName.trim()
}

export function validateAccount(account) {
    return typeof account === 'string' && account.trim()
}

export function validatePlatformIconType(type) {
    return ALLOWED_IMAGE_TYPES.includes(type)
}

export function validatePlatformIconSize(size) {
    return size <= ALLOWED_IMAGE_SIZE
}