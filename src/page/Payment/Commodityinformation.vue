<template>
  <div class="Codinformation" id="Codinformation" style="padding-bottom: 100px;">
    <div class="Codinformation-header">
      <h3>商品详情</h3>
    </div>
    <div class="deduction">
      <ul>
        <li v-if="yue">
          <div class="left">余额抵扣（剩余{{balances}}）</div>
          <div class="right"></div>
        </li>
        <li v-if="xunibi">
          <div class="left">牛牛币抵扣（剩余{{currencys}}）</div>
          <div class="right"></div>
        </li>
      </ul>
    </div>
    <div
      class="Codinformation-mid"
      :key="index"
      v-for="(item,index) in CartArray"
    >
      <van-card
        :num="item.stock"
        :desc="item.priceName"
        :title="item.goodsName"
        :thumb="myhttp+item.mediaIdDatu"
      >
        <p
          class="Codinformation-money"
          slot="footer"
        ><span>￥{{item.price}}</span></p>
      </van-card>
      <ul class="Codinformation-list">
        <li>
          <span class="li-left">商城优惠</span>
          <span class="li-right">包邮</span>
        </li>
        <li>
          <span class="li-left">配送方式</span>
          <span class="li-right">快递 包邮</span>
        </li>
        <li v-if="ishuabei">
          <!--是否分期付款-->
          <span class="li-left">返还购期数</span>
          <span
            v-if="item.years==3"
            class="li-right li-huabei"
          >三年(80%)
          </span>
          <span
            v-if="item.years==4"
            class="li-right li-huabei"
          >四年(90%)
          </span>
          <span
            v-if="item.years==5"
            class="li-right li-huabei"
          >五年(全额返)
          </span>
          <span
            class="li-right li-huabei"
            v-if="item.years==0"
          >该商品无返还</span>
        </li>
        <li>
          <span class="li-left">使用优惠劵</span>
          <span
            class="li-right li-youhui"
            @click="RpOrDiscountR(false,index,item.goodsId)"
            v-if="ifshow(item)"
          >添加优惠券<i></i></span>
          <span
            class="li-right li-youhui"
            @click="RpOrDiscountR(false,index,item.goodsId)"
            v-for="items in shiyongyouhui"
            v-if="shiyongyouhui.length>0&&items.id==item.goodsId"
          >{{items.bol?'已使用优惠卷':'添加优惠券'}}<i></i></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Card } from "vant";
  import { Stepper } from "vant";
  import { Field } from "vant";
  import { SwitchCell } from "vant";
  import { member, towapwxpay } from "../../api/index.js";
  import bus from "../../assets/js/bus.js";
  Vue.use(SwitchCell);
  Vue.use(Field);
  Vue.use(Card);
  Vue.use(Stepper);
  export default {
    data() {
      return {
        myhttp: "http://www.ymhaohan.cn/",
        imageURL: require("../../assets/img/product-img2.png"),
        value: 0,
        // 余额
        balance: "",
        balances: 0,
        // 虚拟币
        currency: "",
        currencys: 0,
        uuid: "",
        checked: true,
        message: "",
        CartArray: [],
        // 判断是几年返利
        years: 0,
        minheights: { maxHeight: 50, minHeight: 50 },
        ishuabei: true, //是否分期付款
        yue: false,
        xunibi: false,
        // 储存订单列表传来的值
        orderarr: [],
      };
    },
    props:['Youhuilist','money','shiyongyouhui']
    ,
    computed:{
      // 是否显示购买优惠
      ifshow(){
        return function(item){
          if(this.shiyongyouhui.length<1){
               return true;
            }else{
              for (const key in this.shiyongyouhui) {
                  if (this.shiyongyouhui[key].id==item.goodsId) {
                      return false;
                  }else{
                      return true;
                  }
              }
            }
        }
      }
    },
    methods: {
      // 子传父
      assignment() {
        //用户账户虚拟币
        localStorage.setItem("balance", this.balances);
        //用户输入的
        localStorage.setItem("userbalance", this.balance);
      },
      assignmenttow() {
        //用户账户余额
        console.log(this.currencys);
        localStorage.setItem("currency", this.currencys);
        //用户输入的
        localStorage.setItem("usercurrency", this.currency);
      },
      // 获取用户信息
      members() {
        let params = {
          ymhaohanToken: this.uuid
        };
        member(params).then(res => {
          this.balances =( parseInt( res.userinfodetails.money * 100 ) / 100 ).toFixed(2) ;
          this.currencys = ( parseInt( res.xunlibi.money * 100 ) / 100 ).toFixed(2);
          console.log(this.currencys)
          this.assignment();
          this.assignmenttow();
        });
      },
      RpOrDiscountR(data,index,goodsId) {
        if (data) {
          this.$emit("RpOrDiscountR", data,index,goodsId);
        } else {
          this.$emit("RpOrDiscountR", data,index,goodsId);
        }
      }
    },
    watch:{
      shiyongyouhui:(item)=>{
        console.log(item)
        console.log(item.length)
        return item;
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.members();
      this.CartArray = JSON.parse(localStorage.getItem("choosepro"));
      console.log(this.CartArray);
      localStorage.setItem("cartgoodsid", this.CartArray[0].goodsId);
    },
    mounted() {
      //获取uuid
      // 获取购物车页面传来的数组
      console.log(this.shiyongyouhui)
      this.members();
      this.$bus.$on("setInput", val => {
        this.yue = val.yue;
        this.xunibi = val.xunibi;
      });
      // 获取订单列表传来的值
      let roulist = this.$route.query.list;
      if (roulist !== "[object Object]") {
        localStorage.setItem("orderlist", JSON.stringify(this.$route.query.list));
        console.log("this.$route.query.list");
      }
      this.orderarr = JSON.parse(localStorage.getItem("orderlist"));
      if (this.orderarr.toString() != "undefined") {
        this.CartArray = this.orderarr.goodslist;
      }
    }
  };
</script>

<style>
  .Codinformation .Codinformation-header h3 {
    margin-left: 20px;
    font-weight: normal;
  }
  .Codinformation .van-card__title {
    max-height: 150px;
    line-height: normal;
    word-break: normal;
  }
  .Codinformation .van-card {
    font-size: 28px;
    height: 200px;
    background-color: #fff;
    padding-left: 1.333333rem;
  }
  .Codinformation .van-card__desc,
  .van-card__title {
    line-height: 0.8rem;
  }
  .Codinformation .van-card__right {
    line-height: 1em;
    color: #000000;
  }
  .Codinformation .van-card__num {
    color: #111010;
  }
  .Codinformation .van-card__desc {
    margin-top: 20px;
    color: #ccc;
    max-height: 100px;
  }
  .Codinformation .van-card__thumb {
    width: 1.4rem;
    height: 110px;
    top: 30px;
    left: -60px;
    position: relative;
  }
  .Codinformation .van-card__thumb img {
    width: 100%;
    height: 100%;
  }
  .Codinformation .van-card__footer {
    right: 6.2rem;
    font-size: 28px;
    color: red;
    bottom: 20px;
  }
  .Codinformation .Codinformation-list li {
    padding: 25px;
    font-size: 0.4rem;
    border-top: 1px solid #ccc;
  }
  .Codinformation .Codinformation-list li .van-stepper {
    float: right;
  }
  .Codinformation .van-stepper__minus,
  .van-stepper__plus {
    width: 50px;
    height: 50px;
  }
  .Codinformation .van-stepper__input {
    width: 50px;
    height: 50px;
    font-size: 26px;
  }
  .Codinformation .Codinformation-list li .li-right {
    float: right;
  }
  .Codinformation .Codinformation-list li .li-youhui {
    font-size: 30px;
    color: #cccccc;
  }
  .Codinformation .Codinformation-list li .li-huabei {
    font-size: 30px;
  }
  .Codinformation .Codinformation-list li .li-youhui i,
  .Codinformation-list li .li-huabei i {
    float: right;
    display: block;
    width: 15px;
    height: 24px;
    background-image: url(../../assets/img/right-arrow.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 10px;
    margin-left: 10px;
  }
  .Codinformation .Codinformation-list li .van-cell {
    font-size: 0.4rem;
    line-height: 1.3em;
    padding: 0.133333rem 0;
  }
  .Codinformation li .van-field .van-cell__title {
    max-width: 2.1rem;
  }
  .Codinformation .Codinformation-list li .van-cell__value .van-field__control {
    font-size: 30px;
  }
  .Codinformation .Codinformation-mid {
    margin-bottom: 30px;
    border-bottom: 30px solid #eee;
  }
  .Codinformation .Codinformation-mid:last-child {
    border-bottom: none;
  }
  .Codinformation .Codinformation-mid .van-cell {
    font-size: 0.4rem;
  }
  .Codinformation .Codinformation-mid .van-switch {
    font-size: 40px !important;
  }
  .Codinformation .Codinformation-niming {
    margin-top: 20px;
  }
  .deduction li {
    height: 80px;
    justify-content: space-between;
    line-height: 80px;
    display: flex;
    font-size: 30px;
    text-indent: 24px;
  }
  .deduction li input {
    width: 250px;
    border: none;
  }
  .deduction {
    margin-bottom: 10px;
  }
</style>
