<template>
  <div class="Message_notification">
    <div class="title">
      <div class="back">
        <van-icon
          name="arrow-left"
          @click="$router.push({name:'Personal',params:{index:'4'}})"
        ></van-icon>
      </div>
      <div class="page-name">
        <span>我的邀请码</span>
      </div>
      <div></div>
    </div>
    <div class="show_n_e">
      {{userinforid}}
    </div>
    <button @click="wxshare">邀请好友加入</button>
  </div>
</template>

<script>
  import { member } from "@/api/index";
  export default {
    name: "Message_notification",
    data() {
      return {
        uuid: "",
        number: "020-4545321",
        email: "www.yanghfe@163.com",
        userinforid: ""
      };
    },
    methods: {
      // 调用拨号功能
      callPhone(phoneNumber) {
        window.location.href = "tel://" + phoneNumber;
        console.log("call phone");
      },
      wxshare() {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
          //5+ 原生分享
          window.plusShare(
            {
              title: "好汉商城", //应用名字
              content: "这是分享的具体内容....",
              href: 'http://shop.ymhaohan.cn/#/register?'+this.userinforid, //分享出去后，点击跳转地址
              thumbs: ["https://api.ixiaowai.cn/api/api.php?b5b7a50d"] //分享缩略图
            },
            function(result) {
              //分享回调
            }
          );
        } else {
          //原有wap分享实现
        }
      }
    },
    mounted() {
      this.uuid = localStorage.getItem("uuid");
      let params = { ymhaohanToken: this.uuid };
      member(params).then(res => {
        if (res.flag === "1") {
          this.userinforid = res.userinfo.userName;
          console.log(this.userinforid);
        }
      });
    }
  };
</script>

<style scoped>
  .Message_notification {
    height: 100%;
    background-color: #ffffff;
  }
  .title {
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #5784fe;
    color: #ffffff;
  }
  .title > div {
    flex: 1;
  }
  .page-name {
    font-size: 32px;
    text-align: center;
  }
  .show_n_e {
    font-size: 40px;
    text-align: center;
    padding-top: 200px;
  }
  button {
    width: 400px;
    border: none;
    color: #fff;
    margin: 100px auto;
    display: block;
    height: 100px;
    font-size: 40px;
    background-color: #5784fe;
  }
</style>

