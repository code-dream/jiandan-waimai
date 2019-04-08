<template>
  <div class="lunbo">
    <swiper :options='swiperOption' v-if="swiperInf.length">
      <swiperSlide class="mainWrap" v-for="(swiperData, index) in swiperInf" :key="index">
        <a href="javascript:" class="mainContent" v-for="(item, index) in swiperData" :key="index">
          <img :src="baseImageUrl + item.image_url" alt="" width="50%">
          <div>{{item.title}}</div>
        </a>
      </swiperSlide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 数据没有刷新出来时显示下方图片 -->
    <img v-else src="./image/msite_back.svg" alt="back" >
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
export default {
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiperInf () {
      const swiperInf = this.$store.state.swiperInf
      // 以下操作是将获取的完整数组做分页分成一个二维数组
      const arr = []
      let minArr = []
      // 遍历swiperInf
      swiperInf.forEach(item => {
        // 如果minArr的长度等于8，另建一个新小数组
        if(minArr.length === 8) {
          minArr = []
        }
        // 如果minArr是空的将其push到大数组中
        if(minArr.length === 0) {
          arr.push(minArr)
        }
        minArr.push(item)
      })
      return arr
    }
  }
}
</script>

<style lang='stylus'>
.lunbo
  padding-top: 55px
  .mainWrap
    display: flex
    flex-wrap: wrap
    .mainContent
      width: 25%
      font-size: 14px
      padding-bottom: 15px
      text-align: center
      color: #63686e
</style>
