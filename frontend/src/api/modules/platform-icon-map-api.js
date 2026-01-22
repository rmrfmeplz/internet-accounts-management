import request from '../request.js'

export function listPlatformIconMaps() {
    return request.get('/platform-icon-maps')
}