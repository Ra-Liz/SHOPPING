import axios from "axios";
// 进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

// 请求拦截器
requests.interceptors.request.use((config) => {
    // 进度条开始滚动
    nprogress.start()
    return config
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 进度条停止滚动
    nprogress.done()
    return res
}, (error) => {
    return Promise.reject(new Error('ERROR:' + error))
})

export default requests