const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

module.exports = (req, resp, next) => {
    const authorization = req.headers.authorization
    if (!authorization || !authorization.startsWith('Bearer ')) return resp.new(401, 'Unauthorized Access: No valid identity token detected. Please complete login authentication first', null)
    const token = authorization.split(' ')[1]
    try {
        jwt.verify(token, JWT_SECRET)
        next()
    } catch (error) {
        return resp.new(401, 'Unauthorized Access: The authentication token is invalid or has expired. Please log in again', null)
    }
}