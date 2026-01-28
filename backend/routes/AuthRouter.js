const authRouter = require('express').Router()
const authController = require('../controllers/AuthController')

authRouter.get('/is-initial-password-set', authController.getIsInitialPasswordSet)
authRouter.post('/initial-password', authController.initialPassword)
authRouter.post('/login', authController.login)

module.exports = authRouter