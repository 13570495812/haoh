<!--
	作者：3098717339@qq.com
	时间：2018-11-13
	描述：选择优惠页面
-->
<template>
  <div class="ChoiceOfPreferences">
    <div class="CPF-header">
      <span @click="gobackPay"></span>
      <h2>选择优惠券/红包</h2>
    </div>
    <div class="CPF-midder">
      <div
        class="available"
        v-if="arr.length==0"
      >
        暂无</div>
      <div
        @click="addclass(index,item.couponshould,item.couponnum,item.isbol,item)"
        class="CPF-box"
        v-for="item,index in arr"
      >
        <div class="CPF-left" :class="{'CPF-left-true':item.isbol}">
          <span>￥{{item.couponnum}}</span>
          <span>订单满{{item.couponshould}}元可使用</span>
          <span>{{item.datetime}}</span>
        </div>
        <div class="CPF-right" :class="{'CPF-right-true':item.isbol}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import Vue from 'vue'
   Vue.use(Toast);
  import bus from "../../assets/js/bus.js";
  import { getUserCouponList } from "../../api/index.js";
  import { Locale } from "vant";
  export default {
    data() {
      return {
        uuid: "",
        // paymentSubmit
        goodslist: [],
        // 当前选择的优惠券id
        isacgoodsid: "",
        // 第一个商品的id
        goodsid: "",
        arr: [],
        ifzhuceyouhui2:false
      };
    },
     props:['youhuiindex','money','youhuiindexs','goodsmsg','activity','idArray','youhuiIdArr','ifzhuceyouhuis','ifyouhuizhuce'],
    methods: {
      gobackPay() {
        this.$emit("gobackPay");
      },
      //index 索引 ,id 商品id ,bol 是否被选中 couponid 优惠id,youhuimoney 优惠价格 ifzhuceyouhui是否点击注册优惠券
      getClickyouhui(index,id,bol,couponid,youhuimoney,arr,ifzhuceyouhui){
        console.log(ifzhuceyouhui)
        this.$emit('ChoicegetClickyouhui',index,id,bol,couponid,youhuimoney,arr,ifzhuceyouhui)
        this.gobackPay();
      },
      // 调用
      // 优惠券列表
      getUseList() {
        let params = {
          type:0,
          pageSize: 100,
          usestatus: 0, // 已领取
          pageNum: 1,
          ymhaohanToken: this.uuid,
          iffirst:false
        };
        getUserCouponList(params).then(res => {
          let goodisli = [];
          let id =this.goodsid;
          let extra =this.goodsmsg[0].extra;
          let activity =this.activity
          let idArray =this.idArray
          for (let i = 0; i < res.data.length; i++) {
            if(res.data[i].parentcoupon[0]){
              if(activity=='无优惠') {
                if (parseInt(res.data[i].parentcoupon[0].source) == 2) {
                  let num=[];
                  for (let j = 0; j <this.youhuiIdArr.length ; j++) {
                    if(this.youhuiIdArr[j].couponid==res.data[i].usercouponid){
                      if(this.youhuiIdArr[j].id!=this.idArray[0]){
                        if(this.youhuiIdArr[j].bol==false){
                          num.push(this.youhuiIdArr[j].couponid);
                        }
                      }
                    }
                  }
                 if(num){
                   if(num.length>0){
                     continue
                   }else{
                     if (idArray.includes(res.data[i].parentcoupon[0].goodsid)) {
                       goodisli.push(res.data[i]);
                     }
                   }
                 }else{
                   if (idArray.includes(res.data[i].parentcoupon[0].goodsid)) {
                      goodisli.push(res.data[i]);
                   }
                 }
                } else {
                  if (extra != 1) {
                     for (let j = 0; j <this.youhuiIdArr.length ; j++) {
                          if(this.youhuiIdArr[j].couponid==res.data[i].usercouponid){
                            if(this.youhuiIdArr[j].id==this.idArray[0]){
                              this.ifzhuceyouhui2=false
                            }
                        }
                     }
                    if(!this.ifzhuceyouhui2){
                           let num=[];
                            for (let j = 0; j <this.youhuiIdArr.length ; j++) {
                              if(this.youhuiIdArr[j].couponid==res.data[i].usercouponid){
                                if(this.youhuiIdArr[j].id!=this.idArray[0]&&this.youhuiIdArr[j].bol==false){
                                  num.push(this.youhuiIdArr[j].couponid);
                                }
                              }
                            }
                            if(num){
                              if(num.length>0){
                                continue
                              }else{
                                goodisli.push(res.data[i]);
                              }
                            }else{
                              goodisli.push(res.data[i]);
                           }
                    }
                  }
                }
              }
            }
          }
          goodisli.forEach(item => {
            item.isbol = false;
          });
          this.arr = goodisli;
          console.log(this.arr)
          if(this.youhuiIdArr.length>0){
            for (let i = 0; i <this.youhuiIdArr.length ; i++) {
              if(this.youhuiIdArr[i].id ==this.idArray[0]){
                if(this.youhuiIdArr[i].bol){
                  this.arr[this.youhuiIdArr[i].index].isbol=false;
                }else{
                  for (let j = 0; j <this.arr.length ; j++) {
                    if(this.arr[j].usercouponid==this.youhuiIdArr[i].couponid){
                      this.arr[j].isbol=true;
                    }
                  }
                }
              }
            }
         }
        });
          },
      addclass(index,moneys,moneyes,bol,item) {
        let bols =false;
        for (let i = 0; i <this.youhuiIdArr.length ; i++) {
            if(this.youhuiIdArr[i].id ==this.idArray[0]){
               bols=true;
            }
        }
        if(bol!=true&&!bols){
          if((this.money/100)<moneys){
            Toast('该优惠卷不符合规范');
            return;
          }else{
            this.isacgoodsid = this.arr[index].usercouponid;
            if(parseInt(item.parentcoupon[0].source) != 2){
              // //判断是否同时点击一件商品
             this.getClickyouhui(index,this.idArray[0],this.arr[index].isbol,this.isacgoodsid,this.arr[index].couponnum,this.arr,true)
            }else{
               // //判断是否同时点击一件商品
             this.getClickyouhui(index,this.idArray[0],this.arr[index].isbol,this.isacgoodsid,this.arr[index].couponnum,this.arr,false)
            }
          }
        }else{
          this.isacgoodsid = this.arr[index].usercouponid;
               // //判断是否同时点击一件商品
            this.getClickyouhui(index,this.idArray[0],this.arr[index].isbol,this.isacgoodsid,this.arr[index].couponnum,this.arr,false)
        }
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.goodsid = localStorage.getItem("cartgoodsid");
    },
    mounted() {
      console.log(this.ifyouhuizhuce)
      console.log(this.ifzhuceyouhuis)
      this.ifzhuceyouhui2 = this.ifzhuceyouhuis;
      this.getUseList();
      this.$bus.$on(function (val,val2) {
        console.log(val,val2)
      })
    },
    watch:{
       idArray(newVal,oldval){
         console.log(newVal)
       }
    }
  };
</script>

<style>
  .van-toast{
    line-height: 1.5em !important;
  }
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
  }

  .clearfix {
    zoom: 1;
  }

  .ChoiceOfPreferences {
    position: relative;
    width: 100%;
    height: 980px;
    background-color: #ffffff;
    bottom: 0;
  }

  .ChoiceOfPreferences .CPF-header {
    height: 100px!important;
    line-height: 100px!important;
    border: 1px solid #ccc;
  }

  .ChoiceOfPreferences .CPF-header span {
    display: block;
    float: left;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/img/delete.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    float: left;
    margin-left: 24px;
    margin-top: 0.466667rem;
  }

  .ChoiceOfPreferences .CPF-header h2 {
    text-align: center;
    font-family: HiraginoSansGB-W3;
    font-size: 34px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    margin-top: 20px;
    margin-right: 40px;
  }

  .ChoiceOfPreferences .CPF-midder .CPF-box {
    width: 100%;
    height: 173px;
    background-color: #ffffff;
    padding: 25px;
    box-sizing: border-box;
  }

  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-left {
    width: 250px;
    color: #999999;
  }
  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-left-true {
    color: #5784fe;
  }
  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-left span:nth-of-type(1) {
    display: block;
    text-align: left;
    font-family: HiraginoSansGB-W3;
    font-size: 45px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
  }
  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-left span:nth-of-type(2) {
    display: block;
    text-align: left;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
  }
  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-left span:nth-of-type(3) {
    display: block;
    width: 195px;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
  }
  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-right {
    display: block;
    float: right;
    width: 30px;
    height: 30px;
    background-image: url(../../assets/img/check.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: relative;
    bottom: 75%;
    right: 23px;
  }
  .ChoiceOfPreferences .CPF-midder .CPF-box .CPF-right-true {
    background-image: url(../../assets/img/checked2.png);
  }
  .available {
    font-size: 36px;
    margin: 50px;
    text-align: center;
  }
</style>
