<!--
	作者：3098717339@qq.com
	时间：2018-11-13
	描述：返利购期数模块
-->
<template>
	<div class="Returnpurchase">
		<div class="RP-header">
			<span @click="gobackPay"></span>
			<h2>返利购期数</h2>
		</div>
		<div class="Rp-midder">
			<div class="Rp-box Rp-box-true">
				<p>三年(80%)</p>
				<p>公式 商品单价 x 0.8 =返利金额</p>
			</div>
			<div class="Rp-box">
				<p>四年(90%)</p>
				<p>公式 商品单价 x 0.9 =返利金额</p>
			</div>
			<div class="Rp-box">
				<p>五年(全额返)</p>
				<p>公式商品单价=返利金额 </p>
			</div>
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
				this.$emit('gobackPay')
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
	.Returnpurchase{
		position: relative;
		width: 100%;
		height: 980px;
		background-color: #ffffff;
		bottom: 0;
	}
	.Returnpurchase .RP-header{
		border: 1px solid #ccc;
	}
	.Returnpurchase .RP-header span{
		display: block;
		float: left;
		width: 30px;
		height: 30px;
		background-image: url(../../assets/img/delete.png);
		background-size: 100% 100%;
		background-repeat: no-repeat;
		float: left;
		margin-left: 24px;
		margin-top: 0.466667rem;
	}
	.Returnpurchase .RP-header h2{
    text-align: center;
		font-family: HiraginoSansGB-W3;
		font-size: 34px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 40px;
		letter-spacing: 0px;
		margin-right: 40px;
	}
	.Returnpurchase .Rp-midder .Rp-box{
    text-align: center;
		width: 341px;
		height: 150px;
		background-color: #ffffff;
		border-radius: 15px;
		border: solid 1px #999999;
		margin: 10px;
	}
	.Returnpurchase .Rp-midder .Rp-box-true{
		border: solid 1px #5784fe;
	}
	.Returnpurchase .Rp-midder {
		display: flex;
		flex: 1;
		flex-flow: row wrap;
		justify-content: space-between;
		padding-top: 10px;
	}
	.Rp-box p:first-of-type{
		font-family: HiraginoSansGB-W3;
		margin-top: 32px;
		font-size: 30px;	
	}
	.Rp-box p:last-of-type{
		font-family: HiraginoSansGB-W3;
		margin-top: 15px;
		font-size: 22px;
	}
</style>
