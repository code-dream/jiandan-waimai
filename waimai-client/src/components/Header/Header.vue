<template>
  <div class="headTitle">
    <slot name="topLeft"></slot>
    <slot name="topRight"></slot>
    <div class="mainTitle">
      {{title}}
    </div>
  </div>
</template>
<script>
export default {
  props: ['title']
}
</script>
<style lang='stylus'>
.headTitle 
  width: 100%
  height: 48px
  line-height: 48px
  text-align: center
  color: #fff
  background-color: #23a393
  overflow: hidden
  .leftTitle
    float: left
  .rightTitle
    float: right
    padding-right: 8px
  .mainTitle
    font-size: 20px
    text-align: center
    overflow: hidden
    text-overflow: ellipsis 
    white-space: nowrap
</style>
