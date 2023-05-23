let yui = {}
yui.install = function(Vue, options) {
    // Vue.prototype.$bus:任何组件都可以使用
    // Vue.directive
    // Vue.component
    // Vue.filter......
    console.log('k-on!')
    // Vue.directive(options.name, (element, params) => {
    //     element.innerHTML = params.value.toUpperCase()
    // })
    // 哇用的时候还可以弄一些修饰符！.prevent .自定义.....
    // name = 'yui'  =>  v-yui
}
export default yui