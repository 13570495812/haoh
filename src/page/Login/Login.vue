<template>
  <div class="logo">
    <div
      class="go_index"
      @click="$router.push({path:'/'})"
    >
      <van-icon
        class="icon"
        name="arrow-left"
      />
    </div>
    <div class="logos">
      <img
        src="../../assets/img/loginlogo.png"
        alt=""
        class="logo-font"
      >
    </div>
    <div class="inpu">
      <div class="inpu1">
        <div
          class="empty"
          @click="zeroone"
        >
          <van-icon
            class="icon"
            name="close"
          />
        </div>
        <div>
          <p> +86</p>
        </div>
        <input
          type="text"
          class="inpuone"
          v-model="username"
          placeholder="手机号"
        >
      </div>
      <div class="inpu2">
        <div
          class="empty"
          @click="zeros"
        >
          <van-icon
            class="icon"
            name="close"
          />
        </div>
        <input
          type="password"
          v-model="password"
          class="inputow"
          placeholder="请输入密码"
        >
      </div>
      <div class="logo-pass">
        <p
          class="code"
          @click="$router.push('/registe_password')"
        >忘记密码</p>
      </div>
    </div>
    <div class="next">
      <van-button
        type="primary"
        @click="logins"
      >登录</van-button>
    </div>
    <div
      class="logo-register"
      @click="$router.push('/register')"
    >
      注册
    </div>
    <div class="three-logo">
      <p>或第三方账号登录</p>
      <div
        class="third"
        @click="wxlogin"
      >
        <img
          src="../../assets/img/wechat4.png"
          alt=""
          class="logo-img1"
        >
      </div>
    </div>
  </div>
</template>

<script>
  // 请提示
  import Vue from "vue";
  import { Toast } from "vant";
  Vue.use(Toast);
  import { Checkbox, CheckboxGroup } from 'vant';
  Vue.use(Checkbox).use(CheckboxGroup);
  import { login, appWeiXinAuth } from "../../api/index.js";
  export default {
    data() {
      return {
        username: "",
        password: "",
        uuid: "",
        checked:false,
        uInf: {
          username: "",
          userInfoId: "",
          regTime: "",
          updateTime: ""
        }
      };
    },
    methods: {
      // 微信
      wxlogin() {
        const _this = this;
        if (window.plus) {
          plus.oauth.getServices(
            function(services) {
              let auths = services;
              // plus.nativeUI.showWaiting("微信登录请求中。。。");
              var s = auths[0];

              if (s) {
                s.login(
                  function(e) {
                    s.getUserInfo(
                      function(user) {
                        let params = {
                          access_token: s.authResult["access_token"],
                          openid: s.authResult.openid,
                          ymhaohanToken: _this.uuid
                        };
                        console.log(_this);
                        appWeiXinAuth(params)
                          .then(res => {
                            console.log(res);
                            if (res.code == 1001) {
                              console.log(_this);
                              _this.$router.push({
                                name: "Register",
                                params: { openid: params.openid }
                              });
                            } else if (res.code == -1) {
                              _this.$toast("登陆失败，请重试");
                            } else {
                              _this.$router.push({ path: "/classify" });
                            }
                          })
                          .catch(err => {
                            console.log(err);
                          });
                      },
                      function() {
                        alert("获取信息失败");
                      }
                    );
                  },
                  function(e) {
                    alert("登录失败！");
                  }
                );
              }
            },
            function(e) {
              alert("获取认证服务列表失败：" + e.message + " - " + e.code);
            }
          );
        } else {
          document.addEventListener("plusready", callback);
        }
      },
      zeros() {
        this.password = "";
      },
      zeroone() {
        this.username = "";
      },
      goxieyi(){

      },
      uuidsss() {
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        var uuid = s.join("");
        localStorage.setItem("uuid", uuid);
        this.uuid = localStorage.getItem("uuid", uuid);
      },
      logins() {
        // 正则
        let phoneVal = this.username;
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phoneVal)) {
          this.$toast("请输入正确的手机号格式");
          return;
        }
        if (this.password == "" || this.username == "") {
          this.$toast("请输入账号或者密码");
          return;
        }
            let paramstow = {
              pwd: this.password,
              userName: this.username,
              ymhaohanToken: this.uuid
            };
            login(paramstow).then(res => {
              // this.$toast("登陆成功");
              console.log(res);
              if (res.status == "otherError") {
                this.$toast("账号或密码错误");
                return;
              } else if (res.status == "正常") {
                this.uInf.username = res.userName;
                this.uInf.userInfoId = res.userInfoId;
                this.uInf.regTime = res.regTime;
                this.uInf.updateTime = res.updateTime;
                localStorage.setItem("uInf", JSON.stringify(this.uInf)); //JSON转String存 //String转JSON取
                /*let isUInf = JSON.parse(localStorage.getItem("uInf"));*/
                console.log(
                  res
                );
                this.$router.push({
                  name: "Index", params: {
                    cutId: 1 //是否是登入跳过来的
                  }
                });
              }
            })
      }
    },
    mounted() {
      this.uuidsss();
    }
  };
</script>
<style src='@/assets/css/login.css'></style>
<style scoped>
  .logo {
    height: 100vh;
    width: 100vw;
    overflow: hidden !important;
    background-color: #fff;
  }
  .logos {
    width: 370px;
    height: 275px;
    margin: 130px auto;
    margin-bottom: 30px;
  }
  .logos img {
    width: 100%;
    height: 100%;
  }
  .logo .logo-p {
    font-family: HiraginoSansGB-W3;
    font-size: 40px;
    text-align: center;
    color: #805ec8;
  }
  .inpu {
    margin-top: 130px;
  }
  p {
    text-align: center !important;
    padding: 0;
    margin: 0;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #5784fe;
  }

  .inpu1 {
    display: flex;
    margin: 0 auto;
    position: relative;
    width: 600px;
    border-bottom: 1px solid #000;
    margin-bottom: 66px;
  }
  .inpu1 input {
    width: 516px;
    border: none;
    margin-bottom: 24px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    border-left: 1px solid #000;
    margin-left: 20px;
    text-indent: 24px;
  }
  .inpu1 p {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
  }
  .inpu2 {
    border-bottom: 1px solid #000;
    display: flex;
    margin: 0 auto;
    position: relative;
    width: 600px;
  }
  .inpu2 input {
    width: 100%;
    margin-bottom: 24px;
    font-size: 28px;
    border: none;
  }
  .logo-pass {
    width: 600px;
    margin: 0 auto;
    overflow: hidden;
  }
  .logo-pass .code {
    float: right;
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    margin-top: 20px;
  }
  .next button {
    width: 600px;
    height: 88px;
    background-color: red;
    background-blend-mode: normal, normal;
    border-radius: 44px;
    margin: 0 auto;
    display: block;
    margin-top: 100px;
    border: none;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #ffffff;
  }
  .empty {
    position: absolute;
    right: 10px;
  }
  .empty .icon {
    font-size: 26px;
    top: 5px;
  }
  .logo-register {
    text-align: center;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    margin: 60px;
    /*margin-bottom: 100px;*/
  }
  .three-logo {
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    text-align: center;
  }
  .third {
    margin: 0 auto;
    width: 60px;
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
  }
  .third img {
    width: 55px;
    height: 46px;
  }
  .go_index {
    position: absolute;
    top: 30px;
    left: 30px;
  }
  .go_index .icon {
    font-size: 36px;
    color: #404040;
  }
</style>
