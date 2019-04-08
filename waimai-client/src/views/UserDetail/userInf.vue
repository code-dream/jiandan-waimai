<template>
  <div class="userInfo">
    <div class="info">
      <div class="pic"><img src="./image/touxiang.jpg" alt="头像"></div>
      <div class="userName">{{userInf.name||userInf.phone}}</div>
    </div>
    <div class="zz">个人资料</div>
    <ul class="detail">
      <li class="item">
        <span class="label">性别：</span>
        <span class="content">{{userInf.sex}}</span>
        <div class="edit">
          <i class="iconfont icon-icon-" @click="$router.push('./userEdit/' + '性别')"></i>
        </div>
      </li>
      <li class="item">
        <span class="label">生日：</span>
        <span class="content" v-if="userInf.birthday">{{userInf.birthday.year}}年 {{userInf.birthday.month}}月 {{userInf.birthday.day}}日</span>
        <div class="edit">
          <i class="iconfont icon-icon-" @click="$router.push('./userEdit/' + '生日')"></i>
        </div>
      </li>
      <li class="item">
        <span class="label">所处地区：</span>
        <span class="content">{{userInf.area}}</span>
        <div class="edit">
          <i class="iconfont icon-icon-" @click="$router.push('./userEdit/' + '所处地区')"></i>
        </div>
      </li>
      <li class="item">
        <span class="label">职业：</span>
        <span class="content">{{userInf.occuption}}</span>
        <div class="edit">
          <i class="iconfont icon-icon-" @click="$router.push('./userEdit/' + '职业')"></i>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['userInf'])
  }
}
</script>
<style lang='stylus'>
  .userInfo
    width: 100%
    .info
      text-align: center
      font-size: 20px
      .pic
        line-height: 130px
        img
          width: 100px
          height: 100px
          border: 1px solid gray
          border-radius: 50%
          vertical-align: middle
    .zz
      font-size: 18px
      padding: 10px
      margin-top: 20px
      border-bottom: 1px solid gray
      &::before
        content: ''
        display: inline-block
        width: 18px
        height: 3px
        border-top: 3px solid gray
        border-bottom: 9px double gray
    .detail
      .item
        position: relative
        line-height: 50px
        border-bottom: 1px solid
        .label
          padding-left: 10px
        .edit
          diaplay: inline-block
          position: absolute
          top: 0
          right: 10px
          .iconfont
            font-size: 24px
            font-weight: bold
            cursor: pointer
            color: #23a393
</style>
