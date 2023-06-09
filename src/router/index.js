import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}
VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

// 向外默认暴露路由器对象
let router =  new VueRouter({
  mode: 'history', // 没有#的模式
  routes, // 注册所有路由
  // 滚动行为
  scrollBehavior() {
    // 参 to, from, savedPosition
    return { x: 0, y: 0 }
  }
})

// 前置守卫-全局路由守卫
router.beforeEach(async(to, from, next) => {
  // 放路由守卫里面，路由守卫主要关注三个东西，token有没有，token过没过期，有没有用户信息
  // 如果token没有，那就是游客状态，禁止访问一些页面；如果token有，看看有没有用户信息
  // 如果捞不到用户信息基本就是token过期了，清除token，跳到登陆页面
  // 获取用户登录凭证
  let token = localStorage.getItem('TOKEN')
  let name = store.state.user.userInfo.name
  if (token !== null) {
    // 用户登录后不能访问/login
    if (to.path === '/login' || to.path === '/register') {
      next('/') 
    } else { 
      if (name !== undefined) { // 登录且有用户信息，放行
        next()  
      } else { // 登录但无用户信息
        try{ // 发请求获取用户信息成功后，放行
          await store.dispatch('getUserInfo') 
          next()
        } catch(error) { // token失效，清除重新登陆
          alert('用户验证已过期，请重新登陆!')
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else { // 未登录,支付和个人信息无法访问
    let toPath = to.path
    if (toPath.includes('/myorder') || toPath.includes('/center') || toPath.includes('/paysuccess') || toPath.includes('/trade') || toPath.includes('/pay')) {
      next('/login?redirect=' + toPath)
    } else {
      next()
    }
  }
}) 

export default router
