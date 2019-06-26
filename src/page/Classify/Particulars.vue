<template>
  <div
    class="particulars"
    id="particulars"
  >
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
    <!-- 优惠券 -->
    <div class="coupon">
      <van-popup
        v-model="show4"
        position="bottom"
        :overlay="true"
      >
        <div class="title">商品优惠卷</div>
        <ul>
          <li
            v-for="item,index in getGoodCouponList"
            @click="getcoupon(index)"
          >
            <div class="C-msg">
              <p style="margin: 0;" class="C-money">¥<span>{{item.couponnum}}</span>店铺优惠券</p>
              <p style="margin: 0;" class="C-tiaoqian">满{{item.couponshould}}使用</p>
              <p style="margin: 0;" class="C-time">有效期 {{item.createtime}}-{{item.coupontime}}</p>
            </div>
            <div class="C-play">
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
        </div>
        <div
          class="but"
          type="warning"
          @click="show3=false"
        >完成</div>
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
              <div class="pri">￥{{tanprice}}</div>
              <div class="inventory">
                库存{{taninventory}}件
              </div>
              <div class="hint">
                请选择规格属性
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
        <div class="hint_goods">
          温馨提示：尺码在选择颜色后显示
        </div>
        <div class="colour" v-if="showSize">
          <div class="title"   v-if="pingming.propValue.length>0">
            {{pingming.propName.propName}}
          </div>
          <div class="colu_big">
            <div
              v-if="pingming.propValue.length>0"
              class="colu_b"
              @click="clickSize(item,index)"
              v-for="item,index in pingming.propValue"
            >
              <div
                :class="iscolor==index?'coloractive':''"
                class="min_select"
              >
                {{item.propValue}}
              </div>
            </div>
            <div
              v-else
              class="color_more"
            >该商品暂无属性选择</div>
          </div>
          <div class="title size_but" v-if="showSize&&JSON.stringify(guige)!='{}'">
            {{guige.propName.propName}}
          </div>
          <div
            class="colu_big"
          >
            <div
              class="colu_b"
              @click="clickcolor(item,index)"
              v-for="item,index in guige.propValue"
            >
              <div
                :class="issize==index?'coloractive':''"
                class="min_select"
              >
                {{item.propValue}}
              </div>
            </div>
          </div>
        </div>
        <div class="numbers">
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
              @click="vantToast"
              type="primary"
            >加入购物车</div>
          </div>
          <div class="right">
            <div
              type="primary"
              @click="purchase"
            >立即购买</div>
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
          <li @click="$router.push('/np')">
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
    <div
      class="left_return"
      @click="goreturn"
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
    <div class="swiper">
      <van-swipe @change="onChange">
        <van-swipe-item
          :key='index'
          v-for="item,index in imgArray"
        >
          <img
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
    <div class="body">
      <div class="bo_big">
        <div class="bo_one">
          <div class="left">
            <div class="price">
              <div class="min">￥</div>
              <div class="big">{{price}}</div>
            </div>
            <div class="ole_price">
              <del>¥{{oldprice}}</del>
            </div>
          </div>
          <div
            class="right"
            @click="wxshare"
          >
            <img
              src="../../assets/img/share.png"
              alt=""
            >
            <div>分享有赏</div>
          </div>
        </div>
        <div class="title">
          {{goodscontent.goods.goodsName}}
        </div>
        <div class="introduce">
          {{goodscontent.goods.goodsBrief}}
        </div>
        <div class="sales_volume">
          <div class="midd">月销量：{{goodscontent.goods.xuniCnt}}</div>
        </div>
      </div>
    </div>
    <div class="bo_tow">
      <div
        v-if='this.getGoodCouponList.length>0'
        class="top"
        @click="show4=true"
      >
        <div class="lef">
          商品促销优惠卷
        </div>
        <div class="righ">
          领取优惠卷
        </div>
      </div>
      <div
        class="midd"
        v-if='this.getGoodCouponList.length>0'
        @click="show4=true"
      >
        <span
          class="discount_coupon"
          v-for="item,index in this.getGoodCouponList"
        >满{{item.couponshould}}元减{{item.couponnum}}元</span>
      </div>
      <div
        class="butt"
        v-if="extra==1"
      >
        <van-collapse
          v-model="activeName"
          accordion
        >
          <div class="rebate_shop">
            <img
              src="../../assets/img/fanligou.png"
              alt=""
            >
          </div>
          <van-collapse-item
            title="选择分期期数"
            name="1"
          >
            <div class="title">选择返还购后只能使用账户余额或微信支付宝进行付款</div>
            <ul>
              <li
                :class="index === showss?'Rebateli':''"
                v-for="(item, index) in Rebate"
                @click="indRebate(index)"
              >
                <div class="tops">{{item.top}}</div>
                <div class="butts">
                  {{item.butt}}
                </div>
              </li>
            </ul>
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <div class="demand">
      <div
        class="de_min"
        @click="show2=true"
      >选择 品名 规格
        <van-icon
          class="icon"
          name="arrow"
        />
      </div>
      <div
        class="de_min"
        @click="show3=true"
      >产品参数
        <van-icon
          class="icon"
          name="arrow"
        />
      </div>
    </div>
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
              :src="Comments.header"
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
          {{Comments.goodsPriceName}}
        </div>
      </div>
      <div class="content">{{Comments.content}}
      </div>
      <ul
        class="pics"
        v-if='Comments.pictures'
      >
        <li v-for="item in Comments.pictures.split(',')" style="margin-left: 10px;" @click='alllook'>
          <img
            style="width: 100%;height: 100%;"
            :src="myhttp+item"
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
      <div id="Particulars-img" v-html="goodscontent.htmlbody==''?'暂无':goodscontent.htmlbody">

      </div>
    </div>
    <van-goods-action class="buttlast">
      <van-goods-action-mini-btn
        class="buttlast_small"
        icon="like"
        text="收藏"
        @click="oncollect"
      />
      <van-goods-action-mini-btn
        class="buttlast_small"
        icon="cart"
        text="购物车"
        @click="$router.push('/ShoppingCart')"
      />
      <van-goods-action-big-btn
        class="buttlast_small"
        text="加入购物车"
        @click="show2=true"
      />
      <van-goods-action-big-btn
        @click="show2=true"
        class="buttlast_small"
        text="立即购买"
        primary
      />
      <div
        class="dot"
        v-if="dotssss===1"
      >
      </div>
    </van-goods-action>
  </div>
</template>
<script>
  import { config, ready } from "../../assets/js/share.js";
  import plusReady from "../../assets/js/share.js";
  import {
    detail,
    getGoodCouponList,
    addCollect,
    getGoodObjectById,
    receiveCoupon,
    createGoodsObject,
    deleteCollect1,
    getdetailmsg,
    getSignature,
    checklogin
  } from "../../api/index.js";
  import Vue from "vue";
  // 弹出层
  import { Popup } from "vant";
  Vue.use(Popup);

  // 折叠面版
  import { Collapse, CollapseItem } from "vant";
  Vue.use(Collapse).use(CollapseItem);

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

  // import swip from ;

  export default {
    data() {
      return {
        myhttp: "http://www.ymhaohan.cn/",
        defaultpic: "",
        collect: 0,
        show: false,
        value: 3,
        activeName: "0",
        value1: 1,
        nums: 1,
        information: "",
        // show1: false,
        // 商品优惠券列表
        getGoodCouponList: [],
        // 商品价格id
        goodsPriceId: "",
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        price: 0,
        oldprice: 0,
        huan_bgc: 0,
        huan_bgctow: 0,
        dotssss: 1,
        showss: 0,
        uuid: "",
        goodsid: "",
        current: "",
        // 商品id
        // 评论区的显示隐藏
        evalshow: true,
        target: "",
        // 评论
        Comments: [],
        color_show: 0,
        // 判断是加入购物车还是直接购买
        isgouwuche: 1,
        // 是否返利
        extra: 0,
        // 商品数据
        goodscontent: {
          goods: {
            goodsName: "",
            goodsBrief: "",
            xuniCnt: ""
          }
        },
        // 颜色是否选中
        iscolor: -1,
        issize: -1,
        // 商品颜色尺码
        goodsPrices: [],
        goods_ti: [],
        goods_mint: [],
        // 选择时切换的图片
        selec_pic: "",
        // 轮播图
        imgArray: [],
        // 返利年
        years: 0,
        // 轮播图预览
        imgArraypreview: [],
        imgArraylen: 0,
        // 数组长度
        arr_len: 0,
        // 判断是否收藏
        iscollect: false,
        // 弹出框价格和库存
        tanprice: 0,
        taninventory: 0,
        Rebate: [
        { top: "五年(全额返)", butt: "公式 商品单价 = 返还金额" },
        { top: "四年(返90%)", butt: "公式 商品单价 x 0.9 =返还金额" },
        { top: "三年(返80%)", butt: "公式 商品单价 x 0.8 =返还金额" },
        ],
        arr: new Set(),
        colorArr: [],
        showSize: false,
        pingming:{},
        guige:{},
        pingmingclick:{}, //初始的品名数组
        guigeclick:{},  //初始的规格数组
        onpingming:{}, //选中的品名
        onguige:{},     //选中的规格
        ifselectguige:false, //判断是否选择属性
        bol:this.$route.query.bol ? this.$route.query.bol : false
      };
    },
    methods: {
      //转换时间戳
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + ',';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + ',';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D;
      },
      // 获取商品优惠券
      getGoodList() {
        let params = {
          goodsid: this.goodsid,
          ymhaohanToken: this.uuid
        };
        getGoodCouponList(params).then(res => {
          for(let item of res.data){
            item.createtime=this.timestampToTime(item.createtime);
            item.coupontime=this.timestampToTime(item.coupontime);
          }
          this.getGoodCouponList = res.data;
        });
      },
      // 领取优惠券
      getcoupon(index) {
        let getgoodsid = "";
        getgoodsid = this.getGoodCouponList[index].couponid;
        let params = {
          couponId: getgoodsid,
          ymhaohanToken: this.uuid
        };
        receiveCoupon(params).then(res => {
          if (res.message == "请求错误:用户未登录") {
            this.show5 = true;
          } else if (res.code == "0") {
            this.$toast.success("领取成功");
          } else if (res.message == "已领取过该优惠券") {
            this.$toast("已领取过该优惠券");
          }
        });
      },
      //选择尺寸方法
      clickSize(items, index) {
        this.issize = -1;
        this.iscolor = index;
        this.onpingming=items;
        if(JSON.stringify(this.guige)!='{}'){
          let pingmingArr = this.pingmingclick.filter(item=>{
            return item.propValue==items.propValue;
          })
          let Arr=[]
          this.guigeclick.filter(item=>{
            for (let i = 0; i <pingmingArr.length ; i++) {
              if(pingmingArr[i].goodsPriceId==item.goodsPriceId){
                Arr.push(item)
              };
            }
          })
          this.guige.propValue=Arr;
        }
        let goodsprice= this.goodsPrices.filter(item=>{
          return items.goodsPriceId==item.goodsPriceId;
        })
        this.tanprice = goodsprice[0].price;
        this.taninventory = goodsprice[0].stock;
        this.goodsPriceId = goodsprice[0].goodsPriceId;
        this.selec_pic = goodsprice[0].mediaIdDatu;
      },
      clickcolor(items, index) {
        this.issize = index;
        this.onguige=items;
        let goodsprice= this.goodsPrices.filter(item=>{
           return this.onguige.goodsPriceId==item.goodsPriceId;
         })
         this.tanprice = goodsprice[0].price;
         this.taninventory = goodsprice[0].stock;
         this.goodsPriceId = goodsprice[0].goodsPriceId;
         this.selec_pic = goodsprice[0].mediaIdDatu;
         this.ifselectguige=true;
      },
      // 分享成功回调
      doShareDone() {
        console.log("分享成功");
      },
      doShareCancel() {
        console.log("取消了分享");
      },
      test() {
        this.makeOrder("test")
          .then(res => {
            this.pay();
          })
          .catch(error => {
            console.log(error);
          });
      },
      goreturn(){
        if(this.$route.query.classifyindex){
          this.$router.push({path:'/classify',query:{shows:this.$route.query.classifyindex}})
        }else{
          this.$router.back(-1)
        }
      },
      onChange(index) {
        this.current = index;
      },
      // 预览图片
      swiperImgClick(index) {
        ImagePreview({
          images: this.imgArraypreview,
          startPosition: index
        });
      },
      // 加载预览图片
      picmore() {
        for (var i = 0; i < this.imgArray.length; i++) {
          this.imgArraypreview.push(this.myhttp + this.imgArray[i].mediaId);
        }
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
      // 分享尾
      gods() {},
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
      isActive(event) {
      },
      // 加入购物车
      vantToast() {
        if(!localStorage.getItem('uuid')){
          this.show5 = true;
          return
        }
        if(!this.ifselectguige){
          Toast('请选择完属性后加入购物车')
          return;
        }
        this.isgouwuche = 1;
        let params = {
          goodsId: this.goodsid,
          goodsPriceId: this.goodsPriceId,
          cnt: this.value1,
          isService: 0,
          isgouwuche: this.isgouwuche,
          ymhaohanToken: this.uuid,
          extra: this.extra,
          years: this.years
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
      // 立即购买
      purchase() {
        if(!this.ifselectguige){
           Toast('请选择完属性后购买商品')
          return;
        }
        this.isgouwuche = 0;
        let params = {
          goodsId: this.goodsid,
          goodsPriceId: this.goodsPriceId,
          cnt: this.value1,
          isService: 0,
          isgouwuche: this.isgouwuche,
          ymhaohanToken: this.uuid,
          extra: this.extra,
          years: this.years
        };
        createGoodsObject(params).then(res => {
          if (res.err == "该类型的库存不够，请选择其他类型的礼品！") {
            this.$toast("该商品的库存不够");
            return;
          }
          if (res.flag == 0) {
            this.show5 = true;
            return;
          } else if (res.flag == 2) {
            this.$toast("该商品的库存不够");
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
            localStorage.setItem("choosepro", JSON.stringify(res.data));
            this.$router.push("/Payment");
          });
        });
      },

      indRebate(index) {
        if (index == 0) {
          this.years = 5;
        } else if (index == 1) {
          this.years = 4;
        } else {
          this.years = 3;
        }
        this.showss = index;
      },
      // 重定向登陆
      gologin() {
        this.$router.push({ path: "/login" });
      },
      //数组去重
       uniq(array){
    var temp = [];
    var index = [];
    var l = array.length;
    for(var i = 0; i < l; i++) {
      for(var j = i + 1; j < l; j++){
        if (array[i].propValue === array[j].propValue){
          i++;
          j = i;
        }
      }
      temp.push(array[i]);
      index.push(i);
    }
    return temp;
  },
      // 详情数据渲染
      particulars(uuid) {
        let params = {
          goodsId: this.goodsid,
          ymhaohanToken: this.uuid
        };
        detail(params).then(res => {
          let params1 = {
            goodsId: res.goods.goodsId,
            productClassId:res.goods.productClassId1,
            ymhaohanToken: this.uuid
          }
          getdetailmsg(params1).then(
            res=>{
              if(res.prop.length<1){
                this.showSize=false;
                return;
              }else{
                if(res.prop[0].propValue.length==1&&res.prop[1].propValue.length==1){
                  this.ifselectguige=true;
                }
                this.showSize=true;
                this.pingming=res.prop[0];
                this.pingmingclick=this.pingming.propValue;
                this.pingming.propValue= this.uniq(this.pingming.propValue);
                if(res.prop[1]!=undefined){
                  this.guige=res.prop[1];
                  this.guigeclick=this.guige.propValue;
                  this.guige.propValue =this.uniq(this.guige.propValue);
                }
              }
            }
          )
          this.information = res;
          this.extra = res.goods.extra;
          if (this.extra == 1) {
            this.years = 5;
          }
          this.tanprice = this.information.goods.goodsPrices[0].price;
          this.taninventory = this.information.goods.goodsPrices[0].stock;
          // 判断是否收藏
          if (
            res.goods.goodsCollect == null ||
            res.goods.goodsCollect.length == 0
          ) {
            this.iscollect = false;
          } else {
            this.iscollect = true;
            this.target = res.goods.goodsCollect[0].target;
          }
          this.goodscontent = res;
          this.price = this.goodscontent.goods.goodsPrices[0].price;
          this.oldprice = this.goodscontent.goods.goodsPrices[0].oldprice;
          // 赋值价格id
          this.goodsPriceId = res.goods.goodsPrices[0].goodsPriceId;
          // 给轮播图数组赋值
          this.imgArray = res.goods.goodsMedias;
          this.imgArraylen = this.imgArray.length;
          this.goodsPrices = res.goods.goodsPrices;
          this.defaultpic = res.goods.goodsPrices[0].mediaIdDatu;
          this.picmore();
          this.isco();
          // 赋值评论
          this.Comments = res.page.mList[0];
          if (this.Comments == undefined) {
            this.evalshow = false;
          }else{
            this.value=this.Comments.fenShu;
          }
          for (let item of this.goodsPrices) {
            if (item.goodsPriceProp.length == 0) {
              return;
            } else {
              if(item.goodsPriceProp[1]){
                this.arr.add(item.goodsPriceProp[1].propValue);
              }
            }
          }
          this.arr = Array.from(this.arr);
          this.arr_len = this.arr.length;
        });
      },
      // 跳转评论列表
      alllook() {
        this.$router.push({
          name: "Evaluate",
          params: { comonid: this.goodsid }
        });
      },
      // 改变收藏按钮颜色
      isco() {
        var collorcolor = document.getElementsByClassName(
          "van-goods-action-mini-btn__icon"
        );
        if (this.iscollect == true) {
          collorcolor[0].setAttribute("id", "isactive");
        } else if (this.iscollect == false) {
          collorcolor[0].removeAttribute("id");
        }
      }
    },
    created() {},
    mounted() {
      if(this.bol){
        this.show2 = this.bol
      }
      this.goodsid = this.$route.params && this.$route.params.id;
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
      this.particulars(this.uuid);
      // 获取优惠券列表
      this.getGoodList();
      let params = {
        ymhaohanToken: this.uuid
      };
      checklogin(params).then(res => {
        console.log(res.flag);
        if (res.flag === "1") {
          if (this.uuid === null || this.uuid === "") {
            Toast("登录后显示更多！");
            this.$router.push("/login");
          } else if (this.uuid !== null) {
            this.log = 1;
          }
        } else if (res.flag === "0") {
          Toast("登录后显示更多！");
          this.$router.push("/login");
        }
      });
    }
  };
</script>
<style src='../../assets/css/lw_shop.css'></style>
<style src='../../assets/css/login.css'></style>
<style scoped>
  .particulars {
    background-color: #f5f5f5;
    margin-bottom: 88px;
  }
  .left_return {
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
  .swiper {
    position: relative;
  }
  .custom-indicator {
    position: absolute;
    right: 37px;
    bottom: 23px;
    z-index: 9;
    background-color: #000000;
    border-radius: 17px;
    background: rgba(000, 000, 000, 0.4);
    border-radius: 17px;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    padding: 0 5px 0 5px;
    color: #f5f5f5;
  }
  .swiper img {
    width: 750px;
    height: 750px;
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
  .bo_big img {
    width: 50px;
  }
  .body .title {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    padding: 30px;
    padding-top: 10px;
  }
  .body .introduce {
    font-family: HiraginoSansGB-W3;
    font-size: 22px;
    padding-left: 30px;
    color: #fe48bf;
    padding-bottom: 30px;
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
  .bo_tow {
    background-color: #fff;
    margin-top: 20px;
  }
  .bo_tow .top {
    display: flex;
    padding-top: 20px;
    padding-left: 30px;
  }
  .bo_tow .top .lef {
    padding: 0 20px 0 20px;
    height: 30px;
    line-height: 30px;
    background-color: #fe48bf;
    border-radius: 5px;
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    color: #ffffff;
  }
  .bo_tow .top .righ {
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    padding-left: 15px;
    color: #333333;
  }
  .bo_tow .midd {
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    padding-left: 30px;
    padding-top: 10px;
    padding-right: 30px;
    color: #fe48bf;
  }
  .bo_tow .butt {
    margin-top: 18px;
    position: relative;
    background-color: #ffffff;
    display: flex;
  }
  .bo_tow .butt .title {
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #999999;
  }
  .bo_tow .butt ul {
    display: flex;
    margin-top: 20px;
    flex-wrap: wrap;
    margin-right: 10px;
    margin-left: 10px;
    justify-content: space-between;
  }
  .rebate_shop {
    position: absolute;
    width: 70px;
    height: 38px;
    top: 40px !important;
    transform: translateY(-50%);
    z-index: 1;
    left: 24px;
  }
  .rebate_shop img {
    height: 100%;
    width: 100%;
  }
  .bo_tow .butt li {
    margin-top: 10px;
    width: 339px;
    height: 120px;
    background-color: #f5f5f5;
    border-radius: 5px;
    box-sizing: border-box;
    text-align: center;
  }
  .bo_tow .butt li .tops {
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
  }
  .bo_tow .butt li .butts {
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
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
  .demand .de_min {
    height: 78px;
    padding-left: 20px;
    background-color: #ffffff;
    line-height: 78px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    position: relative;
    color: #333333;
  }
  .demand .de_min .icon {
    font-size: 25px;
    position: absolute;
    right: 30px;
    top: 25px;
  }
  .username {
    display: flex;
  }
  .username .le {
    display: flex;
  }
  .username .le .pic {
    height: 48px;
    width: 48px;
    overflow: hidden;
    border-radius: 50%;
  }
  .username .le .pic img {
    height: 100%;
    width: 100%;
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
  .content {
    font-size: 28px;
    color: #5b5b5b;
  }
  .time_big {
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    color: #5b5b5b;
    font-size: 20px;
  }
  .time_big .time {
    margin-right: 10px;
  }
  .eval_big .pics {
    margin-top: 10px;
    display: flex;
  }
  .eval_big .pics li {
    width: 168px;
    height: 150px;
    overflow: hidden;
  }
  .eval_big .pics li img {
    height: 100%;
    height: 100%;
  }
  .all_look {
    font-family: HiraginoSansGB-W3;
    font-size: 26px;
    margin: 0 auto;
    color: #5784fe;
    width: 210px;
    height: 48px;
    line-height: 48px;
    border-radius: 24px;
    border: solid 1px #5784fe;
    margin-top: 50px;
    text-align: center;
    margin-bottom: 30px;
  }
  .commodity_details {
    margin-top: 20px;
    background-color: #fff;
    padding: 30px;
  }
  .commodity_details .title {
    font-family: HiraginoSansGB-W3;
    margin-bottom: 30px;
    font-size: 28px;
    color: #333333;
  }
  .buttlast {
    height: 88px;
    z-index: 2;
    line-height: 88px;
  }
  .buttlast_small {
    height: 88px;
    line-height: 50px;
  }
  .popup_right {
    position: fixed;
    top: 265px;
    right: 24px;
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
    margin: 0 !important;
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
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
  }
  .Choose_size .top .pic {
    padding-right: 8px;
    width: 180px;
    height: 180px;
    overflow: hidden;
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

  .Choose_size .top .inventory,
  .Choose_size .top .hint {
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #333333;
  }
  .numbers {
    margin-bottom: 200px;
    display: flex;
    justify-content: space-between;
  }
  .numbers .title {
    padding-left: 30px;
    padding-top: 16px;
    font-size: 28px;
  }
  .buttons {
    display: flex;
  }
  .buttons .left div,
  .buttons .right div {
    text-align: center;
    width: 100%;
    height: 88px;
    line-height: 88px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    border: none;
    color: #ffffff;
  }
  .buttons .left div {
    background: #89a9fe;
  }
  .buttons .right div {
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
    left: 230px;
    top: 20px;
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
  .Product_Parameter .but {
    height: 98px;
    width: 100%;
    background-color: #89a9fe;
    line-height: 98px;
    text-align: center;
    font-size: 32px;
    border: none;

    color: #ffffff;
  }
  .Rebateli {
    border: solid 2px #5784fe;
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
    height: 190px;
    margin-bottom: 30px;
    display: flex;
    background: url("../../assets/img/Voucherbackground.jpg");
    background-size: 100% 100%;
  }
  .coupon ul {
    margin: 30px 24px 137px 24px;
  }
  .coupon ul .C-msg{
    width: 70%;
    padding-left: 20px;
    padding-top: 20px;
    box-sizing: border-box;
    color: #ff3d00;
    font-size: 24px;
  }
  .coupon ul .C-msg p{
     margin: 5px 0!important;
  }
  .coupon ul .C-msg .C-money{
     font-size: 30px;
  }
  .coupon ul .C-msg .C-money span{
     font-size:  60px;
     margin: 0 5px;
  }
  .coupon ul .C-play{
    width: 30%;
    font-size: 30px;
    line-height: 190px;
    text-align: center;
    color: #ff3d00;
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
  .discount_coupon {
    margin-right: 20px;
    margin-bottom: 10px;
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
  .iscollect {
    color: #5784fe;
  }
  .color_more {
    color: #89a9fe;
    font-size: 28px;
    padding-left: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  /* 颜色尺寸选择 */
  .colu_big {
    display: flex;
    flex-wrap: wrap;
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
  .colu_b {
    margin-bottom: 20px;
  }
  .coloractive {
    background-color: #ffcd42 !important;
    color: #fff;
  }
  .size_but {
    margin-top: 20px;
  }
  .hint_goods {
    color: #89a9fe;
    font-size: 20px;
    padding-left: 30px;
    margin-bottom: 30px;
  }
</style>
<style>
  #particulars #isactive {
    color: #89a9fe !important;
  }
  #particulars .van-stepper {
    margin-right: 30px !important;
  }
  #particulars .van-ut {
    font-size: 32px;
    border: none;
    flex: 1;
  }
  .van-icon-success:before {
    font-size: 100px !important;
  }
  #particulars . #particulars .van-cell__right-icon {
    text-indent: 0 !important;
    font-size: 30px !important;
    color: #000;
  }
  /* 步进器 */
  #particulars .van-stepper__minus {
    width: 87px;
    height: 56px;
    border-radius: 10px 0px 0px 10px;
    border: solid 1px #e7e7e7;
  }
  #particulars .van-stepper__minus::before {
    width: 20px !important;
    background-color: #000 !important;
    height: 2px !important;
  }
  #particulars .van-stepper__plus {
    width: 87px;
    height: 56px;
    border-radius: 0px 10px 10px 0px;
    border: solid 1px #e7e7e7;
  }
  #particulars .van-stepper__plus::before {
    width: 20px !important;
    height: 2px !important;
    background-color: #000 !important;
  }
  #particulars .van-stepper__plus::after {
    height: 20px !important;
    width: 2px !important;
    background-color: #000 !important;
  }
  #particulars .van-stepper__input {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    width: 100px;
    height: 56px;
  }
  #particulars .van-cell {
    border: none !important;
  }

  #particulars .van-cell {
    font-size: 26px;
    text-indent: 106px !important;
    height: 98px;
    line-height: 78px;
  }
  #particulars .van-cell__title > span {
    line-height: 82.5px !important;
  }
  #particulars .rebate_shop {
    top: 51px !important;
  }
  #particulars #Particulars-img img{
    width: 100% !important;
    height: auto !important;
  }
</style>
