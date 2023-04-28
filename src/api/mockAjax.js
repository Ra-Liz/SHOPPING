import axios from "axios";

const mockRequests = axios.create({
    baseURL: "/mock",
    timeout: 10000,
})

// 请求拦截器
mockRequests.interceptors.request.use((config) => {
    return config
})
// 响应拦截器
mockRequests.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(new Error('ERROR:' + error))
})

export default mockRequests