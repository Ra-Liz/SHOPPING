import { v4 as uuidv4 } from 'uuid'
// 生成随机字符串，用于持久存储游客身份，每次执行不能发生变化
export const getUUID = () => {
    // 检测localStorage中是否已经存储uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    if (!uuid_token) {
        uuid_token = uuidv4() // 如果没有，生成一个
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}