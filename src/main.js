import Vue from 'vue'
import App from './App.vue'

import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 路由
import router from './router'
// 仓库
import store from './store'

// 请求测试
import { reqCategoryList } from './api'
reqCategoryList()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
