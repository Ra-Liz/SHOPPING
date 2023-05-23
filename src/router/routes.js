// 一级路由组件
import Home from "@/pages/Home/RHome.vue";
import Search from "@/pages/Search/RSearch.vue";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
// 二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
/* 
所有静态路由配置的数组
*/
export default [
  {
    path: "/",
    component: Home,
    meta: { show: true },
    name: "home",
  },

  {
    // :keyword是个占位
    path: "/search/:keyword?",
    component: Search,
    meta: { show: true },
    name: "search",
  },

  {
    path: "/register",
    component: Register,
    meta: { show: false },
  },

  {
    path: "/login",
    component: Login,
    meta: { show: false },
  },

  {
    path: "/detail/:skuId",
    component: Detail,
    meta: { show: true },
    name: "detail",
  },

  {
    path: "/addCartSuccess",
    component: AddCartSuccess,
    meta: { show: true },
    name: "addCartSuccess",
  },

  {
    path: "/shopCart",
    component: ShopCart,
    meta: { show: true },
    name: "shopCart",
  },

  {
    path: "/trade",
    component: Trade,
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
    component: Pay,
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
    component: PaySuccess,
    meta: { show: true },
    name: "paysuccess",
  },

  {
    path: "/center",
    component: Center,
    meta: { show: true },
    name: "center",
    children: [
      {
        path: "grouporder",
        component: GroupOrder,
      },

      {
        path: "myorder",
        component: MyOrder,
      },

      {
        path: '/center',
        redirect: '/center/myorder' // 重定向
      }
    ],
  },
];
