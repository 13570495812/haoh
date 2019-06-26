<template>
  <div class="homePage">
    <div class="homePage-top">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <div class="homePage-img">
      <img src="../../assets/img/Guidepage4.png" alt="">
    </div>
    <div class="login">
      <div class="left">
        <van-button type="primary" @click="$router.push('/login')">登录</van-button>
      </div>
      <div class="right">
        <van-button type="primary" @click="$router.push('/register')">注册</van-button>
      </div>
    </div>
    <div class="third">
      或第三方账号登录
    </div>
    <div class="thi">
      <div class="left">
        <img src="../../assets/img/wechat4.png" alt="">
      </div>
      <div class="right"><img src="../../assets/img/QQ.png" alt=""></div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  // 按钮
  import { Button } from "vant";
  Vue.use(Button);
  export default {
    data() {
      return {};
    }
  };
</script>
<style scoped>
  .homePage {
    overflow: hidden;
    background-color: #fff;
    width: 100vw;
    height: 100vh;
  }

  .homePage .homePage-top {
    margin: 90px auto;
    text-align: center;
  }

  .homePage-top img {
    height: 94px;
  }
  .homePage .homePage-img {
    margin: 142px auto;
    text-align: center;
    margin-bottom: 250px;
  }
  .homePage-img img {
    width: 371px;
    height: 437px;
  }
  .login {
    width: 641px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .login .left {
    width: 300px;
    height: 78px;
  }
  .login .left button {
    width: 300px;
    height: 78px;
    border: none;
    background-image: linear-gradient(
        90deg,
        rgba(132, 64, 235, 0.9) 0%,
        rgba(87, 132, 254, 0.9) 100%
      ),
      linear-gradient(#ffffff, #ffffff);
    background-blend-mode: normal, normal;
    border-radius: 39px;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #ffffff;
  }
  .login .right button {
    width: 300px;
    border-radius: 39px;
    height: 78px;
    border-style: solid;
    background: none;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #5784fe;
    border-width: 1px;
    border: 1px solid #8367f2;
    border-image-slice: 1;
  }
  .third {
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    margin-top: 79px;
    text-align: center;
    color: #6790fe;
  }
  .thi {
    display: flex;
    margin-top: 43px;
    justify-content: space-between;
    margin-left: 277px;
    margin-right: 277px;
  }
  .thi .left img {
    width: 55px;
    height: 46px;
  }
  .thi .right img {
    width: 41px;
    height: 46px;
  }
</style>
