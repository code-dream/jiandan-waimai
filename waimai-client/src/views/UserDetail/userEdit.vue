<template>
  <div class="userEdit">
    <div class="edit">
      <input type="text" v-model="newValue" :placeholder="'请输入更新后的' + propery">
    </div>
    <div class="tip">请谨慎修改个人信息</div>
    <div class="btn" @click="handle">
      <button>确认修改</button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['propery'],
  data() {
    return {
      newValue: ''
    }
  },
  methods: {
    handle() {
      const {propery} = this
      const data = {}
      let a = ''
      switch(propery) {
        case '性别': 
          data.sex = this.newValue
          a = 'sex'
          break
        case '生日': 
          data.birthday = this.newValue
          a = 'birthday'
          break
        case '所处地区': 
          data.area = this.newValue
          a = 'area'
          break
        case '职业': 
          data.occuption = this.newValue
          a = 'occuption'
          break
      }
      this.$store.dispatch('updateUserInf', {a, data})
      this.$router.back()
    }    
  }
}
</script>
<style lang='stylus'>
  .userEdit
    .edit
      margin-top: 20px
      input
        width: 100%
        font-size: 15px
        padding: 10px 5px
        box-sizing: border-box
        color: gray
    .tip
      font-size: 12px
      padding: 10px 5px
      color: pink
    .btn 
      text-align: center
      button 
        width: 90%
        line-height: 30px
        color: #fff
        font-size: 18px
        border-radius: 4px
        border: 2px solid #23a392
        box-shadow: 2px 1px 4px gray
        background-color #23a392
</style>
