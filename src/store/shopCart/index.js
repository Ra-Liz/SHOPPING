import { reqCartList, reqDeleteCartById } from "@/api"

const state = {
    cartList: []
}
const actions = {
    // 获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.status === 200) {
            console.log("请求到cartlist的result↓", result)
            commit('GETCARTLIST', result.data)
        }
    },
    // 删除购物车一个产品
    async deleteCartById(_, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.status === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList.data
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}