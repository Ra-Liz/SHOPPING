import { reqGetSearchInfo } from "@/api"

// search
const state = {
    searchList: {},
}
const actions = {
    async getSearchList({commit}, value) {
        let result = await reqGetSearchInfo(value)
        console.log("请求获取到的search-info内容↓", result.data)
        if (result.status === 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList.data
    }
}
const getters = {
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}