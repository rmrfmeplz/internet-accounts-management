const fs = require('fs')
const path = require('path')

const AUTH_FILE_PATH = path.join(__dirname, '../data/auth.json')

function findIsInitialPasswordSet() {
    const jsonStr = fs.readFileSync(AUTH_FILE_PATH, 'utf-8')
    return JSON.parse(jsonStr)['isInitialPasswordSet']
}

module.exports = {
    findIsInitialPasswordSet
}