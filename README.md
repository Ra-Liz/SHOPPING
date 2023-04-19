# shop_app

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



## 随行笔记

### 路由传参问题

#### 问题引入

搜索栏输入keyword后进行搜索跳转

#### 问题解析

```vue
<template>  .... 
    <form action="###" class="searchForm">
        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
        <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
    </form>
</template>
<script>
export default {
    ....
    data() {
      return {
        keyword: ''
      }
    },

    methods: {
      goSearch () {
        // koko↓
        this.$router.push({name: "search", params: {keyword: this.keyword}, query: {k: this.keyword.toUpperCase()}})
      }
    }
  }
</script>
```

```js
//routes.js
{
    path: '/search/:keyword?',
    component: Search,
    meta: {show: true},
    name: "search"
},
```

#### 小结

##### 路由写法

1. 字符串写法

   ```js
   this.$router.push("/search/" + this.keyword + "?k=" + this.keyword.toUpperCase())
   ```

2. 模板字符串写法

   ```js
   this.$router.push(`/search/${ this.keyword }?k=${this.keyword.toUpperCase()}`)
   ```

3. 对象写法

   ```js
   this.$router.push({name: "search", params: {keyword: this.keyword}, query: {k:this.keyword.toUpperCase()}})
   ```

##### 注意事项

1. path不能与params一起使用，跳转不了↑
2. 如果路由要求传params（已经占位），那么不传的话，路由跳转会有问题。那如何可传可不传呢？--占位后面加`?`
3. params参数可以不传递，但如果传的是空字符串，如何解决？--params: {kw: ''||undefined}
4. 路由组件能否传递props？--椰丝!见上方routes.js

### 编程式路由导航

#### 问题引入

编程式路由跳转到当前路由（参数不变），多次执行会抛NavigationDuplicated警告

#### 路由导航

- 编程式
- 声明式（没有这类问题，因为vue-router底层已经处理好了）

#### 问题解析

vue-router引入了promise

##### 解决

1. 通过给push方法传入成功/失败回调，可以捕获到当前错误，可以解决

2. 通过底部代码（治标不治本，将来在别的组件里push/replace还会有此类问题）

   `this.$router.push({name: "search", params: {keyword: this.keyword}, query: {k: this.keyword.toUpperCase()}}, ()={}, ()=>{})`

3. 重写push/replace函数

   ```js
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
   ```

### 做一个全局组件

#### 问题引入

做一个TypeNav的三级联动组件，以达到概览商品分类的效果。

#### 问题解析

1. 首先，确定好该组件应该在HomePage中使用

2. 然后，在Home文件夹下创建这样一个组件

3. 随后在`main.js`中进行全局组件的注册

   ```js
   import TypeNav from '@/pages/Home/TypeNav'
   Vue.component(TypeNav.name, TypeNav)
   ```

4. 接下即可在Home中直接使用该组件

#### 小结

##### 全局注册组件方法

```js
import 组件 from '组件路径'
Vue.component(组件.name, 组件名)
```

##### 扩展-一次性全局注册多个组件

```js
import 组件 from '...' // 引入多个组件

```

### 拆分静态组件

#### 小结

个人认为分大拆、小拆、细拆

大拆【结构、样式、图片资源】就是按几个分类明显的`<div></div>`去拆，分别做好这些组件

小拆就是这几个组件里面有无可供复用的组件，提出来

细拆就是更多的路由、计算啥的东西了

### 用APIPOST测试接口

http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

拿到咧！

### axios第二次封装

#### 问题引入

为何需要第二次封装？

- 请求拦截器：可以在发请求之前  处理一些业务
- 响应拦截器：当服务器返回一些数据之后  处理一些业务

#### 问题解析

1. 利用axios对象的方法create，创建一个axios实例

2. 整个请求拦截器：在发送之前，请求拦截器可以检测到，可以完成一些业务

3. 响应拦截器

   ~~~js
   const requests = axios.create({
       // 配置对象
       // 基础路径，发送请求时，路径中出现api
       baseURL: '/api',
       // 设置请求超时时间为5s
       timeout: 5000
   })
   
   // 请求拦截器
   requests.interceptors.request.use((config) => {
       // config：配置对象，对象中有一个极重要的部分：Header
       return config
   })
   
   // 响应拦截器
   requests.interceptors.response.use((res) => {
       // 成功回调：服务器响应数据回来以后，响应拦截器可以响应到，并执行一些业务
       return res
   }, (error) => {
       // 失败回调
       return Promise.reject(new Error('ERROR:' + error))
   })
   ~~~

###  统一接口管理

#### 问题引入1

- 小项目  可以将请求放在组件生命钩子中发送
- 大项目  倘若要发送很多请求，↑那必然写好多，↓

#### 问题解析

那让我们来对项目接口进行统一管理！

http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

```js
//api/request.js
import axios from "axios";

const requests = axios.create({
    baseURL: "/api",
    timeout: 5000,
})

requests.interceptors.request.use((config) => {
    return config
})

requests.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(new Error('ERROR:' + error))
})

export default requests
```

```js
// api/index.js
import requests from './request'

export const reqCategoryList = () => requests({
    // 返回Promise对象
    url: '/product/getBaseCategoryList',
    method: 'get'
})
```

让我们来测试一下↓

```js
// main.js
import { reqCategoryList } from './api'
reqCategoryList()
```

#### 问题引入2

莫得行，跨域了

**跨域**：协议、域名、端口号不同

#### 问题解析-这个问题没有解决，请求始终缺个/api

- JSONP

- CROS

- 整个**代理服务器**↓

  ```js
  // vue.config.js
  devServer: {
      proxy: {
        '/api': {
          target: 'http://gmall-h5-api.atguigu.cn',
          // pathRewrite: {}
        }
      }
    }
  ```
  

### nprogress进度条的使用

#### 问题引入

想给请求搞个进度条，请求开始的时候进度条开始滚动，获取响应成功之后停止滚动

#### 问题解析

下载nprogress，然后在请求拦截器和响应拦截器调用nprogress对应的方法

```js
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// ↑注意要额外引入样式
// ...分别调用这俩↓
nprogress.start()
nprogress.done()
```

### Vuex状态管理库

#### 问题引入

Vuex是啥？——集中式管理项目中组件共用的数据，是个状态管理库。（适合在组组件很多数据很多的项目中使用）

#### 问题解析

搭建环境

~~~js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)
// 仓库存储数据的地方
const state = {}
// 修改state的唯一手段
const mutations = {}
// 可以书写自己的业务逻辑，也可以处理异步
const actions = {}
// 可以看作计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {}


export default Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})
~~~

```js
// main.js
import store from './store'

new Vue({
  ...
  store,// 全局注册store，使得每一个组件中都有一个$store属性
}).$mount('#app')
```

基本使用

~~~js
// store/index.js
const actions = (
    //响应组建的加
    increase(context, value) {
    	context.commit('INCREASE', value)
    },
)

const mutations = {
    ///执行加
    INCREASE(state,value) {
        state.sum += value
    }
}

const state = {
    //初始化数据
    sum: 0
}
~~~



~~~JS
// .vue
import { mapState } from 'vuex'
export default {
    name: "test",
    components: {},
    computed: {
    	...mapState(['sum'])
    },
    methods: {
        add
    }
}
~~~





