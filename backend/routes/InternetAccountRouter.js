const internetAccountRouter = require('express').Router()
const InternetAccountController = require('../controllers/InternetAccountController')

internetAccountRouter.post('/', InternetAccountController.createInternetAccount)
internetAccountRouter.get('/', InternetAccountController.listInternetAccounts)

module.exports = internetAccountRouter