const fs = require('fs')
const path = require('path')

function saveInternetAccount(internetAccount) {
    const jsonStr = fs.readFileSync(path.join(__dirname, '../data/internetAccounts.json'), 'utf-8')
    const json = JSON.parse(jsonStr)
    json.push(internetAccount)
    fs.writeFileSync(path.join(__dirname, '../data/internetAccounts.json'), JSON.stringify(json, null, 2), 'utf8')
}

function deleteInternetAccountById() {
}

function updateInternetAccountById() {
}

function findInternetAccountById() {
}

function listAllInternetAccounts() {
    const jsonStr = fs.readFileSync(path.join(__dirname, '../data/internetAccounts.json'), 'utf-8')
    return JSON.parse(jsonStr)
}

function pageInternetAccounts() {
}

// noinspection JSUnusedGlobalSymbols
module.exports = {
    saveInternetAccount,
    deleteInternetAccountById,
    updateInternetAccountById,
    findInternetAccountById,
    listAllInternetAccounts,
    pageInternetAccounts
}