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