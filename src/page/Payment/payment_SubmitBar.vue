<template>
	<div class="paymentSubmit">
	<van-submit-bar
  	:price="3050"
  	button-text="确定付款"
  	@submit="onSubmit"
	/>
	</div>
</template>

<script>
	import bus from '../../assets/js/bus.js'
	import { Toast } from 'vant';
	Vue.use(Toast);
	import Vue from 'vue'
	import { SubmitBar } from 'vant';
	Vue.use(SubmitBar);
	export default{
		data(){
			return{

			}
		},
		methods:{
			onSubmit(){
			// const toast = Toast.loading({
			// 	  duration: 0,       // 持续展示 toast
			// 	  forbidClick: true, // 禁用背景点击
			// 	  loadingType: 'spinner',
			// 	  message: '正在加载支付中'
			// 	});
			// 	let second = 1;
			// 	const timer = setInterval(() => {
			// 	  second--;
			// 	  if (second) {
			// 	    toast.message = '正在加载支付中';
			// 	  } else {
			// 	    clearInterval(timer);
			// 	    Toast.clear();
			// 	    bus.$emit('playpay',true);
			// 	  }
			// 	}, 1000);

			}
		}
	}
</script>

<style>
 .paymentSubmit  .van-submit-bar__bar{
	    height: 1.133333rem;
		font-size: 40px;
	}
.paymentSubmit	.van-button--danger{
		background-color: #89a9fe;
		border-color: #89a9fe;
	}
.paymentSubmit	.van-submit-bar .van-button{
		width: 3.033333rem;
		height: 100%;
		font-size: 34px;
	}
.paymentSubmit	.van-submit-bar__price{
		font-size: 30px;
	}
.paymentSubmit	.Submitbar_checked{
		margin-left: 20px;
	}
.paymentSubmit	.Submitbar_checked img {
		float: left;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		margin-top: 5px;
	}
.paymentSubmit	.Submitbar_checked span{
		margin-left: 15px;
				font-size: 30px;
	}
.paymentSubmit	.van-submit-bar__text{
		text-align: left;
	}
.paymentSubmit	.van-submit-bar__text span{
		margin-left: 20px;
	}
	.van-toast--default{
	width: 250px;
	height: 250px;
	background-color: #000000;
	border-radius: 20px;
	opacity: 0.5;
	}
	.van-toast--default .van-toast__text{
		width: 193px;
		height: 27px;
		font-family: HiraginoSansGB-W3;
		font-size: 26px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px;
		letter-spacing: 0px;
		color: #ffffff;
	}
 .van-toast--default .van-loading{
		    width: 83px;
   			 height: 83px;
	}
</style>
