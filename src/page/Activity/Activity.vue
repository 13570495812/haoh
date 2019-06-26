<template>
  <div class="big">
    <!--头部-->
    <div class="head">
      <!--头部左右按钮-->
      <div
        class="left_return"
        @click="$router.push('/')"
      >
        <van-icon name="arrow-left" />
      </div>
      <div class="head-modle">
        秒杀抢购
      </div>
      <!--三点-->
      <div class="head-right"  @click="sowinfo()">
        <img
          src="@/assets/img/dian.png"
        />
      </div>
      <!--隐形导航-->
      <div class="takl_more">
        <van-popup
          :overlay='true'
          class="popup_right"
          v-model="show"
          position="right"
        >

          <ul>
            <li @click="$router.push('/message_notification')">
              <div class="lef">
                <van-icon name="chat" />
              </div>
              <van-tag
                class="nums"
                round
                v-if='nums>0'
                type="danger"
              ></van-tag>
              <div class="mid">
                消息
              </div>
            </li>
            <li @click="$router.push('/')">
              <div class="lef">
                <van-icon name="home" />
              </div>
              <div class="mid">
                首页
              </div>
            </li>
            <li @click="$router.push('/contact_us')">
              <div class="lef">
                <van-icon name="phone" />
              </div>
              <div class="mid">
                联系我们
              </div>
            </li>
          </ul>
        </van-popup>
      </div>
    </div>
    <!--轮播图-->
    <div class="activity-swipe">
      <van-swipe
        @change="onChange"
        :autoplay="3000"
      >
        <van-swipe-item
          :key='index'
          v-for="item,index in imgArray"
        >
          <img
            :src="myhttp+item.img"
            alt=""
          >
        </van-swipe-item>
        <div
          class="custom-indicator"
          slot="indicator"
        >
          {{ current + 1 }}/{{imgArraylen}}
        </div>
      </van-swipe>
    </div>
    <!--今日必抢-->
    <div class="rob">
      <!--商品列表-->
      <div class="goods" style="margin-top: 20px">
        <ul>
          <li
            @click="$router.push({path:'/Particularsaa/'+item.id+'/'+item.goodsid})"
            v-for="(item,index) in Willrob"
          >
            <div class="top">
              <img
                :src="myhttp+item.picture"
                alt=""
              >
            </div>
            <div class="goods-bottom">
              <div class="top-title">{{item.goodsName}}</div>
              <div class="top-price">
                <div class="top-left">
                  <div><span class="top-money">￥</span>{{item.recommendedprice}}</div>
                  <div class="top-right">抢购价</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--团购-->
    <div class="aulk">
      <!--拼团标题-->
      <div class="auli-title">
        <div><span class="auli-title-j">今日</span><span class="auli-title-p">必拼</span></div>
        <!--<div-->
          <!--class="auli-more"-->
          <!--@click="$router.push('/groupPurchase')"-->
        <!--&gt;查看更多></div>-->
      </div>
      <!--拼团内容-->
      <div class="goods">
        <ul>
          <li v-for="(item,index) in aulk">
            <div
              class="top"
              @click="$router.push({path:'/detailsgroup/'+item.id+'/'+item.goodsid})"
            >
              <img
                :src="myhttp+item.picture"
                alt=""
              >
            </div>
            <div class="goods-bottom">
              <div class="top-title">{{item.goodsName}}</div>
              <div class="top-price">
                <div class="top-left auli-pri">
                  <div>{{item.peoplenum}}人拼</div>
                  <div><span class="top-money">￥</span>{{item.recommendedprice}}</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--每天早10点-->
    <div class="every-day">
      秒杀
    </div>
    <!--衣服-->
    <div class="list-goods">
      <ul>
        <li v-for="(item,index) in goods.data">
          <div class="list-top"  @click="$router.push({path:'/Particularsaa/'+item.id+'/'+item.goodsid})"
              alt="">
            <img :src="myhttp+item.picture">
          </div>
          <div class="list-bottom">
            <p class="list-title">{{item.goodsName}}</p>
            <p class="list-info">
              <span class="list-money">￥ {{item.recommendedprice}}</span>
              <span class="list-shouhuo">{{item.xuniCnt}}人收货</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  //接口
  import { activityGoodsList, getAllActiveTitle,GetList } from "../../api/index.js";

  export default {
    data() {
      return {
        uuid: "", //保持登录状态
        myhttp: "http://www.ymhaohan.cn/",
        type: 4,
        pageSize: 10,
        pageNum: 1,
        status: 0,
        /*nva导航*/
        title: [],
        /*今日必抢*/
        Willrob: [],
        aulk: [], //团购
        /*每天早10点,新品推荐*/
        goods: [],
        imgArraypreview: [],
        imgArraylen: 0,
        shows: 1,
        current: 0,
        imgArray: [], //轮波图片
        nums: 1, //消息
        show: false,
        qiangstyle: 4
      };
    },
    methods: {
      /*nav导航栏点击*/
      getItem: function (index) {
        this.shows = index
      },
      //轮播
      onChange(index) {
        this.current = index
      },
      //更多
      sowinfo: function () {
        this.show = true
      },
      //团购
      gettuangou: function(){
        let params={
          type: 2,
          pageSize: 10,
          pageNum: 1,
          status: 0,
          ymhaohanToken: this.uuid
        }
        activityGoodsList(params).then(res => {
          this.aulk =res.data;
          console.log(this.aulk);
        })
      },
      //今日必抢
      getGoods: function () {
        let params = {
          type: 4,
          pageSize: 10,
          pageNum: 1,
          status: 0,
          ymhaohanToken: this.uuid
        }
        activityGoodsList(params).then(res => {
          this.Willrob = res.data;
          console.log(this.Willrob)
        })
      },
      //在商品类别中找到上新商品
      getInfo: function () {
        let params = {
          type: 3,
          pageSize: 10,
          pageNum: 1,
          status: 0,
          ymhaohanToken: this.uuid
        }
        activityGoodsList(params).then(res => {
          console.log(res)
          this.goods = res;
          // 给轮播图数组赋值
          this.imgArraylen = this.imgArray.length;
          console.log(this.goods);
        })
          .catch(error => {
            console.log(error);
          });
      },
      //商品列表
      getList: function() {
        getAllActiveTitle().then(res => {
          this.title = res;
        });
      }
    },
    mounted: function() {
      this.getGoods();
      this.getInfo();
      this.getList();
      this.gettuangou();
      GetList({type:3}).then(
        res=>{
          this.imgArray = res.data;
        }
      )
    },
    created() {
      //获取uuid 登录状态
      this.uuid = localStorage.getItem("uuid");
    }
  }
</script>

<style scoped>
  .big {
    width: 100%;
    overflow: auto;
    margin-bottom: 100px;
  }
  .left_return {
    width: 58px;
    height: 58px;
    text-align: center;
    line-height: 70px;
    color: #8bc9fa;
    border-radius: 50%;
    font-size: 34px;
    position: fixed;
    top: 24px;
    z-index: 999;
    left: 24px;
    background: #fff;
  }
  .aulk .auli-title {
    font-size: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #000000;
    font-weight: bold;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .auli-more {
    font-size: 25px;
  }
  .aulk .auli-title .auli-title-j {
    font-size: 35px;
  }
  .aulk .auli-title .auli-title-p {
    font-size: 35px;
    margin-right: 20px;
  }
  /*顶部选项卡*/
  .head {
    position: relative;
    width: 100%;
    height: 100px;
    background: #8bc9fa;
    background-size: 100% 100%;
    line-height: 140px;
  }

  .head > .head-modle {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%);
    width: 90%;
    height: 100px;
    font-size: 45px;
    font-family: '微软雅黑';
    color: #fff;
    line-height: 100px;
    text-align: center;
  }

  .head > .head-modle > img {
    width: 30%;
    height: 50%;
  }

  .head > .head-right {
    position: absolute;
    left: 100%;
    transform: translate(-100%);
    top: 0px;
    width: 10%;
    height: 100px;
    line-height: 120px;
  }

  .head > .head-right > img {
    width: 50%;
    height: 10%;
  }

  /* 导航栏 */
  .nav-title {
    width: 100%;
    height: 60px;
  }

  .nav-title ul {
    overflow-x: auto;
    overflow-y: auto;
    display: -webkit-box;
  }

  .nav-title li {
    list-style: none;
    width: 140px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .activebac {
    color: #8b41d9;
    border-bottom: 1px solid #8b41d9;
  }

  .activity-swipe {
    width: 100%;
    height: 330px;
  }

  .van-swipe {
    width: 100%;
    height: 100%;
  }

  .van-swipe-item {
    width: 100%;
    height: 100%;
  }

  .van-swipe-item img {
    width: 100%;
    height: 100%;
  }

  .rob {
    width: 100%;
    height: 375px;
  }

  .rob-title {
    position: relative;
    left: 0px;
    right: 0px;
    line-height: 80px;
    width: 100%;
    height: 100px;
  }

  .rob > .rob-title > .rob-biqiang {
    position: absolute;
    left: 0;
    width: 11%;
    height: 70px;
    text-align: center;
    margin-top: 20px;
    display: inline-block;
  }

  .rob > .rob-title > .rob-fengqiang {
    position: absolute;
    left: 12%;
    width: 32%;
    height: 70px;
    margin-right: 10px;
    margin-top: 20px;
    display: inline-block;
  }

  .rob > .rob-title > .rob-info {
    position: absolute;
    left: 47%;
    width: 40%;
    margin-right: 10px;
    margin-top: 10px;
    display: inline-block;
    color: #5784fe;
  }

  .rob > .rob-title > div > img {
    width: 50%;
  }

  .rob > .rob-title > .rob-fengqiang img {
    width: 100%;
  }

  .goods {
    width: 100%;
    height: 350px;
    background: #f5f5f5;
  }

  .goods > ul {
    width: 100%;
    height: 350px;
    overflow-x: auto;
    overflow-y: auto;
    display: -webkit-box;
  }

  .goods-bottom {
    width: 100%;
    height: 110px;
    line-height: 50px;
    font-size: 30px;
    background: #ffffff;
  }

  .goods > ul > li {
    width: 235px;
    height: 350px;
    margin-right: 10px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods .top {
    height: 230px;
    width: 230px;
    overflow: hidden;
    background: #fff;
  }

  .goods .top > img {
    width: 100%;
    height: 100%;
  }

  .goods  .top-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    font-size: 32px;
  }

  .goods > ul > li > .top-price {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .top-left {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 30px;
    color: #c91010;
  }

  .top-right {
    width: 95px;
    height: 45px;
    background: #c91010;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 27px;
  }

  .every-day {
    width: 100%;
    height: 100px;
    font-size: 40px;
    font-weight: bold;
    color: #000000;
    text-align: center;
    line-height: 100px;
    background: #f5f5f5;
  }
  .ev-timer {
    font-size: 38px;
  }

  .list-goods {
    margin-left: 0px;
    box-sizing: border-box;
  }

  .list-goods ul {
    width: 100%;
  }
  .list-goods ul:after{
    content: '';
    display: block;
    clear: both;
  }
  .list-goods ul > li {
    float: left;
    display: inline-block;
    width: calc(50% - 15px);
    margin: 0 5px;
    height: auto;
  }

  .list-top {
    width: 100%;
    height: 365px;
  }

  .list-bottom {
    width: 100%;
    height: 130px;
  }

  .list-top > img {
    width: 100%;
    height: 100%;
  }

  .list-title {
    display: inline-block;
    width: 100%;
    height: 50px;
    font-size: 30px;
    color: #333333;
    margin-top: 10px;
    margin-bottom: -40px;
    text-align: center;
  }

  .list-info {
    display: inline-block;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    text-align: center;
  }

  .list-money {
    font-size: 30px;
    color: #fe48bf;
  }

  .list-shouhuo {
    font-size: 28px;
    color: #999999;
    margin-left: 15px;
  }

  .popup_right {
    position: fixed;
    right: 20px;
    top: 240px;
    border-radius: 6px;
    text-align: center;
  }

  .popup_right ul li {
    border-bottom: 0.013333rem solid #eee;
    opacity: 0.9;
    width: 4rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 1.173333rem;
    position: relative;
    line-height: 1.173333rem;
  }

  .popup_right ul li .lef {
    font-size: 0.533333rem;
    padding-left: 0.4rem;
    padding-right: 0.533333rem;
  }

  .takl_more .nums {
    position: fixed;
    top: 31px;
    padding: 0 7px 0 7px;
    background-color: #d30000;
    right: 48px;
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    color: #ffffff;
  }

  .share_min {
    background-color: #f5f5f5;
  }

  .share .title {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    padding: 30px 0 51px 24px;
    color: #333333;
  }

  .share ul {
    display: flex;
  }

  .share ul .top {
    width: 100px;
    height: 100px;
  }

  .share ul .butt {
    padding-top: 10px;
    margin-bottom: 50px;
  }

  .share ul img {
    width: 100%;
    height: 100%;
  }

  .share ul li {
    text-align: center;
    margin-left: 24px;
  }

  .cancel_min {
    width: 100%;
    line-height: 98px;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    border: none;
    text-align: center;
    color: #333333;
    height: 98px;
    background-color: #ffffff;
  }
  .zhuangui>.sold{
    margin-top: 10px;
  }
</style>
