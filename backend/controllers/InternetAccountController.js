const internetAccountService = require('../services/InternetAccountService')
const {
    ALLOWED_IMAGE_SUFFIXS,
    ALLOWED_IMAGE_SIZE,
    ALLOWED_IMAGE_BASE64_SIZE
} = require('../constants/platformIconUploadConstants')
const {
    validatePlatformName,
    validateAccount,
    validatePlatformIcon,
    validateRemark,
    validatePlatformIconSize,
    validatePlatformIconType,
    validatePlatformIconBase64Size,
    validateBase64
} = require('../common/utils/validators')

function createInternetAccount(req, resp) {
    const {platformName = '', account = '', platformIcon = '', remark = ''} = req.body || {}
    if (!validatePlatformName(platformName) || !validateAccount(account) || !validatePlatformIcon(platformIcon) || !validateRemark(remark)) {
        return resp.fail('Parameter error. Please check if the entered parameters are valid and complete.')
    }
    if (platformIcon) {
        const regexStr = `^data:image\\/(${ALLOWED_IMAGE_SUFFIXS.join('|')});base64,(.+)$`
        const matchResult = platformIcon.match(new RegExp(regexStr))
        if (!matchResult) return resp.fail(`Only supports uploading images in ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} formats.`)
        const base64Data = matchResult[2]
        if (!validateBase64(base64Data)) return resp.fail('Please upload a valid image file')
        if (!validatePlatformIconBase64Size(base64Data.length)) return resp.fail(`Only Base64 encoded images with ${ALLOWED_IMAGE_BASE64_SIZE} characters or fewer are supported. The current encoding length has exceeded the limit.`)
        const data = Buffer.from(base64Data, 'base64')
        if (!validatePlatformIconType(data)) return resp.fail(`Only supports uploading images in ${ALLOWED_IMAGE_SUFFIXS.join(', ').toUpperCase()} formats.`)
        if (!validatePlatformIconSize(data.length)) return resp.fail(`Only supports uploading images of ${ALLOWED_IMAGE_SIZE / 1024 / 1024} MB or smaller.`)
    }
    try {
        internetAccountService.createInternetAccount(platformName.trim(), account.trim(), platformIcon, remark)
        return resp.success(null)
    } catch (err) {
        return resp.fail(err.message)
    }
}

function listInternetAccounts(req, resp) {
    return resp.success(internetAccountService.listInternetAccounts())
}

function deleteInternetAccountById(req, resp) {
    try {
        internetAccountService.deleteInternetAccountById(req.params.id)
        return resp.success(null)
    } catch (err) {
        return resp.fail(err.message)
    }
}

module.exports = {
    createInternetAccount,
    listInternetAccounts,
    deleteInternetAccountById
}