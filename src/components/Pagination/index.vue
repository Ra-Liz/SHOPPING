<template>
    <div class="pagination">
        <button :disabled="pageNo <= 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
        <button v-if="startAend.start !== 1" @click="$emit('getPageNo', 1)">1</button>
        <button v-if="startAend.start > 2">···</button>

        <button v-for="page in range" :key="page" @click="$emit('getPageNo', page)" :class="{active: pageNo === page}">{{ page }}</button>

        <button v-if="startAend.end < totalPage">···</button>
        <button v-if="startAend.end !== totalPage" @click="$emit('getPageNo', totalPage)">{{ totalPage }}</button>
        <button :disabled="pageNo >= totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

        <button style="margin-left: 30px">共 {{ total }} 条</button>
    </div>
</template>
  
<script>
export default {
    name: 'RPagination',
    props: ['pageNo', 'pageSize', 'total', 'continues'],
    computed: {
        totalPage() {
            return Math.ceil(this.total/this.pageSize)
        },
        startAend() {
            let start = 0, end = 0
            if (this.totalPage < this.continues) {
                start = 1
                end = this.totalPage
            } else {
                start = this.pageNo - Math.floor(this.continues/2)
                end = this.pageNo + Math.floor(this.continues/2)
                if (start < 1) {
                    start = 1
                    end = this.continues
                } else if (end > this.totalPage) {
                    end = this.totalPage
                    start = end - this.continues + 1
                }
            }
            
            return { start, end }
        },
        range() {
            const { start, end } = this.startAend
            return Array.from({ length: end - start + 1 }, (_, index) => start + index)
        },
    },
}
</script>

<style lang="less" scoped>
.pagination {
    text-align: center;
    button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;

        &[disabled] {
            color: #c0c4cc;
            cursor: not-allowed;
        }

        &.active {
            cursor: not-allowed;
            background-color: brown;
            color: #fff;
        }
    }
}
</style>
  