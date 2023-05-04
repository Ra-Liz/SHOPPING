import Vue from 'vue'
import App from './App.vue'
// 三级联动
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 路由
import router from './router'
// 仓库
import store from './store'
// mock数据
import '@/mock/mockServe'
// swiper5样式
import 'swiper/css/swiper.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
