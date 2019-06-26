<template>
	<div>
		 <div v-if="isnull">
		 	<Commodity-card :CartArray="CartArray"></Commodity-card>
		 </div>	
		<div v-else class="divbody">
		 	  <h1 class="NoCommodity">暂无商品</h1>
		 </div>
	</div>
</template>

<script>
	import CommodityCard  from './ShoppingCart_Commodity_card.vue'
	export default{
		props:['isnull',],
		data(){
			return {
        CartArray:[]
			}
		},
		methods:{
			
		},
		components:{
			CommodityCard
		},
    mounted(){
      // this.CartArray=arr;
    }
	}
</script>

<style scoped="scoped">
	
	.NoCommodity{
		position: absolute;
		left: 50%;
		top:  40%;
		transform: translate(-50%,-50%);
		font-weight: 200;
		color: #aaa;
	}
	
</style>
