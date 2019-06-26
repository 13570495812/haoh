<template>
  <div class="Assets_exchange" style="font-size:28px;">
    <div class="head">
      <div class="title">
        <div class="back" @click="$router.push('/Personal')">
          <van-icon name="arrow-left"></van-icon>
          <span>返回</span>
        </div>
        <div class="page-name">
        </div>
        <div class="more">
          <span @click="$router.push('/assets')">账单</span>
        </div>
      </div>
      <div>
        <div class="money-less">
          <span>账户余额(币)</span>
          <span>￥<span>{{u_user.money}}</span></span>
        </div>
        <div class="coin-less money-less">
          <span>牛牛币(币)</span>
          <span>￥<span>{{u_user.virtual}}</span></span>
        </div>
      </div>
    </div>
    <div class="money-select">
      <div @click="$router.push({name: 'Recharge',params:{ title:'余额充值'}})">
        <img src="@/assets/img/Top-upbalance.png"/>
        <span>余额充值</span>
      </div>
      <div @click="$router.push({name: 'Recharge',params:{ title:'生成充值码'}})">
        <img src="@/assets/img/Topup.png"/>
        <span>为他人充值</span>
      </div>
      <div @click="$router.push({name: 'Exchange_code',params:{ title:'兑换充值码'}})">
        <img src="@/assets/img/Top-upcode.png"/>
        <span>兑换充值码</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { member } from '@/api/index';
  export default {
    name: "Assets_exchange",
    data(){
      return{
        u_user:{
          money: 0,
          virtual: 0,
        }
      }
    },
    mounted(){
      let uuid = localStorage.getItem("uuid");
      let params = {ymhaohanToken:uuid};
      member(params).then(res =>{
        console.log(res);
        if(res.flag==="1"){
          console.log(this.u_user.money,this.u_user.virtual)
          this.u_user.money = res.userinfodetails.money.toFixed(2);
          this.u_user.virtual = res.xunlibi.money.toFixed(2);
        }
      });
    }
  }
</script>

<style scoped>
  .Assets_exchange{
    height: 100%;
    width: 100%;
    background-color: #ffffff;
  }
  .head{
    padding: 3%;
    height: 470px;
    color: #ffffff;
    background-image: url("../../assets/img/Thewalletbackground.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .title{
    display: flex;
    width: 100%;
    color: #ffffff;
    height: 50px;
    line-height: 50px;
  }
  .title>div{
    flex: 1;
  }
  .title>div:nth-of-type(3){
    text-align: right;
  }
  .back{
    display: inline-block;
  }
  .van-icon{
    position: relative;
    top: 2px;
  }
  .money-less{
    text-align: center;
    padding-top: 140px;
    width: 50%;
    float: left;
  }
  .money-less>span{
    display: inline-block;
    width: 100%;
    margin-top: 10px;
  }
  .money-less>span:nth-of-type(2)>span{
    font-size: 50px;
  }
  .money-select{
    width: 100%;
  }
  .money-select:after{
    display: block;
    content: '';
    clear: both;
  }
  .money-select>div{
    float: left;
    width: 33.33%;
    height: 230px;
    text-align: center;
  }
  .money-select>div>img{
    width: 55px;
    height: 55px;
    margin: 60px 0 10px 0;
  }
  .money-select>div>span{
    display: inline-block;
    width: 100%;
    color: #333333;
  }
</style>
