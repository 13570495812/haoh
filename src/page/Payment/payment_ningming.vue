<template>
	<div class="Codinformation-niming">
		 <van-switch-cell v-model="checked" title="匿名购买" />
	</div>
</template>

<script>
	export default{
		data(){
			return {
				checked:true
			}
		}
	}
</script>

<style>
.Codinformation-niming	.van-cell{
		font-size: 0.4rem;
	}
.Codinformation-niming	 .van-switch{
		font-size: 40px !important;
	}
	.Codinformation-niming{
		margin-top: 20px;
		text-align: left;
	}
	.Codinformation-niming .van-switch-cell{
		padding-left: 20px;
	}
 .Codinformation-niming   .van-field .van-cell__title {
		max-width: 2.1rem;
	}
	.Codinformation-niming .van-cell__title{
		margin-left: 20px;
	}
.Codinformation-niming .van-cell__value .van-field__control{
		font-size: 30px;
	}
</style>