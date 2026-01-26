const fs = require('fs')
const path = require('path')

const PLATFORM_ICON_MAPS_FILE_PATH = path.join(__dirname, '../data/platformIconMaps.json')

function savePlatformIconMap(platformName, platformIcon) {
    const platformIconMaps = listAllPlatformIconMaps()
    platformIconMaps[platformName] = platformIcon
    fs.writeFileSync(PLATFORM_ICON_MAPS_FILE_PATH, JSON.stringify(platformIconMaps, null, 2), 'utf8')
}

function listAllPlatformIconMaps() {
    const jsonStr = fs.readFileSync(PLATFORM_ICON_MAPS_FILE_PATH, 'utf-8')
    return JSON.parse(jsonStr)
}

function deletePlatformIconMapByPlatformName(platformName) {
    const platformIconMaps = listAllPlatformIconMaps()
    delete platformIconMaps[platformName]
    fs.writeFileSync(PLATFORM_ICON_MAPS_FILE_PATH, JSON.stringify(platformIconMaps, null, 2), 'utf8')
}

function updatePlatformIconMapByPlatformName(platformName, platformIcon) {
    const platformIconMaps = listAllPlatformIconMaps()
    platformIconMaps[platformName] = platformIcon
    fs.writeFileSync(PLATFORM_ICON_MAPS_FILE_PATH, JSON.stringify(platformIconMaps, null, 2), 'utf8')
}

module.exports = {
    savePlatformIconMap,
    listAllPlatformIconMaps,
    deletePlatformIconMapByPlatformName,
    updatePlatformIconMapByPlatformName
}