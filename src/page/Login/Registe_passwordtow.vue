<template>
  <div class="register">
    <div class="head">
      <div class="lef" @click="$router.go(-1)">
        <span>
          <van-icon class="icon" name="arrow-left" />
        </span>
        <span>登录</span>
      </div>
      忘记密码
    </div>
    <div class="inpu">
      <div class="inpu1">
        <input type="password" v-model="newpwd" placeholder="新密码">
      </div>
      <div class="inpu2">
        <input type="password" v-model="newpwdtow" placeholder="确认密码">
        <div>
        </div>
      </div>
    </div>
    <div class="next">
      <p @click="affirm">完成</p>
    </div>
  </div>
</template>

<script>
  // 请提示
  import Vue from "vue";
  import { phoneUpdate } from "../../api/index.js";
  import { Toast } from "vant";
  Vue.use(Toast);
  export default {
    data() {
      return {
        // 确认密码
        newpwd: "",
        newpwdtow: "",
        //验证码
        verification: "",
        // 手机号
        number: "",
        uuid: ""
      };
    },
    methods: {
      affirm() {
        if (this.newpwd == "" || this.newpwdtow == "") {
          this.$toast("请输入密码");
          return;
        } else if (this.newpwd !== this.newpwdtow) {
          this.$toast("两次输入密码不一样");
          return;
        } else if (this.newpwd.length < 6 || this.newpwdtow.length < 6) {
          this.$toast("密码需6位数以上");
          return;
        } else {
          let params = {
            newpwd1: this.newpwd,
            newpwd2: this.newpwdtow,
            userName: this.number,
            code: this.verification,
            ymhaohanToken: this.uuid
          };
          phoneUpdate(params).then(res => {
            console.log(res);
            if (res.error == "验证码已过期") {
              this.$toast("无效的验证码");
              return;
            } else if (res.error == "验证码不对") {
              this.$toast("验证码错误");
            } else {
              this.$toast("修改成功");
              this.$router.push({ path: "/login" });
            }
          });
        }
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.verification = this.$route.params.verification;
      this.number = this.$route.params.number;
    }
  };
</script>

<style src='../../assets/css/login.css'></style>
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
    color: #fff;
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
</style>
