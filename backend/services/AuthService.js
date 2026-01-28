const authDao = require('../dao/AuthDao')
const bcrypt = require('bcryptjs')

function getIsInitialPasswordSet() {
    return authDao.findIsInitialPasswordSet()
}

async function encryptPassword(plainPassword) {
    const saltRounds = 10
    return await bcrypt.hash(plainPassword, saltRounds)
}

async function initialPassword(initialPassword) {
    if (authDao.findIsInitialPasswordSet()) throw new Error('Initial password setup failed. Each user can only complete the first-time password setup once')
    const hashedPassword = await encryptPassword(initialPassword)
    authDao.updatePassword(hashedPassword)
    authDao.updateIsInitialPasswordSet(true)
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword
}