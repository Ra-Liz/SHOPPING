import Vue from 'vue'
import App from './App.vue'
// 三级
import TypeNav from '@/components/TypeNav'
// 轮播
import Carousel from '@/components/Carousel'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
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
