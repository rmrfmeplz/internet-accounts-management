const internetAccountRouter = require('express').Router()
const InternetAccountController = require('../controllers/InternetAccountController')

internetAccountRouter.post('/', InternetAccountController.createInternetAccount)
internetAccountRouter.get('/', InternetAccountController.listInternetAccounts)
internetAccountRouter.delete('/:id', InternetAccountController.deleteInternetAccountById)

module.exports = internetAccountRouter