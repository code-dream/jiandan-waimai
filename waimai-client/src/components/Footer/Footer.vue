<template>
  <div class="footer">
    <div class="footContent">
      <router-link to="/Msite">
        <i class="iconfont icon-waimaifuwu-shiyongfangbian"></i>
        <div>外卖</div>
      </router-link>
    </div>
    <div class="footContent">
      <router-link to="/search">
        <i class="iconfont icon-sousuo1"></i>
        <div>搜索</div>
      </router-link>
    </div>
    <div class="footContent">
      <router-link to="/order">
        <i class="iconfont icon-tuanduicankaoxian-8"></i>
        <div>订单</div>
      </router-link>
    </div>
    <div class="footContent">
      <router-link to="/profile">
        <i class="iconfont icon-tuanduicankaoxian-6"></i>
        <div>我的</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang='stylus'>
.footer
  width: 100%
  position: fixed
  bottom: 0
  left: 0
  right: 0
  display: flex
  background-color: #fff
  box-shadow: 0px -1px 1px #f9f9f9
  .footContent
    flex: 1
    text-align: center
    align-self: center
    font-size: 14px
    a
      display: block
      height: 100%
      color: #63686e
      padding: 5px 0
      cursor: none
      // 以下设置当前选定的路由的样式
      &.router-link-active
        color: #45b7b7
      .iconfont
        display: inline-block
        font-size: 20px
        font-weight: bold
        padding-bottom: 5px
</style>
