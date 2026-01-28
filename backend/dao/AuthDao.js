const fs = require('fs')
const path = require('path')

const AUTH_FILE_PATH = path.join(__dirname, '../data/auth.json')

function findAuth() {
    const jsonStr = fs.readFileSync(AUTH_FILE_PATH, 'utf-8')
    return JSON.parse(jsonStr)
}

function findIsInitialPasswordSet() {
    return findAuth()['isInitialPasswordSet']
}

function updatePassword(password) {
    const auth = findAuth()
    auth['password'] = password
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(auth, null, 2), 'utf8')
}

function updateIsInitialPasswordSet(isInitialPasswordSet) {
    const auth = findAuth()
    auth['isInitialPasswordSet'] = isInitialPasswordSet
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(auth, null, 2), 'utf8')
}

module.exports = {
    findAuth,
    findIsInitialPasswordSet,
    updatePassword,
    updateIsInitialPasswordSet
}