<template>
  <div class="orderCon">
    <headerTitle :title="'订单'"></headerTitle>
    <div v-if="userInf.phone||userInf.name" class="logsuc">
      暂时没有订单
    </div>
    <div v-else class="orderContent">
      <div>
        <img src="./image/person.png" alt="" width="90%"/>
      </div>
      <div>
        <span>登录后查看外卖订单</span>
      </div>
      <div>
        <button @click="$router.push('./login')">立即登录</button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import headerTitle from '../../components/Header/Header.vue'
export default {
  components: {
    headerTitle
  },
  computed: {
    ...mapState(['userInf'])
  }
}
</script>
<style lang='stylus'>
.orderCon
  width: 100%
  height: 100%
  .orderContent
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    width: 300px
    height: 400px
    margin: auto auto
    text-align: center
    span
      font-size: 18px
      line-height: 40px
      color: #bcbab8
    button
      width: 50% 
      font-size: 18px
      color: #fff
      background-color: #57a99a
      border: 1px solid #57a99a
      border-radius: 4px
      padding: 5px
  .logsuc
    position: absolute 
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    font-size: 18px
</style>
