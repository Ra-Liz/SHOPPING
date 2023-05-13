import { reqGetGoodsInfo } from "@/api"

const state = {
    goodsInfo: {},
}

const actions = {
    async getGoodsInfo({commit}, value) {
        let result = await reqGetGoodsInfo(value)
        console.log("请求获取到的goods内容↓", result.data)
        if (result.status === 200) {
            commit('GETGOODSINFO', result.data)
        }
    }
}

const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo.data
    }
}

const getters = {
    // 路径导航
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    // 产品信息
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    // 产品售卖属性
    skuSaleAttrValueList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}