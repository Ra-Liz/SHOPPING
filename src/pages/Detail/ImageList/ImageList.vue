<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active: currentIndex === index}" @click="changeCurIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: "RImageList",
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    changeCurIndex(index) {
      this.currentIndex = index
      this.$bus.$emit('getIndex', index)
    }
  },
  props: ['skuImageList'],
  watch: {
    // 监听可以保证数据肯定有，但无法保证v-for遍历结构是否完成
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.cur, {
          // 切换按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          // 显示图片数量根据宽度那啥啥'auto'
          sliderPerView: 4,
          // 一次切换图片数量
          // sliderPerGroup: 1,
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
        &:hover {
          border: 2px solid rgb(139, 136, 133);
          padding: 1px;
        } 
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>