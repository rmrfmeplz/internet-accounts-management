const internetAccountRouter = require('express').Router()
const InternetAccountController = require('../controllers/InternetAccountController')

internetAccountRouter.post('/', InternetAccountController.createInternetAccount)
internetAccountRouter.delete('/:id', InternetAccountController.deleteInternetAccountById)
internetAccountRouter.put('/:id', InternetAccountController.updateInternetAccountById)
internetAccountRouter.get('/page', InternetAccountController.pageInternetAccounts)
internetAccountRouter.get('/', InternetAccountController.listInternetAccounts)

module.exports = internetAccountRouter