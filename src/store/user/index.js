import { reqGetVertifyCode, reqUserRegister, reqUserLogin, reqUserInfo } from "@/api"

const state = {
    vertifyCode: '',
    token: '',
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
    async userLogin({commit}, user) {
        let result = await reqUserLogin(user)
        if (result.status === 200) {
            console.log('用户登录', result.data)
            commit('USERLOGIN', result.data.data.token)
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
        
    }
}
const mutations = {
    GETVERTIFYCODE(state, vertifyCode) {
        state.vertifyCode = vertifyCode.data
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters,
}