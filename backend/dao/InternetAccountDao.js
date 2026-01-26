const fs = require('fs')
const path = require('path')

const INTERNET_ACCOUNTS_FILE_PATH = path.join(__dirname, '../data/internetAccounts.json')

function saveInternetAccount(internetAccount) {
    const internetAccounts = listAllInternetAccounts()
    internetAccounts.push(internetAccount)
    fs.writeFileSync(INTERNET_ACCOUNTS_FILE_PATH, JSON.stringify(internetAccounts, null, 2), 'utf8')
}

function listAllInternetAccounts() {
    const jsonStr = fs.readFileSync(INTERNET_ACCOUNTS_FILE_PATH, 'utf-8')
    return JSON.parse(jsonStr)
}

function deleteInternetAccountById(id) {
    let internetAccounts = listAllInternetAccounts()
    internetAccounts = internetAccounts.filter(internetAccount => internetAccount.id !== id)
    fs.writeFileSync(INTERNET_ACCOUNTS_FILE_PATH, JSON.stringify(internetAccounts, null, 2), 'utf8')
}

function findInternetAccountById(id) {
    const internetAccounts = listAllInternetAccounts()
    return internetAccounts.find(internetAccount => internetAccount.id === id)
}

function findInternetAccountsByPlatformName(platformName) {
    const internetAccounts = listAllInternetAccounts()
    return internetAccounts.filter(internetAccount => internetAccount.platformName === platformName)
}

function updateInternetAccountById(id, platformName, account, remark) {
    const internetAccounts = listAllInternetAccounts()
    const internetAccount = internetAccounts.find(internetAccount => internetAccount.id === id)
    if (internetAccount) {
        internetAccount.platformName = platformName
        internetAccount.account = account
        internetAccount.remark = remark
        internetAccount.updateTime = Date.now()
        fs.writeFileSync(INTERNET_ACCOUNTS_FILE_PATH, JSON.stringify(internetAccounts, null, 2), 'utf8')
    }
}

module.exports = {
    saveInternetAccount,
    listAllInternetAccounts,
    deleteInternetAccountById,
    findInternetAccountById,
    findInternetAccountsByPlatformName,
    updateInternetAccountById
}