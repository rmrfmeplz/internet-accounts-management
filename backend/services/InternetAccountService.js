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

function deleteInternetAccountById(id) {
    const internetAccount = internetAccountDao.findInternetAccountById(id)
    if (!internetAccount) throw new Error(`查询失败：ID ${id} 对应的记录不存在`)
    internetAccountDao.deleteInternetAccountById(id)
    // 判断平台下是否还有其他账号
    const internetAccounts = internetAccountDao.findInternetAccountsByPlatformName(internetAccount.platformName)
    // 若平台下无其他账号，清理关联的平台图标映射（避免冗余数据堆积）
    if (internetAccounts.length === 0) platformIconMapDao.deletePlatformIconMapByPlatformName(internetAccount.platformName)
}

module.exports = {
    createInternetAccount,
    listInternetAccounts,
    deleteInternetAccountById
}