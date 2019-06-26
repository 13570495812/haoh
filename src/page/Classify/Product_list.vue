<template>
  <div class="cliss">
    <!-- 三点 -->
    <div class="takl_more">
      <van-popup
        :overlay='true'
        class="popup_right"
        v-model="show1"
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
    <div class="head">
      <div
        class="left"
        @click="$router.back(-1)"
      >
        <van-icon
          class="icon"
          name="arrow-left"
        />
      </div>
      <div class="midd">
        <van-icon
          name="search"
          class="icon"
        />
        <div>
          <input
            type="text"
            v-model="searchcon"
            placeholder="输入商品名搜索"
          >
        </div>
        <div
          class="search_big"
          @click="sear_big"
        >
          搜索
        </div>
      </div>
      <div class="right">
        <div @click="show1=true">
          <img
            src="../../assets/img/baimore.png"
            alt=""
          >
        </div>
      </div>
    </div>
    <van-popup
      :overlay='true'
      class="synthesize"
      v-model="show"
      position="top"
    >
      <ul>
        <li
          v-on:click='onsomething'
          @click="priceBy"
          :class="issales==2?'active':''"
        >
          价格降序
        </li>
        <li
          @click="ascending"
          :class="issales==3?'active':''"
        >
          价格升序
        </li>
      </ul>
    </van-popup>
    <van-popup
      :overlay='true'
      class="synthesizetow"
      v-model="show2"
      position="right"
    >
      <div class="title">筛选</div>
      <ul>
        <li>
          价格降序
        </li>
        <li>
          价格升序
        </li>
      </ul>
    </van-popup>
    <div class="screen">
      <ul>
        <li
          @click="show = true"
          :class="issales==2||issales==3?'active':''"
        >
          综合排序
        </li>
        <li
          @click="volume"
          :class="issales==1?'active':''"
        >
          销量优先
        </li>
      </ul>
    </div>
    <div class="commoditys">
      <van-list
        :immediate-check="immediateCheck"
        v-model="loading"
        :finished="finished"
        @load="onLoad"
      >
        <ul>
          <li
            v-for="item,index in list"
            @click="$router.push({path:'Particulars/'+item.goodsId})"
          >
            <div class="top">
              <img
                :src="myhttp+item.goodsPrices[0].mediaIdDatu"
                alt=""
              >
            </div>
            <div class="title">
              {{item.goodsName}}
            </div>
            <div class="title_min">
              <div class="lef">
                ¥{{item.goodsPrices[0].price}}
              </div>
              <div class="rig">
                {{item.xuniCnt}}人收货
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<script>
  import { searchGoods } from "@/api/index";
  import Vue from "vue";
  // list列表
  import { List } from "vant";
  Vue.use(List);
  import { log } from "util";

  // 弹出层
  import { Popup } from "vant";
  Vue.use(Popup);
  export default {
    data() {
      return {
        myhttp: "http://www.ymhaohan.cn/",
        show: false,
        show1: false,
        show2: false,
        nums: 1,
        searchcon: "",
        list: [],
        uuid: "",
        mPageNow: 1,
        mPageSize: 100,
        volumes: true,
        sortBy: "",
        // 是否是销量优先排序
        issales: 0,
        loading: false,
        finished: false,
        immediateCheck: false,
        // 判断是什么筛选状态
        screen: 0
      };
    },
    methods: {
      onsomething: function(event) {
        var el = event.currentTarget;
      },
      // 搜索功能
      // 商品数据渲染++
      Listloading() {
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          ymhaohanToken: this.uuid
        };
        // console.log(params);
        searchGoods(params).then(res => {
          if (res.page.mToltalSize >= this.list.length) {
            this.list = this.list.concat(res.page.mList);
            this.mPageNow++;
            console.log(this.list);
            this.loading = false;
          } else {
            this.finished = true;
          }
        });
      },
      // 销量加加
      volumeonejiajia() {
        this.issales = 1;
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          sortBy: this.sortBy,
          ymhaohanToken: this.uuid
        };
        // console.log(params);
        searchGoods(params).then(res => {
          if (res.page.mToltalSize >= this.list.length) {
            this.list = this.list.concat(res.page.mList);
            this.mPageNow++;
            console.log(this.list);
            this.loading = false;
          } else {
            this.finished = true;
          }
        });
      },
      // 降序加加
      priceByjiajia() {
        this.issales = 2;
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          priceBy: "sort1",
          ymhaohanToken: this.uuid
        };
        // console.log(params);
        searchGoods(params).then(res => {
          if (res.page.mToltalSize >= this.list.length) {
            this.list = this.list.concat(res.page.mList);
            this.mPageNow++;
            console.log(this.list);
            this.loading = false;
          } else {
            this.finished = true;
          }
        });
      },
      // 搜索
      sear_big() {
        console.log(234);
        this.getInforCourse();
      },
      //,分页获取信息流第一次
      getInforCourse() {
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          ymhaohanToken: this.uuid
        };
        searchGoods(params).then(res => {
          console.log(res);
          this.list = res.page.mList;
          console.log(this.list.length);
          // this.Listloading();
        });
      },
      // 销量优先
      volumeone() {
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          sortBy: this.sortBy,
          ymhaohanToken: this.uuid
        };
        searchGoods(params).then(res => {
          console.log(params);
          this.list = res.page.mList;
        });
      },
      // 价格降序
      priceBy() {
        this.issales = 2;
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          priceBy: "sort1",
          ymhaohanToken: this.uuid
        };
        searchGoods(params).then(res => {
          console.log(params);
          this.list = res.page.mList;
        });
        this.show = false;
      },
      // 价格升序
      ascending() {
        this.issales = 3;
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.mPageSize,
          goodsName: this.searchcon,
          priceBy: "ssss",
          ymhaohanToken: this.uuid
        };
        searchGoods(params).then(res => {
          console.log(params);
          this.list = res.page.mList;
        });
        this.show = false;
      },
      volume() {
        this.volumes = !this.volumes;
        this.issales = !this.issales;
        if (this.volumes == false) {
          this.sortBy = "sort1";
          this.volumeone();
        } else {
          this.sortBy = "";
          this.volumeone();
        }
        this.issales = 1;
      },
      // 滚动事件
      onLoad() {
        if (this.screen == 1) {
          this.volumeonejiajia();
          return;
        } else if (this.screen == 2) {
          this.priceByjiajia();
          return;
        }
        this.Listloading();
      }
    },
    created() {
      this.searchcon = this.$route.query.searchcon;
    },
    mounted() {
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
      console.log(this.uuid);
      this.getInforCourse();
    }
  };
</script>

<style scoped>
  .head {
    background: linear-gradient(to right, #832fd7, #5784fe);
    height: 96px;
    line-height: 96px;
    display: flex;
    justify-content: space-around;
  }
  .head .left .icon {
    margin: 35px 17px 0 24px;
  }
  .head .left {
    font-family: NotoSansHans-Regular;
    font-size: 2px;
    color: #ffffff;
  }
  input::-webkit-input-placeholder {
    color: #ffffff;
  }
  .head .midd {
    position: relative;
    margin-top: 20px;
    width: 577px;
    height: 58px;
    line-height: 34px;
    background-color: #f5f5f5;
    border-radius: 29px;
    background-color: rgba(255, 255, 255, 0.4);
    color: #ffffff;
  }
  .head .midd .icon {
    margin-top: 17px;
    margin-left: 22px;
    margin-right: 16px;
    font-size: 24px;
    color: #ffffff;
  }
  .head .midd input {
    border: none;
    height: 100%;
    background: rgba(0, 1, 1, 0);
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #ffffff;
  }
  .head .left .icon {
    font-size: 29px;
  }
  .head .left,
  .head .midd {
    display: flex;
  }
  .head .right {
    width: 34px;
    position: relative;
    height: 9px;
    margin-right: 4px;
  }
  .head .right img {
    width: 100%;
    height: 100%;
  }
  .quantity {
    position: absolute;
    font-family: HiraginoSansGB-W3;
    font-size: 16px;
    background-color: #ef3d3d;
    border-radius: 102px;
    height: 24px;
    line-height: 24px;
    top: 8px;
    text-align: center;
    padding: 5px;
    line-height: 24px;
    color: #ffffff;
  }
  .screen ul {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    height: 76px;
    line-height: 76px;
    display: flex;
    justify-content: space-around;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
  }
  .screen ul li:first-child {
    margin-left: 60px;
  }
  .screen li:nth-child(3) {
    width: 38px;
    height: 38px;
  }
  .screen li:nth-child(3) img {
    width: 100%;
    margin-top: 19px;
    height: 100%;
  }
  .screen li:nth-child(4) {
    width: 120px;
    text-align: center;
    border-left: 1px solid #eee;
  }
  .commoditys ul {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .commoditys li {
    text-align: center;
    background: #fff;
    overflow: hidden;
  }
  .commoditys li .top {
    display: flex;
    width: 370px;
    height: 370px;
  }
  .commoditys li .top img {
    width: 100%;
    height: 100%;
  }
  .title_min {
    left: 50%;
    width: 100%;
    margin-bottom: 20px;
    float: left;
  }
  .commoditys .title {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 360px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    padding-top: 20px;
  }
  .title_min .lef {
    display: inline-block;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #fe48bf;
  }
  .title_min .rig {
    margin-left: 5px;
    display: inline-block;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    color: #999999;
    padding-top: 2px;
  }
  .synthesize {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    text-indent: 30px;
    color: #333333;
    background: linear-gradient(to right, 30deg, blue, red);
  }
  .synthesize li {
    border-top: 1px solid #eee;
    height: 100px;
    line-height: 100px;
  }
  .synthesizetow {
    width: 500px;
    height: 100%;
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
  .popup_right {
    position: fixed;
    top: 265px;
    right: 24px;
  }
  .popup_right {
    border-radius: 10px;
    overflow: hidden;
  }

  .popup_right li {
    border-bottom: 1px solid #eee;
    opacity: 0.9;
    width: 300px;
    display: flex;
    height: 88px;
    position: relative;
    line-height: 88px;
  }
  .popup_right li .lef {
    font-size: 40px;
    padding-left: 30px;
    padding-right: 40px;
  }
  .active {
    color: #8c41db;
  }
  .search_big {
    height: 100%;
    position: absolute;
    right: 0;
    overflow: hidden;
    width: 100px;
    line-height: 58px;
    text-align: center;
    border-radius: 0 100px 100px 0;
    background: linear-gradient(to left, #7c3adc, #3a6eff);
    font-size: 26px;
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
</style>

