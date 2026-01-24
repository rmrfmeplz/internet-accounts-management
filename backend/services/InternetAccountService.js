const {v4} = require('uuid')
const internetAccountDao = require('../dao/InternetAccountDao')
const platformIconMapDao = require('../dao/PlatformIconMapDao')

function createInternetAccount(platformName, account, platformIcon, remark) {
    const internetAccounts = internetAccountDao.listAllInternetAccounts()
    const isDuplicate = internetAccounts.some(internetAccount => internetAccount['platformName'] === platformName && internetAccount['account'] === account)
    if (isDuplicate) throw new Error(`Duplicate data detected: the account ${account} under platform ${platformName} already exists.`)
    const id = v4().toUpperCase()
    const createTime = Date.now()
    const updateTime = createTime
    internetAccountDao.saveInternetAccount({id, platformName, account, remark, createTime, updateTime})
    if (platformIcon) platformIconMapDao.savePlatformIconMap(platformName, platformIcon)
}

function listInternetAccounts() {
    return internetAccountDao.listAllInternetAccounts()
}

function deleteInternetAccountById(id) {
    const internetAccount = internetAccountDao.findInternetAccountById(id)
    if (!internetAccount) throw new Error(`Query failed: the record corresponding to ID ${id} does not exist.`)
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