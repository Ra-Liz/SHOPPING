import Vue from 'vue'
import App from './App.vue'
// 三级
import TypeNav from '@/components/TypeNav'
// 轮播
import Carousel from '@/components/Carousel'
// 分页器
import Pagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
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
  beforeCreate() {
    Vue.prototype.$bus = this
  },
  router,
  store,
}).$mount('#app')
