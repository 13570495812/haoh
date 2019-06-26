<template>
	<div class="ShoppingCart">
    <div class="ShoppingCart-wraps">
		 <ShoppingCartHeader :controlName=controlName @oncontrol='oncontrol'></ShoppingCartHeader>
		 <shopping-cart-control v-show="iscontrol"></shopping-cart-control>
  		 <ShoppingCartBody :isnull=isNonull  > </ShoppingCartBody>
    </div>
      <SubmitBar></SubmitBar>
	</div>
</template>

<script>
import Vue from 'vue'
import ShoppingCartHeader from './ShoppingCart_header'
import ShoppingCartBody from './ShoppingCart_body'
import ShoppingCartControl from './ShoppingCart_control.vue'
import SubmitBar from './Commodity_cart_SubmitBar.vue'
import {GetloginStatus} from'@/api/index.js'
export default {
   data(){
   	 return {
   	 	controlName:"管理",
       // CartArray:[],
       isNonull:false,
   	 	iscontrol:false,
       uuid:0
   	 }
   },
   components:{
   	 ShoppingCartHeader,
   	 ShoppingCartBody,
   	 ShoppingCartControl,
     SubmitBar
   },
   methods:{
   	  oncontrol(){
   	  	if(!this.iscontrol){
   	  		 this.controlName='完成';
   	  	    this.iscontrol=true;
   	  	}else{
   	  		 this.controlName='管理';
   	  	    this.iscontrol=false;
   	  	}

   	  },
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
      }

   },
   mounted(){
     GetloginStatus({isService:0,ymhaohanToken:this.uuid}).then(res=>{
     if(res.flag=='0'||res.cartlist==false){
       this.isNonull=false;
       console.log(res)
     }else{
       this.isNonull=true;
       console.log(res)
       console.log(res.cartlist["0"].updateTime)
       console.log(this.timestampToTime(res.cartlist["0"].updateTime));
     }
     })
   },
  created() {
    //获取uuid
    this.uuid = localStorage.getItem("uuid");
  }
}
</script>
<style >
	.ShoppingCart{
		position: fixed;
    width: 100%;
    height: 88%;
		background-color: #fafafa;
    margin-bottom: 80px;
	}
  .van-toast{
    font-size: 34px !important;
    line-height: 1.5em !important;
  }
</style>
