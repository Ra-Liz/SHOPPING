// 我觉得这样是多此一举。。。。。。但还是这么写了，方便复用？
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
// emmmmmmmm
// export const getToken = () => {
//     return localStorage.getItem('TOKEN')
// }