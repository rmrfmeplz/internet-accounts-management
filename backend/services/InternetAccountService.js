const {v4} = require('uuid')
const internetAccountDao = require('../dao/InternetAccountDao')
const platformIconMapDao = require('../dao/PlatformIconMapDao')

function createInternetAccount(platformName, account, platformIcon) {
    const internetAccounts = internetAccountDao.listAllInternetAccounts()
    const isDuplicate = internetAccounts.some(internetAccount => internetAccount['platformName'] === platformName && internetAccount['account'] === account)
    if (isDuplicate) throw new Error(`检测到重复数据：平台 ${platformName} 下的账号 ${account} 已存在`)
    const id = v4().toUpperCase()
    const createTime = Date.now()
    const updateTime = createTime
    internetAccountDao.saveInternetAccount({id, platformName, account, createTime, updateTime})
    if (platformIcon) platformIconMapDao.savePlatformIconMap(platformName, platformIcon)
}

function listInternetAccounts() {
    return internetAccountDao.listAllInternetAccounts()
}

module.exports = {
    createInternetAccount,
    listInternetAccounts,
}