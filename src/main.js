import Vue from 'vue'
import App from './App.vue'
// 按需引入elementUI
import { Button, MessageBox } from 'element-ui'
Vue.component(Button.name, Button)
// Vue.component(MessageBox.name, MessageBox)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
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
// 请求API
import * as API from '@/api/index'
Vue.config.productionTip = false
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import yui from '@/assets/images/yui.gif'
Vue.use(VueLazyload, {
  loading: yui,
})
// k-on自定义插件！
import yuii from '@/plugins/yui'
Vue.use(yuii, {
  name: 'yui'
})
// 表单校验插件——非常推荐先在插件目录完成插件引用，然后再从这里引入
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
