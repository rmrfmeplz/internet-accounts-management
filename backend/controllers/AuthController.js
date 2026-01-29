const authService = require('../services/AuthService')
const validators = require('../common/utils/validators')

function getIsInitialPasswordSet(req, resp) {
    return resp.success(authService.getIsInitialPasswordSet())
}

async function initialPassword(req, resp) {
    const {initialPassword} = req.body || {}
    const res = validators.password(initialPassword)
    if (!res.success) return resp.fail(res.errMsg)
    try {
        await authService.initialPassword(initialPassword)
        return resp.success('密码初始化成功，请登录')
    } catch (err) {
        return resp.fail(err.message)
    }
}

async function login(req, resp) {
    const {username, password} = req.body || {}
    const {success: uSuccess, errMsg: uErrMsg} = validators.username(username)
    if (!uSuccess) return resp.fail(uErrMsg)
    const {success: pSuccess, errMsg: pErrMsg} = validators.password(password)
    if (!pSuccess) return resp.fail(pErrMsg)
    try {
        return resp.success(await authService.login(username, password))
    } catch (error) {
        return resp.fail(error.message)
    }
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword,
    login
}