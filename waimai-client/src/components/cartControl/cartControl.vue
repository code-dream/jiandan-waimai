<template>
  <div class="cartContain" :class="{reduceS: size}" @click.stop>
    <transition name="change">
      <div class="reduce"  ref="reduce"  @click="reduce" v-if="food.count">
        <i class="iconfont icon-Group-"></i>
      </div>
    </transition>
    <transition name="fade">
      <div class="count" v-if="food.count">
        {{food.count}}
      </div>
    </transition>
    <div class="add" @click="add">
      <i class="iconfont icon-tianjia"></i>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['food', 'size'],
  methods: {
    add() {
      let {food} = this
      if(this.food.count) {
        this.food.count++
      } else{
        // 因为给数组新增的数据没有被vue添加到事件监听当中去
        Vue.set(this.food, 'count', 1)
        this.$emit('updateCart', {isAdd: true, food})
      }
    },
    reduce() {
      let {food} = this
      if(this.food.count) {
        this.food.count--
        if(this.food.count === 0)
        this.$emit('updateCart',{isAdd: false, food})
      }
    }
  }
}
</script>
<style>
.cartContain{
  padding: 0 10px;
}
.reduce,.count,.add{
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  color: #23a393;
  border-radius: 15px;
  vertical-align: middle;
}
.reduce{
  border: 1px solid #23a393;
}
.count{
  color: #abc1bf;
  width: 28px;
}
.add{
  color: #fff;
  background-color: #23a393;
  border: 1px solid #23a393;
}
.reduceS .reduce, .reduceS .add, .reduceS .count{
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 18px;
}
.reduceS .iconfont{
  font-size: 18px;
}

/* 以下购物车空间按钮的动画效果 */
.change-enter-active, .change-leave-active{
  transition: all .2s;
}
.change-enter,.change-leave-to{
  opacity: 0;
  transform: translateX(60px) rotate(-180deg);
}
.fade-enter-active, .fade-leave-active{
  transition: transform .2s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
  transform: translateX(28px);
}
</style>
