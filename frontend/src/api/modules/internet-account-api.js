import request from '../request.js'

export function createInternetAccount(internetAccount) {
    return request.post('/internet-accounts', internetAccount)
}

export function listInternetAccounts() {
    return request.get('/internet-accounts')
}

export function deleteInternetAccountById(id) {
    return request.delete(`/internet-accounts/${id}`)
}

export function reqEditInternetAccount(internetAccount) {
    return request.put('/internet-accounts', internetAccount)
}