<template>
	<div class="commodity_card_body">
    <div class="commodity_card_body_icon" v-if="isshow" @click="onclick()">
			<i class="Commodity_card_icon cartBody_icon" :class="{on_cartBody_icon:items.isbol}"  >
			</i>
    </div>
			<div class="Commodity_card_container" @click="$router.push({path:'Particulars/' + items.gooddetail.goodsId })">
				 	 <img :src="this.httpUrl+(this.items.gooddetail.goodsPrices[0].mediaIdDatu?this.items.gooddetail.goodsPrices[0].mediaIdDatu:'')" />
				 	 <div class="card_container" >
				 	 		<p>{{items.gooddetail.goodsName}}</p>
				 	 		<p ><span>{{this.items.gooddetail.goodsPrices[0].goodsPriceName}}</span></p>
				 	 		<p class="card_container_money"><span>￥{{items.gooddetail.goodsPrices[0].price}}</span></p>
				 	 </div>
			</div>
	</div>
</template>

<script>
  import bus from '@/assets/js/bus.js'
	export default{
		data(){
			return{
        isshow:false,
        httpUrl:'http://www.ymhaohan.cn/',
			}
		},
    props:['items','index'],
		mounted(){
		  console.log(this.items);
      let _this=this;
      bus.$on('Collectionisbol',function (value) {
         _this.isshow=value;
      })
      bus.$on('Cl_clickAll',(value)=>{
        this.items.isbol=value;
        bus.$emit('Cl_itemClick',this.items,this.index);
      })
		},
		methods:{
			onclick(){
			  this.items.isbol=!this.items.isbol;
        bus.$emit('Cl_itemClick',this.items,this.index);
			}
		},
    components:{

    }
	}
</script>

<style scoped>
	.Commodity_card .Commodity_card_icon{
		display: block;
		float: left;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-image:url(../../assets/img/check.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		margin: 20px 10px;
	}
	 .commodity_card_body{
     margin-top: 20px;
  	box-sizing: border-box;
  	 display: flex;
  	 flex-flow: row nowrap;
  	 justify-content: space-between;
  	 
  }
  .Commodity_card_container{
  	width: 100%;
  	padding-right: 10px;
  	padding-bottom: 20px;
  	 border-bottom: 1px solid #ccc;
  }
  .commodity_card_body .cartBody_icon{
  	margin-top:80px;
  	margin-left: 20px;
  }
	.commodity_card_body .Commodity_card_container img{
		width: 200px;
		height: 200px;
		float: left;
		margin-right: 20px;
	}
	.card_container p{
		font-size: 26px;
	}
	.card_container p:nth-of-type(2){
		margin: 15px 0;
		 width: 100%;
		 color: #aaa;
		 font-size: 24px;
	}
  .commodity_card_body_icon{
    width: 15%;
  }
	.card_container p:nth-of-type(3){
		margin-top: 20px;
	}
	.card_container p:nth-of-type(3) span{
	 color: red;
	}
	.card_container p:nth-of-type(3) del{
		color: #aaa;
	}
	p{
		margin: 0;
		padding: 0;
		text-align: left;
	}
	.Commodity_card .on_cartBody_icon{
		background-image: url(../../assets/img/checked2.png);
	}
	
</style>
