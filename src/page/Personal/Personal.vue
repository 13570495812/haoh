<template>
  <div class="body">
    <div class="top">
     <div class="top-content">
       <div class="set-d">
         <div @click="$router.push('/setting')">
           <img
             class="set"
             src="@/assets/img/set.png"
           />
           <!--图片上的click失效-->
         </div>
       </div>
       <div class="head-d">
         <div @click="fix_msg">
           <img
             class="head-img"
             :src="head_img==null||head_img==''?def_img:head_img"
           />
           <img
             class="sex"
             v-if="u_user.sex==='0'"
             src="@/assets/img/female.png"
           />
           <img
             class="sex"
             v-if="u_user.sex==='1'"
             src="@/assets/img/male.png"
           />
         </div>
         <span v-if="u_user.realName===''">{{isUInf.username}}</span>
         <span v-if="u_user.realName!==''">{{u_user.realName}}</span>
       </div>
       <div class="more-d">
         <div @click="$router.push('/message_notification')">
          <span
            v-if="msg_count!=0"
            class="remind"
          >{{msg_count}}</span>
           <img
             src="@/assets/img/more3.png"
             class="more"
           />
         </div>
       </div>
     </div>
    </div>
    <div class="behind">
      <div class="num">
        <div
          class="all-num"
          style="background-color: #8bc9fa; color: #fff;"
          @click="$router.push('/assets_exchange')"
        >
          <span class="num-val">￥{{all_money}}</span>
          <span>总资产</span>
        </div>
        <div class="less-num">
          <span class="num-val">￥{{u_user.money}}</span>
          <span>余额</span>
        </div>
        <div class="int-num">
          <span class="num-val">￥{{u_user.virtual}}</span>
          <span>牛牛币</span>
        </div>
      </div>
    </div>
    <div class="user-val">
      <div>
        <div class="img-title">
          <span class="title">我的订单</span>
        </div>
        <div>
          <ul class="goods">
            <li @click="$router.push({path: '/my_order',query:{ index:'0'}})">
              <img src="@/assets/img/Forthepayment.png"/>
              <span>待付款</span>
              <span
                v-if="log===1"
                class="static-num not-active"
              ></span>
            </li>
            <li @click="$router.push({path: '/my_order',query:{ index:'1'}})">
              <img src="@/assets/img/Tosendthegoods.png"/>
              <span>待发货</span>
              <span
                v-if="log===1"
                class="static-num not-active"
              ></span>
            </li>
            <li @click="$router.push({path: '/my_order',query:{ index:'2'}})">
              <img src="@/assets/img/Forthegoods.png"/>
              <span>待收货</span>
              <span
                v-if="log===1"
                class="static-num not-active"
              ></span>
            </li>
            <li @click="$router.push({path: '/my_order',query:{ index:'3'}})">
              <img src="@/assets/img/evaluation.png"/>
              <span>待评价</span>
              <span
                v-if="log===1"
                class="static-num not-active"
              ></span>
            </li>
            <li @click="$router.push({path: '/my_order',query:{ index:'4'}})">
              <img src="@/assets/img/Havethegoods.png"/>
              <span>已完成</span>
              <span
                v-if="log===1"
                class="static-num not-active"
              ></span>
            </li>
          </ul>
        </div>
        <div><span class="title">我的服务</span></div>
        <div>
          <ul class="detal-ul">
            <li @click="$router.push('/my_discount')">
              <img src="@/assets/img/coupons.png" />
              <span>优惠券</span>
              <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/bill_list')">
              <img src="@/assets/img/zhangdan.png" />
              <span>消费账单</span>
              <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/my_address')">
              <img src="@/assets/img/Shippingaddress.png" />
              <span>收货地址</span>
              <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/Collection')">
              <img src="@/assets/img/soucang.png" />
              <span>我的收藏</span>
              <van-icon name="arrow" />
            </li>
            <li @click="$router.push('/contact_us')">
              <img src="@/assets/img/Contactus.png" />
              <span>联系我们</span>
              <van-icon name="arrow" />
            </li>
            <li class="Invitation" @click="$router.push('/invitationcode')">
              <van-icon name="idcard" class="iconss" />
              <span>我的邀请码</span>
              <van-icon name="arrow" />
            </li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <Footers></Footers>
  </div>
</template>

<script>
  import { unRead } from "@/api/index.js";
  import { checklogin } from "@/api/index.js";
  import Footers from "@/components/footer";
  import { member } from "@/api/index";
  import bus from "@/assets/js/bus";
  import Vue from "vue";
  import { Toast } from "vant";

  Vue.use(Toast);
  export default {
    name: "Personal",
    data() {
      return {
        head_img: "",
        uuid: "",
        def_img: require("@/assets/img/personal.png"),
        log: "",
        isUInf: {
          username: "",
          userInfoId: "",
          regTime: "",
          updateTime: ""
        },
        u_user: {
          money: 0,
          virtual: 0,
          sex: "",
          realName: ""
        },
        all_money: 0,
        msg_count: 0,
        weiduxiaoxi:0
      };
    },
    methods: {
      fix_msg() {
        if (this.log === 1) {
          this.$router.push("/personal_msgfix");
        }
      },
      test() {
        console.log("xxxxxx");
      }
    },
    mounted() {
      this.isUInf = JSON.parse(localStorage.getItem("uInf"));
      console.log(this.isUInf);
      let uuid = localStorage.getItem("uuid");
      let params = { ymhaohanToken: uuid };
      member(params).then(res => {
        localStorage.setItem("userInfoId",res.userinfo.userInfoId);
        if (res.flag === "1") {
          this.u_user.realName = res.memberinfo.realName;
          this.u_user.money =( parseInt( res.userinfodetails.money * 100 ) / 100 ).toFixed(2);
          console.log(this.u_user.money)
          this.u_user.virtual = ( parseInt( res.xunlibi.money * 100 ) / 100 ).toFixed(2);
          this.all_money = Number.parseFloat(this.u_user.money) + Number.parseFloat(this.u_user.virtual);
          this.u_user.sex = res.memberinfo.sex;
          this.head_img = res.userinfodetails.header;
        }
      });
      console.log(this.u_user);
      unRead(params).then(res => {
        //获取消息提醒条数
        console.log(res)
        if (res.state === "0") {
          this.msg_count = res.count;
        }
      });
    },
    created() {
    	if(localStorage.getItem('weiduxiaoxi')){
    		this.weiduxiaoxi=localStorage.getItem('weiduxiaoxi')
    		console.log(this.weiduxiaoxi)
    	}
      this.uuid = localStorage.getItem("uuid");
      if (this.$route.query.index) {
        console.log(this.$route.query.index);
        bus.$emit("onclass", this.$route.query.index);
      }
      let params = {
        ymhaohanToken: this.uuid
      };
      checklogin(params).then(res => {
        console.log(res.flag);
        if (res.flag === "1") {
          if (this.uuid === null || this.uuid === "") {
            Toast("登录后显示更多！");
            this.$router.push("/login");
          } else if (this.uuid !== null) {
            this.log = 1;
          }
        } else if (res.flag === "0") {
          Toast("登录后显示更多！");
          this.$router.push("/login");
        }
      });
    },
    components: {
      Footers
    },
   	
  };
</script>

<style scoped>
  .body {
    width: 100%;
    min-height: 100%;
    background-color: #ffffff;
  }
  .top {
    /*头部*/
    display: flex;
    width: 100%;
    height: 300px;
    margin: 0 auto;
    background:#8bc9fa;
  }
  .top-content{
    width: 90%;
    height: 100%;
    padding-top: 0.6rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
  .top:after {
    display: block;
    content: "";
    clear: both;
  }
  .set {
    height: 36px;
    width: 36px;
  }
  .set-d {
    flex: 1;
  }
  .head-d {
    flex: 2;
    position: relative;
    text-align: center;
  }
  .head-d > span {
    display: block;
    width: 100%;
    font-size: 28px;
    color: #ffffff;
    margin-top: 25px;
  }
  .sex {
    position: absolute;
    top: 100px;
    right: 80px;
    height: 48px;
    width: 48px;
  }
  .more-d {
    flex: 1;
  }
  .more-d > div {
    text-align: center;
    float: right;
    width: 35px;
  }
  .remind {
    display: block;
    font-size: 16px;
    color: #ffffff;
    height: 24px;
    line-height: 24px;
    background-color: #ef3d3d;
    border-radius: 12px;
    margin-bottom: 5px;
  }
  .more {
    float: bottom;
    display: block;
    height: auto;
    width: 36px;
    margin-top: 10px;
  }
  .head-img {
    height: 160px;
    width: 160px;
    border-radius: 80px;
    background-color: #e7e7e7;
  }
  .behind {
    width: 100%;
    height: 100px;
    position: relative;
    background-color: #ffffff;
  }
  .num {
    display: flex;
    width: 90%;
    height: 176px;
    position: absolute;
    top: -76px;
    margin: 0 5%;
    background-color: #f7f9f8;
    box-shadow: -1px 0 10px 0 #8bc9fa;
    border-radius: 10px;
    overflow: hidden;
  }
  .num > div {
    color: #8bc9fa;
    flex: 1;
    text-align: center;
  }
  .num-val {
    display: block;
    width: 100%;
    margin: 30px 0 10px 0;
    font-size: 30px;
  }
  .num > div > span:nth-of-type(2) {
    font-size: 26px;
  }
  .user-val {
    display: block;
    position: relative;
    width: 100%;
    height: auto;
    margin-top: -20px;
    background-color: #ffffff;
    box-shadow: 0 -1px 0 0 rgba(131, 47, 215, 0.5);
    z-index: 2;
  }
  .user-val > div {
    margin: 0 5%;
  }
  .title {
    font-size: 28px;
    color: #832fd7;
  }
  .img-title {
    width: 100%;
    height: auto;
    padding-top: 20px;
    font-size: 28px;
    line-height: 40px;
    color: #832fd7;
  }
  .img-title > span:nth-of-type(2) {
    float: right;
    color: #333333;
  }
  .goods {
    width: 100%;
    display: flex;
    margin: 60px 0;
  }
  .goods > li {
    position: relative;
    flex: 1;
    float: left;
    text-align: center;
  }
  .goods > li > img {
    height: 40px;
    width: 45px;
  }
  .goods > li > span:nth-of-type(1) {
    display: block;
    width: 100%;
  }
  .static-num {
    position: absolute;
    top: -10px;
    right: 40px;
    display: inline-block;
    min-width: 24px;
    height: 24px;
    line-height: 24px;
    background-color: #ef3d3d;
    border-radius: 12px;
    font-size: 18px;
    color: #ffffff;
  }
  .goods:after {
    display: block;
    content: "";
    clear: left;
  }
  .detal-ul {
    margin-top: 20px;
  }
  .detal-ul > li {
    position: relative;
    height: 100px;
    line-height: 100px;
  }
  .detal-ul > li:after {
    position: absolute;
    left: 10%;
    bottom: 0;
    width: 95%;
    display: block;
    content: "";
    height: 2px;
    background-color: #e7e7e7;
  }
  .detal-ul > li:last-of-type:after {
    background-color: transparent;
  }
  .detal-ul span {
    font-size: 28px;
    display: inline-block;
    line-height: 100px;
    margin-left: 20px;
  }
  .detal-ul img {
    height: 40px;
    width: 40px;
  }
  .van-icon {
    display: inline-block;
    float: right;
    line-height: 100px;
  }
  .not-active {
    display: none;
  }
  .iconss{
    position: absolute;
    left: 3px;
    font-size: 30px;
    color: #832fd7;
  }
  .Invitation{
    padding-left: 0.6rem;
  }
</style>
