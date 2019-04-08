<template>
  <div id="app">
    <transition :name="tran">
      <keep-alive :include="['index','search']" >
        <router-view></router-view>
      </keep-alive>
    </transition>
    <transition name="down">
      <Footer v-if="$route.meta.isShow"></Footer>
    </transition>
  </div>
</template>
<script>
import Footer from './components/Footer/Footer.vue'
export default {
  data() {
    return {
      tran: 'left',
      scrollY: 0
    }
  },
  components: {
    Footer
  },
  mounted () {
    // 请求Msite页面所需的三种数据并加入到vuex中管理
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getSwiperInf')
    this.$store.dispatch('getShopList')
    this.$store.dispatch('getUserInf')
  },
  watch: {
    '$route' (to, from) {
      if(to.meta.index > from.meta.index) {
        this.tran = 'left'
      } else if(to.meta.index < from.meta.index){
        this.tran = 'toright'
      }
    }
  }
}
</script>

<style>
@import './assets/css/reset.css';
@import '//at.alicdn.com/t/font_964158_m2ixcsiivbm.css';
html,body,#app{
  height: 100%;
  overflow-x: hidden;
  font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
}
.left-enter-active,.left-leave-active, .toright-enter-active, .toright-leave-active{
  transition: all .3s ease;
}
.left-enter{
  transform: translateX(100%);
}
.left-leave-to{
  position: absolute;
  opacity: 0.8;
  transform: translateX(-100%);
}

.toright-enter{
  transform: translateX(-100%);
}
.toright-leave-to{
  opacity: 0.8;
  transform: translateX(100%);
  position: absolute;
}

.down-enter-active,.down-leave-active{
  transition: all .3s ease;
}
.down-enter,.down-leave-to{
  transform: translateY(70px)
}
</style>
