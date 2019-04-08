<template>
  <div class="foodScroll">
    <div class="wrapone">
      <ul class="foodLeft">
        <li v-for="(item, index) in foods" :key='index' :class="{on: index === currentIndex}" @click="scrollTo(index)">
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="wraptwo">
      <ul class="foodRight" ref="right">
        <li class="content" v-for="(item,index) in foods" :key='index'>
          <div class="title">{{item.name}}</div>
          <ul class="foodType">
            <li v-for="(food,index) in item.foods" :key='index' @click="showFood(food)">
              <div class="pic">
                <img :src="food.image" alt="">
              </div>
              <div class="detail">
                <div>{{food.name}}</div>
                <div class="da">{{food.description}}</div>
                <div class="da">
                  <span>月销{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div>
                  <span class="pricea">￥{{food.price}}</span>
                </div>      
              </div>
              <div class="carAdd">
                  <CartControl :food='food' @updateCart="updateCart"/>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 以下为食物详情弹出图 -->
    <transition name="hello">
      <Food v-if="isShow" :food="food" @closeTip="isShow = false" @updateCart="updateCart"/>
    </transition>
    <!-- 以下是购物车元素 -->
    <Cart :cartFood="cartFood" @updateCart="updateCart"/>
  </div>
</template>
<script>
import{reqShopFood} from '../../../api/index.js'
import BScroll from 'better-scroll'
// 之所以要将购物车控件另外写成一个组件，是因为后面还有一个组件要用到这个控件
import CartControl from '../../../components/cartControl/cartControl.vue'
import Food from '../../../components/Food/food.vue'
import Cart from '../../../components/Cart/cart.vue'
export default {
  name: 'shopFood',
  data() {
    return {
      foods: [],
      food: {}, 
      offsets: [], // 收集右边各菜单类的垂直高度
      scrollY: 0, // 右侧滑动组件的scrollTop值
      rScroll: null, // better-scroll对象
      isShow: false, // 控制食物弹出图显示/隐藏
      cartFood: [] // 购物车选中的商品列表
    }
  },
  async mounted() {
    const result = await reqShopFood()
    this.foods = result.data
    this.$nextTick(() => {
      this.getLiOffset()
      this.initScroll()
    })
  },
  computed: {
    currentIndex() {
      const {scrollY, offsets} = this
      const index = offsets.findIndex((item, index) => {
        return scrollY>=item && scrollY<offsets[index+1]  
      })
      return index
    }
  },
  methods: {
    initScroll() {
      new BScroll('.wrapone', {
        click: true,
        bounce: false

      })
      this.rScroll = new BScroll('.wraptwo', {
        probeType: 2,
        click: true,
        bounce: false,
        momuntum: true,
        swiperTime: 1800
      })
      // 取到右边滚动距离顶部的高度
      this.rScroll.on('scroll', ({x, y}) => {
        x
        this.scrollY = Math.abs(y)
      })
      this.rScroll.on('scrollEnd', ({x, y}) => {
        x
        this.scrollY = Math.abs(y)
      })
    },
    // 各个类型标题距离包含框顶部的高度
    getLiOffset() {
      let {offsets} = this
      let offset = 0
      offsets.push(offset)
      const lis = this.$refs.right.getElementsByClassName('content')
      Array.prototype.slice.call(lis).forEach((item) => {
        offset += item.clientHeight
        offsets.push(offset)
      })
      this.offsets = offsets
    },
    // 点击左侧分类栏相应右侧的内容跟随变动
    scrollTo(index) {
      let y = this.offsets[index]
      this.scrollY = y
      this.rScroll.scrollTo(0, -y, 800)
    },
    showFood(food) {
      this.food = food
      this.isShow = true
    },
    updateCart({isAdd, food}) {
      if(isAdd) {
        this.cartFood.push(food)
      } else{
        let index = this.cartFood.indexOf(food)
        this.cartFood.splice(index, 1)
      }
    }
  },
  components: {
    CartControl,
    Food,
    Cart
  }
}
</script>
<style lang='stylus'>
.foodScroll
  height: calc(100% - 220px)
  .wrapone
    float: left
    background-color: #faf9f9
    height: 100%
    overflow: hidden
    .foodLeft
      font-size: 14px
      .on
        color: rgb(35,163,147)
        background-color: #fff
      li
        width: 90px
        text-align: center
        span
          display: inline-block
          width: 70px
          border-bottom: 1px solid #dcdcdc
          padding: 15px 0
        &:last-child
          span 
            border-bottom: 0px
  .wraptwo
      height: 100%
      margin-left: 90px
      overflow: hidden
    .foodRight
      li
        .title
          line-height: 30px
          font-size: 14px
          background-color: #faf9f9
          padding-left: calc(5% - 4px)
          border-left: 4px solid #eaeaea
        .foodType
          li
            position: relative
            width: 95%
            margin-left: 5%
            border-bottom: 1px solid #d4d0d0
            overflow: hidden
            padding: 10px 0
            .pic
              float: left
              margin-right: 10px
              img 
                width: 70px
                height: 70px
                border-radius: 5px;
                vertical-align: -16px
            .detail
              position: relative
              overflow: hidden
              div
                padding: 4px 0
              div:first-child
                font-size: 14px
                font-weight: bold
              .da
                font-size: 12px
                color: gray
                overflow: hidden
                white-space: nowrap
                text-overflow: ellipsis
              .pricea
                font-size: 16px
                color: red
            &:last-child
              border: 0px
            .carAdd
              position: absolute 
              bottom: 10px
              right: 0px
              .add, .reduce
                width: 20px
                height: 20px
                line-height: 20px
              .iconfont
                font-size: 16px
  .hello-enter-active,.hello-leave-active
    transition: opacity .3s
  .hello-enter, .hello-leave-to
    opacity: 0
</style>