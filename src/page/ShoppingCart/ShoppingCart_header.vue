<template>
	<div class="ShoppingCart-header">
    <!--头部左右按钮-->
    <div
      class="left_return"
      @click="$router.push({path:'/activity'})"
    >
      <van-icon name="arrow-left" />
    </div>
		<span>购物车</span>
		 <div class="ShoppingCart-control">
		 	<span @click="oncontrol">{{controlName}}</span>
		 </div>
	</div>
</template>

<script>
	export default{
		props:['controlName','iscontrol'],
		data(){
			return{

			}
		},
		methods:{
			oncontrol(){
				this.$emit('oncontrol');
			}
		}
	}
</script>

<style scoped="scoped">
  .left_return {
    width: 58px;
    height: 58px;
    text-align: center;
    line-height: 70px;
    color:  #8bc9fa;
    border-radius: 50%;
    font-size: 34px;
    position: fixed;
    top: 24px;
    z-index: 999;
    left: 24px;
    background: rgba(255, 255, 255);
  }
	.ShoppingCart-header{
		height: 100px;
		text-align: center;
		background-color: #8bc9fa;
	}
	.ShoppingCart-header>span{
		position: relative;
		left: 45px;
		font-size: 40px;
		line-height: 100px;
		font-weight: 500;
		color: white;
	}
	.ShoppingCart-header .ShoppingCart-control{
		float: right;
		font-size: 32px;
		margin-right: 30px;
		line-height: 100px;
		color: white;
	}
</style>
