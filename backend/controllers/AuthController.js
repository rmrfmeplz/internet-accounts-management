const authService = require('../services/AuthService')
const validators = require('../common/utils/validators')

function getIsInitialPasswordSet(req, resp) {
    return resp.success(authService.getIsInitialPasswordSet())
}

function initialPassword(req, resp) {
    const {initialPassword} = req.body
    const res = validators.password(initialPassword)
    if (!res.success) return resp.fail(res.errMsg)
    authService.initialPassword(initialPassword)
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword
}