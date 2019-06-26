<template>
  <div>
    <div class="title">
      <van-icon name="arrow-left"></van-icon>
    </div>
    <div class="head">
      <span>您的第一笔返还购</span>
      <div class="assets-ul">
        <div>
          <span>待返金额(币)</span>
          <span class="num">{{payback}}</span>
        </div>
        <div>
          <span>已返金额(币)</span>
          <span class="num">{{allreadyback}}</span>
        </div>
        <div>
          <span>每日获得(币)</span>
          <span class="num">{{dailyback}}</span>
        </div>
      </div>
    </div>
    <div class="a-body">
      <div class="a-title">近7天到账记录</div>
      <div class="a-ul">
        <ul class="a-val">
          <li v-for="item in a_val">
            <span >{{item.time}}</span>
            <span>{{item.price}}</span>
            <span>{{item.static}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "All_assets",
    data(){
      return{
        payback:"0.00",
        allreadyback:"0.01",
        dailyback:"0.02",
        a_val:[
          {time:"2018.01.01",price:"30.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.05",price:"20.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
          {time:"2018.01.02",price:"31.00",static:"到账"},
        ]
      };
    }
  }
</script>

<style scoped>
  .title{
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    background-color: #ffffff;
  }
  .van-icon{
    font-size: 36px;
  }
  .head{
    padding: 3%;
    height: 200px;
    background-color: #ffffff;
  }
  .head>span{
    display: inline-block;
    width: 100%;
    font-family: HiraginoSansGB-W3;
    font-size: 38px;
    color: #5784fe;
    font-weight: 600;
  }
  .assets-ul{
    display: flex;
    margin: 45px 0;
  }
  .assets-ul>div{
    text-align: center;
    flex: 1;
  }
  .assets-ul>div>span{
    display: inline-block;
    width: 100%;
  }
  .assets-ul>div>span:nth-of-type(2){
    margin-top: 15px;
    font-family: HiraginoSansGB-W3;
    font-size: 30px;
    color: #333333;
    font-weight: 600;
  }
  .a-body{
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px -2px 14px 0px
    rgba(208, 208, 208, 0.4);
  }
  .a-title{
    height: 88px;
    text-align: center;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    line-height: 88px;
    color: #5784fe;
    border-bottom: 1px solid #e7e7e7;
  }
  .a-ul{
    padding: 3%;
  }
  .a-val>li{
    height: 80px;
    line-height: 80px;
    display: flex;
  }
  .a-val>li>span{
    flex: 1;
  }
  .a-val>li>span:nth-of-type(2){
    text-align: center;
  }
  .a-val>li>span:nth-of-type(3){
    text-align: right;
  }
</style>
