// 一级路由组件
// import Home from "@/pages/Home/RHome.vue";
// ....
// 二级路由组件
// import MyOrder from "@/pages/Center/myOrder";
// ....

// 来一波高效的 路由懒加载！
/* 
所有静态路由配置的数组
*/
export default [
  {
    path: "/",
    component: () => import("@/pages/Home/RHome.vue"),
    meta: { show: true },
    name: "home",
  },

  {
    // :keyword是个占位
    path: "/search/:keyword?",
    component: () => import("@/pages/Search/RSearch.vue"),
    meta: { show: true },
    name: "search",
  },

  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },

  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },

  {
    path: "/detail/:skuId",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
    name: "detail",
  },

  {
    path: "/addCartSuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
    name: "addCartSuccess",
  },

  {
    path: "/shopCart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
    name: "shopCart",
  },

  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    name: "trade",
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopCart') {
        next()
      } else {
        next(false)
      }
    }
  },

  {
    path: "/pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    name: "pay",
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },

  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
    name: "paysuccess",
  },

  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    name: "center",
    children: [
      {
        path: "grouporder",
        component: () => import("@/pages/Center/groupOrder"),
      },

      {
        path: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },

      {
        path: '/center',
        redirect: '/center/myorder' // 重定向
      }
    ],
  },
];
