const uploadRouter = require('express').Router()
const uploadController = require('../controllers/UploadController')

uploadRouter.post('/platform-image', uploadController.uploadPlatformImage)

module.exports = uploadRouter