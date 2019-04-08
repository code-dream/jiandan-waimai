<template>
  <div class="ShopHead">
    <div class="nav" :style='{backgroundImage: `url(${shopInfo.bgImg})`}'>
      <i class="iconfont icon-xiaoyuhao" @click='$router.push("/Msite")'></i>
    </div>
    <div class="myTitle">
      <div class="shopImg">
        <img :src="shopInfo.avatar" alt="">
      </div>
      <div class="content">
        <div class="fLine">
          <span class='pingpai'>品牌</span>
          <span class='name'>{{shopInfo.name}}</span>
          <i class="iconfont icon-right-s"></i>
        </div>
        <div class='sLine'>
          <span>{{shopInfo.score}}</span>
          <span>月售{{shopInfo.sellCount}}份</span>
          <span>{{shopInfo.description}}</span>
          <span>约{{shopInfo.deliveryTime}}分钟</span>
          <span>距离{{shopInfo.distance}}</span>
        </div>
        <div class="tLine">
          新用户下单立减17元（不与其他优惠活动同时生效）
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    shopInfo() {
      return this.$store.state.shopInfo
    }
  },
  mounted() {
    this.$store.dispatch("reqShopInf")
  },
}
</script>
<style lang='stylus'>
  .ShopHead
    .nav
      height: 48px
      line-height: 48px
      .iconfont
        color: #ffffff
        font-size: 30px  
        vertical-align: top
    .myTitle
      position: relative
      text-align: center
      .shopImg
        display: inline-block
        position: absolute 
        width: 64px
        height: 64px
        margin: -40px 0 0 -32px
        img
          width: 64px
          height: 64px
          box-shadow: 0px -1px 6px
      .content
        padding-top: 20px
        font-size: 14px
        .fLine
          padding: 8px
          .pingpai
            display: inline-block
            padding: 3px
            border-radius: 2px
            font-size: 14px
            margin-right: 5px 
            background-color: #facd49
          .name
            font-size: 16px
            font-weight: bold
        .sLine
          padding: 5px 0
          color: #7d7d7d
          span 
            margin-right: 10px
        .tLine
          color: #7d7d7d
          padding-bottom: 5px
</style>
