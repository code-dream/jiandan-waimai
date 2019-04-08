<template>
  <div class="login">
    <div class="loginHead">
      <i class="iconfont icon-xiaoyuhao" @click="$router.back()"></i>
    </div>
    <div class="loginContent">
      <!-- 简单的外卖标题 -->
      <div class="loginTitle">简单的外卖</div>
      <!-- 登录方式 -->
      <div class="loginWay">
        <a href="javascript:;" :class="{on: booWay}" @click="loginWay='duanxin'">短信登录</a>
        <a href="javascript:;" :class="{on: !booWay}" @click="loginWay='mima'">密码登录</a>
      </div>
      <!-- 输入框 -->
      <div class="loginInputs">
        <!-- 短信登录 -->
        <div class="loginInput" v-show="booWay">
          <i class="iconfont icon-icon_mobile"></i>
          <input type="text" placeholder="手机号" v-model="phone">
          <button :disabled="!isRightPhone" :class="{isCorr: isRightPhone}" @click="handle">
            {{countDown ? `已发送${countDown}s` : "获取验证码"}}
          </button>
          <br>
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" placeholder="验证码" v-model="code" @keyup.enter='handleSub'>
        </div>
        <!-- 密码登录 -->
        <div class="loginInput mima" v-show="!booWay">
          <i class="iconfont icon-icon_mobile"></i>
          <input type="text" placeholder="手机/邮箱/用户名" v-model="name">
          <br>
          <i class="iconfont icon-mimasuo"></i>
          <input type="text" placeholder="密码" v-if="codeShow" v-model="pwd">
          <input type="password" placeholder="密码" v-else v-model="pwd">
          <!-- 下方是切换显示密码的按钮 -->
          <div class="switch" @click="codeShow=!codeShow">
            <div class="switch_content" :class={on:codeShow}>
              <div class="btn" :class="{btn_on:codeShow}"></div>
              <span>{{codeShow?'abc':' '}}</span>
            </div>
          </div>
          <br>
          <i class="iconfont icon-yanzhengma"></i>
          <input type="text" placeholder="验证码" v-model="captcha" @keyup.enter='handleSub'>
          <!-- 验证码图片 -->
          <img src="http://localhost:4000/captcha"  ref='imgUrl' alt="不支持svg" @click="reqCapcha">
        </div>
      </div>
      <!-- 温馨提示 -->
      <div class="loginTip" v-if="booWay">
        <span class="tipText">
          温馨提示:未注册简单的外卖账号的手机号，登录时将自动注册，且代表已同意
          <span class="loginServe">《用户服务协议》</span>
        </span>
      </div>
      <!-- 提交按钮 -->
      <div class="loginBtn">
        <button @click="handleSub">登录</button><br>
        <span>关于我们</span>
      </div>
    </div>
    <!-- 提示界面 -->
    <div class="alertTip" v-show="alertText">
      <div class="alertContent">
        <div class="alertText">{{alertText}}</div>
        <button @click="alertText = ''">确定</button>
      </div>
    </div>
  </div>
</template>
<script>
import {reqPwdLogin, reqSendCode, reqSmsLogin} from '../../api/index.js'
export default {
  data () {
    return {
      loginWay: 'duanxin', // 登入方式的选择
      phone: '', // 输入的电话号码
      code: '', // 手机验证码
      countDown: 0, // 验证码发送倒计时时间
      codeShow: false, //是否显示密码
      name: '', // 输入的用户名
      pwd: '', // 输入的密码
      captcha: '', // 图形验证码
      alertText: '', // 警告内容
    }
  },
  computed: {
    booWay() {
      return this.loginWay == 'duanxin'
    },
    isRightPhone() {
      return /^1\d{10}$/.test(this.phone)
    }
  },
  methods: {
    async handle() {
      // 开始计时
      if(!this.countDown) {
        this.countDown = 30;
        this.intervalId = setInterval(() => {
          this.countDown--
          if(this.countDown <= 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
      }
      // 发送ajax请求
      const result = await reqSendCode(this.phone)
      if(result.code === 1) {
        this.alertText = result.msg
        this.countDown = 0
        clearInterval(this.intervalId)
      }
    },
    async handleSub() {
      const {isRightPhone, phone,code, name, pwd, captcha} = this
      let result
      if(this.booWay) {
        if(!isRightPhone) {
          this.alertText = '手机号不正确' 
          return
        } else if(!/^\d{6}$/.test(code)) {
          this.alertText = '验证码不正确'
          return
        } else {
          // 输入数据都正确开始向后台传数据
          result = await reqSmsLogin(phone, code)
        }
      } else {
        if(!name) {
          this.alertText = '手机号不正确' 
          return
        } else if(!/^\d{6}$/.test(pwd)) {
          this.alertText = '输入密码不正确'
          return
        } else if(!captcha) {
          this.alertText = '验证码不正确'
          return
        } else {
           // 输入数据都正确开始向后台传数据
           result = await reqPwdLogin(name, pwd, captcha)
        }
      }
      if(result.code === 1) {
        this.alertText = result.msg
        this.countDown = 0
        clearInterval(this.intervalId)
        this.reqCapcha()
      } else if(result.code === 0) {
        const userInf = result.data
        // 将用户登录信息保存到state当中
        this.$store.commit('saveuserinf', {userInf})
        // 跳转到个人个人资料页面
        this.$router.replace('/profile')
      }
    },
    reqCapcha() {
      // 刷新图片验证码
      this.$refs.imgUrl.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>
<style lang='stylus'>
.login
  .loginHead
    height: 48px;
    line-height: 48px;
    background-color: #23a393;
    color: #fff;
    .iconfont
      font-size: 28px;
  .loginContent
    text-align: center;
    .loginTitle
      height: 100px;
      line-height: 100px;
      font-size: 30px;
      font-weight: bold;
      color: #0c907d;
    .loginWay
      height: 40px;
      line-height: 32px;
      a
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        color: #0c907d;
        &:nth-child(1)
          margin-right: 35px;
      .on
        border-bottom: 2px solid #0c907d;
    .loginInput
      line-height: 70px;
      &.mima
        img
          position absolute 
          width 150px
          height 50px
          line-height 50px
          margin-top 9px
          margin-left -150px
          border-radius 4px
      .iconfont
        position: absolute;
        width: 35px;
        height: 50px;
        line-height: 50px;
        font-size: 25px;
        color: #0c907d;
        margin-right: -20px;
        margin-top: 10px;
      button
        position: absolute;
        width: 85px;
        line-height: 50px;
        padding: 0px;
        white-space: nowrap;
        margin-left: -90px;
        margin-top: 10px;
        color: #bcbab8;
        border: 0;
        background-color: transparent;
        outline: none;
      .isCorr
        color: #000;
      input
        width: 80%;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        border: 1px solid #bcbab8;
        border-radius: 4px;
        padding-left: 35px;
        box-sizing: border-box;
        outline-color: #3bb4c1
      .switch
        display: inline-block;
        position: absolute;
        width: 52px;
        height: 50px;
        margin-left: -60px;
        margin-top: 10px;
        line-height: 50px;
      .switch_content
        display: inline-block;
        width: 50px;
        height: 20px;
        text-align: left;
        line-height: 20px;
        vertical-align: middle;
        border: 1px solid #bcbab8;
        border-radius: 40px;
        &.on
          background-color: #75cac3;
          .btn
            transform: translateX(30px)
        .btn
          position: absolute;
          transition: transform .3s;
          width: 20px;
          height: 20px;
          margin-top: -1px;
          margin-left: -1px;
          border-radius: 50%;
          border: 1px solid #bcbab8;
        .btn_on
          background-color: #23a393;
    .loginTip
      .tipText
        display: inline-block;
        width: 82%;
        text-align: left;
        font-size: 14px;
        color: #bcbab8;
        line-height: 22px;
      .loginServe
        color: #0c907d;
    .loginBtn
      margin-top: 20px;
      line-height: 50px;
      color: #bcbab8;
      button
        width: 80%;
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        color: #fff;
        background-color: #57a99a;
        border: 1px solid #57a99a;
        border-radius: 4px;
  .alertTip
    position absolute 
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(100, 100, 100, .7)
    .alertContent 
      position absolute
      left 0
      right 0
      top 0
      bottom 0
      width 60%
      height 200px
      border-radius 8px
      background-color #fff
      margin auto;
      .alertText
        height 160px
        line-height 160px
        text-align center
        font-size 17px
        color #ffb997
      button
        width 100%
        height 40px
        font-size 20px
        font-weight bold
        color #fff
        background-color #23a393
        border 0
        border-radius 0 0 8px 8px
        outline none
</style>
