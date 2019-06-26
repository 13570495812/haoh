<template>
  <div class="Exchange_success">
    <div class="title">
      <div class="back" @click="$router.back('-1')">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="page-name">
        <span>账单详情</span>
      </div>
      <div></div>
    </div>
    <div class="b-val">
      <div class="b-all">
        <span>+<span>{{b_money}}</span></span>
        <span>{{state}}</span>
      </div>
      <div class="b-detal">
        <div>
          <span>交易账号</span>
          <span>{{num_nam}}</span>
        </div>
        <div>
          <span>交易说明</span>
          <span>{{type}}</span>
        </div>
        <div>
          <span>账单分类</span>
          <span>充值</span>
        </div>
        <div>
          <span>创建时间</span>
          <span>{{date_time}}</span>
        </div>
        <div>
          <span>订单号</span>
          <span>{{order_num}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPaySuccessCode} from '@/api/index.js'
  /*import moment from "moment";*/
  import Vue from 'vue';
  import { Icon } from 'vant';

  Vue.use(Icon);
  export default {
    name: "Exchange_success",
    data(){
      return{
        b_money:0,
        num_nam:"",
        type:"",
        date_time:"",
        order_num:"",
        state:"交易成功",
        data:0,
        id:''
      }
    },
    created () {
      console.log(this.$route.params)
      this.id=this.$route.params.id
      this.data=this.$route.params.resurrect
    },
    mounted(){
      let uuid = localStorage.getItem("uuid");
      let params = {ymhaohanToken:uuid};
      if(this.id===""){
        getPaySuccessCode(params).then(res=>{
          console.log(res)
          if(res.code===0){
            this.num_nam = res.data[0].owner;
            this.type = res.data[0].paytype;
            this.date_time = res.data[0].createtime;
            this.order_num = res.data[0].ordercode;
            this.b_money = res.data[0].money;
          }
        });
      }
      else if(this.id!==""){
        this.num_nam = this.data[0].owner;
        this.type = this.data[0].paytype;
        this.date_time = this.data[0].createtime;
        this.order_num = this.data[0].ordercode;
        this.b_money = this.data[0].money;
      }
      /*this.num_nam = JSON.parse(localStorage.getItem("uInf")).username;
      if(this.date_time===""){
        this.date_time = moment(new Date).format('YYYY MM DD , h:mm:ss ');
      }*/
    }
  }
</script>

<style scoped>
  .Exchange_success{
    height: 100%;
    background-color: #ffffff;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #5784fe;
  }
  .title>div{
    color: #ffffff;
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .b-val{
    padding: 3%;
  }
  .b-all{
    text-align: center;
    height: 200px;
    padding: 20px;
  }
  .b-all>span:nth-of-type(1){
    font-size: 40px;
    color: #333333;
    display: inline-block;
    width: 100%;
  }
  .b-all>span:nth-of-type(2){
    font-size: 28px;
    color: #999999;
  }
  .b-detal>div{
    height: 70px;
  }
  .b-detal>div:after{
    display: block;
    content: '';
    clear: both;
  }
  .b-detal>div>span{
    font-size: 28px;
  }
  .b-detal>div>span:nth-of-type(2){
    float: right;
  }
</style>
