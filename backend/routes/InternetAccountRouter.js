const internetAccountRouter = require('express').Router()
const internetAccountController = require('../controllers/InternetAccountController')
const authMiddleware = require('../middlewares/authMiddleware')

internetAccountRouter.use(authMiddleware)

internetAccountRouter.post('/', internetAccountController.createInternetAccount)
internetAccountRouter.get('/', internetAccountController.listInternetAccounts)
internetAccountRouter.delete('/:id', internetAccountController.deleteInternetAccountById)
internetAccountRouter.put('/', internetAccountController.updateInternetAccountById)

module.exports = internetAccountRouter