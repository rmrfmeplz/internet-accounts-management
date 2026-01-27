const authDao = require('../dao/AuthDao')

function getIsInitialPasswordSet() {
    return authDao.findIsInitialPasswordSet()
}

function initialPassword(initialPassword) {
    if (authDao.findIsInitialPasswordSet()) {
        // TODO
        throw new Error('')
    }
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword
}