const fs = require('fs')
const path = require('path')

function savePlatformIconMap(platformName, platformIcon) {
    const platformIconMaps = listAllPlatformIconMaps()
    platformIconMaps[platformName] = platformIcon
    fs.writeFileSync(path.join(__dirname, '../data/platformIconMaps.json'), JSON.stringify(platformIconMaps, null, 2), 'utf8')
}

function listAllPlatformIconMaps() {
    const jsonStr = fs.readFileSync(path.join(__dirname, '../data/platformIconMaps.json'), 'utf-8')
    return JSON.parse(jsonStr)
}

function deletePlatformIconMapByPlatformName(platformName) {
    const platformIconMaps = listAllPlatformIconMaps()
    delete platformIconMaps[platformName]
    fs.writeFileSync(path.join(__dirname, '../data/platformIconMaps.json'), JSON.stringify(platformIconMaps, null, 2), 'utf8')
}

function updatePlatformIconMapByPlatformName(platformName, platformIcon) {
    const platformIconMaps = listAllPlatformIconMaps()
    platformIconMaps[platformName] = platformIcon
    fs.writeFileSync(path.join(__dirname, '../data/platformIconMaps.json'), JSON.stringify(platformIconMaps, null, 2), 'utf8')
}

module.exports = {
    savePlatformIconMap,
    listAllPlatformIconMaps,
    deletePlatformIconMapByPlatformName,
    updatePlatformIconMapByPlatformName
}