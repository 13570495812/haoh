<template>
  <div>
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="page-name">
        <span>联系我们</span>
      </div>
      <div></div>
    </div>
    <div class="show_n_e">
      <div>
        <span class="val-title"><img src="@/assets/img/phone.png"/>在线客服</span>
        <span>{{number}}</span>
      </div>
      <div>
        <span class="val-title"><img src="@/assets/img/email.png"/>E-mail地址</span>
        <span>{{email}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name:'Message_notification',
    data(){
      return{
        number:'020-4545321',
        email:'www.yanghfe@163.com'
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #ffffff;
  }
  .title>div{
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .show_n_e>div{
    text-align: center;
    height: 240px;
  }
  .show_n_e>div>span:nth-of-type(1){
    display: inline-block;
    width: 100%;
    margin-top: 100px;
  }
  .val-title{
    display: inline-block;
    margin-top: 15px;
  }
  .val-title>img{
    height: 25px;
    width: 30px;
    margin-right: 15px;
  }
  .show_n_e>div>span:nth-of-type(2){
    display: inline-block;
    margin-top: 20px;
  }
</style>

