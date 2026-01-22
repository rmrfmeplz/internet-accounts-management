const platformIconMapRouter = require('express').Router()
const platformIconMapController = require('../controllers/PlatformIconMapController')

platformIconMapRouter.get('/', platformIconMapController.listPlatformIconMaps)

module.exports = platformIconMapRouter