const authDao = require('../dao/AuthDao')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function getIsInitialPasswordSet() {
    return authDao.findIsInitialPasswordSet()
}

async function encryptPassword(plainPassword) {
    const saltRounds = 10
    return await bcrypt.hash(plainPassword, saltRounds)
}

async function initialPassword(initialPassword) {
    if (authDao.findIsInitialPasswordSet()) throw new Error('初始密码设置失败，仅可完成一次首次密码设置')
    const hashedPassword = await encryptPassword(initialPassword)
    authDao.updatePassword(hashedPassword)
    authDao.updateIsInitialPasswordSet(true)
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h'

async function login(username, password) {
    const auth = authDao.findAuth()
    if (auth['username'] !== username) throw new Error('用户名或密码错误，请检查后重新输入')
    if (!await bcrypt.compare(password, auth['password'])) throw new Error('用户名或密码错误，请检查后重新输入')
    const jwtPayload = {username: auth['username']}
    const token = jwt.sign(jwtPayload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
    return {token, userInfo: {username: auth['username']}}
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword,
    login
}