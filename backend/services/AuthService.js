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
    if (authDao.findIsInitialPasswordSet()) throw new Error('Initial password setup failed. Each user can only complete the first-time password setup once')
    const hashedPassword = await encryptPassword(initialPassword)
    authDao.updatePassword(hashedPassword)
    authDao.updateIsInitialPasswordSet(true)
}

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN

async function login(username, password) {
    const auth = authDao.findAuth()
    if (auth['username'] !== username) throw new Error('Sorry, the username or password you entered is incorrect. Please check and re-enter them')
    if (!await bcrypt.compare(password, auth['password'])) throw new Error('Sorry, the username or password you entered is incorrect. Please check and re-enter them')
    const jwtPayload = {username: auth['username']}
    const token = jwt.sign(jwtPayload, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
    return {token, userInfo: {username: auth['username']}}
}

module.exports = {
    getIsInitialPasswordSet,
    initialPassword,
    login
}