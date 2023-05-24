const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false, // 把map文件拿掉了，看不到报错行数啥的了
  transpileDependencies: true,
  lintOnSave: false, //并无卵用，用了插件，不过用ESLint查错挺好的
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
      }
    }
  }
})
