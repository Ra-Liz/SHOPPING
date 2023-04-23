// home
import { reqCategoryList } from "@/api"

const state = {
    categoryList: [],
}
const actions = {
    async categoryList({commit}) {
        let result = await reqCategoryList()
        console.log("请求获取到的内容↓", result)
        if (result.status === 200) {
            commit("CATEGORYLIST", result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}