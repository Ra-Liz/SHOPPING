// axios request
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// 配置请求参数
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
// 重写-请求拦截器
requests.interceptors.request.use((config) => {
    nprogress.start()
    return config
})
// 重写-响应拦截器
requests.interceptors.response.use((res) => {
    nprogress.done()
    return res
}, (error) => {
    return Promise.reject(new Error('ERROR:' + error))
})

export default requests