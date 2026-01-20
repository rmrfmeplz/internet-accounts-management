import request from '../request.js'

export function createInternetAccount(internetAccount) {
    return request.post('/internet-accounts', internetAccount)
}

export function listInternetAccounts() {
    return request.get('/internet-accounts')
}