<template>
  <div class="a-val">
    <div class="order">订单编号：xxxxxxxxxxxxxxxxxxxxxx
      <span class="static">待付款</span>
    </div>
    <div class="val-list">
      <div class="goods-head">
        <div class="image">
          <img class="goods" src="#"/>
        </div>
        <div class="detal">
          <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
          <span>..................</span>
        </div>
        <div class="num">
          <span>X1</span>
        </div>
      </div>
    </div>
    <div class="money-detal">
      <div>
        <span>共<span>1</span>件商品</span>
        <span>合计：￥<strong>69.00</strong></span>
        <span>(含运费￥0.00)</span>
      </div>
    </div>
    <div class="sub-but">
      <div>
        <van-button round plain type="danger">取消订单</van-button>
        <van-button round plain type="danger">前去付款</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Tab, Tabs } from 'vant';
  import { Button } from 'vant';

  Vue.use(Tab).use(Tabs);
  Vue.use(Button);
  export default {
    name: "title_1"
  }
</script>

<style src="@/assets/css/Tab.css"></style>
<style src="@/assets/css/Button.css"></style>
<style scoped>
  .a-val{
    border-bottom: 20px solid #f5f5f5;
  }
  .order{
    height: 80px;
    line-height: 80px;
    padding: 0 3%;
    border-bottom: 1px solid #e7e7e7;
  }
  .static {
    color: #5784fe;
    float: right;
  }
  .val-list{
    padding: 3% 3%;
  }
  .val-list>div{
    width: 100%;
  }
  .goods-head{
    display: flex;
  }
  .image{
    flex: 2;
    overflow: hidden;
  }
  .goods{
    height: 125px;
    width: 125px;
  }
  .detal{
    flex: 7;
    overflow: hidden;
  }
  .detal>span:nth-of-type(1){
    font-size: 26px;
    display: block;
    height: 80px;
    width: 100%;
    overflow: hidden;
    color: #333333;
  }
  .detal>span:nth-of-type(2){
    font-size: 22px;
    color: #999999;
  }
  .num{
    position: relative;
    flex: 1;
    overflow: hidden;
    text-align: right;
  }
  .num>span{
    position: absolute;
    right: 0;
    bottom: 15px;
    font-size: 22px;
    color: #999999;
  }
  .money-detal{
    padding: 15px 3%;
    border-bottom: 1px solid #e7e7e7;
  }
  .money-detal>div{
    float: right;
  }
  .money-detal:after{
    display: block;
    content: '';
    clear: both;
  }
  .money-detal>span{
    font-size: 24px;
    margin-left: 20px;
  }
  .money-detal strong{
    font-size: 28px;
  }
  .sub-but{
    padding: 3%;
  }
  .sub-but:after{
    display: block;
    content: '';
    clear: both;
  }
  .sub-but>div{
    float: right;
  }
</style>
