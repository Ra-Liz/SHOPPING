import { reqCartList } from "@/api"

const state = {
    cartList: {}
}
const actions = {
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.status === 200) {
            commit('GETCARTLIST', result.data)
        }
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}