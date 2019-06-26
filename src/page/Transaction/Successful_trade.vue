<template>
  <div class="g-static">
    <span><van-icon name="completed" /><span style="margin-left: 10px">{{static}}</span></span>
    <span>{{s_static}}</span>
  </div>
</template>

<script>
  import { Icon } from 'vant';
  import Vue from 'vue'
  Vue.use(Icon);
  import {pdetail} from '@/api/index.js'
  export default {
    name: "Success_trade",
    data(){
      return{
        static:"交易成功",
        s_static:"商品您已签收，期待再次为您服务",
        img_url:"",
      }
    },
    props:['status']
    ,
    mounted(){
      if(this.status=='待付款'){
        this.static='等待买家付款';
        this.s_static='请尽快付款';
      }else if(this.status=='待发货'){
        this.static='等待商家发货';
        this.s_static='商家正在检验打包中...';
      }else if(this.status=='待收货'){
        this.static='商品已在路上';
        this.s_static='派送员已朝您狂奔而来，请保持通讯畅通';
      }else if(this.status=='待评价'){
        this.static='交易成功';
        this.s_static='商品您已签收，期待再次为您服务';
      }
      // let uuid = localStorage.getItem("uuid");
      // let num;
      // let params = {ymhaohanToken:uuid,out_trade_no:num}
      // this.img_url = require("@/assets/img/Asuccessfuldeal.png");
      // pdetail(params).then(res=>{
      //   this.img_url = require("@/assets/img/Asuccessfuldeal.png");
      // })
    }
  }
</script>

<style scoped>
  .g-static{
    height: 190px;
    text-align: center;
    background-color: #89a9fe;
  }
  .g-static>span{
    display: inline-block;
    color: #ffffff;
  }
  .g-static>span:nth-of-type(1){
    width: 100%;
    margin-top: 50px;
    font-size: 34px;
  }
  .g-static>span:nth-of-type(2){
    margin-top: 10px;
    font-size: 26px;
  }
  .g-static>span:nth-of-type(1)>img{
    position: relative;
    top: 5px;
    width: 39px;
    height: 37px;
    margin-right: 30px;
  }
</style>
