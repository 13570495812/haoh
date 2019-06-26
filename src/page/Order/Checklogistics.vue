<template>
    <div class="Checklogistics">
       <!-- 标题-->
       <div class="header">
           <div @click="$router.back(-1)"><van-icon name="arrow-left" /></div>
           <div>查看物流</div>
           <div><img src="../../assets/img/more2.png" alt=""></div>
       </div>
       <!--物流标题栏-->
       <div class="kuaidi">
           <div class="kuaidi-info">
               <div> <img src="../../assets/img/img.png" alt=""></div>
               <div>
                   <p class="kuaidi-item">已签收</p>
                   <p class="kuaidi-style">中通快递:45553552342</p>
                   <p class="kuaidi-phone">官方电话: <span class="kuaidi-item">95311</span></p>
               </div>
           </div>
       </div>
       <!--黑条-->
       <div class="utll"></div>
       <!--联系-->
       <div class="lxinfo">
           <div><img src="../../assets/img/user-header4.png" alt=""></div>
           <div>
               <p>用户</p>
               <p>
                   <img src="../../assets/img/bulestar.png" alt="">
                   <img src="../../assets/img/bulestar.png" alt="">
                   <img src="../../assets/img/bulestar.png" alt="">
                   <img src="../../assets/img/graystar.png" alt="">
                   <img src="../../assets/img/graystar.png" alt="">
               </p>
           </div>
           <div>
               <button>联系Ta</button>
           </div>
       </div>
       <!--物流信息-->
       <div class="wuliu">
           <van-steps direction="vertical" :active="0" active-color="#5985fe">
                <van-step>
                    <h3>【城市】物流状态1</h3>
                    <p>2016-07-12 12:40</p>
                </van-step>
                <van-step>
                    <h3>【城市】物流状态2</h3>
                    <p>2016-07-11 10:00</p>
                </van-step>
                <van-step>
                    <h3>快件已发货</h3>
                    <p>2016-07-10 09:30</p>
                </van-step>
            </van-steps>
       </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import { Tab, Tabs } from 'vant';
  import { Button } from 'vant';
import { Step, Steps } from 'vant';
  Vue.use(Tab).use(Tabs);
//   Vue.use(Button);
  Vue.use(Step).use(Steps);
  export default {

  }
</script>


 <style src="../../assets/css/logisticsinformation.css"></style>
<style scoped>
.Checklogistics{
    width: 100%;
    height: 100%;
}
.header{
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-bottom: solid 1px #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.header>div:nth-child(1){
    text-align: left;
    flex: 1;
    font-size: 27px;
    margin-left: 20px;
}
.header>div:nth-child(2){
    text-align: center;
    font-size: 30px;
    flex: 1;
}
.header>div:nth-child(3){
    text-align: right;
    flex: 1;
    margin-right: 20px;
}
.header>div:nth-child(3)>img{
    height: 7%;
    text-align: right;
}
.kuaidi{
    width: 100%;
    height: 200px;
    background: #fff;
}
.kuaidi-info{
    width: 100%;
    height: 160px;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

}
.kuaidi-info>div:nth-child(1){
    flex: 0.5;
    text-align: center;
}
.kuaidi-info>div:nth-child(1)>img{
    width: 60%;
}
.kuaidi-info>div:nth-child(2){
    flex: 1;
    text-align: left;
    line-height: 20px;
    font-size: 28px;
    margin-left: -30px;
}
.kuaidi-item{
    color: #5985FE;
    font-size: 30px;
}
.utll{
    width: 100%;
    height: 25px;
    background: #F5F5F5;
}
.lxinfo{
    width: 100%;
    height: 150px;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: solid 1px #eee;
}
.lxinfo>div:nth-child(1){
    width: 100%;
    flex: 1;
    text-align: center;

}
.lxinfo>div:nth-child(1)>img{
    width: 70%;
}
.lxinfo>div:nth-child(2){
    width: 100%;
    flex: 1;
    font-size: 25px;
    line-height: 30px;
}
.lxinfo>div:nth-child(2)>p>img{
    width: 15%;
}
.lxinfo>div:nth-child(3){
    width: 100%;
    flex: 2;
    margin-right: 20px;
    text-align: right;
}
.lxinfo>div:nth-child(3)>button{
    width: 170px;
    height: 70px;
   margin-top: 30px;
    font-size: 25px;
    color: #5985FE;
    background: #fff;
    border: #5985FE 1px solid;
    border-radius: 50px;
}
.wuliu{
    width: 100%;
    height:auto;
    font-size: 60px;
}
.wuliu>h3{
    font-size: 30px;
}
.wuliu>p{
    font-size: 30px;
}
</style>


