const internetAccountService = require('../services/InternetAccountService')
const {
    validatePlatformName,
    validateAccount,
    validatePlatformIcon,
    validateRemark,
    validateInternetAccountId,
    validatePlatformIconBase64
} = require('../common/utils/validators')

function createInternetAccount(req, resp) {
    const {platformName = '', account = '', platformIcon = '', remark = ''} = req.body || {}
    if (!validatePlatformName(platformName) || !validateAccount(account) || !validatePlatformIcon(platformIcon) || !validateRemark(remark)) {
        return resp.fail('Parameter error. Please check if the entered parameters are valid and complete.')
    }
    if (platformIcon) {
        const res = validatePlatformIconBase64(platformIcon)
        if (!res.success) return resp.fail(res.errMsg)
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

function updateInternetAccountById(req, resp) {
    const {id = '', platformName = '', account = '', platformIcon = '', remark = ''} = req.body || {}
    if (!validateInternetAccountId(id) || !validatePlatformName(platformName) || !validateAccount(account) || !validatePlatformIcon(platformIcon) || !validateRemark(remark)) {
        return resp.fail('Parameter error. Please check if the entered parameters are valid and complete.')
    }
    if (platformIcon) {
        const res = validatePlatformIconBase64(platformIcon)
        if (!res.success) return resp.fail(res.errMsg)
    }
    try {
        internetAccountService.updateInternetAccountById(id, platformName.trim(), account.trim(), platformIcon, remark)
        return resp.success(null)
    } catch (err) {
        return resp.fail(err.message)
    }
}

module.exports = {
    createInternetAccount,
    listInternetAccounts,
    deleteInternetAccountById,
    updateInternetAccountById
}