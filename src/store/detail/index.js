import { reqAddOrUpdateShopCar, reqGetGoodsInfo } from "@/api"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodsInfo: {},
    // 游客临时身份
    uuid_token: getUUID()
}

const actions = {
    // 获取商品内容
    async getGoodsInfo({commit}, value) {
        let result = await reqGetGoodsInfo(value)
        console.log("请求获取到的goods内容↓", result.data)
        if (result.status === 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    // 加购物车
    async addShopCar(_, {skuId, skuNum}) {
        console.log(skuId, skuNum) // test
        let result = await reqAddOrUpdateShopCar(skuId, skuNum)
        if (result.status === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}

const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo.data
    },
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