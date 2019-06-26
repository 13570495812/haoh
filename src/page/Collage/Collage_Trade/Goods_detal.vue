<template>
  <div>
    <ul>
      <li class="a-val">
        <div class="val-list">
          <div class="goods-head">
            <div class="image">
              <img class="goods" src="#"/>
            </div>
            <div class="detal">
              <span>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
              <span>..................</span>
              <span>￥<span>00</span>.00</span>
            </div>
            <div class="num">
              <span>X1</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Goods_detal"
  }
</script>

<style scoped>
  .a-val{
    border-top: 1px solid #f5f5f5;
  }
  .val-list{
    padding: 3% 3%;
    background-color: #ffffff;
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
    height: 60px;
    width: 100%;
    overflow: hidden;
    color: #333333;
  }
  .detal>span:nth-of-type(2){
    display: inline-block;
    font-size: 22px;
    height: 30px;
    width: 100%;
    overflow: hidden;
    color: #999999;
  }
  .detal>span:nth-of-type(3){
    font-size: 20px;
    color: #e50000;
  }
  .detal>span:nth-of-type(3)>span{
    font-size: 25px;
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
    color: #333333;
  }
</style>
