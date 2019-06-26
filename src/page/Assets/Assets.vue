<template>
    <div>
      <div class="head">
        <div class="title">
          <div class="back" @click="$router.push('/assets_exchange')">
          <van-icon name="arrow-left"></van-icon>
          <span>返回</span>
          </div>
        </div>
        <div class="money-less">
          <span>待返还(币)</span>
          <span>￥{{data}}</span>
        </div>
      </div>
      <div class="van-list">
        <van-collapse v-model="activeNames">
          <div @click="getextraList(3)">
          <van-collapse-item title="三年期数" name="1">
            <div v-if="this.data3.length!==0" class="val-year">
              <div class="goods-img">
                <img src="@/assets/img/Thewalletbackground.png"/>
              </div>
              <div class="goods-detal" v-for="item in data3">
                <span>{{item.goodsName}}</span>
                <span>返还购金额<span class="money">¥{{item.price}}</span></span>
                <span>三年返(80%)<span class="money-back">¥{{item.returned}}</span></span>
              </div>
              <div class="progress">
                <van-progress
                  :percentage="80"
                  pivot-color="rgba(42, 96, 242, 0.7)"
                  color="linear-gradient(-90deg,rgba(133, 166, 255, 0.7) 0%,rgba(42, 96, 242, 0.7) 100%)"
                />
                <!--pivot-text="紫色"-->
              </div>
            </div>
          </van-collapse-item>
          </div>
          <div @click="getextraList(4)">
          <van-collapse-item title="四年期数" name="2">
            <div v-if="this.data4.length!==0" class="val-year">
              <div class="goods-img">
                <img src="@/assets/img/Thewalletbackground.png"/>
              </div>
              <div class="goods-detal" v-for="item in data4">
                <span>{{item.goodsName}}</span>
                <span>返还购金额<span class="money">¥{{item.price}}</span></span>
                <span>四年返(90%)<span class="money-back">¥{{item.returned}}</span></span>
              </div>
              <div class="progress">
                <van-progress
                  :percentage="90"
                  pivot-color="rgba(42, 96, 242, 0.7)"
                  color="linear-gradient(-90deg,rgba(133, 166, 255, 0.7) 0%,rgba(42, 96, 242, 0.7) 100%)"
                />
                <!--pivot-text="紫色"-->
              </div>
            </div>
          </van-collapse-item>
          </div>
          <div @click="getextraList(5)">
          <van-collapse-item title="五年期数" name="3">
            <div v-if="this.data5.length!==0" class="val-year">
              <div class="goods-img">
                <img src="@/assets/img/Thewalletbackground.png"/>
              </div>
              <div class="goods-detal" v-for="item in data5">
                <span>{{item.goodsName}}</span>
                <span>返还购金额<span class="money">¥{{item.price}}</span></span>
                <span>五年返(100%)<span class="money-back">¥{{item.returned}}</span></span>
              </div>
              <div class="progress">
                <van-progress
                  :percentage="100"
                  pivot-color="rgba(42, 96, 242, 0.7)"
                  color="linear-gradient(-90deg,rgba(133, 166, 255, 0.7) 0%,rgba(42, 96, 242, 0.7) 100%)"
                />
                <!--pivot-text="紫色"-->
              </div>
            </div>
          </van-collapse-item>
          </div>
        </van-collapse>
      </div>
    </div>
</template>

<script>
  import Vue from 'vue'
  import {extraList} from '@/api/index.js'
  import {beReturned} from '@/api/index.js'
  import { Icon } from 'vant';
  import { Collapse, CollapseItem } from 'vant';
  import { Progress } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Toast);
  Vue.use(Icon);
  Vue.use(Collapse).use(CollapseItem);
  Vue.use(Progress);
    export default {
        name: "assets",
      data(){
          return{
            activeNames: ['0'],
            data:"",
            data3:[],
            data4:[],
            data5:[],
          };
      },
      methods:{
          getextraList(y){
            let uuid = localStorage.getItem("uuid");
            let pn = 1;
            let ps = 10;
            let params = {ymhaohanToken:uuid,pageNum:pn,pageSize:ps,years:y}
            extraList(params).then(res=>{
              if(y===3){this.data3 = res.data; console.log(this.data3)}
              else if(y===4){this.data4 = res.data; console.log(this.data4)}
              else if(y===5){this.data5 = res.data; console.log(this.data5)}
              else {return;}
              console.log(res.data+"/"+y);
            });
          }
      },
      mounted(){
        let uuid = localStorage.getItem("uuid");
        let params = {ymhaohanToken:uuid};
        beReturned(params).then(res=>{
          console.log(res);
          if(res.code===0){this.data = res.data;}
          else {Toast("加载失败，请重试！");}
        })
      }
    }
</script>

<style src="@/assets/css/body.css"></style>
<style src="@/assets/css/Collapse.css"></style>
<style src="@/assets/css/Progress.css"></style>
<style scoped>
  .head{
    padding: 3%;
    height: 470px;
    color: #ffffff;
    background-image: url("../../assets/img/Thewalletbackground.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .title{
    width: 100%;
    color: #ffffff;
    height: 50px;
    line-height: 50px;
  }
  .back{
    display: inline-block;
  }
  .van-icon{
    position: relative;
    top: 2px;
  }
  .money-less{
    text-align: center;
    padding-top: 140px;
  }
  .money-less>span{
    display: inline-block;
    width: 100%;
  }
  .money-less>span:nth-of-type(2){
    font-size: 50px;
  }
  .val-year{
    width: 100%;
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: 25px;
  }
  .val-year:last-of-type{
    border-bottom: none;
    margin-bottom: 0;
  }
  .val-year:after{
    display: block;
    content: '';
    clear: both;
  }
  .goods-img{
    float: left;
    width: 25%;
  }
  .goods-img>img{
    height: 140px;
    width: 140px;
  }
  .goods-detal{
    float: left;
    width: 75%;
  }
  .goods-detal>span{
    display: inline-block;
    font-size: 24px;
    line-height: 32px;
    margin: 3px 0;
    width: 100%;
    color: #333333;
  }
  .goods-detal>span>span{
    margin-left: 10px;
    color: #e30c0c;
  }
  .progress{
    float: right;
    margin: 5% 0 3% 0;
    display: block;
    width: 100%;
  }
</style>
