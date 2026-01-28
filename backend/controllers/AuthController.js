const authService = require('../services/AuthService')
const validators = require('../common/utils/validators')

function getIsInitialPasswordSet(req, resp) {
    return resp.success(authService.getIsInitialPasswordSet())
}

function initialPassword(req, resp) {
    const {initialPassword} = req.body || {}
    const res = validators.password(initialPassword)
    if (!res.success) return resp.fail(res.errMsg)
    try {
        authService.initialPassword(initialPassword)
        return resp.success('Password initialization successful. Please log in')
    } catch (err) {
        return resp.fail(err.message)
    }
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword
}