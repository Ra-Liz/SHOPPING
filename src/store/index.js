import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

import search from "./search";
import home from "./home";

const store = new Vuex.Store({
    modules: {
        search,
        home
    }
})

export default store