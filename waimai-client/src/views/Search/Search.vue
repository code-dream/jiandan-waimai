<template>
  <div class="search">
    <headerTitle :title="'搜索'"></headerTitle>
    <div class="searchContent">
      <input type="text" v-model="keyword" placeholder="请输入商家或美食名称">
      <i class="iconfont icon-cha" v-show="keyword" @click="keyword = ''"></i>
      <button @click="handle">提交</button>
    </div>
    <ul class="resultList" v-if="!isshow">
      <li v-for="(data, index) in results" :key="index">
        <div class="pic">
          <img :src="imgBaseUrl + data.image_path" alt="">
        </div>
        <div class="resultContent">
          <div class="title">{{data.name}}</div>
          <div>
            <div class="left">
              <span class="score">{{data.rating}}</span>
              <span class="sell">月售{{data.rating_count}}份</span>
            </div>
            <div class="right">
              <span>22分钟</span>
              <span>{{data.distance}}</span>
            </div>
          </div>
          <div>
            <span>起送￥10</span>
            <!-- <span>{{data.piecewise_agent_fee.tips}}</span> -->
          </div>
          <div class="active">
            <span>{{data.promotion_info}}</span>
          </div>
        </div>
      </li>
    </ul>
    <!-- 没有匹配到的结果 -->
    <div v-if="isshow" class="noresult">没有匹配到的结果</div>
  </div>
</template>
<script>
import headerTitle from '../../components/Header/Header.vue'
export default {
  name: 'search',
  data() {
    return {
      keyword: '',
      imgBaseUrl: 'http://cangdu.org:8001/img/',
      isshow: false
    }
  },
  components: {
    headerTitle
  },
  methods: {
    handle() {
      let {keyword} = this
      if(keyword) {
        this.$store.dispatch('reqShopResult', {keyword})
      }
    }
  },
  computed: {
    results() {
        return this.$store.state.reqResult
    }
  },
  watch: {
    results(v) {
      if(!v.length || !v.status) {
        this.isshow = true
      } else{
        this.isshow = false
      }
    }
  }
}
</script>
<style lang='stylus'>
.search
  width:100%
  height: 100%
  .searchContent
    text-align: center
    margin-top: 10px
    input
      display: inline-block
      width: 70%
      height: 35px
      padding: 0 5px
      color: #aab0b5
      border: 1px solid #bcbab8
      border-radius: 4px
      font-size: 15px
      background-color: #fff
      vertical-align: middle
      outline: none
    .iconfont
      position: absolute 
      font-size: 12px
      color: #aab0b5
      margin-left: -24px
      margin-top: 12px
    button
      width: 20% 
      height: 35px
      vertical-align: middle
      font-size: 18px
      color: #fff
      margin-left: 10px
      background-color: #23a393
      border: 1px
      border-radius: 4px
      outline: none
  .resultList
    width: 94%
    height: calc(100% - 183px)
    overflow: auto
    margin: 10px auto 0
    li
      overflow: hidden
      padding: 10px 0
      border-bottom: 1px solid gray
      .pic
        float: left
        width: 70px
        img 
          width: 100%
          border-radius: 4px
      .resultContent
        font-size: 12px
        color: gray
        margin-left: 75px
        div
          padding: 2px 0
        .title
          color: black
          font-size: 16px
          font-weight: bold
          padding-bottom: 5px
        .left
          float: left 
        .right
          overflow: hidden
          text-align: right
  .noresult
    font-size: 15px
    text-align: center
    background-color: #f2eee0
    padding: 5px 0
    margin-top: 5px
</style>
