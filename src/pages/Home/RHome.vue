<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav />
        <!-- 主页右侧模块 -->
        <list-container />
        <!-- 主页推荐模块 -->
        <Recommend />
        <!-- 主页排行模块 -->
        <Rank />
        <!-- 主页兴趣模块 -->
        <Like />
        <!-- 主页轮播图模块 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
        <!-- 主页商标模块 -->
        <Brand />
    </div>
</template>

<script>
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'
import { mapState } from 'vuex'

export default {
    name: 'RHome',
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    },
    mounted() {
        this.$store.dispatch("getFloorList")
        console.log("home mounted获取floor数据")
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    }
}
</script>