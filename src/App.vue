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
    console.log("三级列表数据↓", this.$store.state)
  },
}
</script>

<style>

</style>
