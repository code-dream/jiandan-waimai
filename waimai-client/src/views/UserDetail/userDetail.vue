<template>
  <div class="user">
    <Header title='个人信息'>
      <div class="leftTitle" slot="topLeft">
        <i class="iconfont icon-xiaoyuhao" @click="$router.back()"></i>
      </div>
    </Header>
    <router-view></router-view>
  </div>
</template>
<script>
import Header from '../../components/Header/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
<style lang='stylus'>
  .user
    width: 100%

</style>
