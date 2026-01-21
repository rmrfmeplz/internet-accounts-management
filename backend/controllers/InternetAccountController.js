const internetAccountService = require('../services/InternetAccountService')

function createInternetAccount(req, resp) {
    const {platformName, account} = req.body
    if (platformName === undefined || platformName === null || account === undefined || account == null || !platformName.trim() || !account.trim()) {
        return resp.fail('参数错误，请检查输入的参数是否合法、完整。')
    }
    try {
        internetAccountService.createInternetAccount(platformName.trim(), account.trim())
        return resp.success(null)
    } catch (err) {
        return resp.fail(err.message)
    }
}

function listInternetAccounts(req, resp) {
    return resp.success(internetAccountService.listInternetAccounts())
}

module.exports = {
    createInternetAccount,
    listInternetAccounts,
}