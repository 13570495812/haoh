<template>
  <div id="GroupPurchase">
    <div class="header">
      <!--头部左右按钮-->
      <div class="left_return" @click="$router.push('/')">
        <van-icon name="arrow-left" />
      </div>
      <div>
        <h2>秒杀拼团</h2>
      </div>
    </div>
    <div class="body">
      <div class="banner">
        <div class="bannerSwiper swiper-container-horizontal">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in carouselList">
              <img v-lazy="'http://www.ymhaohan.cn/'+banner.img">
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <div class="toDayCollage">
        <div class="title">
          <h3 class="titleText">今日<span>必拼</span></h3>
          <p class="titleText">每日10:00 - 16:00</p>
          <p  class="titleText" @click="$router.push('/toDayCollage')">查看更多 <van-icon name="arrow" /></p>
        </div>
        <div class="toDayCollageBox">
          <div class="bannerSwiper swiper-container-horizontal">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="recommend in recommendList">
                <ul>
                  <li><img v-lazy="'http://www.ymhaohan.cn/'+recommend.goodPrices[0].mediaIdDatu"></li>
                  <li>{{recommend.goodsBrief}}</li>
                  <li><span>{{recommend.peoplenum}}人拼团</span><span>￥{{recommend.recommendedprice}}</span></li>
                </ul>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>
      <div class="highQuality">
        <div class="title">
          <h3>每天早10点 - 晚19点上新</h3>
          <p>甄选优质好物推荐</p>
        </div>
        <div class="highQualityBox">
          <ul>
            <li v-for="goods in mList">
              <div class="img">
                <img v-lazy="goods.goodsImg ? 'http://www.ymhaohan.cn/'+goods.goodsImg : ''">
              </div>
              <div>
                <p>{{goods.goodsBrief}}</p>
                <dl>
                  <dd>{{goods.peoplenum}}人拼团 <span>￥{{goods.recommendedprice}}</span></dd>
                  <dd>{{goods.kaituanNum[0].inCount * goods.peoplenum}}人已拼</dd>
                </dl>
                <van-button round type="danger"  @click="$router.push({path:'/detailsgroup/'+remid+'/'+goods.goodsId})">团购</van-button>

              </div>
            </li>
          </ul>
          <div class="loadding">
            <div v-if="loadding" class="loaddingIcon">
              <!--<van-loading />-->
            </div>
            <p v-if="loaddingTips">暂无更多商品</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import "../../assets/css/guide.css";
  require('swiper/dist/css/swiper.css')
  import Vue from 'vue'
  import { Icon } from 'vant';

  Vue.use(Icon);
  import Swiper from 'swiper';
  import {getAllActiveTitle, collagePage} from '../../api/index.js'
  export default{
    name: 'GroupPurchase',
    data() {
      return {
        current: 0,
        labelList: [],
        collageAll: {},
        carouselList: [],
        recommendList: [],
        mList: [],
        loadding: false,
        loaddingTips: false,
        remid: ''
      }
    },
    created: function(){
      this.getLabelList();
      this.getCommodityList();
    },
    methods: {
      getLabelList: function(){
        getAllActiveTitle().then(res => {
          this.labelList = res.list;
        })
      },
      getCommodityList: function(){
        let param = {
          titleid: 'aecf938627a145dea8803dbbc6a2656f',
          type: 2
        }
        collagePage(param).then(res => {
          this.collageAll = res;
          console.log(this.collageAll)
          this.$nextTick(() => {  // 下一个UI帧再初始化swiper
            this.initSwiper();
          });
          if(this.collageAll){
            if(this.collageAll.carouselList){
              this.carouselList = this.collageAll.carouselList;
            }
            if(this.collageAll.recommendList){
              this.recommendList = this.collageAll.recommendList;
              for(let i=0;i<this.recommendList.length;i++){
                this.remid=this.recommendList[i].id

              }
            }
            if(this.collageAll.goodsList){
              this.mList = this.collageAll.goodsList.mList;
              this.recommendList=this.collageAll.recommendList;

            }
          }
          if(this.collageAll.goodsList.mList.length>0){
            for(let i=0; i<this.collageAll.goodsList.mList.length; i++){
              if(this.collageAll.goodsList.mList[i].goodPrices){
                this.$set(this.collageAll.goodsList.mList[i], 'goodsImg', this.collageAll.goodsList.mList[i].goodPrices[0].mediaIdDatu);
              }
            }
          }
        })
      },
      loadMore: function(){
        console.log(1);
      },
      initSwiper: function(){
        let bannerSwiper = new Swiper ('.banner .bannerSwiper', {
          loop: true,		//轮播回路
          autoplay: {
            delay: 5000
          },
          pagination: {
            el: '.swiper-pagination'
          },
          paginationClickable :true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          onSlideChangeEnd: function(swiper){
            swiper.update();
            mySwiper.startAutoplay();
            mySwiper.reLoop();
          }
        })
        let mySwiper = new Swiper ('.toDayCollageBox .bannerSwiper', {
          loop: true,		//轮播回路
          slidesPerView: 3,
          pagination: {
            el: '.swiper-pagination'
          },
          paginationClickable :true,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          onSlideChangeEnd: function(swiper){
            swiper.update();
            mySwiper.startAutoplay();
            mySwiper.reLoop();
          }
        })
      }
    },
    mounted: function(){
      let that = this;
      window.onscroll = function(){
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          if(that.loaddingTips != true){
            that.loadding = true;
          }
          window.setTimeout(function(){
            that.loadding = false;
            that.loaddingTips = true;
          },1000)
        }
      }
    },
    updated: function(){

    }

  }

</script>
<style scoped>
  #GroupPurchase .header{
    width: 100%;
    height: 100px;
    background: url('../../assets/img/Navigationbackground.png') no-repeat center;
    background-size: 100%;
  }
  .header h2{
    margin: 0;
    text-align: center;
    line-height: 100px;
    color: #ffffff;
  }
  #GroupPurchase>.header>.left_return {
    width: 58px;
    height: 58px;
    text-align: center;
    line-height: 70px;
    color: #fff;
    border-radius: 50%;
    font-size: 34px;
    position: fixed;
    top: 24px;
    z-index: 999;
    left: 24px;
    background: rgba(000, 000, 000, 0.38);
  }
  .body{
    width: 100%;
    height: calc(100% - 200px);
    margin-bottom: 100px;
  }
  .labelPage{
    width: 100%;
    height: 60px;
    margin-bottom: 2px;
  }
  .labelPage ul{
    margin: 0;
    padding: 0;
  }
  .labelPage ul li{
    display: inline-block;
    vertical-align: top;
    line-height: 60px;
    padding: 0 15px;
  }
  .labelPage .active{
    color: rgb(131, 47, 215);
    border-bottom: 2px rgb(131, 47, 215) solid;
    box-sizing: border-box;
  }
  .banner{
    width: 100%;
    height: 390px;
  }
  #GroupPurchase .banner img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .toDayCollage .title{
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
  }
  .toDayCollage .title h3{
    margin: 0;
  }
  .toDayCollage .title h3 span{
    color: rgb(250, 23, 23);
    margin-right: 15px;
  }
  .toDayCollage .title a{
    float: right;
    color: #999999;
  }
  .toDayCollage .title p{
    color: #999999;
  }
  .titleText{
    display: inline-block;
    vertical-align: top;
    margin: 0;
  }
  .toDayCollageBox{
    position: relative;
    width: 100%;
    text-align: center;
    overflow: hidden;
  }
  .toDayCollageBox ul{
    padding-bottom: 15px;
  }
  .toDayCollageBox li{
    margin: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .toDayCollageBox ul li:first-child{
    width: 100%;
    height: 200px;
  }
  .toDayCollageBox li img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .toDayCollageBox li span{
    color: rgb(229, 0, 0);
  }
  .toDayCollageBox li span:last-child{
    font-weight: bold;
    font-size: 24px;
  }
  .toDayCollageBox .swiper-pagination{
    bottom: 0px;
  }
  .highQuality .title{
    text-align: center;
  }
  .highQuality .title p{
    color: #999999;
  }
  .highQualityBox li{
    height: 135px;
    padding: 7.5px 0;
  }

  .highQualityBox li div{
    display: inline-block;
    vertical-align: top;
    height: 100%;
    margin-left: 15px;
    width: calc(100% - 195px);
    border-bottom: 1px #cccccc solid;
  }
  .highQualityBox li div p{
    height: 48px;
    margin: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }.highQualityBox li .img{
     display: inline-block;
     vertical-align: top;
     width: 160px;
     height: 100%;
     margin: 0;
   }
  .highQualityBox li .img img{
    width: 100%;
    height: 100%;
    object-fit:cover;
  }
  .highQualityBox li div dl{
    display: inline-block;
    vertical-align: top;
  }
  .highQualityBox li div dd{
    margin: 0;
  }
  .highQualityBox li div dd:first-child{
    color: rgb(229, 0, 0);
  }
  .highQualityBox li div dd:first-child span{
    font-weight: bold;
    font-size: 24px;
  }
  .highQualityBox li div dd:last-child{
    color: #999999;
  }
  .highQualityBox li div button{
    float: right;
    margin-top: 20px;
    width: 120px;
  }
  .highQualityBox .loadding{
    padding:  15px;
    text-align: center;
    color: #dddddd;
  }
  .highQualityBox .loaddingIcon{
    display: -webkit-flex;
    -webkit-justify-content: center;
    -webkit-align-items: center;
  }
  .highQualityBox p{
    margin: 0;
  }
  .swiper-pagination,.swiper-pagination-bullets{
    display: none;
  }
</style>
