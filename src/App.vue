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
  }
}
</script>

<style>

</style>
