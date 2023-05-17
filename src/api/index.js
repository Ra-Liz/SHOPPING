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