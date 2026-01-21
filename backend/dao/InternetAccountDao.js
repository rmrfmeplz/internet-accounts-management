const fs = require('fs')
const path = require('path')

function saveInternetAccount(internetAccount) {
    const internetAccounts = listAllInternetAccounts()
    internetAccounts.push(internetAccount)
    fs.writeFileSync(path.join(__dirname, '../data/internetAccounts.json'), JSON.stringify(internetAccounts, null, 2), 'utf8')
}

function listAllInternetAccounts() {
    const jsonStr = fs.readFileSync(path.join(__dirname, '../data/internetAccounts.json'), 'utf-8')
    return JSON.parse(jsonStr)
}

module.exports = {
    saveInternetAccount,
    listAllInternetAccounts,
}