<template>
  <ul class="star" :class="'star-' + size">
    <li class="starLi star-on" v-for="(item, index) in starArr" :key="index" :class="item"></li>
  </ul>
</template>
<script>
export default {
  props: {
    score: Number,
    size: Number
  },
  computed: {
    starArr() {
      const {score} = this
      const arr = []
      const onNum = Math.floor(score)
      for(let i = 0; i < onNum; i++) {
        arr.push('star-on')
      }
      if(score - onNum >= 0.5) {
        arr.push('star-half')
        for(let i = 0; i < 5 - 1 - onNum; i++) {
          arr.push('star-off')
        }
      } else{
        for(let i = 0; i < 5 - onNum; i++) {
          arr.push('star-off')
        }
      }
      return arr
    }
  }
}
</script>
<style lang='stylus'>
.star
  display: inline-block
  width: 80px
  vertical-align: bottom
  &.star-24
    .starLi
      display: inline-block
      width: 16px
      height: 16px
      line-height 16px
      vertical-align: -2px
      &.star-on
        background: url('./images/star24_on@2x.png') no-repeat
        background-size: contain
      &.star-half
        background: url('./images/star24_half@2x.png') no-repeat
        background-size: contain
      &.star-off
        background: url('./images/star24_off@2x.png') no-repeat
        background-size: contain
  &.star-36
    .starLi
      display: inline-block
      width: 36px
      height: 36px
      &.star-on
        background: url('./images/star36_on@2x.png') no-repeat
      &.star-half
        background: url('./images/star36_half@2x.png') no-repeat
      &.star-off
        background: url('./images/star36_off@2x.png') no-repeat
  &.star-48
    .starLi
      display: inline-block
      width: 48px
      height: 48px
      &.star-on
        background: url('./images/star48_on@2x.png') no-repeat
      &.star-half
        background: url('./images/star48_half@2x.png') no-repeat
      &.star-off
        background: url('./images/star48_off@2x.png') no-repeat
</style>
