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
    // 这两种方式大同小异，直接从localStorage里拿也行，多走一步state也行，我还是更喜欢直接存直接拿
    // 请求头添加字段userTempId（一定要和后端协商好）
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 携带token带给拦截器
    if (localStorage.getItem('TOKEN')) {
        config.headers.token = localStorage.getItem('TOKEN')
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