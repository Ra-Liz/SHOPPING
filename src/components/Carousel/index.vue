<template>
    <div class="swiper-container" ref="floor1Swiper">
        <!-- 轮播框架 -->
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'RCarousel',
    props: ['list'],
    watch: {
        list: {
            immediate: true, // 上来就执行一遍捏
            handler() {
                this.$nextTick(() => {
                    const mySwiper = new Swiper(this.$refs.floor1Swiper, {
                        loop: true,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        }
                    })
                    console.log("Swiper实例创建完成", mySwiper) // ee完全是为了某种程度上符合eslint规范
                })
            }
        }
    }
}
</script>

<style></style>