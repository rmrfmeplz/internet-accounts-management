const internetAccountService = require('../services/InternetAccountService')

function createInternetAccount(req, resp) {
    const {platform, account} = req.body
    if (platform === undefined || platform === null || account === undefined || account == null || !platform.trim() || !account.trim()) {
        return resp.fail('参数错误，请检查输入的参数是否合法、完整。')
    }
    try {
        internetAccountService.createInternetAccount(platform.trim(), account.trim())
    } catch (err) {
        return resp.fail(err.message)
    }
    return resp.success(null)
}

function deleteInternetAccountById() {
}

function updateInternetAccountById() {
}

function getInternetAccountById() {
}

function listInternetAccounts(req, resp) {
    return resp.success(internetAccountService.listInternetAccounts())
}

function pageInternetAccounts() {
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    createInternetAccount,
    deleteInternetAccountById,
    updateInternetAccountById,
    getInternetAccountById,
    listInternetAccounts,
    pageInternetAccounts
}