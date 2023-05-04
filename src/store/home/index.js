// home
import { reqCategoryList, reqGetBannerList } from "@/api"

const state = {
    categoryList: [],
    bannerList: [],
}

const actions = {
    async categoryList({commit}) {
        let result = await reqCategoryList()
        console.log("请求获取到的分类内容↓", result)
        if (result.status === 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    async getBannerList({commit}) {
        let result = await reqGetBannerList()
        console.log("请求获取到的mock内容↓", result.data)
        if (result.status === 200) {
            commit("GETBANNERLIST", result.data)
        }
    }
}

const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList.data
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList.data
    }
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}