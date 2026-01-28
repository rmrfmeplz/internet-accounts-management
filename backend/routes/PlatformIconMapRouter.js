const platformIconMapRouter = require('express').Router()
const platformIconMapController = require('../controllers/PlatformIconMapController')
const authMiddleware = require('../middlewares/authMiddleware')

platformIconMapRouter.use(authMiddleware)

platformIconMapRouter.get('/', platformIconMapController.listPlatformIconMaps)

module.exports = platformIconMapRouter