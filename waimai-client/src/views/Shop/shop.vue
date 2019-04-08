<template>
  <div class="shops">
    <ShopHead/>
    <div class="tab">
      <div class="tabItem">
        <router-link to='/shop/food'>点餐</router-link>
      </div>
      <div class="tabItem">
        <router-link to='/shop/evaluate'>评价</router-link>
      </div>
      <div class="tabItem">
        <router-link to='/shop/info'>商家</router-link>
      </div>
    </div>
    <keep-alive include="shopFood">
     <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import ShopHead from '../../components/ShopHead/ShopHead.vue'
export default {
  components: {
    ShopHead
  }
}
</script>
<style lang='stylus'>
.shops
  width: 100%
  height: 100%
  .tab
    display: flex
    border-bottom: 1px solid #c5c5c5
    .tabItem
      flex: 1
      font-size: 15px
      font-weight: bold
      text-align: center
      a
        display: inline-block
        padding: 5px 0
      a:link
        color: gray 
      a:visited
        color: gray 
      a:hover
        color: green
      a.router-link-active
        color: rgb(35,163,147)
        border-bottom: 2px solid
</style>
