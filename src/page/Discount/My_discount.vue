<template>
  <div id="big">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push({name:'Personal',params:{index:'4'}})"></van-icon>
      </div>
      <div class="page-name">
        <span>优惠券</span>
      </div>
      <div class="more" v-if="log===0"></div>
      <div class="more" v-if="log===1">
      </div>
    </div>
    <div class="last">
      <img src="@/assets/img/time.png"/>
      <span>最近领取</span>
    </div>
    <div v-if="this.item.length!==0" class="contaner" :style="vals">
      <div v-for="i,index in item" :key="index" v-if="i.status==3?false:true">
        <div>
          <p><span>￥</span>{{i.couponnum}}</p>
          <p>点单满{{i.couponshould}}可以用</p>
          <p style="margin-top: 15px">有效期 {{i.coupontime | timeReplace}}</p>
        </div>
        <div style="color: white">
          {{i.parentcoupon[0].source==0?'注册体验优惠券':(i.parentcoupon[0].source==1?'分享使用优惠卷':(i.parentcoupon[0].source==2?'商品促销优惠券':''))}}
        </div>
        <p class="ljp" v-if='i.status == 0&&i.parentcoupon[0].source!=0&&i.parentcoupon[0].source!=1' @click="$router.push({path:'Particulars/'+item[index].parentcoupon[0].goodsid})">立即使用</p>
        <p class="ljp" v-if='i.status == 1'>已使用</p>
        <p class="ljp" v-if='i.status == 2&&i.parentcoupon[0].source!=0&&i.parentcoupon[0].source!=1'>未领取</p>
        <p class="ljp" v-if='i.status == 3&&i.parentcoupon[0].source!=0&&i.parentcoupon[0].source!=1'>过期</p>
      </div>
    </div>
    <div v-if="this.item.length===0" class="no-coupon">暂无优惠券！</div>
  </div>
</template>

<script>
  import { getUserCouponList } from '@/api/index.js'
  import Vue from 'vue'
  import { Icon } from 'vant';
  import { Tag } from 'vant';

  Vue.use(Tag);
  Vue.use(Icon);
  export default {
    name: "My_discount",
    data(){
      return{
        item:[],
        timers1: [],
        timers2: [],
        vals:"",
        log: 0,
      }
    },
    methods:{
      bill(){

      },
      back(){
        this.$router.go(-1);
      }
    },
    created(){
      let uuid = localStorage.getItem("uuid");
      if(uuid===null||uuid===""){
        this.vals = "display:none";
      }
      else if(uuid!==null){
        this.log = 1;
      }
    },
    mounted(){
      let uuid = localStorage.getItem("uuid");
      let pageSize = 20;
      let pageNum = 1;
      let type = 0;
      let params = {
        ymhaohanToken: uuid,
        usestatus: 0,
        pageSize:pageSize,
        pageNum:pageNum,
        type:type
      };
      getUserCouponList(params).then(res=>{
        this.item = res.data
        console.log(this.item)
      })
    },
    filters: {
    // 时间戳转换
      timeReplace: function(val){
        if(val != '' && val != undefined){
          let time = new Date(val);
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          return (y + "-" + add0(m) + "-" + add0(d));
        }
      }
    }
  }
  function add0(endTimer) {
    return endTimer < 10 ? "0" + endTimer : endTimer;
  }
  function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return (
      y +
      "-" +
      add0(m) +
      "-" +
      add0(d) +
      " " +
      add0(h) +
      ":" +
      add0(mm) +
      ":" +
      add0(s)
    );
  }
</script>

<style src="@/assets/css/body.css"></style>
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
  .more{
    position: relative;
    text-align: right;
  }
  .van-tag--round{
    position: absolute;
    top: 20px;
    right: 0px;
  }
  .last{
    height: 78px;
    line-height: 78px;
    padding: 0 20px;
  }
  .last>img{
    height: 24px;
    width: 24px;
  }
  .contaner>div{
    background: url(../../assets/img/coupansbackground2.png)no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    padding: 25px;
    align-items: center;
    margin-bottom: 40px;
    height: 210px;
  }
  .contaner>div>div>p{
    color: #ffffff;
    font-size: 23px;
    line-height: 23px;
  }
  .contaner>div>div>:nth-child(1){
    color: #ffffff;
    font-size: 60px;
    padding: 10px;
    margin: 30px 0;
  }
  .contaner>div>div>:nth-child(1)>span{
    font-size: 30px;
  }
  .ljp{
    font-size: 0.45rem;
    color:#ffffff;
  }
  .no-coupon{
    text-align: center;
    margin-top: 30px;
  }
</style>
