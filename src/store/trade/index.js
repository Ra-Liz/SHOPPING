import { reqGetOrderInfo, reqGetUserAddress } from "@/api"

const state = {
    userAddressList: [],
    orderList: {}
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({commit}) {
        let result = await reqGetUserAddress()
        if (result.status === 200) {
            commit('GETUSERADDRESS', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取商品清单
    async getOrderList({commit}) {
        let result = await reqGetOrderInfo()
        if (result.status === 200) {
            commit('GETORDERLIST', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETUSERADDRESS(state, userAddressList) {
        state.userAddressList = userAddressList.data
    },
    GETORDERLIST(state, orderList) {
        state.orderList = orderList.data
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters,
}