<template>
   <div id="guide">
           <van-swipe class="big_swi"  :loop="false">
                  <van-swipe-item class="van-swipe-item">
                     <div class="van2">
                         <div class="van2-img">
                            <img  src="../../assets/img/Guidepage1.png" alt="">
                        </div>
                        <div class="van2-item">
                           <p class="van2-title"> 支付快捷 随心所欲</p>
                           <p class="van2-info"> 每日返还 减轻购物压力</p>
                        </div>
                        <div class="dian">
                         <div class="dian1" :class="{'bgcon':true}">&nbsp;</div>
                        <span class="item"></span>
                        <div class="dian2"  :class="{'bgcon':false}">&nbsp;</div>
                        <span class="item"></span>
                        <div class="dian3"  :class="{'bgcon':false}">&nbsp;</div>
                    </div>
                    </div>
                </van-swipe-item>
                 <van-swipe-item class="van-swipe-item">
                    <div class="van2">
                         <div class="van2-img">
                            <img  src="../../assets/img/Guidepage2.png" alt="">
                        </div>
                        <div class="van2-item">
                           <p class="van2-title"> 货柜正品 种类繁多</p>
                           <p class="van2-info"> 每日秒杀 价格最低</p>
                        </div>
                        <div class="dian">
                        <div class="dian1" :class="{'bgcon':true}">&nbsp;</div>
                        <span class="item"></span>
                        <div class="dian2"  :class="{'bgcon':true}">&nbsp;</div>
                        <span class="item"></span>
                        <div class="dian3"  :class="{'bgcon':false}">&nbsp;</div>
                    </div>
                    </div>
                </van-swipe-item>
                <van-swipe-item class="van-swipe-item">
                   <div class="van1">
                        <div class="van-title">
                        <p class="van-ti">好汉Shopping Mall</p>
                        <p class="van-desc">买多少送多少 福利天堂</p>
                    </div>
                    <div class="van-img">
                        <img  src="../../assets/img/Guidepage3.png" alt="">
                    </div>
                    <div class="dian">
                        <div class="dian1" :class="{'bgcon':true}">&nbsp;</div>
                        <span class="item"></span>
                        <div class="dian2"  :class="{'bgcon':true}">&nbsp;</div>
                        <span class="item"></span>
                        <div class="dian3"  :class="{'bgcon':true}">&nbsp;</div>
                    </div>
                    <router-link to="/Index">
                    <div class="van-but">
                         进入商城
                    </div>
                    </router-link>
                   </div>
                </van-swipe-item>
          </van-swipe>
   </div>
</template>
<script> 
// import '../../assets/css/guide.css'
export default {
    data(){
        return{
          
        }
    },
    methods: {
        
    },
    created(){

    }
}
</script>

<style scoped>
   *{
       padding:0px;
       margin:0px;
   }
  #guide{
     
      width: 100%;
      height: 100vh;
  }
  
   .van-title{
       position: absolute;
       top:10%;
       width: 100%;
       height: 200px;
       line-height: 70px;
       text-align: center;
       font-size:60px;
       color: #6790fe;
   }
   .van-desc{
       font-size: 30px;
   }
  .van-img{
      position: absolute;
      left: 17%;
      top:25%;
       width: 70%;
       height: 400px; 
   
   } 
  .van1 .van-img img{
      width: 100%;
     
  }
   .dian{
       position: absolute;
       top:65%;
       width: 100%;
       height:120px;
      display: flex;
      justify-content:center;
   }
   .dian div{
       float: left;
       width: 15px;
       height: 15px;
       margin:10px;
       border: solid 1px #fff;
       border-radius: 50%;
       background: #bfcffc
   }
   .item{
       display: inline-block;
       width: 120px;
       height: 18px;
       line-height: 20px;
       border-bottom: solid 0.1px black;
   }
  
  .van-but{ 
      position: absolute; 
      top:70%;
      left:28%;
       width: 300px;
       height: 90px;
       margin: 0 auto;
       text-align: center;
       margin-top: 50px;
       line-height: 100px;
       font-size: 28px;
       color: #fff;
       background: url(../../assets/img/buttonbackground.png);
       background-size:100% 100%;
   }
   .big_swi{
       height: 100vh;
   }
   .van2{
       position: absolute;
       left:0px;
       top:0px;
       width: 100%;
       height: 100%;
   }
   .van2-img{
        position: absolute;
       left:0px;
       top:15%;
       text-align: center;
       width: 100%;
       height: 40%;
   }
    .van2-img img{
        width: 70%;
        height: 85%;
    }
    .van2-item{
     position: absolute;
     left:0%;
     top:50%;
     width: 100%;
     height: 130px;
     text-align: center;
    }
    .van2-title{
        font-size: 50px;
        color: #6790fe;
    }
    .van2-info{
        font-size:30px;
        color: #6790fe;
    }
  .dian .bgcon{
        background-color:#5784fe;
    }
</style>
