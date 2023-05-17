import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

import search from "./search";
import home from "./home";
import detail from "./detail";
import shopCart from './shopCart'

const store = new Vuex.Store({
    modules: {
        search,
        home,
        detail,
        shopCart,
    }
})

export default store