<template>
	<div class="commodity_card_body" @click="onclick()">
			<i class="Commodity_card_icon cartBody_icon" :class="{on_cartBody_icon:this.item.isbol}" >
			</i>
			<div class="Commodity_card_container">
				 	 <img :src="item.mediaIdDatu" />
				 	 <div class="card_container" style="margin-top: 20px" >
				 	 		<p>{{item.goodsName}}</p>
				 	 		<p ><span>{{item.priceName}}</span></p>
             <div  class='cartaddbody'>
               <span class="add" @click.stop="add(item.goodsObjectId,item.stock+1)">+</span>
               <span class="stocks">{{item.stock}}</span>
               <span class="reduce" @click.stop="reduce(item.goodsObjectId,item.stock-1)">-</span>
             </div>
				 	 		<p class="card_container_money"><span>¥{{item.price}}</span></p>
				 	 </div>
			</div>
	</div>
</template>

<script>
	import Bus from '../../assets/js/bus.js'
  import {addCard} from '../../api/index'
  import {Toast} from 'vant'
	export default{
	  props:['item','index'],
		data(){
			return{
       isbol:false
			}
		},
		mounted(){
			let self = this;
        Bus.$on('onAllClick', (e) => {
          self.item.isbol=e;
          this.isbol=self.item.isbol;
          this.$emit('getItem',this.item,this.index);
     	  })
		},
		methods:{
			onclick(){
        this.item.isbol=!this.item.isbol;
        console.log( this.item.isbol);
        this.$emit('getItem',this.item,this.index);
			},
      add(goodsObjectId,count){
        addCard({goodsObjectId,count,ymhaohanToken:localStorage.getItem('uuid')}).then(
          res=>{
            if(res.flag==0){
              this.item.stock=this.item.stock+1;
            }else{
              Toast(res.message);
            }
          }
        )
      },
      reduce(goodsObjectId,count){
			  if(this.item.stock==1){
			    return
        }
        addCard({goodsObjectId,count,ymhaohanToken:localStorage.getItem('uuid')}).then(
          res=>{
            if(res.flag==0){
              this.item.stock=this.item.stock-1;
            }else{
              Toast(res.message);
            }
          }
        )
      }
		}
	}
</script>

<style>
  .cartaddbody{
    width: 200px; display: flex; flex-flow: row nowrap;
  }
  .cartaddbody .add{
    display:block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 45px;
    margin-right: 40px;
    border: 1px solid #ccc;
  }
  .cartaddbody .reduce{
    display:block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 45px;
    margin-left: 40px;
    border: 1px solid #ccc;
  }
  .cartaddbody .stocks{
    font-size: 45px;
  }
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
  	box-sizing: border-box;
  	 display: flex;
  	 flex-flow: row nowrap;
  	 justify-content: space-between;

  }
  .Commodity_card_container{
  	width: 88%;
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
		margin-right: 10px;
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
	.card_container  div{
		float: right;
    color: #aaa;
		margin-right: 30px;
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
