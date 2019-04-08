<template>
  <div class="evaluation">
    <div>
      <div class="score">
        <div class="scoreL">
          <div class="scroeNum">{{shopInfo.score}}</div>
          <div>综合评分</div>
          <div class="scoreCompare">高于周边商家99%</div>
        </div>
        <div class="scoreR">
          <div class="scoreStar">
            <div class="startDes">
              <Star :score="shopInfo.serviceScore" :size='24'></Star>
            </div>
            <span>服务态度{{shopInfo.serviceScore}}</span>
          </div>
          <div class="scoreStar">
            <div class="startDes">
              <Star :score="shopInfo.foodScore" :size='24'></Star>
            </div>
            <span>商品评分{{shopInfo.foodScore}}</span>
          </div>
          <div class="delivery">
            <span>送达时间</span>
            <span class="deliveryTime">{{shopInfo.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="evaluConfig">
        <div class="evaluBtn">
          <span class="btn">全部{{shopEvaluation.length}}</span>
          <span class="btn">满意28</span>
          <span class="btn">不满意2</span>
        </div>
        <div class="dot"></div>
        <div class="isContent">
          <div class="evac">
            <i class="iconfont icon-gou"></i> 只看有内容的评价
          </div>
        </div>
      </div>
      <ul class="evaluInf">
        <!-- 循环评价内容数组 -->
        <li class="inflist" v-for="(comment, index) in shopEvaluation" :key="index">
          <div class="evaluInfL">
            <img src="./img/none.jpg" alt="">
          </div>
          <div class="evaluInfR">
            <div class="userId">
              <span>{{comment.username}}</span>
              <span class="rateTime">{{comment.rateTime}}</span>
            </div>
            <div class="evaluStar">
              <Star :score="comment.score" :size="24"></Star>
            </div>
            <div class="evaluContent">
              {{comment.text}}
            </div>
            <div class="label">
              <!-- //下面循环标签列表数组 -->
              <div v-for="(label, index) in comment.recommend" :key="index">
                {{label}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import Star from '../../../components/Star/Star.vue'
import Bscroll from 'better-scroll'
export default {
  mounted() {
    this.reqShopEvaluation()
    this.$nextTick(() => {
      new Bscroll('.evaluation', {
        click: true,
        bounce: false
      })
    })
  },
  components: {
    Star
  },
  methods: {
    ...mapActions(['reqShopEvaluation'])
  },
  computed: {
    ...mapState(['shopInfo', 'shopEvaluation'])
    
  }
}
</script>
<style lang='stylus'>
.evaluation
  height calc(100% - 214px)
  background-color #faf9f9
  overflow hidden
  .score
    height: 96px
    text-align: center
    background-color #fff
    padding: 10px
    margin-bottom: 10px
    .scoreL
      float: left
      width: 40%
      font-size: 14px
      .scroeNum
        line-height: 45px
        font-size: 28px
        font-weight: bold
        color: #f77754 
      .scoreCompare
        line-height: 25px
        font-size: 14px
        color: gray 
    .scoreR
      font-size: 14px
      margin-left: 40%
      border-left: 1px solid #dcdbdb 
      .scoreStar
        margin-left: 12%
        line-height: 32px
        .startDes
          display: inline-block
          margin-right: 8%
      .delivery
        margin-left: 10%
        text-align: center
        line-height: 32px
        .deliveryTime
          margin-left: 2px
          font-size: 16px
          color: #74b49b
  .evaluConfig
    padding: 20px
    background-color #fff
    .evaluBtn
      .btn
        display inline-block
        font-size: 14px
        background-color #8fbbaf
        padding: 8px
        border-radius: 4px
        & + .btn
          margin-left: 10px
    .dot
      border-top: 1px dotted #dedede
      margin: 20px 0
    .isContent
      .evac
        display: inline-block
        font-size: 14px
        line-height: 16px
        .iconfont
          font-size: 26px
          color: #d9d9d9
          vertical-align: middle
  .evaluInf
    font-size: 14px
    padding: 0 20px
    background-color #fff
    li.inflist
      padding: 20px 0
      & + li
        border-top: 1px solid #d9d9d9
      .evaluInfL
        float: left
        width: 10%
        height: 100%
        text-align: center
        img
          width: 80%
      .evaluInfR
        margin-left: 12%
        .userId
          .rateTime
            float: right
            color: gray
        .evaluStar
          line-height: 24px
        .evaluContent
          line-height: 20px
        .label
          margin-top: 5px
          overflow: hidden
          div
            float: left
            font-size: 12px
            color: #ffffff
            padding: 3px
            border-radius: 4px
            background-color #74b49b
            margin-right: 2px
</style>

