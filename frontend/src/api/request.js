import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000
})

request.interceptors.response.use(
    async resp => resp.data
)

export default request