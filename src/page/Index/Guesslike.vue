<template>
	<div class="Guesslike">
			<div class="Guesslike-header">
			   <h1 class="Guesslike-title">猜你喜欢</h1>
			</div>
			<div class="Guesslike-content">
			  <div class='Guesslike-content-box' v-for="item in items" @click="goDetail(item.goodsMedias[0].goodsId)">
			    <div class="Guesslike-content-img">
			    <img :src="item.goodsMedias[0].mediaId"  />
			    </div>
			    <div class="Guesslike-bottom">
			    	<p>{{item.goodsName}}</p>
			    	<p><span class="Guesslike-money">{{('￥'+item.goodsprice[0].price)?('￥'+item.goodsprice[0].price):('无')}}</span><span class="Guesslike-people">{{item.xuniCnt}}万人收货</span></p>
			    </div>
			  </div>
		</div>
	</div>
</template>

<script>
	export default{
	  props:['carouselList'],
		data(){
			return{
        httpUrl:'http://www.ymhaohan.cn/',
			}
		},
  computed:{
	    items(){
	       let itemes =this.carouselList;
	      console.log(this.carouselList)
        for (let item of itemes){
          console.log(item)
          if(item.goodsMedias!=false){
            item.goodsMedias[0].mediaId=this.httpUrl+item.goodsMedias[0].mediaId;
          }else{
            item.goodsMedias.push({mediaId:'http://www.jzdlink.com/wordpress/wp-content/uploads/2017/10/huxiaodai-128x128.jpg'})
          }
        }
        console.log(itemes)
         return itemes;
      }
  },
		methods:{
        goDetail(id){
          console.log(id)
          this.$router.push({path:'Particulars/'+id});
        }
		}
	}
</script>

<style scoped="scoped">
	.Guesslike{
		margin-top: 30px;
	}
	.Guesslike .Guesslike-header .Guesslike-title{
		margin: 40px auto;
		font-size: 60px;
		text-align: center;
		font-family: '微软雅黑';
		color: black;
		font-weight: bold;
	}
	.Guesslike  .Guesslike-content{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
	.Guesslike .Guesslike-content .Guesslike-content-box{
	 position: relative;
		width: 371px;
    height: 600px;
		margin-bottom:20px;
	}
  .Guesslike .Guesslike-content .Guesslike-content-img{
    height:484px;
  }
	.Guesslike .Guesslike-content .Guesslike-content-img img{
		width: 100%;
		height: 100%;
	}
	.Guesslike .Guesslike-content .Guesslike-bottom{
		width: 100%;
		height: 115px;
		background-color: #ffffff;
		border-radius: 0px 0px 5px 0px;
		position: absolute;
	    bottom: 0;
	    left: 0;
	}
	.Guesslike .Guesslike-content .Guesslike-bottom p:first-of-type{
		text-align: center;
		font-size: 28px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 52px;
		letter-spacing: 0px;
	}
	.Guesslike .Guesslike-content .Guesslike-bottom p:last-of-type .Guesslike-money{
			font-size: 28px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 52px;
			letter-spacing: 0px;
			color: #fe48bf;
	}
	.Guesslike .Guesslike-content .Guesslike-bottom p:last-of-type .Guesslike-people{
			font-size: 20px;
			font-weight: normal;
			font-stretch: normal;
			line-height: 52px;
			letter-spacing: 0px;
			color: #999999;
			margin-left: 10px;
	}
</style>
