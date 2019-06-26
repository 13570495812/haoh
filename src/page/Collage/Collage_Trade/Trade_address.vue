<template>
  <div class="u-address">
    <div class="addr-img">
      <img class="pos-img" src="@/assets/img/position.png"/>
    </div>
    <div class="addr-det">
      <div>
        <span>收货人：{{name}}</span>
        <span>{{phone}}</span>
      </div>
      <span>收货地址：{{address}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "trade_address",
    data(){
      return{
        name:"某某某",
        phone:"12345678901",
        address:"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
</script>

<style scoped>
  .u-address{
    height: 133px;
    background-color: #ffffff;
    display: flex;
    overflow: hidden;
  }
  .addr-img{
    flex: 1;
    text-align: center;
    line-height: 133px;
  }
  .addr-det{
    flex: 9;
    font-size: 24px;
  }
  .addr-det>div{
    display: flex;
    width: 97%;
    height: 50%;
    line-height: 66px;
    justify-content: space-between;
  }
  .addr-det>span{
    display: block;
    width: 650px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .pos-img{
    width: 28px;
    height: 33px;
  }
</style>
