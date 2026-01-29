const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, resp, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer ')) return resp.new(401, '未授权访问：未检测到有效身份令牌，请先完成登录验证', null)
    const token = authorization.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        next()
    } catch (error) {
        return resp.new(401, '未授权访问：身份令牌无效或已过期，请重新登录', null)
    }
}