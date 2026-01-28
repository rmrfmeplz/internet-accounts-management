const authDao = require('../dao/AuthDao')

function getIsInitialPasswordSet() {
    return authDao.findIsInitialPasswordSet()
}

function initialPassword(initialPassword) {
    if (authDao.findIsInitialPasswordSet()) throw new Error('Initial password setup failed. Each user can only complete the first-time password setup once')
    authDao.updatePassword(initialPassword)
    authDao.updateIsInitialPasswordSet(true)
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword
}