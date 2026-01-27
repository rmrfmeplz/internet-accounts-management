import request from '../request.js'

export function getIsInitialPasswordSet() {
    return request.get('/auth/is-initial-password-set')
}