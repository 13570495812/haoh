<!--
	作者：3098717339@qq.com
	时间：2018-11-14
	描述：好货组件
-->
<template>
	<div class="HomeSupCmd">
		<div class="HomeSupCmd-icon">
			<span>实惠好货</span>
		</div>
		<div class="HomeSupCmd-one">
			  <div class="HomeSupCmd-one-box" v-for="item in 3">
			  	  <img src="../../assets/img/img4.png" />
			  	  <p>
			  	  	<span>就是卫衣控</span>
			  	  </p>    
			  </div>	
		</div> 
		<div class="HomeSupCmd-twe">
			  <div class="HomeSupCmd-twe-box" v-for='item in 6'>
			  	  <p>
			  	  	就是卫衣控
			  	  </p>
			  	   <p>
			  	   	拉链外套
			  	  </p>
			  	  <div class="HomeSupCmd-twe-img">
			  	  	<img src="../../assets/img/img7.png" />
			  	  </div>
			  </div>	
		</div>
	</div>
</template>

<script>

	export default{
		data(){
			return{}
		},
		methods:{}
	}
</script>

<style scoped="scoped">
	.HomeSupCmd{
		position: relative;
		padding-bottom:  0.233333rem;
		margin-top: 60px;
		width: 702px;
		margin: 0 auto;
		background-color: #ffffff;
		border-radius: 30px;
		display: flex;
		flex-flow: row wrap;
	}
	.HomeSupCmd .HomeSupCmd-icon{
		z-index: 20;
		position: absolute;
		width: 200px;
		height: 68px;
		background-color: #fe7831;
		border-radius: 0px 34px 34px 0px;
		top: -35px;
    left: -25px;
    font-size: 30px;
		color: #ffffff;
		line-height: 68px;
    padding-left: 20px;
	}
	.HomeSupCmd .HomeSupCmd-one{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
	.HomeSupCmd .HomeSupCmd-one .HomeSupCmd-one-box{
		position: relative;
		width: 234px;
		height: 280px;
	}
	.HomeSupCmd .HomeSupCmd-one .HomeSupCmd-one-box img{
		width: 100%;
		height: 100%;
	}
	.HomeSupCmd .HomeSupCmd-one .HomeSupCmd-one-box p{
		position: absolute;
		width: 100%;
		height: 48px;
		background-color: #000000;
		opacity: 0.5;
	    bottom: 0;
	    text-align: center;
	    line-height: 48px;
	    font-size: 28px;
	    color: white;
	}
 	.HomeSupCmd  .HomeSupCmd-twe{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		text-align: left;
	}
	.HomeSupCmd  .HomeSupCmd-twe .HomeSupCmd-twe-box{
		width: 234px;
		height: 280px;
		border-left: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;
	}
	.HomeSupCmd  .HomeSupCmd-twe .HomeSupCmd-twe-box:nth-of-type(4),
	.HomeSupCmd  .HomeSupCmd-twe .HomeSupCmd-twe-box:nth-of-type(5),
	.HomeSupCmd  .HomeSupCmd-twe .HomeSupCmd-twe-box:nth-of-type(6){
		border-bottom: none;
	}
	.HomeSupCmd .HomeSupCmd-twe .HomeSupCmd-twe-box p:first-of-type{
		margin-left: 15px;
		font-size: 28px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 47px;
		letter-spacing: 0px;
		color: #333333;
	}
	.HomeSupCmd .HomeSupCmd-twe .HomeSupCmd-twe-box p:last-of-type{
		margin-left: 15px;
		font-size: 22px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 36px;
		letter-spacing: 0px;
		color: #999999;
	}
	.HomeSupCmd .HomeSupCmd-twe .HomeSupCmd-twe-img{
		float: right;
		width: 161px;
		height: 161px;
		overflow: hidden;
	}
	.HomeSupCmd .HomeSupCmd-twe .HomeSupCmd-twe-img img{
		position: relative;
		width: 225.39999999999998px;
		height: 225.39999999999998px;
		left: -73px;
    	top: -63px;
	}
</style>
