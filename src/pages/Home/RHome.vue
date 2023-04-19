<template>
    <div>
        <!-- 三级联动全局组件 -->
        <TypeNav />
        <list-container />
        <Recommend />
        <Rank />
        <Like />
        <Floor />
        <Floor />
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

export default {
    name: 'RHome',
    components: {
        ListContainer,
        Recommend,
        Rank,
        Like,
        Floor,
        Brand,
    }
}
</script>