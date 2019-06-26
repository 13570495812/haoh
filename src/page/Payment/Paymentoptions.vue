<!--
	作者：3098717339@qq.com
	时间：2018-11-13
	描述：选择支付组件
-->
<template>
	<div class="Paymentoption">
		<div class="Paymentoption-header">
			<van-nav-bar
			  title="选择支付方式"
			/>
			<ul>
				<li class="Account-balance clearfix" @click="topay(0)">
					<span></span>
					<div class="Returnpurchase_ctn">
					<p>账户余额</p>
					</div>
				</li>
				<li class="WeChat-payment" @click="topay(1)">
					<span></span>
					<div class="Returnpurchase_ctn">
					<p>微信支付</p>
					</div>
				</li>
				<li class="Alipay-payment" @click="topay(2)">
					<span></span>
					<div class="Returnpurchase_ctn">
					<p>支付宝支付</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { NavBar } from 'vant';
	Vue.use(NavBar);
	export default{
		data(){
			return{
				bystages:false,
				isonpay:false
			}
		},
    props:['yue'],
		methods:{
			PaymentMethod(){
				this.$emit('PaymentMethod',false);
			},
      topay(index){
			  if(index==0){
			    this.$emit('topayye') //余额支付
        }else if(index==1){
          this.$emit('topaywx') //微信支付
        }else if(index==2){
          this.$emit('topayal') //支付宝支付
        }
      }
		}
	}
</script>

<style>
	.clearfix:after{
		display: block;
		content: '';
		clear: both;
	}
	.Paymentoption{
		position: relative;
		width: 100%;
		height: 980px;
		background-color: #ffffff;
		bottom: 0;
	}
	.Paymentoption-header{
		width: 100%;
		height: 98px;
		background-color: #ffffff;
	}
	.Paymentoption .Returnpurchase{
		width: 100%;
		height: 120px;
		background-color: #ffffff;
	}
	.Paymentoption .Returnpurchase span{
		display: block;
		float: left;
		width: 46px;
		height: 52px;
		background-image: url(../../assets/img/Paymentinstructions.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 17px;
		margin-left: 24px;
	}
	.Paymentoption .Returnpurchase .Returnpurchase_ctn{
		margin-left: 90px;
		margin-top: 24px;
		text-align: left;
		font-family: HiraginoSansGB-W3;
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #999999;
	}
	.Paymentoption .Returnpurchase .Returnpurchase_ctn p:first-of-type{
		font-family: HiraginoSansGB-W3;
		font-size: 28px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px;
		letter-spacing: 0px;
		color: #000;
	}
	.Paymentoption  .Account-balance,.Paymentoption .Mixed-payment-true,
	.Paymentoption .Virtual-currency-true,.Paymentoption .WeChat-payment,.Paymentoption .Alipay-payment,.Paymentoption .Mixed-payment-false
	,.Paymentoption .Virtual-currency-false {
		display: flex;
		flex-flow: row nowrap;
		width: 100%;
		height: 98px;
		background-color: #ffffff;
	}
	.Paymentoption  .Account-balance span,.Paymentoption .Mixed-payment-true span,
	.Paymentoption .Virtual-currency-true  span,.Paymentoption .WeChat-payment  span,.Paymentoption .Alipay-payment span,.Paymentoption .Mixed-payment-false span
	,.Paymentoption .Virtual-currency-false span{
		width: 10%;
		display: block;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		margin-top: 32px;
		margin-left: 24px;
	}
	.Paymentoption  .Account-balance span{
		width: 36px;
		height: 41px;
		background-image: url(../../assets/img/Thebalanceof.png);
	}
	.Paymentoption .Mixed-payment-true span{
		width: 40px;
		height: 40px;
		background-image: url(../../assets/img/add.png);
	}
	.Paymentoption .Virtual-currency-true span{
		width: 40px;
		height: 34px;
		background-image: url(../../assets/img/currency.png);
	}
	.Paymentoption .WeChat-payment span{
		width: 42px;
		height: 35px;
		background-image: url(../../assets/img/wechat4.png);
	}
	.Paymentoption .Alipay-payment span{
		width: 38px;
		height: 38px;
		background-image: url(../../assets/img/alipay.png);
	}
	.Paymentoption .Mixed-payment-false span{
		width: 40px;
		height: 40px;
		background-image: url(../../assets/img/add2.png);
	}
	.Paymentoption .Virtual-currency-false span{
		width: 40px;
		height: 34px;
		background-image: url(../../assets/img/currency2.png);
	}
	.Paymentoption  .Account-balance .Returnpurchase_ctn,.Paymentoption .Mixed-payment-true .Returnpurchase_ctn,
	.Paymentoption .Virtual-currency-true .Returnpurchase_ctn,.Paymentoption .WeChat-payment .Returnpurchase_ctn,.Paymentoption .Alipay-payment .Returnpurchase_ctn,.Paymentoption .Mixed-payment-false .Returnpurchase_ctn
	,.Paymentoption .Virtual-currency-false .Returnpurchase_ctn{
		width: 80%;
		/*float: left;*/
		text-align: left;
		margin-left: 20px;
		line-height: 98px;
		font-family: HiraginoSansGB-W3;
		font-size: 28px;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
		color: #000
	} 
	 .Paymentoption  .onpay{
		margin-top: 32px;
	 	width: 45px;
	 	height: 40px;
	 	background-image:url(../../assets/img/checked.png);
	 	background-size: 100% 100%;
	 }
</style>
