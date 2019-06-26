<template>
  <div class="My_order">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push({name:'Personal',params:{index:'4'}})"></van-icon>
      </div>
      <div class="page-name">
        <span>我的订单</span>
      </div>
      <div class="more">
      </div>
    </div>
    <div :style="vals">
      <van-tabs v-model="desc" @click="isChange">
        <van-tab title="待付款">
          <div class="a-val" v-for="(item) in glist">
            <div class="order">订单编号：<span class="order_id">{{item.out_trade_no?item.out_trade_no:item.productId}}</span>
              <span class="static">待付款</span>
            </div>
            <div class="val-list" @click="$router.push({path:'/trade_static',query:{out_trade_no:item.productId,status:'待付款',item:item}})">
              <div class="goods-head">
                <div class="image">
                  <img class="goods" :src="httpUrl+item.goodslist[0].mediaIdDatu"/>
                </div>
                <div class="detal">
                  <span>{{item.body}}</span>
                  <span>{{item.detail}}</span>
                </div>
                <div class="num">
                  <span>{{item.goodsCount}}</span>
                </div>
              </div>
            </div>
            <div class="money-detal">
              <div>
                <span>共<span>1</span>件商品</span>
                <span>合计：￥<strong>{{item.total_fee}}</strong></span>
                <span>(含运费￥{{item.youFei}})</span>
              </div>
            </div>
            <div class="sub-but">
              <div>
                <button type="danger" class="b-black" @click="isCancel(item.productId,0)">取消订单</button>
                <button type="danger" class="b-blue" @click="gopay(item)">前去付款</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待发货">
          <div class="a-val" v-for="(item) in glist">
            <div class="order">订单编号：<span class="order_id">{{item.out_trade_no?item.out_trade_no:item.productId}}</span>
              <span class="static">待发货</span>
            </div>
            <div class="val-list"  @click="$router.push({path:'/trade_static',query:{out_trade_no:item.out_trade_no,status:'待发货'}})">
              <div class="goods-head">
                <div class="image">
                  <img class="goods" :src="httpUrl+item.goodslist[0].mediaIdDatu"/>
                </div>
                <div class="detal">
                  <span>{{item.body}}</span>
                  <span>{{item.detail}}</span>
                </div>
                <div class="num">
                  <span>{{item.goodsCount}}</span>
                </div>
              </div>
            </div>
            <div class="money-detal">
              <div>
                <span>共<span>1</span>件商品</span>
                <span>合计：￥<strong>{{item.total_fee}}</strong></span>
                <span>(含运费￥{{item.youFei}})</span>
              </div>
            </div>
            <div class="sub-but">
              <div>
                <button type="danger" class="b-blue" @click="tixinfahuo">提醒发货</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待收货">
          <div class="a-val" v-for="(item) in glist">
            <div class="order">订单编号：<span class="order_id">{{item.out_trade_no?item.out_trade_no:item.productId}}</span>
              <span class="static">待收货 </span>
            </div>
            <div class="val-list"  @click="$router.push({path:'/trade_static',query:{out_trade_no:item.out_trade_no,status:'待收货',item:item}})">
              <div class="goods-head" >
                <div class="image">
                  <img class="goods" :src="httpUrl+item.goodslist[0].mediaIdDatu"/>
                </div>
                <div class="detal">
                  <span>{{item.body}}</span>
                  <span>{{item.detail}}</span>
                </div>
                <div class="num">
                  <span>{{item.goodsCount}}</span>
                </div>
              </div>
            </div>
            <div class="money-detal">
              <div>
                <span>共<span>1</span>件商品</span>
                <span>合计：￥<strong>{{item.total_fee}}</strong></span>
                <span>(含运费￥{{item.youFei}})</span>
              </div>
            </div>
            <div class="sub-but">
              <div>

                <button type="danger" class="b-black" @click="querenshoukuan(item.out_trade_no,item.index)">确认收货</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待评价">
          <div class="a-val" v-for="(item) in glist">
            <div class="order">订单编号：<span class="order_id">{{item.out_trade_no?item.out_trade_no:item.productId}}</span>
              <span class="static">待评价</span>
            </div>
            <div class="val-list" @click="$router.push({path:'/trade_static',query:{out_trade_no:item.out_trade_no,status:'待评价',item:item}})">
              <div class="goods-head">
                <div class="image">
                  <img class="goods" :src="httpUrl+item.goodslist[0].mediaIdDatu"/>
                </div>
                <div class="detal">
                  <span>{{item.body}}</span>
                  <span>{{item.detail}}</span>
                </div>
                <div class="num">
                  <span>{{item.goodsCount}}</span>
                </div>
              </div>
            </div>
            <div class="money-detal">
              <div>
                <span>共<span>1</span>件商品</span>
                <span>合计：￥<strong>{{item.total_fee}}</strong></span>
                <span>(含运费￥{{item.youFei}})</span>
              </div>
            </div>
            <div class="sub-but">
              <div>
                <button type="danger" class="b-black" @click="$router.push({path:'/Evaluate_more',query:{goodsId:item.goodslist[0].goodsId,goodPriceId:item.goodslist[0].goodsPriceId,shangpinglist:item.goodslist,out_trade_no:item.out_trade_no}})">进行评论</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已完成">
          <div class="a-val" v-for="(item) in glist">
            <div class="order">订单编号：<span class="order_id">{{item.out_trade_no?item.out_trade_no:item.productId}}</span>
              <span class="static">已完成</span>
            </div>
            <div class="val-list" @click="$router.push({path:'/trade_static',query:{out_trade_no:item.out_trade_no,status:'已完成',item:item}})">
              <div class="goods-head">
                <div class="image">
                  <img class="goods" :src="httpUrl+item.goodslist[0].mediaIdDatu"/>
                </div>
                <div class="detal">
                  <span>{{item.body}}</span>
                  <span>{{item.detail}}</span>
                </div>
                <div class="num">
                  <span>{{item.goodsCount}}</span>
                </div>
              </div>
            </div>
            <div class="money-detal">
              <div>
                <span>共<span>1</span>件商品</span>
                <span>合计：￥<strong>{{item.total_fee}}</strong></span>
                <span>(含运费￥{{item.youFei}})</span>
              </div>
            </div>
          </div>
        </van-tab>
        <div v-if="glist.length===0" class="on-order">暂无订单！</div>
      </van-tabs>
    </div>
  </div>
</template>

<script scoped>
  import {orderList,quxiaodingdan,querenshouhuo,yiwancheng} from '@/api/index.js'
  import {waitlist} from '@/api/index.js'
  import {weifahuolist} from '@/api/index.js'
  import {yifahuolist} from '@/api/index.js'
  import {ordelist} from '@/api/index.js'
  import Vue from 'vue';
  import { Tab, Tabs } from 'vant';
  import { Button } from 'vant';
  import { Icon } from 'vant';
  import { Dialog } from 'vant';

  Vue.use(Dialog);
  Vue.use(Icon);
  Vue.use(Tab).use(Tabs);
  Vue.use(Button);
  export default {
    name: "My_order",
    data() {
      return {
        desc: this.$route.query.index,
        glist:[],
        res:{page:{mList:[]}},
        vals:"",
        log: 0,
        httpUrl:'http://www.ymhaohan.cn/'
      };
    },
    methods:{
      isCancel(productId,index){                       //弹出确认
        console.log(productId,index)
        Dialog.confirm({
          title: '取消订单',
          message: '确认取消订单？'
        }).then(() => {
          let uuid = localStorage.getItem("uuid");
          quxiaodingdan({ymhaohanToken:uuid,productId:productId,paytype:0}).then(res=>{
            this.isChange(index);
          })
        }).catch(() => {
          return;// on cancel
        });
      },//去支付
      gopay(e){
        e=JSON.stringify(e)
        localStorage.setItem('my_ordermsg',e);
        this.$router.push({path:'/payment'});
      },
      gowuliu(){

      },
      tixinfahuo(){
        Dialog.confirm({
          title: '提醒发货',
          message: '提醒卖家发货？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
      },
      gopinjia(){
      },
      querenshoukuan(productId,index){
        let uuid = localStorage.getItem("uuid");
        querenshouhuo({out_trade_no:productId,ymhaohanToken:uuid}).then(res=>{
          this.isChange(index);
        })
      },
      isChange(n){
        let uuid = localStorage.getItem("uuid");
        let mPageNow = 1;
        let mPageSize = 100;
        let params = {ymhaohanToken:uuid,mPageNow:mPageNow,mPageSize:mPageSize};
        if(n===0||this.desc==="0"){           //待付款
          this.glist = [];
          waitlist(params).then(res=>
          {
            console.log(res)
            if(res.page.mList!=null){
            for (let i = 0,item; item=res.page.mList.length[i++];) {
              res.page.mList[i].index=0;
            }
            this.glist = res.page.mList;
            console.log(  this.glist)
            }
          });
        }
        if(n===1||this.desc==="1"){           //待发货
          this.glist = [];
          weifahuolist(params).then(res=>
          {
            if(res.page.mList!=null) {
              for (let i = 0; i < res.page.mList.length; i++) {
                res.page.mList[i].index = 1;
              }
              this.glist = res.page.mList;
            }
          });
        }
        if(n===2||this.desc==="2"){           //待收货
          this.glist = [];
          yifahuolist(params).then(res=>
          {
            if(res.page.mList!=null) {
              for (let i = 0; i < res.page.mList.length; i++) {
                res.page.mList[i].index = 2;
              }
              this.glist = res.page.mList;
            }
          });
        }
        if(n===3||this.desc==="3"){           //待评价
          this.glist = [];
          ordelist(params).then(res=> {
            if(res.page.mList!=null) {
              for (let i = 0; i < res.page.mList.length; i++) {
                res.page.mList[i].index = 3;
              }
              this.glist = res.page.mList;
            }
          });
        }
        if(n===4||this.desc==="4"){        //已完成
           this.glist = [];
          yiwancheng(params).then(res=>{
            if(res.page.mList!=null) {
              for (let i = 0; i < res.page.mList.length; i++) {
                res.page.mList[i].index = 3;
              }
              this.glist = res.page.mList;
            }
          })
        }
      }
    },
    mounted(){
      if(this.desc!=0){
        this.isChange(this.desc);
      }else{
        this.desc=0;
        this.isChange(this.desc);
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
    }
  }
</script>

<style src="@/assets/css/Dialog.css"></style>
<style src="@/assets/css/Tab.css"></style>
<style src="@/assets/css/Button.css"></style>
<style>
  .van-dialog  .van-dialog__message--has-title{
      font-size: .373333rem !important;
    }
     .van-dialog  .van-dialog_header{
        font-size: .373333rem
      }
  .van-dialog{
    font-size: .373333rem !important;
  }
  .van-dialog  .van-button{
    border: 0 !important;
    margin: 10px !important;
  }
</style>
<style scoped>
  .My_order{
    height: 100%;
    background-color: #e7e7e750;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    background-color: #ffffff;
  }
  .title>div{
    display: inline;
  }
  .back{
    flex: 1;
  }
  .page-name{
    flex: 3;
    font-size: 32px;
    text-align: center;
  }
  .more{
    flex: 1;
    text-align: right
  }
  .seach{
    height: 40px;
    width: 40px;
    position: relative;
    top: 15px;
    right: 20px;
  }
  .a-val{
    border-bottom: 20px solid #f5f5f5;
    background-color: #ffffff;
  }
  .order{
    height: 80px;
    line-height: 80px;
    padding: 0 3%;
    border-bottom: 1px solid #e7e7e7;
  }
  .order_id{
    font-size: 24px;
  }
  .static {
    color: #5784fe;
    float: right;
  }
  .val-list{
    padding: 3%;
  }
  .val-list-pin{
    padding: 3% 3% 0 3%;
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
    height: 80px;
    width: 100%;
    color: #333333;
  }
  .pin{
    float: left;
    text-align: center;
    font-size: 22px;
    display: inline-block;
    height: 30px;
    width: 70px;
    background-image: linear-gradient(90deg,
    #ff5e57 0%,
    #ff2e25 100%);
    color: #ffffff;
    border-radius: 5px;
  }
  .b-red{
    box-shadow: 0px 10px 20px 1px
    #a0000040;
  }
  .detal>span:nth-of-type(1)>span{
    position: relative;
    top: -30px;
    float: left;
    text-indent: 80px;
    white-space: pre-wrap;
  }
  .detal>span:nth-of-type(2){
    font-size: 22px;
    color: #999999;
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
    color: #999999;
  }
  .money-detal{
    padding: 15px 3%;
    border-bottom: 1px solid #e7e7e7;
  }
  .money-detal-pin{
    padding: 0 3% 3% 3%;
    border-bottom: 1px solid #e7e7e7;
  }
  .money-detal>div{
    float: right;
  }
  .pin-val{
    margin-left: 140px;
    color: #ff2e25;
  }
  .pin-val>span{
    font-size: 36px;
  }
  .money-detal:after{
    display: block;
    content: '';
    clear: both;
  }
  .money-detal>span{
    font-size: 24px;
    margin-left: 20px;
  }
  .money-detal strong{
    font-size: 28px;
  }
  .sub-but{
    padding: 3%;
  }
  .sub-but:after{
    display: block;
    content: '';
    clear: both;
  }
  .sub-but>div{
    float: right;
  }
  .on-order{
    text-align: center;
    margin-top: 100px;
  }
  .van-tab_pane .a-val{
    margin-top: 10px;
  }
</style>
