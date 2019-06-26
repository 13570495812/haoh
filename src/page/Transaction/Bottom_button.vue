<template>
  <div class="sub-but">
    <div>
      <!--Collage_others-->

      <van-button round plain type="danger" class="b-black" v-if="status=='代付款'" @click="">取消订单</van-button>

      <van-button round plain type="danger" class="b-black" v-if="status=='代付款'" @click="">确认付款</van-button>

      <van-button round plain type="danger" class="b-black" v-if="status=='待收货'" @click="querenshoukuan(item.out_trade_no)">确认收货</van-button>
      <!--<van-button round plain type="danger" class="b-black" v-if="status=='待发货'">提醒发货</van-button>-->
      <van-button round plain type="danger" class="b-black" v-if="status=='待评价'" @click="$router.push({path:'/Evaluate_more',query:{goodsId:item.goodslist[0].goodsId,goodPriceId:item.goodslist[0].goodsPriceId,shangpinglist:item.goodslist,out_trade_no:item.out_trade_no}})">立即评价</van-button>
    </div>
  </div>
</template>

<script>
  import {orderList,quxiaodingdan,querenshouhuo} from '@/api/index.js'
    export default {
        name: "Bottom_button",
      data(){
          return{
            left_val:"删除订单",
            right_val:"查看物流"
          }
      },
      props:['status','item'],
      mounted(){

      },
      methods:{
        querenshoukuan(productId,index){
          let uuid = localStorage.getItem("uuid");
          querenshouhuo({out_trade_no:productId,ymhaohanToken:uuid}).then(res=>{
            this.$router.push({path:'/my_order',query:{index:3}});
          })
        }
      }
    }
</script>

<style scoped>
  .sub-but{
    padding: 0 3%;
    background-color: #ffffff;
  }
  .sub-but>div{
    height: 90px;
    text-align: right;
  }
  .sub-but>div>button{
    margin-top: 20px;
  }
</style>
