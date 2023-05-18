// axios request
import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store/index.js";
// 配置请求参数
const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})
// 重写-请求拦截器
requests.interceptors.request.use((config) => {
    // 请求头添加字段userTempId（一定要和后端协商好）
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 携带token带给拦截器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
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