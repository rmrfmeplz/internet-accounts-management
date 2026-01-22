const platformIconMapDao = require('../dao/PlatformIconMapDao')

function listPlatformIconMaps() {
    return platformIconMapDao.listAllPlatformIconMaps()
}

module.exports = {
    listPlatformIconMaps
}