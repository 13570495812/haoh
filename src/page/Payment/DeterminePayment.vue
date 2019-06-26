<!--
	作者：3098717339@qq.com
	时间：2018-11-13
	描述：确定付款模块
-->
<template>
	<div class="DeterminePayment">
		<div class="Dmp-header">
			<span @click="gobackPay"></span>
			<h2>确定付款</h2>
		</div>
		<div class="Dmp-midder">
			<h1 class="Dmp-money">￥69.00</h1>
			<p class="Dmp-Supportaccount clearfix">
				<span>支付账号</span>
				<span>136******45 李*维</span>
			</p>
			<p class="Dmp-Supportaccount clearfix">
				<span>支付方式</span>
				<span @click="PaymentMethod">账号余额<i></i></span>
			</p>
		</div>
		<div class="ImmediatePayment">
			<button>立即付款</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			gobackPay(){
				this.$emit('gobackPay');
			},
			PaymentMethod(){
				this.$emit('PaymentMethod',true);
			}
		}
	}
</script>

<style>
	.clearfix:after{
		display: block;
		content: "";
		clear: both;
	}
	.clearfix{
		zoom: 1;
	}
	.DeterminePayment{
		position: relative;
		width: 100%;
		height: 980px;
		background-color: #ffffff;
		bottom: 0;
	}
	.DeterminePayment .Dmp-header span{
		display: block;
		float: left;
		width: 30px;
		height: 30px;
		background-image: url(../../assets/img/delete.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		float: left;
		margin-left: 24px;
		margin-top: 10px;
	}
	.DeterminePayment .Dmp-header h2{
    text-align: center;
		font-family: HiraginoSansGB-W3;
		font-size: 34px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px;
		letter-spacing: 0px;
		margin-right: 40px;
	}
	.Dmp-midder .Dmp-money{
    text-align: center;
		margin-top: 120px;
		margin-left: -10px;
		font-size: 60px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px;
		letter-spacing: 0px;
	}
	.Dmp-midder .Dmp-Supportaccount{
		margin: 60px 0;
	}
	.Dmp-midder .Dmp-Supportaccount span:first-of-type{
		float: left;
		font-family: HiraginoSansGB-W3;
		font-size: 34px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		margin-left: 20px;
		color: #999;
	}
	.Dmp-midder p:last-of-type{
		margin-top: 20px !important;
	}
	.Dmp-midder .Dmp-Supportaccount span:last-of-type{
		float: right;
		font-size: 32px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px;
		letter-spacing: 0px;
		color: #333333;
		margin-right: 20px;
	}
	.Dmp-midder .Dmp-Supportaccount span:last-of-type i{
		display: block;
		float: right;
		width: 18px;
		height: 33px;
		background-image: url(../../assets/img/right-arrow.png);
		background-size: 100% 100%;
		margin:0 15px;
	}
	.ImmediatePayment button
	{	position:absolute;
		left: 5%;
		bottom: 20px;
		width: 90%;
		height: 88px;
		background-color: #89a9fe;
		border-radius: 15px;
		border: none;
		color: white;
	}
</style>
