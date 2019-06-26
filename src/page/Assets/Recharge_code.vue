<template>
  <div class="Recharge_code">
    <div class="title">
      <div class="back">
        <span @click="$router.push('/assets_exchange')">关闭</span>
      </div>
      <div class="page-name">
        <span>充值码详情</span>
      </div>
      <div></div>
    </div>
    <div class="b-val">
      <div class="b-all">
        <span>生成充值码成功</span>
        <span>{{v_code}}</span>
        <van-button type="default" @click="onClick">复制</van-button>
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
  import {getPaySuccessCode} from '@/api/index.js';
  import Vue from 'vue';
  import { Toast } from 'vant';

  Vue.use(Toast);
  export default {
    name: "Recharge_code",
    data(){
      return{
        v_code:"",
        num_nam:"",
        date_time:"",
        order_num:"",
        type:""
      }
    },
    methods:{
      onClick(value){
        console.log(value+"/"+this.v_code);
        Toast.success('复制成功');
      }
    },
    mounted(){
      let uuid = localStorage.getItem("uuid");
      let params = {ymhaohanToken:uuid}
      getPaySuccessCode(params).then(res=>{
        if(res.code===0) {
          this.v_code = res.data[0].code;
          this.num_nam = res.data[0].owner;
          this.type = res.data[0].paytype;
          this.date_time = res.data[0].createtime;
          this.order_num = res.data[0].ordercode;
        }
      });
    }
  }
</script>

<style src="@/assets/css/Button_copy.css"></style>
<style src="@/assets/css/toast.css"></style>
<style scoped>
  .Recharge_code{
    height: 100%;
    background-color: #ffffff;
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
  .b-val{
    padding: 3%;
  }
  .b-all{
    text-align: center;
    height: 450px;
    padding: 20px;
  }
  .b-all>span:nth-of-type(1){
    font-size: 28px;
    color: #333333;
    display: inline-block;
    width: 100%;
  }
  .b-all>span:nth-of-type(2){
    font-size: 70px;
    color: #5784fe;
    display: inline-block;
    width: 100%;
    margin: 50px 0 100px 0;
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
