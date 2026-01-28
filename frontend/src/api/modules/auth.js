import request from '../request.js'

export function getIsInitialPasswordSet() {
    return request.get('/auth/is-initial-password-set')
}

export function reqInitialPassword(initialPassword) {
    return request.post('/auth/initial-password', {initialPassword})
}

export function reqLogin(loginParams) {
    return request.post('/auth/login', loginParams)
}