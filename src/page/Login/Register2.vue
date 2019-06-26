<template>
  <div class="register">
    <div class="agreement">
      <div class="top">
        点击上方“完成”按钮，即表示你同意
      </div>
      <div class="butt">
        《好汉商城注册使用协议》
      </div>
    </div>
    <div class="head">
      <div
        class="lef"
        @click="$router.go(-1)"
      >
        <span>
          <van-icon
            class="icon"
            name="arrow-left"
          />
        </span>
        <span>登录</span>
      </div>
      注册
    </div>
    <div class="inpu">
      <div class="inpu1">
        <input
          type="text"
          placeholder="邀请码" v-model="Invitation" 
        >
      </div>
      <div class="inpu2">
        <input
          type="password"
          v-model="pwd"
          placeholder="输入密码"
        >
        <div>
        </div>
      </div>
    </div>
    <div class="next">
      <p @click="accomplish">完成</p>
    </div>
  </div>
</template>

<script>
  import { add } from "../../api/index.js";
  import Vue from "vue";
  import { Toast } from "vant";
  Vue.use(Toast);
  export default {
    data() {
      return {
        //验证码
        invite: "",
        // 邀请码
        Invitation:'',
        pwd: "",
        number: "",
        uuid: "",
        openid: ""
      };
    },
    methods: {
      accomplish() {
        let params = {
          phoneCode: this.invite,
          pwd: this.pwd,
          userName: this.number,
          spreadCode:this.Invitation,
          ymhaohanToken: this.uuid
        };
        if (this.pwd == "") {
          this.$toast("请输入密码");
        } else {
          if (this.openid) {
            params.openid = this.openid;
          }
          add(params).then(res => {
            if (res.err == "手机验证码不对") {
              this.$toast("手机验证码不对");
            } else if (res.err == "此手机已被注册。") {
              this.$toast("此手机已被注册");
            } else if (res.err == "OK") {
              this.$toast("注册成功");
              this.$router.push({ path: "/login" });
            }
            console.log(res);
          });
        }
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.invite = this.$route.params.verifica;
      this.number = this.$route.params.number;
      this.openid = this.$route.params.openid;
      this.Invitation = this.$route.params.Invitation;
    }
  };
</script>

<style scoped>
  .register {
    height: 100vh;
    width: 100vw;
    background: #ffffff;
  }
  .head {
    text-align: center;
    font-size: 32px;
    color: #333333;
    height: 88px;
    line-height: 88px;
    position: relative;
  }
  .head .lef {
    position: absolute;
    left: 24px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    top: 0px;
    color: #333333;
  }
  .head .lef .icon {
    color: #333333;
    vertical-align: middle;
  }
  .inpu {
    margin-top: 192px;
    text-align: center;
  }
  .inpu > :nth-child(1) {
    border-bottom: 1px solid rgb(132, 112, 247);
    margin: 0 auto;
    display: flex;
    justify-content: start;
    width: 80%;
    align-items: center;
    margin-bottom: 1px;
    padding-bottom: 20px;
  }
  .inpu > :nth-child(1) > div {
    border-right: 1px solid rgb(132, 112, 247);
    padding: 0 10px;
  }
  .inpu > :nth-child(1) > input {
    font-size: 32px;
    border: none;
    margin-bottom: 0;
  }
  input::-webkit-input-placeholder {
    color: #c5d4fc;
  }
  .inpu > :nth-child(1) > div > p {
    font-size: 32px;
    color: rgb(132, 112, 247);
    margin: 0;
  }
  .inpu > :nth-child(2) {
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(132, 112, 247);
    width: 80%;
    margin: 28px auto;
    align-items: center;
    margin-top: 80px;
    padding-bottom: 20px;
  }
  .inpu > :nth-child(2) > input {
    font-size: 32px;
    border: none;
    margin-bottom: 0;
  }
  .inpu > :nth-child(2) > div {
    width: 60%;
  }
  .inpu > :nth-child(2) > div > p {
    font-size: 32px;
    color: rgb(86, 60, 231);
  }
  .inpu > :nth-child(3) {
    padding-top: 0.2rem;
    color: rgb(132, 112, 247);
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
  }
  .inpu > :nth-child(3) > p {
    font-size: 28px;
    color: rgb(132, 112, 247);
  }
  .inpu > :nth-child(4) {
    margin: 0 auto;
    margin-top: 32px;
    width: 80%;
    height: 36px;
    background-size: 100%;
  }
  .inpu > :nth-child(4) > p {
    font-size: 28px;
    text-align: center;
    color: #ffffff;
    padding: 20px;
  }
  .next p {
    width: 80%;
    height: 88px;
    margin: 132px auto;
    border-radius: 44px;
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    line-height: 88px;
    background: -webkit-linear-gradient(
      left,
      #d3baf8,
      #c2d3ff
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
      right,
      #d3baf8,
      #c2d3ff
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
      right,
      #d3baf8,
      #c2d3ff
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #d3baf8, #c2d3ff); /* 标准的语法 */
  }
  .foot {
    width: 408px;
    height: 60px;
    font-family: HiraginoSansGB-W3;
    margin: 260px auto 20px;
  }
  .foot p {
    font-size: 24px;
    line-height: 36px;
    color: #999999;
    text-align: center;
  }
  .agreement {
    position: absolute;
    bottom: 30px;
    text-align: center;
    width: 100%;
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #999999;
  }
  .agreement .top {
    margin-bottom: 10px;
  }
  .Invitation{
    font-size: 30px;
  }
  .Invitation div:last-child{
    width: 500px;
  }
</style>
