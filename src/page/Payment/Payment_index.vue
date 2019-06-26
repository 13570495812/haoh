<!--
	作者：3098717339@qq.com
	时间：2018-11-13
	描述：确认订单模块
-->
<template>
  <div class="Payment">
    <!-- 选择支付方式 -->
    <div class="pop-up">
      <van-popup v-model="show1">
        <div class="big">
          <div class="top">
            <div class="lef">
              <div>
                <van-icon
                  class="icon"
                  name="wechat"
                />
              </div>
              <div>微信支付</div>
            </div>
            <div class="rig">
              <div>
                <van-icon
                  class="icon"
                  name="alipay"
                />
              </div>
              <div>支付宝支付</div>
            </div>
          </div>
          <div
            class="bott"
            @click="cancel"
          >
            取消
          </div>
        </div>
      </van-popup>
    </div>
    <van-nav-bar
      class="navbar"
      title="确认订单"
      left-arrow
      @click-left="onClickLeft"
    />
    <Userinfromation
      :recvName="this.info==null?this.username:this.info.name"
      :recvPhone="this.info==null?this.usernumber:this.info.phone"
      :addr="this.info==null?this.useradd:this.info.address"
    ></Userinfromation>

    <!--选择类型-->
    <div
      class="shopping-dis"
    >
      <ul>
        <li
          :key="index"
          v-for="(item,index) in meth"
          @click="clickmethod(index)"
          class="checkbefore"
          :class="{checkofer:checkblue == index}"
        >{{item.style}}</li>
      </ul>
    </div>
    <Commodityinformation
      @RpOrDiscountR='RpOrDiscountR'
      :Youhuilist="Youhuilist"
      :CartArray='this.CartArray'
      :shiyongyouhui="shiyongyouhui"
    ></Commodityinformation>
    <div class="paymentSubmit">
      <van-submit-bar
        :price='allprice'
        button-text="确定付款"
        @submit="onSubmit"
      />
    </div>

    <van-popup
      v-model="show"
      position="bottom"
      :overlay="true"
      :close-on-click-overlay='false'
    >
      <Paymentoptions
        @gobackPay='gobackPay'
        @PaymentMethod='PaymentMethod'
        @topayye="topayye"
        @topaywx="topaywx"
        @topayal="topayal"
        :yue="getyear"
        v-if='isPaymentoptions'
      ></Paymentoptions>
    </van-popup>
    <van-popup
      v-model="isReturnPurchase"
      position="bottom"
      :overlay="true"
      :close-on-click-overlay='false'
    >
      <ReturnPurchase
        @gobackPay='gobackPay'
        v-if='RpOrDiscount'
      ></ReturnPurchase>
      <choice-of-preferences
        @gobackPay='gobackPay'
        @getyouhuivalue="getyouhuivalue"
        @ChoicegetClickyouhui="ChoicegetClickyouhui"
        :youhuiindex="youhuiindex"
        :youhuiindexs="youhuiindexs"
        :money="allprice"
        :goodsmsg="goodsmsg"
        :idArray="idArray"
        :index="index"
        :youhuiIdArr="youhuiIdArr"
        :ifzhuceyouhuis="ifzhuceyouhui"
        :activity="this.CartArray[0].activityType?this.CartArray[0].activityType:($route.query.activitygo?$route.query.activitygo:'无优惠')"
        v-if='!RpOrDiscount'
      ></choice-of-preferences>
    </van-popup>
    <!--//支付宝返回项目-->
    <div id="mapps"></div>
    <van-popup v-model="popupshow" :style="{width:'200px',height:'200px'}">
      <van-loading  type="spinner" :style="{width: '100px',height:'100px',margin:'0 auto'}"/>
      <div style="font-size: 30px; text-align: center;line-height: 100px">加载中</div>
    </van-popup>
  </div>
</template>

<script>
  import {
    list,
    topay,
    towapwxpay,
    towapalipay,
    myAddr,
    towxpay,
    toYuePay,
    member,
    addpintuanpeople,
    toalipay
  } from "@/api/index.js";
  import Vue from "vue";

  import { Toast } from "vant";
  Vue.use(Toast);
  import { SubmitBar} from "vant";
  Vue.use(SubmitBar);

  import axios from "axios";
  import bus from "../../assets/js/bus.js";
  import { NavBar } from "vant";
  import Userinfromation from "./Userinformation.vue";
  import Commodityinformation from "./Commodityinformation.vue";
  import paymentSUbmitBar from "./payment_SubmitBar.vue";
  import paymentningming from "./payment_ningming.vue";
  import Paymentoptions from "./Paymentoptions.vue";
  import DeterminePayment from "./DeterminePayment.vue";
  import ReturnPurchase from "./ReturnPurchase.vue";
  import ChoiceOfPreferences from "./ChoiceOfPreferences.vue";
  import { Popup } from "vant";
  import { Loading } from 'vant'
  Vue.use(Popup);
  Vue.use(NavBar);
  Vue.use(Loading);

  export default {
    data() {
      return {
        // 收货人
        pricenumber: 0, // 商品价格
        username: "",
        usernumber: "",
        statess: "",
        useradd: "",
        couponid: "",
        provinceId: "",
        city: "",
        district: "",
        // 是否使用余额
        notuser: 0,
        balance: 0,
        // 经纬度
        lng: "",
        lat: "",
        // 第一次进入页面时生成的地址
        defaultadd: {},
        //  选择后的地址
        selecadd: {},
        // 判断是否使用优惠券
        isuse: 1,
        // 省份
        districtname: "",
        show1: false,
        productId: "", //订单号
        goodsnum: "", //商品实例id
        show: false,
        CartArrayarr: "",
        currency: "",
        CartArray: [],
        uuid: "",
        rebate: 0,
        Youhuilist:[],  // 优惠红包
        Youhuimoney: 0 , // 优惠红包钱数
        isPaymentoptions: false, //是否切换支付方式
        isReturnPurchase: false, //是否返利
        RpOrDiscount: true, //true 返利  false 优惠
        info: {},
        isshow: false, //选择支付方式
        meth: [
          { style: "牛牛币" },
          { style: "余额" },
          { style: "支付宝" },
          { style: "微信" }
        ],
        checkblue: -1,
        pay: -1, //用户选择支付方式
        goodsprice: 0, //商品价格
        goodspricezero: 0, //商品价格/100
        alipayUrl: "",
        // 获取存储的余额和牛牛币
        getyear: 0,
        getxunibi: 0,
        orderlist: "",
        orderlists: [],
        style: [],
        youhuiindex:0,
        redbaonumber: 0, // 红包价格
        money:0,
        popupshow:false, //判断是否支付中状态
        youhuiindexs:'index',
        map:null,
        ifsure:false,//判断是否能支付
        goodsmsg:{}, //商品信息对象
        idArray:[],
        index:'无',  //获取优惠券的索引
        youhuiIdArr:[], //获取优惠卷返回的id数组
        oldindex:0,
        ifyouhuioldmoney:false,
        youhuioldmoney:0,
        ifzhuceyouhui: false,
        shiyongyouhui:[]//是否使用优惠卷
     };
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      // 获取存储的余额和牛牛币
      let params = {
        ymhaohanToken: this.uuid
      };
      member(params).then(res => {
        this.getyear=( parseInt( res.userinfodetails.money * 100 ) / 100 ).toFixed(2);
        console.log(this.getyear)
        this.getxunibi=( parseInt( res.xunlibi.money * 100 ) / 100 ).toFixed(2);
      });
      // 获取购物车页面传来的数组
      this.CartArray = JSON.parse(localStorage.getItem("choosepro"));
      this.goodsmsg=this.CartArray;
      console.log(this.goodsmsg)
      this.style = JSON.parse(localStorage.getItem("style"));
      this.info = JSON.parse(localStorage.getItem("def_addr"));
      this.orderlist = JSON.parse( localStorage.getItem('my_ordermsg'));
      if (this.orderlist != undefined) {
        this.orderlists.push(this.orderlist);
        this.CartArray = this.orderlists[0].goodslist;
        localStorage.setItem('choosepro',JSON.stringify(this.CartArray));
        return;
      }

    },
    mounted() {
      console.log(this.ifzhuceyouhui)
      //加载地图
      this.map = new BMap.Map("mapps");
      this.clickmethod(0)
      // 调用收获地址接口
      this.onOpen();
      for (var i = 0; i < this.CartArray.length; i++) {
        this.CartArrayarr;
      }
      let self = this;
      bus.$on("playpay", e => {
        this.show = e;
      });
      this.getAddress();
      // 获取返还购期数
      this.rebate = JSON.parse(localStorage.getItem("choosepro"));
      this.rebate.forEach(item=>{
        if(item.extra==1){
          this.rebate=item.extra;
        }
      })
    },
    // 计算金额
    computed: {
      allprice: function() {
        let price = 0;
        for (var i = 0; i < this.CartArray.length; i++) {
          price += (this.CartArray[i].stock * this.CartArray[i].price);
        }
        this.goodsprice = price - this.Youhuimoney;
        this.goodspricezero=this.goodsprice*100;
        return  this.goodspricezero;
      }
    },
    methods: {
      ChoicegetClickyouhui(index,id,bol,couponid,youhuimoney,arr,ifzhuceyouhui){
        this.ifzhuceyouhui = ifzhuceyouhui;
        let array=[];
          if(this.youhuiIdArr.length>0){
            array =this.youhuiIdArr.filter(item=>item.id==id);
            if(array.length==0){
              this.couponid+=(','+couponid);
              this.Youhuimoney+=parseInt(youhuimoney);
              this.youhuiIdArr.push({index,id,bol,couponid,youhuimoney})
              this.shiyongyouhui.push({id,msg:"已使用优惠卷",bol:true})
            }else{
              if(bol){
                this.couponid=this.couponid.split(',');
                for (let i = 0; i <this.couponid.length; i++) {
                  if(this.couponid[i]==couponid){
                     this.couponid.splice(i,1);
                  }
                }
                this.couponid=this.couponid.join('');
                this.Youhuimoney-=parseInt(youhuimoney);
                if(this.Youhuimoney<0){
                  this.Youhuimoney=0
                }
                for (let i = 0; i <this.youhuiIdArr.length ; i++) {
                  if(this.youhuiIdArr[i].id==id){
                    this.youhuiIdArr[i].bol=true;
                    this.youhuiIdArr[i].index=index;
                    this.youhuiIdArr.splice(i,1)
                  }
                }
                if(this.shiyongyouhui.length>0){
                  for (let i = 0; i <this.shiyongyouhui.length ; i++) {
                    if(this.shiyongyouhui[i].id==id){
                      this.shiyongyouhui.splice(i,1)
                    }
                  }
                }
              }else{
                this.couponid+=(','+couponid);
                this.Youhuimoney+=parseInt(youhuimoney);
                for (let i = 0; i <this.youhuiIdArr.length ; i++) {
                  if(this.youhuiIdArr[i].id==id){
                    this.youhuiIdArr[i].id=id;
                    this.youhuiIdArr[i].couponid=couponid;
                    if(this.youhuiIdArr[i].index!=index){
                      this.youhuiIdArr[i].index=index;
                      this.Youhuimoney=youhuimoney;
                    }
                    this.youhuiIdArr[i].bol=false;
                  }
                }
                if(this.shiyongyouhui.length>0){
                  if(this.shiyongyouhui.length>0){
                    for (let i = 0; i <this.shiyongyouhui.length ; i++) {
                      if(this.shiyongyouhui[i].id==id){
                        this.shiyongyouhui[i].bol=true;
                      }
                    }
                  }
                }
              }
            }
          }else{
            this.youhuiIdArr.push({index,id,bol,couponid,youhuimoney})
            this.couponid+=couponid;
            this.Youhuimoney+=parseInt(youhuimoney);
            this.shiyongyouhui.push({id,msg:"已使用优惠卷",bol:true})
          }
      },
      fanhuiiframe(){
        localStorage.removeItem('choosepro')
        localStorage.removeItem("couponid");
        localStorage.removeItem("currency");
        localStorage.removeItem("balance");
        localStorage.removeItem('my_ordermsg')
        this.$router.push({path: '/My_order',query:{ index:'0'}})
      },
      topayal(){
        this.isPaymentoptions=false
        this.show=false;
        if((this.allprice/100)<parseInt(this.getyear)||(this.allprice/100)<parseInt(this.getxunibi)){
          Toast('你的余额或牛牛币已经足够支付该商品请用余额或牛牛币支付')
          return;
        }
        this.zfb();
      },
      topaywx(){
        this.show=false;
        this.isPaymentoptions=false;
        localStorage.removeItem("couponid");
        if((this.allprice/100)<parseInt(this.getyear)||(this.allprice/100)<parseInt(this.getxunibi)){
          Toast('你的余额或牛牛币已经足够支付该商品请用余额或牛牛币支付')
          return;
        }
        this.wxpay();
      },
      topayye(){
        this.show=false;
        this.isPaymentoptions=false
        if ((this.getyear*100) < this.goodspricezero) {
          Toast("余额不足");
          return;
        }
        localStorage.removeItem("couponid");
        let params = {
          productId: this.productId,
          flag: 0,
          usercouponid: this.couponid,
          ymhaohanToken: this.uuid
        };
        toYuePay(params).then(res => {
          if (
            (res.err ="支付成功！"&&res.flag==1)
          ) {
            Toast("支付成功");
            if(this.$route.query.recommendid&&this.$route.query.goodsId){
              addpintuanpeople({ymhaohanToken:this.uuid,recommendid:this.$route.query.recommendid,goodsid:this.$route.query.goodsId,goodsnum:1,begintime:new Date().getDate(),endtime:new Date().getDate()}).then(
                res=>{
                  console.log(res)
                }
              )
            }
            localStorage.removeItem('choosepro')
            localStorage.removeItem("couponid");
            localStorage.removeItem("currency");
            localStorage.removeItem("balance");
            localStorage.removeItem('my_ordermsg')
            this.$router.push({ path: "/My_order", query: { index: "1" } });
          } else {
            Toast("支付失败");
            localStorage.removeItem('choosepro')
            localStorage.removeItem("couponid");
            localStorage.removeItem("currency");
            localStorage.removeItem("balance");
            localStorage.removeItem('my_ordermsg')
            this.$router.push({ path: "/My_order", query: { index: "0" } });
          }
        });
      },
      getlocal(){
        var localSearch = new BMap.LocalSearch(this.map);
        var keyword = this.info == null ? this.provinceId+this.city+this.district+this.useradd :
                      this.info.provinceId+this.info.cityId+this.info.districtId+this.info.address;
        let _this=this;
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0);
          console.log(poi)
          if(!poi){
            Toast('地址信息不存在请换一个地址')
            return;
          }
          _this.lng=poi.point.lng;
          _this.lat=poi.point.lat;
        });
        localSearch.search(keyword);
      },
      // 生成订单id
      orderid() {
        if (this.orderlist != undefined) {
          console.log(this.orderlist)
          this.productId = this.orderlist.productId;
          this.ifsure=true
          return;
        }
        // 拼接商品实例ID
        let goodsObjectId = "";
        for (var i = 0; i < this.CartArray.length; i++) {
          goodsObjectId += this.CartArray[i].goodsObjectId + "_";
        }
        goodsObjectId = goodsObjectId.substr(0, goodsObjectId.length - 1);
        // 收货人姓名
        const _this = this;
        let params = {
          goodsObjectId: goodsObjectId,
          recvName: this.info == null ? this.username : this.info.name,
          recvPhone: this.info == null ? this.phone : this.info.phone,
          addr: this.info == null ? this.useradd : this.info.address,
          province: this.info == null ? this.provinceId : this.info.provinceId,
          city: this.info == null ? this.city : this.info.cityId,
          district: this.info == null ? this.district : this.info.districtId,
          lon: this.lng,
          lat: this.lat,
          style: this.style,
          ymhaohanToken: this.uuid,
          activity: this.CartArray[0].activityType?this.CartArray[0].activityType:null
        };
        topay(params).then(res => {
          if (res.err == "收件人必填信息必须填写") {
            this.statess = "收件人必填信息必须填写";
          }
          this.productId = res.productId;
          this.ifsure=true
        });
      },
      onClickLeft() {
        localStorage.removeItem('choosepro')
        localStorage.removeItem("couponid");
        localStorage.removeItem("currency");
        localStorage.removeItem("balance");
        localStorage.removeItem('my_ordermsg')
        this.$router.back(-1);
      },
      RpOrDiscountR(data,index,goodsId) {
        this.isReturnPurchase = true;
        this.RpOrDiscount = data;
        this.youhuiindex=index;
        if(!this.idArray.includes(goodsId)){
          if(this.idArray.length>0){
            this.idArray.splice(0,1,goodsId)
          }else{
            this.idArray.push(goodsId);
          }
        }
      },
      gobackPay() {
        this.isReturnPurchase = false;
        this.RpOrDiscount=true;
      },
      PaymentMethod(data) {
        this.isPaymentoptions = data;
      },
      //获取value值，
      getyouhuivalue(val1,val2,index){
        this.Youhuilist.push(val1);
        this.Youhuilist.push(val2);
        this.Youhuimoney = val1
        this.youhuiindexs=index;
        bus.$emit('qwer',this.Youhuilist);
    },
      //获取地址
      getAddress: function() {
        let params = {
          ymhaohanToken: this.uuid
        };
        list(params).then(res => {
        });
      },
      //生成预支付接口-并调出支付宝H5支付
      gettowapalipay: function() {
        localStorage.removeItem("couponid");
        const _this = this;
        if (window.plus) {
          plus.payment.getChannels(
            function(channels) {
              let channel = '';
              channels.forEach(item=>{
                if(item.id == 'alipay'){
                  channel = item
                }
              })
              let params = {
                productId: _this.productId,
                ymhaohanToken: _this.uuid,
                usercouponid:_this.couponid,
                xunibi: _this.currency,
                yuer: _this.balance
              };
              toalipay(params).then(res => {
                plus.payment.request(
                  channel,
                  res,
                  function(result) {
                    if(_this.$route.query.recommendid&&_this.$route.query.goodsId){
                      addpintuanpeople({ymhaohanToken:_this.uuid,recommendid:_this.$route.query.recommendid,goodsid:_this.$route.query.goodsId,goodsnum:1,begintime:new Date().getDate(),endtime:new Date().getDate()}).then(
                        res=>{
                          console.log(res)
                        }
                      )
                    }
                    plus.nativeUI.alert(
                      "支付成功！",
                      function() {
                        _this.$router.push({
                          path: "/My_order",
                          query: { index: "1" }
                        })
                      }
                    );
                  },
                  function(error) {
                    if(error.code == 62001) {
                      plus.nativeUI.alert("已取消支付");
                    }
                    plus.nativeUI.alert("支付失败");
                    _this.$router.push({
                      path: "/My_order",
                      query: { index: "0" }
                    });
                  }
                );
              });
            },
            function(e) {
              alert("获取支付通道失败：" + e.message);
              this.$router.push({ path: "/My_order", query: { index: "0" } });
            }
          );
        }
        // localStorage.setItem("local", local);
        localStorage.removeItem("couponid");
        localStorage.removeItem("currency");
        localStorage.removeItem("balance");
        localStorage.removeItem('my_ordermsg')
      },
      // 第一次获取收货地址
      onOpen() {
        let uuid = localStorage.getItem("uuid");
        let params = { ymhaohanToken: uuid };
        myAddr(params).then(res => {
          // 拿到默认的地址
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].isService == "1") {
              this.defaultadd = res.data[i];
              this.username = this.defaultadd.name;
              this.phone = this.defaultadd.phone;
              this.useradd = this.defaultadd.address;
              this.districtname = this.defaultadd.districtname;
              this.provinceId = this.defaultadd.provinceId;
              this.city = this.defaultadd.cityId;
              this.district = this.defaultadd.districtId;
              // 生成订单id
              // 获取经纬度
              this.getlocal();
              return;
            } else {
              this.username = this.info.name;
              this.phone = this.info.phone;
              this.useradd = this.info.address;
              this.districtname = this.info.districtname;
              this.provinceId = this.info.provinceId;
              this.city = this.info.cityId;
              this.district = this.info.districtId;
              // 生成订单id
              // 获取经纬度
              this.getlocal();
              return;
            }
          }
          let index = res.data.findIndex(item => item.isService === "1");
          this.radio = index;
          if (res.state === "0") {
            this.list = res.data;
          } else {
            Toast(res.message);
          }
        });
      },
      onSubmit: function() {
        this.popupshow=true;
        this.orderid();
      },
      wxpay() {
        localStorage.removeItem("couponid");
        const _this = this;
        if (window.plus) {
          plus.payment.getChannels(
            function(channels) {
              let channel = '';
               channels.forEach(item=>{
                if(item.id == 'wxpay'){
                  channel = item
                }
              })
              let params = {
                productId: _this.productId,
                ymhaohanToken: _this.uuid,
                usercouponid:_this.couponid,

              };
              towxpay(params).then(res => {
                console.log(res)
                plus.payment.request(
                  channel,
                  res,
                  function(result) {
                    if(_this.$route.query.recommendid&&_this.$route.query.goodsId){
                      addpintuanpeople({ymhaohanToken:_this.uuid,recommendid:_this.$route.query.recommendid,goodsid:_this.$route.query.goodsId,goodsnum:1,begintime:new Date().getDate(),endtime:new Date().getDate()}).then(
                        res=>{
                          console.log(res)
                        }
                      )
                    }
                    plus.nativeUI.alert(
                      "支付成功！",
                      function() {
                        _this.$router.push({
                          path: "/My_order",
                          query: { index: "1" }
                        })
                      }
                    );
                  },
                  function(error) {
                    if (error.code == 62001) {
                      plus.nativeUI.alert("已取消支付");
                    }
                    plus.nativeUI.alert("支付失败");
                    _this.$router.push({
                      path: "/My_order",
                      query: { index: "0" }
                    });
                  }
                );
              });
            },
            function(e) {
              alert("获取支付通道失败：" + e.message);
              this.$router.push({ path: "/My_order", query: { index: "0" } });
            }
          );
        }
      },
      zfb() {
        this.gettowapalipay();
      },
      // 取消支付
      cancel() {
        this.show1 = false;
        localStorage.removeItem("currency");
        localStorage.removeItem("balance");
      }, //微信支付接口
      towapwxpay() {
        //优惠卷id
        localStorage.removeItem("couponid");
        let local =
          "http://www.ymhaohan.cn/phone/towapwxpay?productId=" +
          this.productId +
          "&usercouponid=" +
          this.couponid +
          "&ymhaohanToken=" +
          this.uuid +
          "&xunibi=" +
          this.currency +
          "&yuer=" +
          this.balance;
      },
      methodcheck() {
        this.isshow = !this.isshow;
      },
      //支付方式
      clickmethod(index) {
        this.checkblue = index;
        let setInput = {};
        if (index == 0) {
          //虚拟币
          this.pay = 0;
          setInput = {
            xunibi: true,
            yue: false
          };
          this.$bus.$emit("setInput", setInput);
        } else if (index == 1) {
          //余额
          this.pay = 1;
          setInput = {
            yue: true,
            xunibi: false
          };
          this.$bus.$emit("setInput", setInput);
        } else if (index == 2) {
          if((this.allprice/100)<parseFloat(this.getyear)||(this.allprice/100)<parseFloat(this.getxunibi)){
          	Toast('你的余额或牛牛币已经足够支付该商品请用余额或牛牛币支付')
             if(this.allprice<this.getxunibi){
               this.pay = 0;
               this.checkblue=0;
             }else if(this.allprice<this.getyear){
               this.pay = 1;
               this.checkblue=1;
             }
          	return;
          }
          //支付宝
          this.pay = 2;
          setInput = {
            yue: false,
            xunibi: false
          };
          this.$bus.$emit("setInput", setInput);
        } else if (index == 3) {
          if((this.allprice/100)<parseFloat(this.getyear)||(this.allprice/100)<parseFloat(this.getxunibi)){
            Toast('你的余额或牛牛币已经足够支付该商品请用余额或牛牛币支付')
            if(this.allprice<this.getxunibi){
              this.pay = 0;
              this.checkblue=0;
            }else if(this.allprice<this.getyear){
              this.pay = 1;
              this.checkblue=1;
            }
            return;
          }
          //微信
          this.pay = 3;
          setInput = {
            yue: false,
            xunibi: false
          };
          this.$bus.$emit("setInput", setInput);
        }
      }
    },
    watch:{
      ifsure(newval,oldval){
        console.log(this.ifsure)
        if(this.ifsure){
          this.ifsure=false;
          this.popupshow=false;
          if (this.statess == "收件人必填信息必须填写") {
            this.$toast("请填写地址");
            return;
          } else if (this.info == null) {
            this.$toast("请填写地址");
            return;
          }
          this.notuser = this.currency + this.balance;
          let balance = localStorage.getItem("balance");
          this.balance = parseInt(balance);
          if (String(this.balance) == "NaN") {
            this.balance = 0;
          }
          let currencys = localStorage.getItem("currency");
          console.log(currencys)
          // 使用优惠卷满xx减xxx
          this.redbaonumber= localStorage.getItem("coupnumber")
          localStorage.removeItem("coupnumber");

          this.currency = parseInt(currencys);
          if (String(this.currency) == "NaN") {
            this.currency = 0;
          }
          this.showxunibi = true;
          if (this.pay == -1) {
            Toast("请选择支付方式");
          }
          if (this.pay == 0) {
            if (this.rebate == 1) {
              Toast("返还商品不能使用牛牛币");
              return;
            }
            if(this.goodspricezero<0||parseInt(this.getxunibi<0)){
              return;
            }
            if (parseFloat(this.getxunibi) < this.goodspricezero/100) {
              Toast("牛牛币不足请使用微信支付宝余额进行组合支付");
              this.isPaymentoptions=true;
              this.show=true;
              return;
            }
            let params = {
              productId: this.productId,
              flag: 1,
              usercouponid: this.couponid,
              ymhaohanToken: this.uuid
            };
            toYuePay(params).then(res => {
              if (res.err ="支付成功！"&&res.flag==1
              ) {
                Toast("支付成功");
                if(this.$route.query.recommendid&&this.$route.query.goodsId){
                  addpintuanpeople({ymhaohanToken:this.uuid,recommendid:this.$route.query.recommendid,goodsid:this.$route.query.goodsId,goodsnum:1,begintime:new Date().getDate(),endtime:new Date().getDate()}).then(
                    res=>{
                      console.log(res)
                    }
                  )
                }
                localStorage.removeItem('choosepro')
                localStorage.removeItem("couponid");
                localStorage.removeItem("balance");
                localStorage.removeItem('my_ordermsg')
                this.$router.push({ path: "/My_order", query: { index: "1" } });
              } else {
                Toast("支付失败");
                localStorage.removeItem('choosepro')
                localStorage.removeItem("couponid");
                localStorage.removeItem("balance");
                localStorage.removeItem('my_ordermsg')
                this.$router.push({ path: "/My_order", query: { index: "0" } });
              }
            });

          } else if (this.pay == 1) {
            if (((this.getyear*100)+(this.getxunibi*100)) < this.goodspricezero) {
              Toast("余额不足");
              return;
            }
            localStorage.removeItem("couponid");
            let params = {
              productId: this.productId,
              flag: 0,
              usercouponid: this.couponid,
              ymhaohanToken: this.uuid
            };
            toYuePay(params).then(res => {
              if (
                res.err ="支付成功！"&&res.flag==1
              ) {
                if(this.$route.query.recommendid&&this.$route.query.goodsId){
                  addpintuanpeople({ymhaohanToken:this.uuid,recommendid:this.$route.query.recommendid,goodsid:this.$route.query.goodsId,goodsnum:1,begintime:new Date().getDate(),endtime:new Date().getDate()}).then(
                    res=>{
                      console.log(res)
                    }
                  )
                }
                Toast("支付成功");
                localStorage.removeItem('choosepro');
                localStorage.removeItem("couponid");
                localStorage.removeItem("balance");
                localStorage.removeItem('my_ordermsg')
                this.$router.push({ path: "/My_order", query: { index: "1" } });
              } else {
                Toast("支付失败");
                localStorage.removeItem('choosepro')
                localStorage.removeItem("couponid");
                localStorage.removeItem("balance");
                localStorage.removeItem('my_ordermsg')
                this.$router.push({ path: "/My_order", query: { index: "0" } });
              }
            });
          } else if (this.pay == 2) {
            this.zfb();
            //支付宝
          } else if (this.pay == 3) {
            //微信
            //优惠卷id
            localStorage.removeItem("couponid");
            this.wxpay();
          }
        }
      }
    },
    components: {
      Userinfromation,
      Commodityinformation,
      paymentSUbmitBar,
      paymentningming,
      Paymentoptions,
      DeterminePayment,
      ReturnPurchase,
      ChoiceOfPreferences
    }
  };
</script>

<style>
  .van-toast{
    z-index: 666666666666 !important;
    line-height: 1.5em !important;
  }
  .zhifu {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 33333333;
    text-align: center;
  }
  .fanhui {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 50px;
  }
  .Method-payment {
    width: 100%;
    font-size: 30px;
    height: 80px;
    line-height: 80px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
  }
  .Method-payment > div:nth-child(1) {
    margin-left: 40px;
  }
  .Method-payment > div:nth-child(2) {
    margin-right: 40px;
  }
  .shopping-dis {
    width: 100%;
    height: 90px;
    line-height: 90px;
    font-size: 25px;
    background: #ffffff;
  }
  .checkbefore {
    color: black;
  }
  .checkofer {
    color: #89a9fe;
  }
  .shopping-dis ul li {
    float: left;
    margin-right: 80px;
    margin-left: 40px;
  }
  .Payment .navbar .van-icon {
    font-size: 35px !important;
  }
  .Payment {
    background-color: #fafafa;
    margin-bottom: 100px;
    height: 100%;
  }
  .Payment .van-nav-bar {
    background-color: #fff;
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #ccc;
  }
  .Payment .van-nav-bar__left,
  .van-nav-bar__right {
    font-size: 27px;
  }
  .Payment .van-nav-bar__title {
    font-size: 0.46rem;
  }
  .paymentSubmit .van-submit-bar__bar {
    height: 1.133333rem;
    font-size: 40px;
  }
  .paymentSubmit .van-button--danger {
    background-color: #89a9fe;
    border-color: #89a9fe;
  }
  .paymentSubmit .van-submit-bar .van-button {
    width: 3.033333rem;
    height: 100%;
    margin:0;
    font-size: 34px;
  }
  .paymentSubmit .van-submit-bar__price {
    font-size: 30px;
  }
  .paymentSubmit .Submitbar_checked {
    margin-left: 20px;
  }
  .paymentSubmit .Submitbar_checked img {
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-top: 5px;
  }
  .paymentSubmit .Submitbar_checked span {
    margin-left: 15px;
    font-size: 30px;
  }
  .paymentSubmit .van-submit-bar__text {
    text-align: left;
  }
  .paymentSubmit .van-submit-bar__text span {
    margin-left: 20px;
  }
  .van-toast--default {
    width: 250px;
    height: 250px;
    background-color: #000000;
    border-radius: 20px;
    opacity: 0.5;
  }
  .van-toast--default .van-toast__text {
    width: 193px;
    height: 27px;
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 40px;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .van-toast--default .van-loading {
    width: 83px;
    height: 83px;
  }
  .pop-up .big {
    border-radius: 20px;
    overflow: hidden;
    width: 500px;
  }
  .pop-up .top {
    display: flex;
  }
  .pop-up .lef,
  .pop-up .rig {
    width: 50%;
    text-align: center;
    font-size: 30px;
  }
  .pop-up .lef div:last-child,
  .pop-up .rig div:last-child {
    height: 100px;
    line-height: 100px;
  }
  .pop-up .lef div:first-child .icon {
    color: #07ba06;
  }

  .pop-up .rig div:first-child .icon {
    color: #02a1e6;
  }
  .pop-up .bott {
    border-top: 1px solid #eee;
    font-size: 36px;
    height: 100px;
    text-align: center;
    line-height: 100px;
  }
  .pop-up .icon {
    margin-top: 30px;
    font-size: 100px;
  }
</style>
