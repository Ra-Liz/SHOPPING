import requests from './request'

export const reqCategoryList = () => requests({
    // 去掉/api就不行，到底是为啥
    url: '/product/getBaseCategoryList',
    method: 'get'
})
