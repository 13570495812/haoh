<template xmlns="http://www.w3.org/1999/html">
  <div>
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push('/assets_exchange')"></van-icon>
      </div>
      <div class="page-name">
        <span>{{title}}</span>
      </div>
      <div></div>
    </div>
    <div class="charge">
      <div class="chargetype">
        <span>选择充值</span>
        <span @click="show=true">{{howtocharge}}</span>
        <span>立刻充值</span>
        <span>即时到账</span>
      </div>
      <div class="intmoney">
        <span>充值金额</span>
        <div class="intmoney-i">
          <span>￥</span>
          <input type="number" v-model="intmoney"/>
        </div>               <!--无法阻止特殊字符-->
      </div>
      <div>
        <div class="next-but" @click="charge_code">下一步</div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-picker :columns="columns" show-toolbar @cancel="onCancel" @confirm="onConfirm"/>
      <!--@change="onChange"-->
    </van-popup>
    <!--//支付宝返回项目-->
    <!--复制粘贴功能-->
     <div class="contain" v-if="codeBox">
       <input type="text" v-model="code" class="codeinput">
       <button type="button" class="codebut"
               v-clipboard:copy="code"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError"
       >点击复制兑换码</button>
     </div>
  </div>
</template>

<script>
  import { towxpayRecharge, member ,generatePayCode,toReChargWxPay ,toYuePay ,getPaySuccessCode ,todingdanalipay } from '@/api/index.js';
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  Vue.use(VueClipboard)
  import { Button } from 'vant';
  import { Popup } from 'vant';
  import { Picker } from 'vant';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  Vue.use(Dialog);
  Vue.use(Toast);
  Vue.use(Picker);
  Vue.use(Popup);
  Vue.use(Button);
  export default {
    name: "Recharge",
    data(){
      return{
        uuid: '',
        title:this.$route.params.title,
        howtocharge:"支付宝支付",
        intmoney:'',
        columns: [],
        money:'',
        show:false,
        returnUrl: '', // 网域名
        alipayUrl: "",
        zhifudemo: false,
        couponid: "",
        wxpayRechargeid: '', // 充值码id
        generatePayCodeid: '', // 余额生成的id
        notnull: "", // 定时器
        code: '加载中...', // 验证码
        codeBox: false  // 复制框
      }
    },
    mounted() {
      if (this.title === "生成充值码") {
        this.columns = ['支付宝支付', '微信支付', '余额'];
      } else if (this.title === "余额充值") {
        this.columns = ['支付宝支付', '微信支付'];
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.returnUrl = encodeURIComponent('http://shop.ymhaohan.cn/#/payOk2')
    },
    methods: {
      onCopy: function (e) {
        alert('复制内容为: ' + e.text)
      },
      onError: function (e) {
        alert('复制失败')
      },
      fanhiui: function(){
        if(this.title!='余额充值'){
          this.zhifudemo = false
          this.codeBox = true
        }else{
          this.$router.push('/Personal');
        }
      },
      onCancel() {
        this.show = false;
      },
      onConfirm(value) {
        this.howtocharge = value;
        this.show = false;
      },
      // 关闭复制弹框
      checkCode: function(){
        this.codeBox === false
        if(this.generatePayCodeid!= '' || this.generatePayCodeid != null){
          this.$router.push({path: `/bill/${this.generatePayCodeid}`})
        }
      },
      charge_code() {
        const _this = this
        //为他人充值
        if (this.title === "生成充值码") {
          if (this.howtocharge === "支付宝支付") {
            if (this.intmoney !== 0 || this.intmoney !== "") {
        if (window.plus) {
          plus.payment.getChannels(
            function(channels) {
              let channel = '';
              channels.forEach(item=>{
                if(item.id == 'alipay'){
                  channel = item
                }
              })
              let params = {
                money: _this.intmoney,
                ymhaohanToken: _this.uuid,
                flag: ''
              };
              todingdanalipay(params).then(res => {
                plus.payment.request(
                  channel,
                  res,
                  function(result) {
                      //支付成功，获取充值码 
                      _this.notnull = window.setInterval(_this.getpaysuccess, 1000)
                      _this.codeBox = true
                      back();
                  },
                  function(error) {
                    if (error.code == 62001) {
                      plus.nativeUI.alert("已取消支付");
                    }
                    plus.nativeUI.alert("支付失败");
                    _this.$router.push({
                      path: "/"
                    });
                  }
                );
              });
            },
            function(e) {
              alert("获取支付通道失败：" + e.message);
              this.$router.push({ path: "/", });
            }
          );
        }
            }
          } else if (this.howtocharge === "微信支付") {
            if (this.intmoney !== 0 || this.intmoney !== "") {
              if (window.plus) {
                plus.payment.getChannels(
                  function(channels) {
                    let channel = '';
                      channels.forEach(item=>{
                        if(item.id == 'wxpay'){
                          channel = item
                        }
                    })
                    let params={
                      money: _this.intmoney,
                      js: '',
                      openid: '',
                      flag: '',
                      ymhaohanToken: _this.uuid
                    }
                    towxpayRecharge(params).then(res => {
                      plus.payment.request(
                        channel,
                        res,
                        function(result) {
                          plus.nativeUI.alert(
                            "支付成功！",
                            function() {
                              //支付成功，获取充值码
                              _this.notnull = window.setInterval(_this.getpaysuccess, 1000)
                              _this.codeBox = true
                              back();
                            },
                          );
                        },
                        function(error) {
                          if (error.code == 62001) {
                            plus.nativeUI.alert("已取消支付");
                          }
                          plus.nativeUI.alert("支付失败");
                          this.$router.push({
                            path: "/assets_exchange",
                            params: { index: "0" }
                          });
                        }
                      );
                    });
                  },
                  function(e) {
                    this.$router.push({ path: "/assets_exchange", params: { index: "0" } });
                    alert("获取支付通道失败：" + e.message);
                  }
                );
              }
            }
          } else if (this.howtocharge === "余额") {
            let params = {
              money: this.intmoney,
              ymhaohanToken: this.uuid
            }
            generatePayCode(params).then(res => {
              //余额为他人充值
              this.code = res.data[0].code
              localStorage.setItem("code",this.code);
                _this.generatePayCodeid = res.data[0].id;
                _this.codeBox = true
            })

          }
        }
          //余额充值
          if (this.title === "余额充值") {
            if (this.howtocharge === "支付宝支付") {
              if (this.intmoney !== 0 && this.intmoney !== "") {
                        if (window.plus) {
                          plus.payment.getChannels(
                            function(channels) {
                              let channel = '';
                              channels.forEach(item=>{
                                if(item.id == 'alipay'){
                                  channel = item
                                }
                              })
                              let params = {
                                 money: _this.intmoney,
                                 ymhaohanToken: _this.uuid,
                                 flag:'1'
                              };
                              todingdanalipay(params).then(res => {
                                plus.payment.request(
                                  channel,
                                  res,
                                  function(result) {
                                       plus.nativeUI.alert(
                                        "支付成功！",
                                        function() {
                                          _this.$router.push({
                                            path: "/"
                                          })
                                        }
                                      );
                                  },
                                  function(error) {
                                    if (error.code == 62001) {
                                      plus.nativeUI.alert("已取消支付");
                                    }
                                    plus.nativeUI.alert("支付失败");
                                    _this.$router.push({
                                      path: "/"
                                    });
                                  }
                                );
                              });
                            },
                            function(e) {
                              alert("获取支付通道失败：" + e.message);
                              this.$router.push({ path: "/", });
                            }
                          );
                        }
              }
            }
            else if (this.howtocharge === "微信支付") {
              if (this.intmoney !== 0 && this.intmoney !== "") {
                if (window.plus) {
                  plus.payment.getChannels(
                    function(channels) {
                      let channel = '';
                      channels.forEach(item=>{
                        if(item.id == 'wxpay'){
                          channel = item
                        }
                      })
                      let params={
                        money: _this.intmoney,
                        js: '',
                        openid: '',
                        flag: '1',
                        ymhaohanToken: _this.uuid
                      }
                      towxpayRecharge(params).then(res => {
                        plus.payment.request(
                          channel,
                          res,
                          function(result) {
                            plus.nativeUI.alert(
                              "支付成功！",
                              function() {
                                back();
                              },
                            );
                          },
                          function(error) {
                            if (error.code == 62001) {
                              plus.nativeUI.alert("已取消支付");
                            }
                            plus.nativeUI.alert("支付失败");
                            this.$router.push({
                              path: "/assets_exchange",
                              params: { index: "0" }
                            });
                          }
                        );
                      });
                    },
                    function(e) {
                      this.$router.push({ path: "/assets_exchange", params: { index: "0" } });
                      alert("获取支付通道失败：" + e.message);
                    }
                  );
                }
              }
            }
          }
        },
      //充值成功后，获取充值码信息
      getpaysuccess(){
        console.log(2)
        let params ={
          ymhaohanToken: this.uuid
        }
        getPaySuccessCode(params).then(res =>{
           console.log(3)
         if(res.code === 0){
           this.code = res.data[0].code
           this.wxpayRechargeid = res.data[0].id
           localStorage.setItem("code",this.code );
           clearInterval(this.notnull)
          }else {
             console.log('获取兑换码失败')
             clearInterval(this.notnull)
         }
        })
      }
      }
    }
</script>

<style src="@/assets/css/body.css"></style>
<style src="@/assets/css/Button_next.css"></style>
<style src="@/assets/css/Poplist.css"></style>
<style scoped>
  .contain{
    width:100%;
    height: 30%;
   position: fixed;
    left: 0;
    top: 7%;
    background-image: linear-gradient( 40deg, #832fd7 0%, #6d5aeb 44%, #5784fe 100% );
    border-radius: 8px;
  }
  .codeinput{
    display: block;
    font-size:0.48rem;
    text-align: center;
    width: 5rem;
    height: 0.8rem;
    margin: 0 auto;
    margin-top:1.2rem;
    margin-bottom: 1.1rem;
    border-radius: 10px;
  }
  .codebut{
    display: flex;
    width: 3.3rem;
    height: 1rem;
    font-size: 0.4rem;
    background: #6d5aeb;
    margin:  0 auto;
    padding-left: 0.2rem;
    border: solid 1px #ececec;
    color: #ffffff;
  }
  .zhifu {
    position: fixed;
    width: 100%;
    height:100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .fanhui {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 50px;
  }
  .Method-payment {
    width: 100%;
    font-size: 30px;
    height: 80px;
    line-height: 80px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .Method-payment > div:nth-child(1) {
    margin-left: 40px;
  }
  .Method-payment > div:nth-child(2) {
    margin-right: 40px;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #ffffff;
  }
  .title>div{
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .charge{
    margin: 30px 0;
    padding: 30px;
    background-color: #ffffff;
    height: 480px;
    border-radius: 10px;
  }
  .chargetype{
    height: 120px;
    border-bottom: 1px solid #e7e7e7;
  }
  .chargetype:after{
    display: block;
    content: '';
    clear: both;
  }
  .chargetype>span{
    float: left;
  }
  .chargetype>span:nth-of-type(1){
    display: inline-block;
    height: 120px;
    width: 35%;
  }
  .chargetype>span:nth-of-type(2){
    color: #5784fe;
    display: inline-block;
    width: 59%;
  }
  .chargetype>span:nth-of-type(3){
    margin: 20px 0;
  }
  .chargetype>span:nth-of-type(4){
    margin: 20px;
  }
  .intmoney{
    padding: 4% 0;
    height: 120px;
    /*border-bottom: 1px solid #e7e7e7;*/
  }
  .intmoney-i{
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    padding-top: 0.2rem;
    padding-bottom: 0.4rem;
  }
  .intmoney> .intmoney-i>span{
    font-size: 0.45rem;
    margin: 15px 0;
  }
  .intmoney>span:nth-of-type(1){
    display: inline-block;
    width: 100%;
  }
  .intmoney>span:nth-of-type(2){
    position: relative;
    top: -10px;
    font-size: 50px;
  }
  .intmoney>.intmoney-i>input{
    display: inline-block;
    font-size: 70px;
    border: none;
    width: 90%;
    background-color: transparent;
  }
  .next-but{
    margin: 60px 0;
    width: 100%;
    height: 88px;
    line-height: 88px;
    background-color: #5784fe;
    border-radius: 15px;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 34px;
  }
</style>
