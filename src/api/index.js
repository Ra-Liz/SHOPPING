import requests from './request'
import mockRequests from './mockAjax'

export const reqCategoryList = () => requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
})

export const reqGetBannerList = () => mockRequests({
    url: '/banners',
    method: 'get'
})

export const reqGetFloorList = () => mockRequests({
    url: '/floors',
    method: 'get'
})

export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params, // 这里传参至少要是一个空对象，否则请求失败
})