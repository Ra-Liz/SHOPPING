import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

import search from "./search";
import home from "./home";
import detail from "./detail";
import shopCart from './shopCart'
import user from './user'

const store = new Vuex.Store({
    modules: {
        search,
        home,
        detail,
        shopCart,
        user,
    }
})

export default store