<template>
  <div class="shopList">
    <p class="label">
      <span class="sangang"></span>
      <span>附近商家</span>
    </p>
    <ul v-if="shopList.length">
      <li class="shop" v-for="(shop, index) in shopList" :key="index" @click='$router.push("/shop")'>
        <div class="shopPic"></div>
        <div class="shopDetail">
          <div class="shopName">
            <div class="name">
              <span class="pp">品牌</span>
              <span>{{shop.name}}</span>
            </div>
            <ul class='shopNameR'>
              <li class='shop-support' v-for="(item, index) in shop.supports" :key="index">
                {{item.icon_name}}
              </li>
            </ul>
          </div>
          <div class="xiaoliang">
            <Star :score="shop.rating" :size="24"></Star>
            <span style='color: #ff5f5f'>{{shop.rating}}</span> 
            <span>月售{{shop.recent_order_num}}单</span>
            <div class="starR">{{shop.delivery_mode.text}}</div>
          </div>
          <div class="qisong">￥{{shop.float_minimum_order_amount}}起送/配送费￥{{shop.float_delivery_fee}}</div>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li v-for="(item, index) in 10" :key="index">
        <img src="./image/shop_back.svg" alt="back">
      </li>
    </ul>
  </div>
</template>
<script>
import Star from '../Star/Star.vue'
export default {
  computed: {
    shopList () {
      return this.$store.state.shopList
    }
  },
  components: {
    Star
  }
}
</script>
<style lang='stylus'>
.shopList
  .label
    height: 40px
    line-height: 40px
    color: #63686e
    background-color: #fff
    .sangang
      display: inline-block
      width: 15px
      height: 3px
      border-top: 7px double
      border-bottom: 2px solid
      vertical-align: middle
      margin: 0 5px 0 10px
  .shop
    height: 80px
    padding: 10px
    border-bottom: 1px solid #eaf4ff
    .shopPic
      float: left
      width: 80px
      height: 95%
      background: url('./image/waimai.png') no-repeat center center
      background-size: cover
      border-radius: 8px
    .shopDetail
        height: 100%
        margin-left: 90px
        .shopName
          font-size: 16px
          font-weight: bold
          .name
            display: inline-block
            width: 76%
            overflow: hidden
            text-overflow: ellipsis 
            white-space: nowrap
            .pp
              display: inline-block
              font-size: .8em
              background-color: #facd49
              border-radius: 2px
              padding: 3px
              margin-right: 5px
              vertical-align: bottom
          .shopNameR
            float: right
            width: 24%
            text-align: right
            .shop-support
              display: inline-block
              border: 1px solid #ececec
              border-radius: 4px
              color: #919190
              font-size: 10px
              padding: 3px  
        .xiaoliang
          font-size: 12px
          padding: 8px 0;
          span
            margin-right: 5px
          .starR
            float: right
            color: #40a798
        .qisong
          font-size: 12px
          padding 5px 0
</style>
