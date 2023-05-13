import Home from '@/pages/Home/RHome.vue'
import Search from '@/pages/Search/RSearch.vue'
import Register from '@/pages/Register'
import Login from '@/pages/Login'
import Detail from '@/pages/Detail'

/* 
所有静态路由配置的数组
*/
export default [
  {
    path: '/',
    component: Home,
    meta: {show: true},
    name: 'home'
  },

  {
    // :keyword是个占位
    path: '/search/:keyword?',
    component: Search,
    meta: {show: true},
    name: "search",
  },

  {
    path: '/register',
    component: Register,
    meta: {show: false}
  },

  {
    path: '/login',
    component: Login,
    meta: {show: false}
  },

  {
    path: '/detail/:skuId',
    component: Detail,
    meta: {show: true},
    name: 'detail'
  }
]
