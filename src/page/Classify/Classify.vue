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
      <div class="midd">
        <van-icon
          name="search"
          class="icon"
        />
        <div>
          <input
            type="text"
            v-model="searchsinp"
            placeholder="输入商品名搜索"
            maxlength="10"
          >
        </div>
        <div
          class="searchs"
          @click="searchgo"
        >
          <div type="primary">搜索</div>
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
    <div class="body">
      <div class="left">
        <ul>
          <li
            :key="index"
            v-for="(item, index) in lis"
            @click="listright(index); ind(index);"
            :class="index === shows?'active':''"
          >
            {{item.className}}
          </li>
        </ul>
      </div>
      <div class="right" v-if="!ifindexshow">
        <div style="width: 100%; position: absolute; top: 50%;left: 50%;transform: translate(-40%,-50%)">
          <van-loading type="spinner" :style="{width:'100px !important',height:'100px !important',borderRadius:'50%',margin:'0 auto'}" />
          <div style="text-align: center;font-size: 25px; margin-top: 10px;">
            加载中
          </div>
        </div>
      </div>
      <div class="right" v-if="ifindexshow">
        <van-list
          finished-text="没有更多了"
          :immediate-check="immediateCheck"
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <div class="ri_big">
            <div class="tit">{{condition2==''?'百货':condition2}}</div>
            <ul>
              <div
                v-if='list.length==0'
                class="nomore"
              >没有该分类数据</div>
              <li
                :key="index"
                v-for="(item, index) in list"
                style="width: 100%"
                class="newnomore"
              >
                <img :src="myhttp+item.goodsPrices[0].mediaIdDatu" @click="$router.push({path:'Particulars/'+item.goodsId,query:{classifyindex:shows+1}})"/>
                <div class="newnomore-box">
                  <p>{{item.goodsName}}</p>
                  <div class="newnomore-box-msg">
                    <div class="newnomore-box-money">
                      <span>¥{{item.goodsPrices[0].price}}</span>
                      <p>月销{{item.xuniCnt}}万笔</p>
                    </div>
                    <div class="newnomore-box-card"  @click="$router.push({path:'Particulars/'+item.goodsId,query:{bol:true,classifyindex:shows+1}})">
                      <i></i>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import axios from "axios";
  import { getClassList, searchGoods } from "@/api/index";
  // 按钮
  import { Button } from "vant";
  Vue.use(Button);
  // list列表
  import { List } from "vant";
  import { log, isArray } from "util";
  Vue.use(List);

  export default {
    data() {
      return {
        myhttp: "http://www.ymhaohan.cn/",
        loading: false,
        show1: false,
        finished: false,
        lis: [],
        list: [], //用于存放加载的数据
        shows: 999,
        nums: 1,
        mPageNow: 1,
        pagesize: 18,
        condition: "",
        condition2: "",
        searchsinp: "",
        immediateCheck: false,
        uuid: "",
        ifindexgo:true, //是否从首页跳转
        ifindexshow:false //加载完成后显示页面
      };
    },
    methods: {
      // tab左边渲染
      listleft(calback) {
        console.log(2)
        let params = {
          ymhaohanToken: this.uuid
        };
        getClassList(params)
          .then(response => {
            this.condition = response[0].className;
            for (let i = 0, item; (item = response[i++]); ) {
              this.lis.push(item);
            }
            if(calback){
              calback(this.$route.query.shows)
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 搜索
      searchgo() {
        this.$router.push({
          path: "/product_list",
          query: {
            searchcon: this.searchsinp
          }
        });
      },
      // 获取tab名
      listright(index) {
        if(this.shows == index) return 
        this.condition = this.lis[index].productClassId;
         console.log(this.condition)
        this.mPageNow = 1;
        this.list = [];
        this.condition2 = this.lis[index].className;
        if (this.condition == "百货") {
          this.condition = "";
        }
         this.ifindexshow=true;
        this.getInforCourse();
      },
      ind(index) {
        this.shows = index;
        console.log(this.shows)
      },
      // 商品数据渲染++
      Listloading() {
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.pagesize,
          productClassId: this.condition,
          ymhaohanToken: this.uuid
        };
        searchGoods(params).then(res => {
          if (res.page.mToltalSize > this.list.length) {
            this.mPageNow++;
            let params = {
              mPageNow: this.mPageNow,
              mPageSize: this.pagesize,
              productClassId: this.condition,
              ymhaohanToken: this.uuid
            }
            searchGoods(params).then(res => {
              this.list = this.list.concat(res.page.mList);
              this.loading = false;
            });
          } else {
            this.loading = false;
            this.finished = true;
          }
          this.ifindexshow=true;
        });
        this.ifindexshow=true;
      },
      //分页获取信息流第一次
      getInforCourse() {
        console.log(3)
        console.log(this.condition)
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.pagesize,
          productClassId: this.condition,
          ymhaohanToken: this.uuid
        };
        searchGoods(params).then(res => {
           console.log(5)
          if(this.ifindexgo&&this.$route.query.shows!= 1000&&this.$route.query.shows+1){
            if(this.ifindexgo==false){
              this.list = res.page.mList;
            }
            this.ifindexgo=false,
            
            this.listright(this.$route.query.shows);
            this.ind(this.$route.query.shows);
          }else{
            this.list = res.page.mList;
            this.ifindexshow=true;
          }
        });
      },
      // 滚动事件
      onLoad() {
        this.Listloading();
      }
    },
    created() {},
    mounted() {
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
      // tab左边渲染
      if(this.$route.query.shows&&this.$route.query.shows!= 1000){
        this.$route.query.shows-=1;
        console.log(this.$route.query.shows)
        this.listleft(this.listright);
      }else{
        console.log(1)
        this.listleft();
        this.getInforCourse();
      }
    }
  };
</script>

<style scoped>
  .cliss {
    background-color: #fff !important;
    overflow-y: scroll;
    touch-action: pan-y;
    -webkit-overflow-scrolling: touch;
    height: 100vh;
  }
  .head {
    width: 100vw;
    background:#8bc9fa;
    height: 96px;
    line-height: 96px;
    display: flex;
    justify-content: space-around;
  }
  .head .left .icon {
    margin: 30px 17px 0 24px;
  }
  .head .left {
    font-family: NotoSansHans-Regular;
    font-size: 26px;
    color: #ffffff;
  }
  input::-webkit-input-placeholder {
    color: #ffffff;
  }
  .head .midd {
    position: relative;
    margin-top: 20px;
    width: 604px;
    margin-left: 30px;
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
  .body {
    margin-top: 14px;
    display: flex;
  }
  .body .left {
    top: 110px;
  }
  .body .left li {
    width: 160px;
    margin-bottom: 20px;
    font-family: NotoSansHans-Regular;
    font-size: 28px;
    color: #666666;
    height: 67px;
    text-align: center;
    line-height: 67px;
    border-radius: 0 10px 10px 0;
  }
  .active {
    color: #ffffff !important;
    background-color: #8231d8;
  }
  .body .right {
    width: 550px;
    height: calc(82vh);
    overflow-y: auto;
    margin: 20px;
  }
  .ri_big {
  }
  .nomore{
    text-align: center;
    line-height: 185px;
    height: 185px;
  }
  .newnomore{
    width: 100%;
    height: 186px;
    margin: 20px 0;
  }
  .newnomore img{
    width: 150px;
    height: 150px;
    float: left;
  }
  .newnomore .newnomore-box{
    float: left;
    width: calc(100% - 180px);
    margin-left: 15px;
  }
  .newnomore .newnomore-box>p:first-of-type{
    font-size: 30px;
  }
  .newnomore .newnomore-box-msg{
    margin-top: 40px;
  }
  .newnomore .newnomore-box-msg:after{
    content: '';
    display: block;
    clear: both;
  }
  .newnomore .newnomore-box-money{
    float: left;
  }
  .newnomore .newnomore-box-card{
    float: right;
    background-color: #ff5e57;
    border-radius: 50%;
  }
  .newnomore .newnomore-box-card>i{
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-image: url(../../assets/img/addtocart.png);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .newnomore:after{
    content: '';
    display: block;
    clear: both;
  }
  .searchs {
    width: 100px;
    line-height: 58px;
    text-align: center;
    border-radius: 0 100px 100px 0;
    height: 100%;
    position: absolute;
    right: 0;
    overflow: hidden;
    background: #8bc9fa;
  }
  .searchs div {
    width: 100%;
    height: 100%;
    font-size: 26px;
    background: none;
    border: none;
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
</style>

