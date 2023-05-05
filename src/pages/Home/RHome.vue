<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav />
        <list-container />
        <Recommend />
        <Rank />
        <Like />
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
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