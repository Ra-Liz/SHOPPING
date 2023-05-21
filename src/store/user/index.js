import { reqGetVertifyCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout } from "@/api"

const state = {
    vertifyCode: '',
    userInfo: {}
}
const actions = {
    // 获取验证码
    async getVertifyCode({commit}, phone) {
        let result = await reqGetVertifyCode(phone)
        if (result.status === 200) {
            commit('GETVERTIFYCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister(_, user) {
        let result = await reqUserRegister(user)
        if (result.status === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async userLogin(_, user) {
        let result = await reqUserLogin(user)
        if (result.status === 200) {
            console.log('用户登录', result.data)
            let token = result.data.data.token
            localStorage.setItem('TOKEN', token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo()
        if (result.status === 200) {
            console.log('用户信息', result.data)
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return  Promise.reject(new Error('faile'))
        }
    },
    // 用户退出登录
    async userLogout({commit}) {
        let result = await reqUserLogout()
        if (result.status === 200) {
            console.log('退出请求', result)
            commit('CLEAR') // 去清除用户数据
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETVERTIFYCODE(state, vertifyCode) {
        state.vertifyCode = vertifyCode.data || ''
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo.data || {}
    },
    CLEAR(state) {
        state.userInfo = {}
        state.vertifyCode = ''
        localStorage.removeItem('TOKEN')
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters,
}