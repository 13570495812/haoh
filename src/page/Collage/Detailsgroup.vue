<template>
  <div class="left_return" id="left_return">
    <!-- 产品参数 -->
    <div class="Product_Parameter">
      <van-popup
        v-model="show3"
        position="bottom"
        :overlay="true"
      >
        <div class="title">
          产品参数
        </div>
        <div class="body">
          客户自贡
        </div>
        <van-button
          type="warning"
          @click="show3=false"
        >完成</van-button>
      </van-popup>
    </div>

    <!-- 轻提示 -->
    <div class="Choose_size">
      <van-popup
        v-model="show2"
        position="bottom"
        :overlay="true"
      >
        <div class="top">
          <div class="left">
            <div class="pic">
              <img
                v-if="selec_pic==''"
                :src="myhttp+defaultpic"
                alt=""
              >
              <img
                v-else
                :src="myhttp+selec_pic"
                alt=""
              >
            </div>
            <div class="price">
              <div class="pri">￥{{recommendedprice}}</div>
              <div class="inventory">
                库存{{taninventory}}件
              </div>
            </div>
          </div>
          <div
            class="right"
            @click="show2=false"
          >
            <van-icon
              class="icon"
              name="close"
            />
          </div>
        </div>
        <div class="numbers" style="margin-top: 60px">
          <div class="title">
            数量
          </div>
          <van-stepper
            class="numbers_bujin"
            v-model="value1"
          />
        </div>
        <div class="buttons">
          <div class="left">
            <div
              @click="vantToast1"
              type="primary"
            >加入购物车</div>
          </div>
          <div class="right">
            <div
              type="primary"
              @click="getpay"
            >
          立即购买
            </div>
          </div>
        </div>
      </van-popup>
    </div>
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
    <!--<div class="share">-->
      <!--<van-popup-->
        <!--class="share_min"-->
        <!--v-model="show1"-->
        <!--position="bottom"-->
        <!--:overlay="true"-->
      <!--&gt;-->
        <!--<div class="title">-->
          <!--商品分享至-->
        <!--</div>-->
        <!--<ul>-->
          <!--<li>-->
            <!--<div class="top">-->
              <!--<img-->
                <!--src="../../assets/img/WeChat.png"-->
                <!--alt=""-->
              <!--&gt;-->
            <!--</div>-->
            <!--<div class="butt">-->
              <!--微信-->
            <!--</div>-->
          <!--</li>-->
          <!--<li>-->
            <!--<div class="top">-->
              <!--<img-->
                <!--src="../../assets/img/Circleoffriends.png"-->
                <!--alt=""-->
              <!--&gt;-->
            <!--</div>-->
            <!--<div class="butt">朋友圈</div>-->
          <!--</li>-->
          <!--<li>-->
            <!--<div class="top">-->
              <!--<img-->
                <!--src="../../assets/img/qqqq.png"-->
                <!--alt=""-->
              <!--&gt;-->
            <!--</div>-->
            <!--<div class="butt">QQ</div>-->
          <!--</li>-->
          <!--<li>-->
            <!--<div class="top">-->
              <!--<img-->
                <!--src="../../assets/img/wwwww.png"-->
                <!--alt=""-->
              <!--&gt;-->
            <!--</div>-->
            <!--<div class="butt">微博</div>-->
          <!--</li>-->
        <!--</ul>-->
        <!--<div-->
          <!--@click="show1=false"-->
          <!--class="cancel"-->
        <!--&gt;-->
          <!--<van-button-->
            <!--class="cancel_min"-->
            <!--type="danger"-->
          <!--&gt;取消</van-button>-->
        <!--</div>-->
      <!--</van-popup>-->
    <!--</div>-->
    <!--头部左右按钮-->
    <div
      class="left_return"
      @click="$router.push({path:'/activity'})"
    >
      <van-icon name="arrow-left" />
    </div>
    <div
      class="information"
      @click="show=true"
    >
      <van-icon
        class="icon"
        name="more"
      />
    </div>
    <div
      class="swiper"
      v-if="loading"
    >
      <van-swipe @change="onChange">
        <van-swipe-item
          :key='index'
          v-for="item,index in imgArray"
        >
          <img class="swiper-img"
               @click="swiperImgClick(index)"
               :src="myhttp+item.mediaId"
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
    <!--box-->
    <div class="content">
      <!--价格-->
      <div
        class="content_price"
        v-if="loading"
      >
        <div class="content-jia">￥
          <span class="content-fen">
            {{ info? info.activity.recommendedprice: 0}}
          </span>
        </div>
        <div class="zhuangui">
          <p>专柜价
            <del>￥
              {{this.info.goodsDetail.goods.goodsPrices[0].oldprice}}
            </del>
          </p>
          <p class="sold" style="margin-top:30px;">
            {{info.goodsDetail.xiaoliang}}
            件已售</p>
        </div>
        <div class="Seconds-kill" v-if="loading">
          <p  v-if="miaosha" id="miaosha">已结束</p>
            <div class="Seconds-kill-time">
              <count-down
                v-on:start_callback="countDownS_cb(1)"
                v-on:end_callback="countDownE_cb(1)"
                :currentTime="( new Date() ).getTime()"
                :startTime="this.info.activity.createtime"
                :endTime="this.info.activity.endtime"
                :dayTxt="'天'"
                :hourTxt="'时'"
                :minutesTxt="'分'"
                :secondsTxt="'秒'">
              </count-down>
            </div>
        </div>
      </div>
      <!--标题 分享邮箱-->
      <div
        class="data_info"
        v-if="loading"
      >
        <div class="data-title">
          {{info.goodsDetail.goods.goodsBrief}}
        </div>
        <div
          class="right"
          @click="show1=true"
        >
          <img
            src="../../assets/img/share.png"
            alt=""
          >
          <div @click="wxshare">分享有赏</div>
        </div>
      </div>
      <div
        class="sales_volume"
        v-if="loading"
      >
        <div class="midd">月销量：{{this.info.goodsDetail.xiaoliang}}</div>
      </div>
      <!--优惠券-->
      <div class="coupon">
        <van-popup
          v-model="show4"
          position="bottom"
          :overlay="true"
        >
          <div class="title">商品优惠卷</div>
          <ul>
            <li v-for="item,index in coupont">
              <div class="left">
                <div class="min_top">
                  <span>￥</span>
                  <div class="big">{{item.couponnum}}</div>
                  <div class="ri_gib">
                    <div class="top_m">元</div>
                    <div class="but_m">优惠券</div>
                  </div>
                </div>
                <div class="min_b">{{item.coupondesc}}</div>
              </div>
              <div
                class="right"
                @click="toReceive(index)"
              >
                立即领取
              </div>
            </li>
          </ul>
          <div
            class="accomplish"
            @click="show4=false"
          >
            完成
          </div>
        </van-popup>
      </div>
      <!--拼团玩法-->
      <div class="pintuan">
        <div class="pintuan-title">
          <div>团购玩法</div>
          <div @click="$router.push('/collage_rule')">团购规则 ></div>
        </div>
        <div class="pincontent">
          <div> <span class="pin-item">1</span> 参团人数({{this.peopleNumber+'人'}})</div>
          <div>
            <span class="pin-item">2</span> 满员发货
            <!--<p class="shen">不满员申请退款</p>-->
          </div>
        </div>
      </div>
      <!--公共样式 黑线-->
      <div class="util"></div>
      <!--选择尺寸-->
      <div class="demand">
        <div class="canshu">
          <div
            class="de_min"
            @click="show3=true"
          >产品参数</div>
          <div>
            <van-icon
              class="icon"
              name="arrow"
            />
          </div>
        </div>
      </div>
      <!--公共样式 黑线-->
      <div class="util"></div>
      <!--全部评价-->
      <div class="evaluate">
        <div class="num">
          全部评价
        </div>
        <div
          v-if="evalshow"
          class="eval_big"
        >
          <div class="username">
            <div class="le">
              <div class="pic">
                <img
                  src="../../assets/img/banner.png"
                  alt=""
                >
              </div>
              <div class="user_na">
                {{Comments.userName}}
              </div>
            </div>
            <div class="rig">
              <van-rate
                disabled-color="#fe48bf"
                v-model="value"
                disabled
              />
            </div>
          </div>
          <div class="time_big">
            <div class="time">
              {{Comments.updateTimeStr}}</div>
            <div class="style">
              长款橙色
            </div>
          </div>
          <div class="content">{{Comments.content}}
          </div>
          <ul
            class="pics"
            v-if='Comments.pictures!=""'
          >
            <li @click='alllook'>
              <img
                :src="myhttp+Comments.pictures"
                alt=""
              >
            </li>
          </ul>
          <div
            class="all_look"
            @click='alllook'
          >
            查看全部评价
          </div>
        </div>
        <div
          v-else
          class="eval_moere"
        >该商品暂无评价</div>
      </div>
      <div class="commodity_details">
        <div class="title">
          商品详情
        </div>
        <div v-html="goodscontent.htmlbody==''?'暂无':goodscontent.htmlbody">

        </div>
      </div>
      <div class="shopping-bot">
        <div @click="oncollect()" class="shopping-bot-col">
          <van-icon
            id="abc"
            name="star-o"
            class="goodstuangou"
          />
          <p class="bot-s">收藏</p>
        </div>
        <div @click="shoppinglist()">
          <van-icon
            id="cart"
            name="cart"
          />
          <p class="bot-s">购物车</p>
        </div>
        <div  style="color: white" @click="lijigoumai">
          <van-icon
            name="cart"
          />
          <p class="bot-s">加入购物车</p>
        </div>
        <div @click="lijigoumai">
          <p class="botprice">￥{{recommendedprice}}</p>
          <p class="botkai"> 立即购买</p>
        </div>
      </div>
    </div>
    <!-- 未登录提示 -->
    <div class="not_log">
      <van-popup
        v-model="show5"
        class="not_l"
      >
        <div class="top">
          您尚未登陆，点击确认按钮跳转至登陆
        </div>
        <div class="butt">
          <div class="left">
            <div @click="show5=false">取消</div>
          </div>
          <div class="right">
            <div @click="gologin">确认</div>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>



<script>
  import CountDown from 'vue2-countdown'
  //接口
  import {
    createGoodsObject,
    getClassList,
    activityGoodsDetail,
    couponList,
    addCollect,
    deleteCollect1,
    myCollect,
    getGoodCouponList,
    receiveCoupon,
    detail,
    openKaiTuan,
    pintuanING,
    getGoodObjectById,
    getactivitypeople
  } from "@/api/index.js";
  import "@/assets/css/lw_shop.css";
  import Vue from "vue";
  // 弹出层
  import { Popup } from "vant";
  Vue.use(Popup);

  //步进器
  import { Stepper } from "vant";
  Vue.use(Stepper);

  // 轮播图
  import { Swipe, SwipeItem } from "vant";
  Vue.use(Swipe).use(SwipeItem);

  // 图片展示
  import { ImagePreview } from "vant";

  // 评分
  import { Rate } from "vant";
  Vue.use(Rate);

  // 标记
  import { Tag } from "vant";
  Vue.use(Tag);
  // 按钮
  import { Button } from "vant";
  Vue.use(Button);

  // 商品加入购物车
  import { GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn } from "vant";

  // 轻提示
  import { Toast } from "vant";
  Vue.use(Toast);

  // 商品规格
  import { Sku } from "vant";
  Vue.use(Sku);


  Vue.use(GoodsAction)
    .use(GoodsActionBigBtn)
    .use(GoodsActionMiniBtn);

  export default {
    data() {
      return {
        tuangoulist:[], //团购
        myhttp: "http://www.ymhaohan.cn/",
        // 轮播图预览
        imgArraypreview: [],
        imgArraylen: 0,
        uuid: "", //保持登录状态
        timecuo: true,//活动时间是否显示时间
        end_date: true,
        // 商品颜色尺码
        goodsPrices: [],
        info: [],
        meidaImgArr: [],
        routerid: "",
        current: 0,
        collect: 0,
        show: false,
        show4: false,
        show5: false,
        // 选择时切换的图片
        selec_pic: "",
        value: 3,
        value1: 1,
        defaultpic: "",
        nums: 1,
        show1: false,
        show2: false,
        show3: false,
        arr: new Set(),
        huan_bgc: 0,
        showSize: false,
        huan_bgctow: 0,
        // 弹出框价格和库存
        tanprice: 0,
        taninventory: 0,
        endTime: "", //活动结束时间
        loading: false,
        // 颜色是否选中
        iscolor: -1,
        issize: -1,
        //结束时间
        dotssss: 1,
        recommendId: this.info ? this.info.activity.id : "",
        goodsid: "", //商品id
        goodsprice: "", //商品价格
        cnt: "", //采购量
        coupont: "", //优惠卷列表
        couponid: "", //优惠卷id
        deleteCollectid: "", //删除收藏id
        // 轮播图
        imgArray: [],
        itemcolor: [], //颜色
        miaosha: false,
        pingluln: "", //评论用户头像
        pilgluncontent: false, //评论没有显示此内容
        pilgluncen: true, //真的内容
        // 判断是否收藏
        iscollect: false,
        target: "", //
        // 颜色是否选中
        iscolor: -1,
        issize: -1,
        // 评论区的显示隐藏
        evalshow: true,
        // 评论
        Comments: [],
        // 商品数据
        goodscontent: {
          goods: {
            goodsName: "",
            goodsBrief: "",
            xuniCnt: ""
          }
        }, // 数组长度
        arr_len: 0,
        // 是否返利
        extra: 0,
        // 返利年
        years: 0,
        recommendedprice: 0, //团购推荐价格
        style: -1,
        pricegoodsId:0 ,//商品id
        activityType:0 ,//活动类型
        peopleNumber:0 , //参团人数
        activityId:0 //活动id
      };
    },
    components: {
      CountDown
    },
    methods: {
      // 加入购物车
      vantToast1() {
        this.isgouwuche = 1;
        let params = {
          goodsId: this.goodsid,
          goodsPriceId: this.info.goodsDetail.goods.goodsPrices[0].goodsPriceId,
          cnt: this.value1,
          isService: 0,
          isgouwuche: 1,
          ymhaohanToken: this.uuid,
          years:this.years,
          activity:this.activityId
        };
        createGoodsObject(params).then(res => {
          if (res.err == "该类型的库存不够，请选择其他类型的礼品！"){
            this.$toast("该商品的库存不够");
          }
          if (res.flag == 0) {
            this.show5 = true;
            return;
          } else if (res.flag == 2) {
            this.$toast("该商品的库存不够");
          } else if (res.flag == 1) {
            // 轻提示
            this.$toast.success("已加入购物车");
            this.show2 = false;
          }
        });
      },
      //获取参团人数
       gettoactivitypeople(uuid,goodsid){
         getactivitypeople({ymhaohanToken:uuid,goodsId:goodsid}).then(
           res=>{
           this.peopleNumber=res.num;
           }
         )
       },
      countDownS_cb: function (x) {
      },
      countDownE_cb: function (x) {
       this.miaosha = true
      },
      onChange(index) {
        this.current = index;
      },
      swiperImgClick(index) {
        ImagePreview(this.imgArray);
      },
      // 分享头
      wxshare() {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
          //5+ 原生分享
          window.plusShare(
            {
              title: "好汉商城", //应用名字
              content: "这是分享的具体内容....",
              href: location.href, //分享出去后，点击跳转地址
              thumbs: ["https://api.ixiaowai.cn/api/api.php?b5b7a50d"] //分享缩略图
            },
            function(result) {
              //分享回调
            }
          );
        } else {
          //原有wap分享实现
        }
      },
      // 分享成功回调
      doShareDone() {
        console.log("分享成功");
      },
      doShareCancel() {
        console.log("取消了分享");
      },
      //我要开团
      getkaituan: function() {
        let params = {
          recommendid: this.recommendId,
          goodsid: this.goodsid,
          goodsnum: this.info.activity.peoplenum,
          begintime: this.info.activity.createtime,
          endtime: this.info.activity.endtime,
          ymhaohanToken: this.uuid
        };
        openKaiTuan(params).then(res => {
          console.log(res);
          if(res.msg=="开团成功！"){
            Toast('开团成功');
          }else{
            Toast('开团失败');
          }
        });
      },
      //正在开团
      getkaituaninfo: function(){
        let params={
          goodsid: this.goodsid,
          ymhaohanToken: this.uuid
        }
        console.log(params)
        pintuanING().then(res=>{
          console.log(res)
        });

      },
      // 跳转评论列表
      alllook() {
        this.$router.push({
          name: "Evaluate",
          params: { comonid: this.goodsid }
        });
      },
      // 重定向登陆
      gologin() {
        this.$router.push({ path: "/login" });
      },
      oncollect() {
        var collorcolor = document.getElementById("abc");
        if (this.collect == 0) {
          this.collect = 1;
          this.getaddCollect();
          this.$toast.success("收藏成功");
          collorcolor.style.color = "#5784fe";
        } else {
          this.collect = 0;
          this.getdeleteCollect();
          this.$toast.success("取消收藏");
          collorcolor.style.color = "rgb(185, 182, 182)";
        }
      },
      //购物车列表
      shoppinglist: function() {
        this.$router.push({ path: "/ShoppingCart" });
      },
      //加入收藏
      // 收藏功能
      oncollect() {
        if (this.iscollect == false) {
          let params = {
            type: 0,
            target: this.goodsid,
            ymhaohanToken: this.uuid
          };
          addCollect(params).then(res => {
            if (res.msg == "账号未登录！") {
              this.show5 = true;
              return;
            } else {
              if (this.collect == 0) {
                this.collect = 1;
                this.$toast.success("收藏成功");
                this.iscollect = true;
                this.isco();
                this.target = res.myCollect.target;
              }
            }
          });
        } else if (this.iscollect == true) {
          let params = {
            target: this.target,
            ymhaohanToken: this.uuid
          };
          deleteCollect1(params).then(res => {
            if (res.msg == "删除成功！") {
              this.collect = 0;
              this.$toast.success("删除成功");
              this.iscollect = false;
              this.isco();
            }
          });
        }
      },
      // 改变收藏按钮颜色
      isco() {
        var collorcolor = document.querySelector(
          '.shopping-bot-col'
        );
        if (this.iscollect == true) {
          collorcolor.setAttribute("id", "tuactive");
        } else if (this.iscollect == false) {
          collorcolor.removeAttribute("id");
        }
      },
      //查看全部评价
      getpingjialist: function() {
        this.$router.push({
          name: "Evaluate",
          params: { comonid: this.goodsid }
        });
      },

      //领取优惠卷
      toReceive: function(index) {
        this.couponid = this.coupont[index].couponid;
        this.$toast.success("领取成功");
      },
      isActive(index) {
        this.huan_bgc = index;
      },
      isActivetow(index) {
        this.huan_bgctow = index;
      },
      // 轻提示
      vantToast() {
        this.$toast.success("已加入购物车");
        this.getcreateGoodsObject();
        this.show2 = false;
      },
      //获取商品详情
      getInfo: function() {
        let params = {
          recommendId: this.recommendId,
          goodsid: this.goodsid,
          ymhaohanToken: this.uuid
        };
        activityGoodsDetail(params).then(res => {
          console.log(res);
          this.activityType=res.activity.type;
          this.info = res;
          this.activityId=res.activity.id;
          this.pricegoodsId=res.goodsId;
          this.extra = this.info.goodsDetail.goods.extra;
          this.goodsprice = this.info.activity.recommendedprice;
          this.type = this.info ? this.info.activity.type : "";
          localStorage.setItem("style", JSON.stringify(this.info.activity.type));
          //团购商品价格
          this.recommendedprice = this.info.activity.recommendedprice;
          // 赋值评论
          this.Comments = res.goodsDetail.pinglunlist[0];
          if (this.Comments == undefined) {
            this.evalshow = false;
          }else{
            this.value=this.Comments.fenShu;
          }
          this.goodsPrices= this.info.goodsDetail.goods.goodsPrices;
          for (let item of this.goodsPrices) {
            if (item.goodsPriceProp.length == 0) {
            } else {
              this.arr.add(item.goodsPriceProp[0].propValue);
            }
          }

          this.arr = Array.from(this.arr);
          this.arr_len = this.arr.length;
          //团购
          let tuangoulist = res.goodsDetail.goods.tuangoulist

          tuangoulist.forEach(item => {
            item.header = item.header ? this.myhttp + item.header  : 'http://tx.haiqq.com/uploads/allimg/150323/15134Qb0-0.jpg'
          });
          this.tuangoulist.push(tuangoulist[0]);
          this.tuangoulist.push(tuangoulist[1]);
          let that = this;
          let num = 2;
          window.setInterval(function () {
            that.tuangoulist = [];
            for (let i = 0; i < 2; i++){
              if (num == tuangoulist.length) {
                num = 0;
              }
              that.tuangoulist.push(tuangoulist[num]);
              num++;
            }
          },5000)
          this.loading = true;
          // 给轮播图数组赋值
          this.imgArray = res.goodsDetail.goods.goodsMedias;
          this.imgArraylen = this.imgArray.length;
          this.goodsPrices = res.goodsDetail.goods.goodsPrices;
          this.defaultpic = res.goodsDetail.goods.goodsMedias[0].mediaId;

          //评论集合
          if (this.info.goodsDetail.pinglunlist.length > 0) {
            this.pingluln = this.info.goodsDetail.pinglunlist;
          } else {
            this.pilgluncontent = true;
            this.pilgluncen = false;
          }
          // 判断是否收藏
          if (
            res.goodsDetail.goods.goodsCollect == null ||
            res.goodsDetail.goods.goodsCollect == 0
          ) {
            this.iscollect = false;
          } else {
            this.iscollect = true;
            this.target = res.goodsDetail.goods.goodsCollect[0].target;
          }
        });
      },
      //优惠卷列表
      getcouponList: function() {
        let params = {
          goodsid: this.goodsid,
          ymhaohanToken: this.uuid
        };
        getGoodCouponList(params).then(res => {
          if (res.data.length > 0) {
            this.coupont = res.data;
          }
        });
      },
      //领取优惠卷入口
      getCoupon: function() {
        let params = {
          couponId: this.couponid, //优惠卷id
          ymhaohanToken: this.uuid
        };
        receiveCoupon(params).then(res => {});
      },
      //加入购物车
      getcreateGoodsObject: function() {
        let params = {
          goodsId: this.goodsid,
          goodsPriceId: this.info.goodsDetail.goods.goodsPrices[0].goodsPriceId,
          cnt: this.value1,
          isService: 0,
          isgouwuche: 1,
          ymhaohanToken: this.uuid
        };
        createGoodsObject(params).then(res => {
          console.log(1111);
        });
      },
      //立即购买
      lijigoumai(){
        this.taninventory=this.info.goodsDetail.goods.xuniCnt
        this.show2=true;
      },
      //立即购买
      getpay: function(){
        this.isgouwuche = 0;
        let params = {
          goodsId: this.goodsid,
          goodsPriceId: this.info.goodsDetail.goods.goodsPrices[0].goodsPriceId,
          cnt: this.value1,
          isService: 0,
          isgouwuche: 0,
          ymhaohanToken: this.uuid,
          extra: this.extra,
          years: this.years,
          activity:this.activityId
        };
        createGoodsObject(params).then(res => {
          if (res.flag == 0) {
            this.show5 = true;
            return;
          } else if (res.flag == 1) {
            // 轻提示
            this.show2 = false;
          }
          let params = {
            id: res.goodsObjectId,
            ymhaohanToken: this.uuid
          };
          getGoodObjectById(params).then(res => {
            res.data[0].activityType=this.activityType;
            localStorage.setItem("choosepro", JSON.stringify(res.data));
            this.$router.push({path:"/Payment",query:{goodsId:this.goodsid,recommendid:this.activityId}});
          });
        });
      },
      // 预览图片
      swiperImgClick() {
        for (var i = 0; i < this.imgArray.length; i++) {
          this.imgArraypreview.push(this.myhttp + this.imgArray[i].mediaId);
        }
        ImagePreview({
          images: this.imgArraypreview
        });
      },
      //选择尺寸方法
      clickSize(items, index) {
        this.issize = -1;
        let array = this.goodsPrices.filter(
          item => item.goodsPriceProp[1].propValue == items
        );
        this.colorArr = array;
        this.showSize = true;
        this.iscolor = index;
      },
      clickcolor(items, index) {
        this.issize = index;
        this.tanprice = items.price;
        // this.taninventory = items.stock;
        this.goodsPriceId = items.goodsPriceId;
        this.selec_pic = items.mediaIdDatu;
      }
    },
    created: function() {
      //获取uuid 登录状态
      this.uuid = localStorage.getItem("uuid");
    },
    mounted: function() {
      this.goodsid = this.$route.params.goodsid;
      this.recommendId = this.$route.params.id;
      this.getInfo();
      this.getcouponList();
      this.gettoactivitypeople(this.uuid,this.goodsid);
      if (this.coupont) {
        this.getCoupon();
      }
    },
    computed: {
      items() {
        if (this.info) {
          return this.info;
        } else {
          return "";
        }
      }
    }
  };
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
<style>
  .van-icon-cart::before {
    content: "\F00E";
    font-size: 0.5rem;
  }
</style>
<style src='../../assets/css/shopping.css'></style>
<style scoped>
  .pintuan {
    width: 100%;
    font-size: 26px;
  }
  .pintuan .pintuan-title {
    font-size: 26px;
    line-height: 35px;
    color: #333333;
    margin-top: 20px;
    padding-left: 25px;
    padding-right: 25px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .pinliunlist {
    height: 96px;
    line-height: 96px;
    display: flex;
    justify-content: space-around;
    background-color: #fff7f8;
    padding: 0 3%;
    border-bottom: solid 1px #e7e7e7;
  }
  .pinliunlist:last-child {
    border: none;
  }
  .pinliunlist > div:nth-child(1) {
    flex: 1;
    text-align: center;
  }
  .pinliunlist > div:nth-child(1) > img {
    width: 64px;
    height: 64px;
    border-radius: 32px;
    margin-top: 20px;
  }
  .pinliunlist > div:nth-child(2) {
    flex: 3;
  }
  .pinliunlist > div:nth-child(3) {
    flex: 2;
    font-size: 24px;
    color: #666666;
  }
  .pinliunlist > div:nth-child(4) {
    flex: 1;
  }
  .pinliunlist > div:nth-child(4) > button {
    line-height: 50px;
    margin-top: 15px;
    text-align: center;
    width: 112px;
    height: 49px;
    color: #ffffff;
    background-image: linear-gradient(
      90deg,
      #ff6060 0%,
      #ff3749 50%,
      #ff1233 100%
    );
    border-radius: 25px;
    border: none;
  }
  .pilun-name {
    font-size: 26px;
    line-height: 35px;
    color: #000000;
  }
  .pinlun-num {
    font-size: 26px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #ff1c39;
  }
  .pincontent {
    padding-bottom: 20px;
    display: flex;
    justify-content: space-around;
  }
  .content_price {
    width: 100%;
    height: 85px;
    background: url(../../assets/img/Countdownbackground.png);
    background-size: 100% 100%;
    display: flex;
  }
  .pin-item {
    display: inline-block;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    text-align: center;
    color: #ffffff;
    background-image: linear-gradient(
      90deg,
      #ff6060 0%,
      #ff3749 50%,
      #ff1233 100%
    ),
    linear-gradient(#000000, #000000);
    background-blend-mode: normal, normal;
  }
  .content {
    width: 100%;
    height: auto;
    margin-top: -5px;
    background: #ffffff;
  }
  .not_l {
    width: 600px;
    border-radius: 20px;
    overflow: hidden;
  }
  .not_log .top {
    height: 100px;
    text-align: center;
    line-height: 100px;
    border-bottom: 2px solid #eee;
    background-color: #fff;
    font-size: 30px;
    padding: 10px;
  }
  .not_log .butt {
    display: flex;
  }
  .not_log .butt .left {
    border-right: 1px solid #eee;
  }
  .not_log .butt .left,
  .not_log .butt .right {
    width: 50%;
  }
  .not_log .butt div {
    width: 100%;
    background-color: #fff;
    border: none;
    height: 100px;
    font-size: 30px;
    text-align: center;
    line-height: 100px;
    color: #000;
  }
  .pilgluncontent {
    text-align: center;
  }.shen {
     width: 180px;
     height: 20px;
     font-size: 20px;
     line-height: 35px;
     color: #999999;
     margin-top: 10px;
   }
  .shopping-bot {
    position: fixed;
    bottom: 0%;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-around;
  }
  .shopping-bot > div:nth-child(1) {
    text-align: center;
    flex: 3;
    background: #ffffff;
  }
  .shopping-bot > div:nth-child(2) {
    text-align: center;
    flex: 3;
    background: #ffffff;
  }
  .shopping-bot > div:nth-child(3) {
    flex: 3;
    padding-top: 10px;
    text-align: center;
    background-color: #ff5459;
  }
  .shopping-bot > div:nth-child(4) {
    flex: 3;
    padding-top: 10px;
    text-align: center;
    background-color: #8206ff;
    opacity: 0.7;
  }
  #abc {
    margin-top: 10px;
    font-size: 40px;
    text-align: center;
  }
  #cart {
    margin-top: 10px;
    font-size: 80px;
    text-align: center;
  }
  .bot-s {
    margin-top: 5px;
    text-align: center;
  }
  .botprice {
    font-size: 30px;
    color: #ffffff;
    text-align: center;
    margin: 0 !important;
  }
  .botkai {
    color: #ffffff;
    text-align: center;
    margin: 0 !important;
  }
   .content_price {
    width: 100%;
    height: 85px;
    background:#fff34f;
    background-size: 100% 100%;
    display: flex;
  }
  .content_price > .content-jia > .content-fen {
    line-height: 85px;
    font-size: 0.733333rem;
  }
  .content_price > .content-jia {
    font-size: 40px;
    height: 100%;
    color: black;
  }
  .Seconds-kill {
    width: 3.2rem;
    flex: 1;
    color: #fff;
    text-align: center;
    font-size: 20px;
    line-height: 65px;
    background-color: #ff0000;
  }
  .Seconds-kill-time{
    margin-right: 0.2rem;
    font-style:normal;
    font-size: 26px;
    line-height: 95px;
    white-space: nowrap;
  }
  .zhuangui{
        -webkit-box-flex: 2;
    -ms-flex: 2;
    flex: 2;
    color: black;
    font-size: 0.266667rem;
    overflow: hidden;
  }
  .zhuangui>p:first-of-type{
    float: left;
    margin: 0;
    margin-top: 30px;
    display: block;
    width: 44%;
    height: 40%;
    margin-left: 30px;
  }
  .Seconds-kill .timer {
    margin-top: -20px;
  }
  .zhuangui>.sold {
    float: left;
    line-height: 35px;
    text-align: center;
    border-radius: 7px;
    width: 44%;
    height: 40%;
    color: #fff;
    background-color: #ff0000;
  }
  .data_info {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    display: flex;
    background: #ffffff;
  }
  .data_info .data-title {
    flex: 4;
    line-height: 80px;
    padding-left: 37.5px;
    font-size: 30px;
  }
  .data_info .right {
    text-align: center;
    flex: 1;
  }
  .data_info img {
    height: 30px;
  }

  .introduce {
    font-family: HiraginoSansGB-W3;
    font-size: 27px;
    line-height: 60px;
    padding-left: 30px;
    color: #fe48bf;
  }
  .sales_volume {
    width: 90%;
    margin: 0 auto;
    display: flex;
    line-height: 70px;
    border-bottom: solid 1px #eeeeee;
    justify-content: space-between;
  }
  .seconds-miaosha {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
  }
  .seconds-m {
    flex: 1;
    height: 50px;
    text-align: center;
  }
  .seconds-m img {
    height: 80%;
  }
  .seconds-desc {
    flex: 3;
    text-align: center;
    color: #fe48bf;
    bottom: 20px;
  }
  .coupons {
    width: 100%;
    height: 150px;
    background: #f5f5f5;
    border: solid 1px #ffffff;
  }
  .coupons-info {
    width: 100%;
    height: 70%;
    margin-top: 20px;
    line-height: 40px;
  }
  .shopping {
    width: 100%;
    height: 100%;
    padding-top: 10px;
    background: #ffffff;
  }
  .coupons .top {
    display: flex;
    justify-content: start;
  }
  .coupons .coupons-info .shopping .top .lef {
    width: 150px;
    height: 30px;
    line-height: 30px;
    padding: 5px;
    margin-left: 25px;
    background-color: #fe48bf;
    border-radius: 5px;
    text-align: center;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    color: #ffffff;
  }
  .coupons .coupons-info .shopping .top .righ {
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    padding-left: 15px;
    color: #333333;
  }
  .coupons .coupons-info .midd {
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    padding-left: 30px;
    padding-top: 10px;
    padding-right: 30px;
    color: #fe48bf;
  }
  .demand {
    width: 100%;
    height: 75px;
  }
  .demand .choose-parameters {
    width: 90%;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    background-color: #ffffff;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    border-bottom: solid 1px #eeeeee;
  }
  .de_min {
    flex: 3;
  }
  .icon {
    flex: 1;
  }
  .demand .canshu {
    width: 90%;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    font-size: 25px;
    display: flex;
    justify-content: space-around;
  }
  .util {
    width: 100%;
    height: 25px;
    background: #f5f5f5;
  }
  .user-info {
    width: 100%;
    height: auto;
  }
  .particulars {
    background-color: #f5f5f5;
    margin-bottom: 88px;
  }
  .left_return .left_return {
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
  .information {
    position: fixed;
    z-index: 999;
    right: 24px;
    top: 24px;
  }
  .information .icon {
    opacity: 0.38;
    font-size: 58px;
  }
  .swiper ,.van-swipe{
    position: relative;
    left: 0;
    top:0;
    width: 100%;
    height: 750px;
  }
  .custom-indicator {
    position: absolute;
    right: 37px;
    bottom: 23px;
    z-index: 9;
    border-radius: 17px;
    background: rgba(000, 000, 000, 0.4);
    border-radius: 17px;
    font-size: 20px;
    padding: 0 5px 0 5px;
    color: #f5f5f5;
  }
  .swiper-img {
    width: 100%;
    height: 100%;
  }
  .body {
    width: 100%;
    height: auto;
    margin-top: -6px;
  }
  .body .bo_one {
    display: flex;
    justify-content: space-between;
  }
  .body .bo_one .left {
    display: flex;
    padding-top: 30px;
  }
  .body .bo_one .price {
    display: flex;
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #e50000;
  }
  .body .bo_one .price .min {
    line-height: 64px;
    margin-right: 5px;
    padding-left: 30px;
  }
  .body .bo_one .price .big {
    display: flex;
    font-size: 46px;
  }
  .ole_price del {
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #999999;
    padding-left: 20px;
    line-height: 74px;
  }
  .bo_one .right {
    text-align: center;
    width: 80px;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    line-height: 35px;
    letter-spacing: 0px;
    color: #999999;
    margin-right: 24px;
    margin-top: 15px;
  }
  .bo_big {
    background-color: #fff;
  }
  .body .title {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    padding: 30px;
    padding-top: 10px;
    width: 70%;
  }

  .body .sales_volume {
    display: flex;
    justify-content: space-between;
    font-family: HiraginoSansGB-W3;
    font-size: 22px;
    color: #999999;
    padding-left: 30px;
    padding-bottom: 10px;
    padding-right: 30px;
  }

  .bo_tow .butt {
    margin-top: 18px;
    height: 98px;
    position: relative;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 98px;
    background-color: #ffffff;
    display: flex;
  }
  .bo_tow .butt .left {
    margin-top: 25px;
    margin-right: 16px;
    line-height: 40px;
    background-color: #5784fe;
    border-radius: 5px;
    height: 38px;
    font-size: 22px;
    color: #ffffff;
    padding: 5px 10px 5px 10px;
  }
  .bo_tow .butt .right {
    font-size: 26px;
    color: #333333;
  }
  .gointo {
    position: absolute;
    right: 30px;
    top: 10px;
  }
  .gointo .icon {
    font-size: 25px;
  }
  .demand {
    margin-top: 20px;
  }

  .username {
    display: flex;
  }
  .username .le {
    display: flex;
  }
  .username .le .pic {
    height: 90px;
    width: 90px;
    line-height: 90px;
    overflow: hidden;
    border-radius: 50%;
  }

  .evaluate {
    margin-top: 20px;
    padding: 24px;
    background-color: #fff;
  }
  .evaluate .num {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
  }
  .username {
    line-height: 55px;
    margin-top: 20px;
  }
  .user_na {
    margin-left: 17px;
    margin-right: 15px;
  }
  .time_big {
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    color: #5b5b5b;
    font-size: 20px;
  }
  .eval_big .pics {
    display: flex;
    justify-content: space-around;
  }
  .eval_big .pics li {
    width: 168px;
    height: 150px;
    overflow: hidden;
  }
  .eval_big > .all_look {
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    margin: 0 auto;
    color: #5784fe;
    width: 210px;
    height: 50px;
    line-height: 50px;
    border-radius: 24px;
    border: solid 1px #5784fe;
    margin-top: 50px;
    text-align: center;
    margin-bottom: 30px;
  }
  .commodity_details {
    margin-top: 20px;
    background-color: #fff;
  }
  .commodity_details .title {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    padding: 30px;
    color: #333333;
  }
  .buttlast {
    height: 88px;
    line-height: 88px;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
  }
  .shoucang,.gouwuche{
    width: 30%;
    height: 88px;
    line-height: 88px;
  }
  .dot{
    display: none !important;
  }
  .goumai{
    width: 35.33333333333%;
    height: 88px;
    line-height: 88px;
  }
  .gouwuche>.van-icon,.van-icon-cart,.van-goods-action-mini-btn__icon{
    font-size: 0.35rem !important;
  }
  .buttlast_small {
    font-size: 0.38rem;
    height: 88px;
    line-height: 60px;
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
  /* 商品规格弹出层 */
  .Choose_size .top {
    padding-top: 35px;
    padding-left: 25px;
    display: flex;
    justify-content: space-between;
  }
  .Choose_size .top .pic {
    padding-right: 8px;
    width: 180px;
    height: 180px;
    overflow: hidden;
  }
  .zhuangui{
    margin-top: 5px;
  }
  .zhuangui>.sold{
    margin-top: 5px;
  }
  .buttons {
    width: 100%;
  }
  .buttons .left {
    height: 100%;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
    background: #89a9fe;
  }
  .hint_goods {
    margin-top: 20px;
  }
  .buttons .right {
    height: 100%;
    line-height: 100px;
    text-align: center;
    font-size: 25px;
    color: #ffffff;
    background: #a86de3;
  }
  .Choose_size .top .left {
    display: flex;
  }
  .Choose_size .top img {
    width: 100%;
    height: 100%;
  }
  .Choose_size .right .icon {
    font-size: 28px;
    padding-right: 25px;
  }
  .Choose_size .top .pri {
    padding-top: 80px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #c31515;
  }
  .ole_zhuan {
    margin-right: -10px;
    border: solid 1px red;
  }

  .Choose_size .top .inventory,
  .Choose_size .top .hint {
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #333333;
  }
  .colour .title,
  .size_big .title {
    padding-left: 24px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
  }
  .colour ul,
  .size_big ul {
    margin-top: 15px;
    padding-left: 30px;
    margin-bottom: 64px;
    display: flex;
    flex-wrap: wrap;
  }
  .colour li,
  .size_big li {
    text-align: center;
    padding: 0 10px 0 10px;
    min-width: 130px;
    margin-right: 20px;
    height: 56px;
    line-height: 56px;
    background-color: #f5f5f5;
    border-radius: 28px;
    color: #333333;
  }
  .numbers {
    margin-bottom: 300px;
    display: flex;
    justify-content: space-between;
  }
  .numbers .title {
    padding-left: 30px;
    padding-top: 16px;
    font-size: 28px;
  }
  .numbers_bujin {
    padding-right: 24px;
  }
  .buttons {
    display: flex;
  }
  .buttons .left button,
  .buttons .right button {
    width: 100%;
    height: 88px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    border: none;
    color: #ffffff;
  }
  .buttons .left button {
    background: #89a9fe;
  }
  .buttons .right button {
    background: #a86de3;
  }
  .buttons .left,
  .buttons .right {
    width: 100%;
    height: 88px;
  }
  .activecolor {
    background-color: #ffcd42 !important;
    color: #fff !important;
  }
  /* 购物车小圆点 */
  .buttlast .dot {
    width: 12px;
    height: 12px;
    background-color: #d30000;
    border-radius: 50%;
    position: absolute;
    left: 190px;
  }
  .Product_Parameter .title {
    height: 98px;
    line-height: 98px;
    text-align: center;
    background-color: #ffffff;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #333333;
  }
  .Product_Parameter button {
    height: 98px;
    width: 100%;
    background-color: #89a9fe;
    font-size: 32px;
    border: none;
    color: #ffffff;
  }
  /* 优惠券 */
  .coupon .title {
    width: 750px;
    height: 98px;
    line-height: 98px;
    text-align: center;
    background-color: #ffffff;
    border-bottom: 1px dashed #fbb4a4;
  }
  .coupon li {
    width: 702px;
    height: 210px;
    margin-bottom: 30px;
    display: flex;
    background: url("../../assets/img/Voucherbackground.png");
    background-size: 100% 100%;
  }
  .coupon ul {
    margin: 30px 24px 137px 24px;
  }
  .coupon li span {
    font-size: 40px;
    margin-top: 46px;
    color: #ffffff;
  }

  .coupon li .big {
    font-size: 100px;
    color: #ffffff;
    text-shadow: 0px -2px 10px 0px rgba(179, 92, 101, 0.8);
  }
  .coupon li .left {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    border-right: 1px dashed #fff;
    padding-top: 30px;
    width: 460px;
    padding-left: 50px;
  }
  .coupon li .min_top {
    display: flex;
  }
  .coupon li .ri_gib {
    padding-left: 10px;
    padding-top: 10px;
    font-size: 40px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 44px;
    letter-spacing: 0px;
    color: #ffffff;
    text-shadow: 0px -1px 5px 0px rgba(179, 92, 101, 0.8);
  }
  .coupon .min_b {
    font-family: HiraginoSansGB-W3;
    font-size: 30px;
    color: #fb9487;
    position: absolute;
    bottom: 47px;
    height: 44px;
    line-height: 44px;
    background-color: #fff100;
    border-radius: 22px;
    padding-left: 36px;
    padding-right: 36px;
  }
  .coupon .right {
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    height: 100%;
    color: #ffffff;
    width: 240px;
    text-align: center;
    line-height: 200px;
  }
  .accomplish {
    border-top: 1px dashed #fbb4a4;
    height: 97px;
    line-height: 97px;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    text-align: center;
    line-height: 97px;
    color: #333333;
  }
  .eval_moere {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 30px;
  }
  .not_l {
    border-radius: 20px;
    overflow: hidden;
  }
  .not_log .top {
    height: 100px;
    background-color: #fff;
    font-size: 30px;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .not_log .butt {
    display: flex;
  }
  .not_log .butt .left {
    border-left: 1px solid #000;
  }
  .not_log .butt .left,
  .not_log .butt .right {
    flex: 1;
  }
  .not_log .butt button {
    width: 100%;
    background-color: #fff;
    border: none;
    height: 100px;
    font-size: 30px;
    line-height: 100px;
    color: #000;
  }
  /* 颜色尺寸选择 */
  .colu_big {
    display: flex;
  }
  .colour .title {
    padding-left: 10px;
    padding-right: 10px;
    font-size: 28px;
    padding-left: 30px;
    margin-bottom: 10px;
  }
  .colour .min_select {
    height: 50px;
    line-height: 50px;
    font-size: 26px;
    padding-left: 30px;
    padding-right: 30px;
    text-align: center;
    min-width: 90px;
    margin-right: 20px;
    background-color: #f5f5f5;
    border: 1px solid #eee;
    border-radius: 50px;
  }
  .colour .colu_big {
    margin-bottom: 10px;
    margin-left: 25px;
  }
  .coloractive {
    background-color: #ffcd42 !important;
    color: #fff;
  }
  .size_but {
    margin-top: 50px;
  }
  .hint_goods {
    font-size: 20px;
    padding-left: 30px;
    margin-bottom: 30px;
  }
</style>
<style>
  #tuactive {
    color: #89a9fe !important;
  }
  /* 步进器 */
  #Particulars-par .van-stepper__minus {
    width: 87px;
    height: 56px;
    border-radius: 10px 0px 0px 10px;
    border: solid 1px #e7e7e7;
  }
  #Particulars-par .van-stepper__minus::before {
    width: 20px !important;
    background-color: #000 !important;
    height: 2px !important;
  }
  #Particulars-par .van-stepper__plus {
    width: 87px;
    height: 56px;
    border-radius: 0px 10px 10px 0px;
    border: solid 1px #e7e7e7;
  }
  #Particulars-par .van-stepper__plus::before {
    width: 20px !important;
    height: 2px !important;
    background-color: #000 !important;
  }
  #Particulars-par .van-stepper__plus::after {
    height: 20px !important;
    width: 2px !important;
    background-color: #000 !important;
  }
  #Particulars-par .van-stepper__input {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    width: 100px;
    height: 56px;
  }
  #Particulars-par .van-cell {
    border: none !important;
  }

  #Particulars-par .van-cell {
    font-size: 26px;
    text-indent: 106px !important;
    height: 98px;
    line-height: 78px;
  }
  #Particulars-par .van-cell__title > span {
    line-height: 82.5px !important;
  }
  #Particulars-par .rebate_shop {
    top: 51px !important;
  }
</style>
<style>
 .Seconds-kill .Seconds-kill-time div i{
    font-style: normal !important;
  }
 #left_return .van-stepper__minus::after, .van-stepper__plus::after{
    width:  3px !important;
    height: 20px !important;
  }
 #left_return .van-stepper__minus::after, .van-stepper__plus::before{
    width: 3px !important;
    height: 20px !important;
  }
  #left_return .van-stepper__minus::before, .van-stepper__plus::before{
    width:  20px !important;
    height: 3px  !important;
  }
</style>
