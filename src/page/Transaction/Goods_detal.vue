<template>
  <div v-if="show">
    <div>
      <ul>
        <li class="a-val" v-for="item,index in userInformation.product.goodsObjects">
          <div class="val-list">
            <div class="goods-head">
              <div class="image">
                <img
                  class="goods"
                  :src="httpUrl+item.mediaIdDatu"
                />
              </div>
              <div class="detal">
                <span>{{item.goodsName}}</span>
                <span>{{item.goodsBrief}}</span>
                <span>￥<span>{{item.price}}</span></span>
              </div>
              <div class="num">
                <span>x{{item.stock}}</span>
              </div>
            </div>
          </div>
          <div class="describe">
            <div>
              <img src="@/assets/img/fanligou.png" />
              <span>返还购期数</span>
            </div>
            <div class="is-f">
              <span v-if='item.extra==0'>不符合返还购</span>
              <span v-if='item.extra==3 '>三年（80%）</span>
              <span v-if='item.extra==4'>四年（90%）</span>
              <span v-if='item.extra==5'>五年（100%）</span>
            </div>
          </div>
          <div class="spend">
            <ul>
              <li>
                <span>原价</span>
                <span>￥{{item.price}}</span>
              </li>
              <li>
                <span>属性</span>
                <span>({{item.pictures?item.pictures[0]:''}} {{item.pictures?item.pictures[1]:''}})</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <div>
        <div class="spend">
          <ul>
            <li v-if="userInformation.youhuijine!=undefined">
              <span>优惠券</span>
              <span>￥{{userInformation.youhuijine}}</span>
            </li>
            <li v-if="userInformation.youhuijine!=undefined">
              <span>实付款</span>
              <span>￥{{userInformation.youhuijine!=0?userInformation.product.price-userInformation.youhuijine:userInformation.product.price}}</span>
            </li>
            <li v-if="userInformation.youhuijine!=undefined">
              <span>联系人</span>
              <span>{{userInformation.contacts}}</span>
            </li>
            <li v-if="userInformation.youhuijine!=undefined">
              <span>联系电话</span>
              <span>{{userInformation.byphone}}</span>
            </li>
            <li v-if="userInformation.youhuijine!=undefined">
              <span>网点</span>
              <span>{{userInformation.wangdian}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import  { addshuxing } from '@/api/index.js'
  export default {
    name: "Goods_detal",
    props:['userInformation','daiuserInformation'],
    data() {
      return {
        original_price: "199.00",
        coupon: "20.00",
        real_payment: "189.00",
        // 时间
        times:'',
        // 优惠券
        couponid: "",
        isUInf: 0,
        httpUrl:'http://www.ymhaohan.cn/',
        show:false
      };
    },
    mounted(){

    },
    created(){
      for (let i = 0; i <this.userInformation.product.goodsObjects.length ; i++) {
        addshuxing({priceId:this.userInformation.product.goodsObjects[i].goodsPriceId,ymhaohanToken:localStorage.getItem('uuid')}).then(
          res=>{
            console.log(res)
            this.userInformation.product.goodsObjects[i].pictures=res.values;
            console.log(this.userInformation.product.goodsObjects)
            this.show=true;
          }
        )
      }
    }
  };
</script>

<style scoped>
  .a-val {
    border-top: 1px solid #f5f5f5;
  }
  .val-list {
    padding: 3% 3%;
    background-color: #ffffff;
  }
  .val-list > div {
    width: 100%;
  }
  .goods-head {
    display: flex;
  }
  .image {
    flex: 2;
    overflow: hidden;
  }
  .goods {
    height: 125px;
    width: 125px;
  }
  .detal {
    flex: 7;
    overflow: hidden;
  }
  .detal > span:nth-of-type(1) {
    font-size: 26px;
    display: block;
    height: 60px;
    width: 100%;
    overflow: hidden;
    color: #333333;
  }
  .detal > span:nth-of-type(2) {
    display: inline-block;
    font-size: 22px;
    height: 30px;
    width: 100%;
    overflow: hidden;
    color: #999999;
  }
  .detal > span:nth-of-type(3) {
    font-size: 20px;
    color: #e50000;
  }
  .detal > span:nth-of-type(3) > span {
    font-size: 25px;
  }
  .num {
    position: relative;
    flex: 1;
    overflow: hidden;
    text-align: right;
  }
  .num > span {
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 22px;
    color: #333333;
  }
  .describe {
    display: flex;
    padding: 3%;
    background-color: #ffffff;
    justify-content: space-between;
  }
  .describe > div {
    display: flex;
    align-items: center;
  }
  .describe > div > img {
    width: 70px;
    height: 38px;
    margin-right: 15px;
  }
  .describe > div > span {
    font-size: 26px;
  }
  .is-f {
    color: #999999;
  }
  .spend {
    padding: 0 3%;
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .spend > ul > li {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    color: #333333;
  }
  .details {
    font-size: 28px;
    border-bottom: 1px solid #e7e7e7;
  }
  .static {
    padding: 0 3%;
    background-color: #ffffff;
    height: 200px;
    border-bottom: 1px solid #e7e7e7;
  }
  .static > ul > li {
    font-size: 24px;
    height: 50px;
    line-height: 50px;
  }
</style>
