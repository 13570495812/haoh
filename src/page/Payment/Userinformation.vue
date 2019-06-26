
<!--
	作者：3098717339@qq.com
	时间：2018-11-12
	描述：用户信息组件
-->
<template>
	<div class="Userinformation" @click="$router.push('/my_address')">
		<div class="Userinformation-left">
			<i></i>
		</div>
		<div class="Userinformation-midder">
			<p>收货人:<span class="user-name"> {{recvName}}</span>
        <span class="user-phone">{{recvPhone}}</span></p>
			<p>收货地址:<span class="user-address">{{addr}}</span></p>
		</div>
		<div class="Userinformation-right">
			<i></i>
		</div>
	</div>
</template>

<script>
import { list } from '@/api/index.js'
export default {
  data() {
    return {

    }
  },
  props:{
	    recvName: '',    //收货人姓名
		recvPhone: '',   //电话
		addr: ''       //地标

  },
  methods: {

  },
  created(){

  }
}
</script>

<style>
p {
  margin: 0;
  padding: 0;
}
.Userinformation {
  background-color: #fff;
  text-align: left;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 20px 0;
  border-image-width: 100%;
  border-bottom: 5px solid transparent;
  border-image: url(../../assets/img/underline.png) 30 round;
}
.Userinformation:after {
  display: block;
  content: '';
  clear: both;
}
.Userinformation .Userinformation-left {
  width: 10%;
}
.Userinformation .Userinformation-left i {
  display: block;
  float: left;
  width: 32px;
  height: 40px;
  background-image: url(../../assets/img/position.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 50px 0 0 20px;
}
.Userinformation .Userinformation-midder {
  width: 80%;
  height: 170px;
  margin-right: 30px;
}
.Userinformation-midder p:first-of-type {
  margin-top: 20px;
  font-size: 32px;
}
.Userinformation-midder p:last-of-type {
  margin-top: 15px;
  font-size: 25px;
}
.Userinformation-midder p:last-of-type .user-address {
  line-height: 1.4em;
}
.Userinformation-midder p:first-of-type .user-phone {
  float: right;
}
.Userinformation-midder p span:first-child {
  margin-left: 10px;
}
.Userinformation-right {
  width: 10%;
}
.Userinformation-right i {
  display: block;
  float: left;
  width: 20px;
  height: 38px;
  background-image: url(../../assets/img/right-arrow.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin: 50px 0 0 30px;
}
</style>
