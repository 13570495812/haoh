<template>
	<div class="convert">
		<P class="con-close"><span>关闭</span></p>
		<div class="convert_suss">
			<img src="../../assets/img/checked3.png" />
			<span>兑换成功</span>
		</div>
		<ul class="pay-method">
			<li>
				<span class="li-l">充值方式</span>
				<span class="li-r">支付宝</span>
			</li>
			<li>
				<span class="li-l">充值金额</span>
				<span class="li-r">￥100.00</span>
			</li>
		</ul>
		<div class="convert-btn">
			<span>前往钱包</span>

		</div>
	</div>
</template>
<script>
	export default {
	  data() {
	    return {};
	  }
	};
</script>
<style scoped>
	.convert {
	  width: 100vw;
	  height: 100vh;
	  background-color: #fff;
	}
	.con-close {
	  height: 29px;
	  line-height: 29px;
	  margin: 25px 41px;
	}
	.con-close span {
	  display: block;
	  height: 29px;
	  font-family: HiraginoSansGB-W3;
	  font-size: 30px;
	  line-height: 70px;
	  letter-spacing: 0px;
	  color: #333333;
	}
	.convert_suss {
	  height: 369px;
	  text-align: center;
	  margin-top: 88px;
	}
	.convert_suss img {
	  text-align: center;
	  width: 110px;
	  height: 110px;
	}
	.convert_suss span {
	  display: block;
	  height: 35px;
	  margin-top: 10px;
	  font-weight: 600;
	  font-family: HiraginoSansGB-W3;
	  font-size: 36px;
	  line-height: 70px;
	  letter-spacing: 0px;
	  color: #333333;
	}
	.pay-method li {
	  height: 88px;
	  background-color: #f5f5f5;
	  overflow: hidden;
	  padding: 0 23px;
	}
	.pay-method li:nth-child(1) {
	  border-bottom: 1px solid #ccc;
	}
	.pay-method li .li-l {
	  float: left;
	  font-family: HiraginoSansGB-W3;
	  font-size: 28px;
	  line-height: 70px;
	  letter-spacing: 0px;
	  color: #999999;
	}
	.pay-method li .li-r {
	  float: right;
	  font-family: HiraginoSansGB-W3;
	  font-size: 28px;
	  line-height: 70px;
	  letter-spacing: 0px;
	  color: #333333;
	}
	.convert-btn {
	  margin-top: 125px;
	  width: 702px;
	  height: 88px;
	  background-color: #5784fe;
	  border-radius: 15px;
	  margin: 125px auto 0;
	  text-align: center;
	}
	.convert-btn span {
	  width: 128px;
	  height: 88px;
	  font-family: HiraginoSansGB-W3;
	  font-size: 32px;
	  line-height: 88px;
	  letter-spacing: 0px;
	  color: #ffffff;
	}
</style>