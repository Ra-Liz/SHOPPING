import requests from './request'
import mockRequests from './mockAjax'
// 获取三级联动信息
export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})
// 获取banner信息
export const reqGetBannerList = () => mockRequests({
    url: '/banners',
    method: 'get'
})
// 获取floor信息
export const reqGetFloorList = () => mockRequests({
    url: '/floors',
    method: 'get'
})
// 获取商品信息
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params, // 这里传参至少要是一个空对象，否则请求失败
})
// 获取商品详情信息
export const reqGetGoodsInfo = (skuId) => requests({
    url: `/item/${skuId}`,
    method: 'get'
})
// 将产品添加到购物车中 / 获取更新后的购物车信息
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
// 获取购物车列表数据
export const reqCartList = () => requests({
    url: '/cart/cartList',
    method: 'get'
})
// 删除购物车产品数据
export const reqDeleteCartById = (skuId) => requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'delete'
})
// 修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
// 获取验证码
export const reqGetVertifyCode = (phone) => requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
})
// 用户注册
export const reqUserRegister = (params) => requests({
    url: '/user/passport/register',
    method: 'post',
    data: params
})
// 用户登录
export const reqUserLogin = (params) => requests({
    url: '/user/passport/login',
    method: 'post',
    data: params
})
// 获取用户信息
export const reqUserInfo = () => requests({
    url: '/user/passport/auth/getUserInfo',
    method: 'get'
})
// 用户退出登录
export const reqUserLogout = () => requests({
    url: '/user/passport/logout',
    method: 'get'
})
// 获取用户地址信息
export const reqGetUserAddress = () => requests({
    url: '/user/userAddress/auth/findUserAddressList',
    method: 'get'
})
// 获取商品清单
export const reqGetOrderInfo = () => requests({
    url: '/order/auth/trade',
    method: 'get'
})
// 提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data,
})
// 获取订单支付信息
export const reqPayInfo = (orderId) => requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get'
})
// 查询支付状态
export const reqPayStatus = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
})
// 获取个人中心数据
export const reqMyOrderList = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
})
//13700000000 111111