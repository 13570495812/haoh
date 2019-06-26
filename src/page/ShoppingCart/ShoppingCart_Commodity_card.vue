<template>
	<div class="Commodity_card">
		<p class="Commodity_card_header clearfix">
				<span @click="lingjuan()">领劵</span>
		</p>
	  <div class="Commodity_card_containers">
			<div class="Commodity_card_containers_body">
<div class="Card_wrap">
	<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-swipe-cell :right-width="110" :key="index" v-for="(item,index) in cartlist">
  	<CartBody :item="item" :index="index" @getItem="getItem"></CartBody>
  <CartBottom v-if="false"></CartBottom>
   	 <button  slot=right class="movefile" @click="AddCollects(item.goodsId)">
   	 	   移入收藏夹
   	 </button>
   	  <button slot=right @click="deleteShop(item.goodsObjectId,1)" class="deletefile">
   	 	  删除
   	 </button>
</van-swipe-cell>
</van-list>

</div>
</div>
</div>
	</div>
</template>

<script>
	import  Vue from 'vue'
	import CartBody from './Commodity_cart_body.vue'
	import CartBottom from './Commodity_cart_bottom.vue'
  import bus from '@/assets/js/bus.js'
  import {GetloginStatus,DeleteShop,addCollect} from '@/api/index.js'
	import { Toast } from 'vant';
	import { List } from 'vant';
  Vue.use(Toast, List);
	export default{
		 components:{
		 	CartBody,
		 	CartBottom,
		 }
		 ,
  props:['CartArray'],
    data(){
		   return{
         cartlist:[
         ],
				 httpUrl:'http://www.ymhaohan.cn/',
				 loading: false,
				 finished: false
       }
    },
    methods:{
      AddCollects(id){
        console.log(id)
        addCollect({type:0,target:id,ymhaohanToken:this.uuid}).then(res=>{
              Toast(res.msg);
         })
      },
      getItem(val,index){
        this.item=val;
        this.cartlist[index]=this.item;
        bus.$emit('getItemed',this.cartlist,index);
      },
      deleteShop(id,val){
        var objid=null;
        if(val==1){
          objid="'"+id+"'"
        }else{
          objid=id;
        }
        DeleteShop({goodsObjectId:objid,ymhaohanToken:this.uuid}).then(
          res=>{
            if(res.msg!='删除成功'){
            }
            bus.$emit('deletesure');
            Toast('删除成功');
            this.update();
          }
        )
      },
       update(){
         GetloginStatus({isService:0,ymhaohanToken:this.uuid}).then(res=>{
					 this.loading = false
					 this.finished = true
           if(res.flag=='0'){
             this.isNonull=false;
           }else{
             this.isNonull=true;
              console.log(res)
             let _this=this;
              res.cartlist.forEach(item=>{item.isbol=false;item.mediaIdDatu=_this.httpUrl+item.mediaIdDatu});
              this.cartlist=  res.cartlist;
              console.log(this.cartlist)
           }
         })
       },
        lingjuan(){
           this.$router.push({path:'/my_discount'});
				},
				onLoad(){
					this.update()
				}
    }
    ,
    mounted(){
      this.update();
      var lefts =this;
      bus.$on('deleteALL',function (indexs) {
        console.log(indexs[indexs.length-1])
        lefts.deleteShop(indexs[indexs.length-1]);
        // lefts.update();
      })
    },
    created() {
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
    }
	}
</script>
<style>
.Commodity_card .van-list__finished-text{
	 font-size: 24px;
	 margin-top: 20px;
}
</style>

<style scoped="scoped">

	.clearfix:after{
		display: block;
		content: "";
		clear: both;
	}

	.Commodity_card_header{
		text-align: left;
		 height: 80px;
		 font-size: 30px;
		 color: #ccc;
		 background-color: #fff;
	}
	.Commodity_card .Commodity_card_icon{
		display: block;
		float: left;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-image:url(../../assets/img/checked2.png);
		-webkit-background-size: 100% 100%;
		background-size: 100% 100%;
		margin: 20px 10px;
	}
		.Commodity_card_header span:first-of-type{
			float: left;
			margin: 20px 0;
			margin-left: 10px;
		}
	.Commodity_card_header span:last-of-type{
		float: right;
		color: #000000;
		margin: 20px 0;
		margin-right: 20px;
	}
	button{
		margin: 0;
		padding: 0;
		border: none;
	}
	.movefile{
		position: relative;
    top: -17px;
		font-size: 30px;
		height: 100%;
		width: 50%;
	 	background-color: #ff5e57;
	 	color: white;
    margin-top: 40px;
	}
	 .deletefile{
	 	height: 100%;
		width: 50%;
	 	background-color: red;
	 	color: white;
	 }
	 .Card_wrap{
		position: relative;
		-webkit-overflow-scrolling : touch;
	 	margin-bottom: 20px;
	 	 background-color: #fff;
	 }
	 .Commodity_card_containers{
    width: 100%;
    height: 975px;
		margin-bottom: 60px;
		overflow-y: auto;
		-webkit-overflow-scrolling : touch;
	 }
</style>
