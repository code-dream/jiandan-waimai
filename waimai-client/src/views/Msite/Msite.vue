<template>
  <div class="main">
    <header-title  style="position: fixed;z-index: 2">
      <template slot="topLeft">
        <div class="leftTitle">
          <i class="iconfont icon-dingwei"></i>
          <span class="address">{{address.name}}</span>
        </div>
      </template>
      <template slot="topRight">
        <div class="rightTitle">
          <i v-if="!!userInf._id" class="iconfont icon-yonghu"></i>
          <span v-if="!userInf._id">登录/注册</span>
        </div>
      </template>
    </header-title>
    <div class="list">
       <div class="content">
          <msite-swiper></msite-swiper>
          <div class="tip">
            <div class="text">
              <i class="iconfont icon-huiyuan1"></i>
              <span>加入超级会员</span>
              <span class='small'>每月领20元红包</span>
            </div>
            <div class="go">
              立即开通
            </div>
          </div>
          <shop-list></shop-list>
       </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import HeaderTitle from '../../components/Header/Header.vue'
import MsiteSwiper from '../../components/MsiteSwiper/MsiteSwiper.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import Bscroll from 'better-scroll'
export default {
  name: "index",
  mounted() {
    this.$nextTick(() => {
      new Bscroll('.list', {
        click: true,
        bounce: false,
        swiperTime: 1500
      })
    })
  },
  components: {
    HeaderTitle,
    MsiteSwiper,
    ShopList
  },
  computed: {
    ...mapState(['address', 'userInf'])
  }
}
</script>
<style lang='stylus'>
.main
  width: 100%
  height: 100%
  .address
    display: inline-block
    width: 200px
    overflow: hidden
    text-overflow: ellipsis 
    white-space: nowrap 
    vertical-align: top  
  .list
    overflow: hidden
    height: 100%
    .content
      padding-bottom: 59px
      .tip
        width: 94%
        font-size: 14px
        margin: 0 auto
        background-color: #fdeab7
        padding: 8px
        border-radius: 3px
        .text
          float: left
          .small
            font-size: 12px
            padding-left: 8px
          .iconfont
            font-size: 12px
            padding-right: 5px
            color: #5a5a44
        .go
          overflow: hidden
          text-align: right
  .iconfont
    font-size: 28px
</style>
