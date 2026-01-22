const platformIconMapService = require('../services/PlatformIconMapService')

function listPlatformIconMaps(req, resp) {
    return resp.success(platformIconMapService.listPlatformIconMaps())
}

module.exports = {
    listPlatformIconMaps,
}