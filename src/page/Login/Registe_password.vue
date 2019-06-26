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
				<div>
					<p> +86</p>
				</div>
				<input type="text" v-model="register" placeholder="输入手机号码">
			</div>
			<div>
				<input type="text" v-model="verification" placeholder="验证码">
				<div>
					<p v-show="!timeOver" class="code getCode" @click="gain()">获取验证码</p>
					<p v-show="timeOver" class=" code codeTimer">{{codeTimer}}S</p>
				</div>
			</div>
		</div>
		<div class="next">
			<p @click="tiao">下一步</p>
		</div>
	</div>
</template>

<script>
	import { usermessage, keepConn } from "@/api/index.js";
	export default {
	  data() {
	    return {
	      // 获取验证码状态
	      timeOver: false,
	      codeTimer: 80,
	      // 手机号
				register: "",
	      // 验证码
	      verification: "",
	      uuid: ""
	    };
	  },
	  methods: {
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
	    gain() {
	      // 正则
	      let phoneVal = this.register;
	      let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	      if (!myreg.test(phoneVal)) {
	        this.$toast("请输入正确的手机号格式");
	        return;
	      }
	      if (this.register == "") {
	        this.$toast("请输入正确的手机号");
	      } else {
	        // 倒计时;
	        this.timeOver = true;
	        var auth_timetimer = setInterval(() => {
	          this.codeTimer--;
	          if (this.codeTimer <= 0) {
	            this.codeTimer = 80;
	            this.timeOver = false;
	            clearInterval(auth_timetimer);
	          }
	        }, 1000);
	        // ----
	        let params = {
	          phone: this.register,
	          ymhaohanToken: this.uuid
	        };
	        usermessage(params).then(res => {
	          this.$toast("发送成功");
	          console.log(res);
	        });
	      }
	    },
	    tiao() {
	      if (this.register == "") {
	        this.$toast("请输入手机号");
	        return;
	      }
	      this.$router.push({
	        name: "Registe_passwordtow",
	        params: { verification: this.verification, number: this.register }
	      });
	    },
	    // 会话生成
	    keepConn() {
	      let params = {
	        ymhaohanToken: this.uuid
	      };
	      keepConn(params).then(res => {
	        console.log(res);
	      });
	    }
	  },
	  created() {
	    this.uuidsss();
	    this.uuid = localStorage.getItem("uuid");
	  },
	  mounted() {
	    this.keepConn();
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
	}
	.inpu > :nth-child(2) > input {
	  font-size: 32px;
	  border: none;
	  margin-bottom: 20px !important;
	}
	.inpu > :nth-child(2) > div {
	  width: 60%;
	}
	.inpu > :nth-child(2) > div > p {
	  font-size: 28px;
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
</style>
