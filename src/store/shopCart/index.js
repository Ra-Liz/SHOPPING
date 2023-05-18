import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api"

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
    },
    // 修改购物产品选中状态
    async updateCheckedById(_, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.status === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除所有选中商品
    deleteAllChecked({dispatch, getters}) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked === 1 ? dispatch('deleteCartById', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    // 修改所有购物产品选中状态
    updateAllChecked({dispatch, getters}, checked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', {skuId: item.skuId, isChecked: checked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList.data
    },
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