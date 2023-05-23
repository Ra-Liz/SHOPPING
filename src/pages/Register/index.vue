<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登录</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="11位数字" v-model="phone" name="phone" v-validate="{required: true, regex: /^1\d{10}$/}" :class="{invalid: errors.has('phone')}" >
        <span class="error-msg">{{ errors.first('phone') }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="点击获取" :value="code" name="code" v-validate="{required: true, regex: /^1\d{6}$/}" :class="{invalid: errors.has('code')}" >
        <button class="btn-vertify" @click="getVertifyCode">获取验证码</button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="登录密码" v-model="password" name="password" v-validate="{required: true, regex: /^1[0-9A-Za-z]{6, 8}$/}" :class="{invalid: errors.has('password')}" >
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请与登录密码保持一致" v-model="passwordRe" name="password1" v-validate="{required: true, is: password}" :class="{invalid: errors.has('password1')}" >
        <span class="error-msg">{{ errors.first('password1') }}</span>
      </div>
      <div class="controls">
        <input type="checkbox" :checked="agree" name="agree" v-validate="{required: true, 'agree': true}" :class="{invalid: errors.has('agree')}" >
        <span>同意协议并注册《SHOPPING用户协议》</span>
        <span class="error-msg">{{ errors.first('agree') }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机SHOP</li>
        <li>销售联盟</li>
        <li>SHOP社区</li>
      </ul>
      <div class="address">地址：喵喵市喵喵区喵喵楼6层</div>
      <div class="beian">喵ICP备114514号
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RRegister',
  data() {
    return {
      // 表单数据
      phone: '', // 手机号
      vertifyCode: '', // 验证码
      password: '', // 密码
      passwordRe: '', // 重复密码
      agree: 1,
    }
  },
  methods: {
    // 验证码
    async getVertifyCode() { 
      try {
        const { phone } = this
        phone && (await this.$store.dispatch('getVertifyCode', this.phone))
        this.vertifyCode = this.$store.state.user.vertifyCode
      } catch (error) { 
        alert(error.mesasge) 
      }
    },
    // 勾选/取消勾选协议
    // check(event) {}
    // 用户完成注册
    async userRegister() {
      const {phone, vertifyCode, password, passwordRe, agree} = this
      try{
        if (phone && vertifyCode && password && agree && password===passwordRe) {
          await this.$store.dispatch('userRegister', {phone, vertifyCode, password})
          this.$router.push('/login')
        }
      } catch(error) {
        alert(error.mesasge)
      }
    }
  },
  computed: {
    // 验证码
    code() { 
      return this.vertifyCode
    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}

.btn-vertify {
  margin-left: 5px;
  padding: 2px;
  height: 38px;
  border: none;
  background-color: antiquewhite;
}</style>