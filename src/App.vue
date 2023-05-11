<template>
  <div id="app">
    <r-header />

    <router-view></router-view>
    
    <r-footer v-show="$route.meta.show"></r-footer>
  </div>
</template>

<script>
import RHeader from './components/Header/index.vue'
import RFooter from './components/Footer/index.vue'

export default {
  name: 'App',
  components: {
    RHeader,
    RFooter
  },
  mounted() {
    // 派发一个action来获取商品分类三级列表的数据
    this.$store.dispatch('categoryList')
    console.log("app mounted获取三级列表state数据")
  },
}
</script>

<style>
  body {
    /* filter: grayscale(100%); */
  }
  ::selection {
    color: white;
    background-color: brown;
  }
</style>
