# shop_app 随行笔记（前台）



## 路由传参问题

### 搜索栏输入keyword后进行搜索跳转

### 问题解析

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

### 小结

#### 路由写法

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

#### 注意事项

1. path不能与params一起使用，跳转不了↑
2. 如果路由要求传params（已经占位），那么不传的话，路由跳转会有问题。那如何可传可不传呢？--占位后面加`?`
3. params参数可以不传递，但如果传的是空字符串，如何解决？--params: {kw: ''||undefined}
4. 路由组件能否传递props？--椰丝!见上方routes.js

## 编程式路由导航

### 编程式路由跳转到当前路由（参数不变），多次执行会抛NavigationDuplicated警告

### 路由导航

- 编程式
- 声明式（没有这类问题，因为vue-router底层已经处理好了）

### 问题解析

vue-router引入了promise

#### 解决

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

## 做一个全局组件

### 做一个TypeNav的三级联动组件，以达到概览商品分类的效果。

### 问题解析

1. 首先，确定好该组件应该在HomePage中使用

2. 然后，在Home文件夹下创建这样一个组件

3. 随后在`main.js`中进行全局组件的注册

   ```js
   import TypeNav from '@/pages/Home/TypeNav'
   Vue.component(TypeNav.name, TypeNav)
   ```

4. 接下即可在Home中直接使用该组件

### 小结

#### 全局注册组件方法

```js
import 组件 from '组件路径'
Vue.component(组件.name, 组件名)
```

#### 扩展-一次性全局注册多个组件

```js
import 组件 from '...' // 引入多个组件

```

## 拆分静态组件

### 小结

个人认为分大拆、小拆、细拆

大拆【结构、样式、图片资源】就是按几个分类明显的`<div></div>`去拆，分别做好这些组件

小拆就是这几个组件里面有无可供复用的组件，提出来

细拆就是更多的路由、计算啥的东西了

## 用APIPOST测试接口

http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList

拿到咧！

## axios第二次封装

### 为何需要第二次封装？

- 请求拦截器：可以在发请求之前  处理一些业务
- 响应拦截器：当服务器返回一些数据之后  处理一些业务

### 问题解析

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

##  统一接口管理

### 接口管理使用场景？如何管理？

- 小项目  可以将请求放在组件生命钩子中发送
- 大项目  倘若要发送很多请求，↑那必然写好多，↓

### 问题解析

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

### 解决跨域问题

**跨域**：协议、域名、端口号不同

### 问题解析-这个问题没有解决，请求始终缺个/api

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
  

## nprogress进度条的使用

### 给请求加进度条

请求开始的时候进度条开始滚动，获取响应成功之后停止滚动

### 问题解析

下载nprogress，然后在请求拦截器和响应拦截器调用nprogress对应的方法

```js
import nprogress from "nprogress";
import "nprogress/nprogress.css";
// ↑注意要额外引入样式
// ...分别调用这俩↓
nprogress.start()
nprogress.done()
```

## Vuex状态管理库

### Vuex的使用

Vuex是啥？——集中式管理项目中组件共用的数据，是个状态管理库。（适合在组组件很多数据很多的项目中使用）

### 问题解析

#### 搭建Vuex环境

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

#### Vuex基本使用

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

#### Vuex模块化

```js
// store/search/index.js
const state = {}
const actions = {}
const mutations = {}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}
```

```js
// store/index.js
import search from "./search";
import home from "./home";
export default Vuex.Store({
    modules: {
        search,
        home
    }
})
```

~~~js
// TypeNav/indx.vue
mounted() {
    this.$store.dispatch('categoryList')
},
computed: {
    ...mapState({
        categoryList: state => state.home.categoryList.data
    })
}
~~~

## JS鼠标悬浮动态添加样式

### 给三级联动一级标题动态添加鼠标悬浮背景

目标：鼠标悬浮时天蓝色背景，离开时无天蓝色背景

思路：动态获取鼠标悬浮所在c1索引值，对应索引值h3中动态绑定背景色class

注意：鼠标离开时给所在索引值重新赋初始值

```vue
<template>
...
<div class="all-sort-list2">
    <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex == index}">
        <h3 @mouseenter="changeIndex(index)" @mouseleave="leaveIndex">
            <a href="">{{ c1.categoryName }}</a>
        </h3>
        <div class="item-list clearfix">
            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                    <dt>
                        <a href="">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                            <a href="">{{ c3.categoryName }}</a>
                        </em>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'TypeNav',
    data(){
        return {
            currentIndex: -1,
        }
    },
    methods: {
        changeIndex(index) {
            this.currentIndex = index
        },
        leaveIndex() {
            this.currentIndex = -1
        }
    },
    mounted() {
        this.$store.dispatch('categoryList')
    },
    computed: {
        ...mapState({
            categoryList: state => state.home.categoryList.data
        })
    }
}
</script>
<style>
...
    .cur {
        background-color: sky-blue
    }
</style>
```

### 给二级标题加条件显示

三种方式

- :hover
- v-show（这个不太对，解决一下）
- display: currentIndex == index ? block : none

### 延时卡顿现象

当鼠标快速过c1各文本时，不会每个都能调用，卡卡的。

正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而回调函数内部有计算，很可能出现浏览器卡顿）

防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发只会执行一次（回城）

节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发（轮播图）

```js
// changeIndex(index) {
//     this.currentIndex = index
// },
// 最好不要使用箭头函数
changeIndex: throttle(function(index) {
    this.currentIndex = index
}, 10),
```

#### 重要概念-防抖和节流（我会把它单独摘出来放博客上的）

防抖和节流本质上是优化**高频率执行代码**的手段。

当浏览器resize/scroll/keypress/mousemove等事件触发时，会不断地调用回调函数，极大地浪费资源、降低前端性能。

↑为了优化体验，需要对此类事件调用次数进行合理限制，这时候我们就可以使用防抖、节流的手段减少调用频率。

##### 防抖-debounce

>  频繁操作 => 最后一次操作		定时器

**定义**：n秒后再执行该事件，如果在这期间被重复触发，那么重新计时。

**栗子**：电梯等人

**实现**：

```js
// 简单实现
function debounced(func, wait) {
    let timeout; 						 // 声明一个变量用于保存定时器的返回值，初始化为 undefined
										 // 我还是喜欢初始化成这样→let timeout = null	
    return function() { 				 // 返回一个新的函数，这个新函数就是实际使用的防抖函数
        let context = this; 			 // 在这个新函数中，保存当前 this 指向
        let args = arguments; 			 // 保存当前函数调用时传入的参数
        
        clearTimeout(timeout); 			 // 清除之前设置的定时器，避免函数的过度调用
        								 // clearTimeout 函数并不会抛出异常，因为它可以接受 undefined 作为参数
        timeout = setTimeout(function(){ // 设置一个新的定时器，延迟 wait 毫秒执行函数
            func.apply(context, args) 	 // 在定时器中执行函数，this 指向上下文为之前保存的 this
        }, wait);
    }
}

// 加标判断实现——防抖需要立即执行
function debounced(func, wait) {
    let timeout
    let flag
    
    return function() {
        let context = this
        let args = arguments;
        
        if (flag) {
            func.apply(context, args)
            flag = false
        }
        
        clearTimeout(timeout)
        timeout = setTimeout(function() {
            flag = true
        }, wait)
    }
}

// 传入第三参数实现——防抖需要立即执行
// immediate = true => 首次调用需要立即执行
function debounced(func, wait, immediate) {
    let timeout
    
    return function() {
        let context = this
        let args = arguments
        
        if (timeout) clearTimeout(timeout)
        if (immediate) {
            let callNow = !timeout
            timeout = setTimeout(function() {
                timeout = null
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timeout = setTimeout(function() {
                func.apply(context, args)
            }, wait)
        }
    }
}

// 还有无改进空间？
// 肯定是有，举个例子：可以将函数的返回值进行保存并返回，以便调用者可以取消该函数的延迟执行
function debounce(func, wait, immediate) {
  let timeout;

  function debounced() {
    const context = this;
    const args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) {
        return func.apply(context, args);
      }
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  }

  debounced.cancel = function() { // ←这里是核心扩展点啦
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}
```

**使用**：

```js
function myFunc() {
    ....我的函数
}
function debounce() {
    ....防抖函数
}
let debounceMyfunc = debounce(myFunc, 300, ...其他参数)

debounceMyfunc()
debounceMyfunc.cancel()
```

**场景**：

防抖在连续的事件，只需触发一次回调的场景有：

- 搜索框搜索输入。只需用户最后一次输入完，再发送请求。
- 手机号、邮箱验证输入检测。
- 窗口大小`resize`。只需窗口调整完成后，计算窗口大小。防止重复渲染。



##### 节流-throttle

>  频繁操作 => 少量操作		闭包+延迟器

**定义**：n秒内只运行一次，如果在这期间重复触发，那么只有一次生效。

**栗子**：电梯送人

**实现**：

```js
// 时间戳
function throttled(func, delay) {
    let oldTime = Date.now()
    return function() {
        let context = this					// 个人认为此举更直观
        let args = arguments				// ↑
        let newTime = Date.now()
        
        if (newTime - oldTime >= delay) {	// 如果当前时间距离上次执行的时间大于或等于延迟时间，执行相应函数
            func.apply(context, args)
            oldTime = Date.now()
        }
    }
}

// 定时器
function throttled(func, delay) {
    let timer = null
    return function() {
        let context = this
        let args = arguments
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args)
                timer = null				// 这个操作很巧妙↓
            }, delay)
        }
    }
}
/*
	对于防抖函数来说，用clearTimeout和将timeout设为null的效果是一样的。
	但是，对于节流函数来说，应该尽量避免开太多的定时器，因此建议在使用setTimeout时，将定时器变量设置为null。
	这样，在函数被调用时，首先判断定时器变量是否为null，如果为null，就创建新的定时器，如果不为null，则不创建新的定时器。如果使用clearTimeout，则需要先清除之前的定时器，再创建新的定时器，这样在高频率调用函数时会开启大量的定时器，导致性能下降。
	
	通常来说，防抖函数相对于节流函数更容易出现创建很多定时器的情况，因为防抖函数在每次触发事件后都会重新创建一个定时器，而节流函数只有在上一次执行的定时器结束后才会创建新的定时器。因此，在高频率触发事件的情况下，防抖函数可能会导致创建大量的定时器，从而影响性能。
*/

// 时间戳 + 定时器 —— 实现更加精确的节流
function throttled(func, delay) {
    let timer = null
    let startTime = Date.now()
    
    return function() {
        let curTime = Date.now()
        let context = this
        let args = arguments
        let remaining = delay - (curTime - startTime)
        
        clearTimeout(timer)
        if (remaining <= 0) {
            func.apply(context, args)
            startTime = Date.now()
        } else {
            timer = setTimeout(func, remaining)
        }
    }
}
```

**使用**：

```js
function handleScroll(event) {
    ....滚动事件处理代码
}
function throttled(func, delay) {
    ....节流函数
}

window.addEventListener('scroll', throttled(handleScroll, 500));
```

**场景**：

节流在间隔一段时间执行一次回调的场景有：

- 滚动加载，加载更多或滚到底部监听
- 搜索框，搜索联想功能



##### 两者的异同

同：

- 都是为了较低回调的执行频率，节省计算资源
- 都可以使用定时器实现

异：

- 防抖着重于一定时间连续触发的事件中只执行最后一次；节流着重于一段时间仅执行一次
- 防抖是在**一段连续操作后**执行一次； 节流是**每一段时间只**执行一次



## TypeNav组件路由跳转与传递参数

描述：该组件共有三级菜单，鼠标悬浮一级菜单时需要展示一级标题对应的二三级内容；点击分类时，Home跳转到Search模块，路由跳转时传递产品名称、ID等。

### 路由跳转

- 声明式导航：router-link
- 编程式导航：push|replace

### 路由跳转的选择

- 这里选择编程式导航。因为使用声明式导航，这里会渲染巨多的router-link，会出现卡顿。（尽量不要操作DOM层）
- 利用事件委托+编程式导航处理跳转。因为给每个a标签绑定methods依然是一种很吃性能的方式。

#### 事件委托有几个问题

- 如何才能实现只有点击a的时候才进行路由跳转
- 如何区分点击的是一二三级标签

#### 解决

自定义属性+事件委托+编程式导航

给三个a标签内添加自定义属性（分支名，分支级别），点击时，即可通过判断节点dataset中有无这些属性来给路由配置路径和参数。

```vue
<a :data-categoryName = "c1.categoryName" :data-category1Id = "c1.categoryId">{{ c1.categoryName }}</a>
<a :data-categoryName = "c2.categoryName" :data-category2Id = "c2.categoryId">{{ c2.categoryName }}</a>
<a :data-categoryName = "c3.categoryName" :data-category3Id = "c3.categoryId">{{ c3.categoryName }}</a>
```

```js
goSearch(event) {
    // 编程式导航+事件委托
    // 可以获取节点以及节点上的dataCategoryName，我们需要筛选带着dataCategoryName参数的a标签√，并且确认好标签级别
    let element = event.target
    let { categoryname, category1id, category2id, category3id } = element.dataset
    if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }

        if (category1id) {
            query.category1Id = category1id
        } else if (category2id) {
            query.category1Id = category2id
        } else if (category3id) {
            query.category3Id = category3id
        }
        location.query = query
        this.$router.push(location)
    }
}
```



## Search模块中商品分类和过渡动画

主要就是事件委托问题，应该想好绑定事件放在哪个节点上

↑好好想一下这个逻辑，更加合理地显示和隐藏↓

### 商品分类

#### 预期效果

- 主页面，让TypeNav组件的一级分类一直显示。
- search页面，让TypeNav在鼠标进入“全部商品分类”的时候显示一级分类。
- 主页面，鼠标进入各一级分类时，显示二三级内容；search页面，也是这样。
- 主页面，鼠标移出container的时候不再显示二三级；search页面，不再显示TypeNav一级组件。

#### 放置思路

我暂时想不到更简洁的实现方法，相当于针对这两种情况写了两组判定↓

- 首先是contianer中加一个`mouseleave`事件。当search页面中鼠标划出这里时，TypeNav一级组件隐藏掉（这里有个坑，就是如果鼠标移出分类区但是留在nav区，还是显示的，所以需要下一面一个mouseleave填坑）；
- 其次是“全部商品分类”的`h2`标签中加一个`mouseenter`事件。search页面中，当鼠标移入标签，一级分类显示；
- 然后是在sort区域（一二三级分类）添加一个`mouseleave`事件。当鼠标离开这个区域，主页面不显示二三级，且给currentindex赋值为`-1`，search页面不显示一二三级（如果移出不是停在“全部商品分类”上）；
- 最为关键的一步是在一级分类标签`h3`中加一个`mouseenter`事件。这是之前实现的鼠标移在各个一级分类标题上时，先获取当前的index值`currentIndex`，以便给标题一个选中背景样式，并且显示对应的二三级内容（这里是用的`:style`绑定`display`样式）。

这么一写，确实有些复杂。但是它能实现我对于三级联动显示与隐藏的需求。那么是否还有更好的解决办法呢？？？？？

#### 代码实现

```vue
<div class="container" @mouseleave="leaveShow">
    <h2 class="all" @mouseenter="enterShow">全部商品分类</h2>
    <nav class="nav">...</nav>
    <div class="sort" v-show="show">
        <div class="all-sort-list2" @click="goSearch" @mouseleave="leaveIndex">
            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur: currentIndex == index}">
                <h3 @mouseenter="changeIndex(index)">...一级内容</h3>
                <div class="item-list clearfix" :style="{display: currentIndex == index ? 'block' : 'none'}">
                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                        <dl class="fore">...二三级内容</dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    ...
	methods: {
        changeIndex: throttle(function(index) {
            this.currentIndex = index
        }, 10),
        leaveIndex() {
            this.currentIndex = -1
            if (this.$route.name === 'search') {
                this.show = false
            }
        },
            
        enterShow() {
            this.show = true
        },
        leaveShow() {
            if (this.$route.name == 'search') {
                this.show = false
            }
        },
    }
</script>
```

### 过渡动画

>  前提是组件/元素务必要有v-if/v-show指令。

### 代码实现

```vue
<template>
	<transition name = "sort">
        把要搞动画的元素包起来
    </transition>
</template>
<style>
    ...
    .sort {...}
    // Vue2 Vue3 注意写法不一样，建议看到这里就回想一下
    .sort-enter {
        height: 0px;
    }

    .sort-enter-to {
        height: 461px;
    }

    .sort-enter-active {
        transition: all .5s; // 过渡全部元素，设置0.5s
        overflow: hidden; // 防止字先出来，背景慢慢出来
    }
</style>
```



## 合并参数

讲真我不是很明白这到底是个什么业务，为什么分类和搜索的参数要合并在一起。

它是这样表述的：search模块的路由传参只有name和params，TypeNav模块的路由传参只有name和query。当我已经输入关键词查找后，点击分类，路由应该保留我的params；当我点击分类后查找，路由应该保留我的query。因此，要在TypeNav和Search相关实现中进行路由传参（name, params, query）的合并。

以下是代码实现↓

```js
// Header/index.vue (Search)
goSearch() {
    // koko
    let location = { name: "search", params: { keyword: this.keyword } }
    location.query = this.$route.query
    this.$router.push(location)
}
```

```js
// TypeNav/index.vue 
goSearch(event) {
    // 编程式导航+事件委托
    let element = event.target
    console.log("要传递的element.dataset↓", element.dataset)
    let { categoryname, category1id, category2id, category3id } = element.dataset

    if (categoryname) {
        let location = { name: 'search' }
        let query = { categoryName: categoryname }

        if (category1id) {
            query.category1Id = category1id
        } else if (category2id) {
            query.category1Id = category2id
        } else if (category3id) {
            query.category3Id = category3id
        }

        // koko
        location.query = query
        location.params = this.$route.params

        this.$router.push(location)
    }
}
```

这样一来，就实现了query和param两参共传。



## mockjs模拟数据

mock-模拟，前端用这个来生成一些随机数据，拦截AJAX请求啥的。

### mockjs插件的使用

1. 创建src/mock/

2. 准备JSON数据

3. 把mock数据需要的图片放置在public文件夹中，这个文件夹在打包的时候会把相应的资源原封不动打包到dist文件夹中

4. 创建mockServe.js文件，开始mock虚拟数据

5. 入口文件引入mockServe.js

#### 实现Home页面ListContainer组件

/mock/mockServe.js

```js
import Mock from 'mockjs';
import banners from './banners.json';
import floors from './floors.json';

Mock.mock("/mock/banners", { code: 200, data: banners })
Mock.mock("/mock/floors", { code: 200, data: floors })
```

/api/mockAjax.js

```js
import axios from "axios";

const mockRequests = axios.create({
    baseURL: "/mock",
    timeout: 10000,
})
// 请求拦截器
mockRequests.interceptors.request.use((config) => {
    return config
})
// 响应拦截器
mockRequests.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(new Error('ERROR:' + error))
})

export default mockRequests
```

/api/index.js

```js
import mockRequests from './mockAjax'
export const reqGetBannerList = () => mockRequests({
    url: '/banners',
    method: 'get'
})
```

/store/home/index.js

```js
const actions = {
    async getBannerList() {
        let result = await reqGetBannerList()
        console.log("请求获取到的mock内容↓", result.data) // test
    }
}
```

/ListContainer/index.vue

```js
mounted() {
    this.$store.dispatch('getBannerList')
},
computed: {
    ...mapState({
        bannerList: state => state.home.bannerList
    })
}
```



#### 实现Home页面Floor组件





