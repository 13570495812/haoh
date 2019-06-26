<template>
  <div>
    <div>
    <div class="spend">
      <ul>
        <li>
          <span>原价</span>
          <span>￥{{original_price}}</span>
        </li>
        <li>
          <span>运费</span>
          <span>￥{{freight}}</span>
        </li>
        <li>
          <span>优惠券</span>
          <span>-￥{{coupon}}</span>
        </li>
        <li>
          <span>实付款（含运费）</span>
          <span>￥{{real_payment}}</span>
        </li>
      </ul>
    </div>
    </div>
    <div>
      <div class="describe details">订单详情</div>
      <div class="static">
        <ul>
          <li>
            <span>订单状态：</span>
            <span>{{static}}</span>
          </li>
          <li>
            <span>订单编号：</span>
            <span>{{number}}</span>
          </li>
          <li>
            <span>订单创建时间：</span>
            <span>{{data_time}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Button } from 'vant';

  Vue.use(Button);
    export default {
        name: "Trade_data",
      data(){
          return{
            original_price:"199.00",
            freight:"10.00",
            coupon:"20.00",
            real_payment:"189.00",
            static:"已完成",
            number:"00000000000000000000000000",
            data_time:"2017-11-11 11:11"
          }
      }
    }
</script>

<style src="@/assets/css/Button.css"></style>
<style scoped>
  .describe{
    display: flex;
    padding: 3%;
    background-color: #ffffff;
    justify-content: space-between;
  }
  .describe>div{
    display: flex;
    align-items: center;
  }
  .describe>div>img{
    width: 70px;
    height: 38px;
    margin-right: 15px;
  }
  .describe>div>span{
    font-size: 26px;
  }
  .is-f{
    color: #999999;
  }
  .spend{
    padding: 0 3%;
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .spend>ul>li{
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    color: #333333;
  }
  .details{
    font-size: 28px;
    border-bottom: 1px solid #e7e7e7;
  }
  .static{
    padding: 0 3%;
    background-color: #ffffff;
    height: 200px;
    border-bottom: 1px solid #e7e7e7;
  }
  .static>ul>li{
    font-size: 24px;
    height: 50px;
    line-height: 50px;
  }
</style>
