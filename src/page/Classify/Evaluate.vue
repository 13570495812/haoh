<template>
  <div
    class="evaluate"
    id="evaluate"
  >
    <!-- 三点 -->
    <div class="takl_more">
      <van-popup
        :overlay='true'
        class="popup_right"
        v-model="show3"
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
            >4</van-tag>
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
                src="../../assets/img/banner.png"
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
        <div class="colour">
          <div class="title">
            颜色
          </div>
          <div class="colu_big">
            <div
              class="colu_b"
              v-for="item,index of arr"
            >
              <div
                :class="iscolor==index?'coloractive':''"
                class="min_select"
                @click="clickSize(item,index)"
              >
                {{item}}
              </div>
            </div>
          </div>
          <div class="title size_but">
            尺寸
          </div>
          <div
            class="colu_big"
            v-if='showSize'
          >
            <div
              class="colu_b"
              v-for="item,index of colorArr"
            >
              <div
                :class="issize==index?'coloractive':''"
                class="min_select"
                @click="clickcolor(item,index)"
              >
                {{item.goodsPriceProp[0].propValue}}
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
            <div type="primary">立即购买</div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class="head">
      <div
        class="left"
        @click="$router.back(-1)"
      >
        <van-icon name="arrow-left" />
      </div>
      商品评价
      <div class="right">
        <img
          @click="show3=true"
          src="../../assets/img/dian.png"
          alt=""
        >
      </div>
    </div>
    <div class="comment">
      <ul>
        <li
          @click="all"
          :class="cllors == showsone?'active':''"
        >
          全部{{allp.length}}
        </li>
        <li
          @click="reputationgood"
          :class="cllors == showstow?'active':''"
        >
          好评{{good_reputation.length}}
        </li>
        <li
          @click="midds"
          :class="cllors == showsthree?'active':''"
        >
          中评{{difference.length}}
        </li>
        <li
          @click="negativessss"
          :class="cllors == showsfore?'active':''"
        >
          差评{{negative.length}}
        </li>
      </ul>
    </div>

    <div
      class="eval_big"
      v-for="(item, index) in Comments"
      :key='index'
    >
      <div class="username">
        <div class="le">
          <div class="pic">
            <img
              :src="item.header"
              alt=""
            >
          </div>
          <div class="user_na">
            {{item.userName}}
          </div>
        </div>
        <div class="rig">
          <van-rate
            disabled-color="#fe48bf"
            v-model="item.fenShu"
            :size="25"
            disabled
          />
        </div>
      </div>
      <div class="time_big">
        <div class="time">
          {{item.updateTimeStr}}</div>
        <div class="style">
          {{item.goodsPriceName}}
        </div>
      </div>
      <div class="content">
        {{item.content}}
      </div>
      <ul class="pics">
        <li :class="item.pictures==null||item.pictures==''?'picnone':''" v-for="items in item.pictures.split(',')" style="margin-left: 10px;">
          <img
            :src="myhttp+items"
            @click="ClickImg(myhttp+items,item)"
            alt=""
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from "vue";
  import {
    getpinglunlist,
    addCollect,
    deleteCollect1,
    createGoodsObject,
    detail
  } from "../../api/index.js";
  import { promises } from "fs";
  // 轻提示
  import { Toast } from "vant";
  import { ImagePreview } from 'vant';
  Vue.use(Toast);
  Vue.use(ImagePreview);
  export default {
    data() {
      return {
        // 商品颜色尺码
        goodsPrices: [],
        goods_ti: [],
        goods_mint: [],
        showSize: false,
        // 弹出框价格和库存
        tanprice: 0,
        taninventory: 0,
        // 颜色是否选中
        iscolor: -1,
        issize: -1,
        myhttp: "http://www.ymhaohan.cn/",
        cllors: 0,
        showsone: 0,
        showstow: 1,
        mPageNow: 1,
        mPageSize: 10,
        showsthree: 2,
        showsfore: 3,
        value: 3,
        dotssss: 1,
        dotssss: 1,
        pagesize: 10,
        show2: false,
        collect: 0,
        target: "",
        show3: false,
        huan_bgc: 0,
        nums: 1,
        value1: 1,
        huan_bgctow: 0,
        information: "",
        arr: new Set(),
        // 全部评论
        allp: [],
        // 好评
        good_reputation: [],
        // 中评
        difference: [],
        // 差评
        negative: [],
        lis: [{ ind: "全部(233)" }, { ind: "差评" }, { ind: "好评" }],
        items: [
          { text: "白色长款" },
          { text: "白色长款" },
          { text: "白色长款" },
          { text: "白色长款" }
        ],
        itemstow: [
          { text: "M码" },
          { text: "M码" },
          { text: "M码" },
          { text: "M码" }
        ],
        // 商品id
        goodsid: "",
        // 空数组评论
        Comments: [],
        shows: 1,
        uuid: "",
        // 判断是否收藏
        iscollect: false
        // // 好评
        // goods: [],
        // // zhong评
        // midds: [],
        // // cha评
        // differences: []
      };
    },
    methods: {
      //选择尺寸方法
      clickSize(items, index) {
        this.issize = -1;
        console.log(this.issize);
        let array = this.goodsPrices.filter(
          item => item.goodsPriceProp[1].propValue == items
        );
        this.colorArr = array;
        this.showSize = true;
        // console.log(array);
        this.iscolor = index;
      },
      clickcolor(items, index) {
        this.issize = index;
        this.tanprice = items.price;
        this.taninventory = items.stock;
        this.goodsPriceId = items.goodsPriceId;
      },
      ind(index) {
        this.shows = index;
      },
      // 详情数据渲染
      particulars(uuid) {
        let params = {
          goodsId: this.goodsid,
          ymhaohanToken: this.uuid
        };
        detail(params).then(res => {
          this.information = res;
          console.log(this.information);
          this.tanprice = this.information.goods.goodsPrices[0].price;
          console.log(this.tanprice);
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
            console.log(true);
          }
          this.isco();
          this.goodscontent = res;
          this.price = this.goodscontent.goods.goodsPrices[0].price;
          this.oldprice = this.goodscontent.goods.goodsPrices[0].oldprice;
          // 给轮播图数组赋值
          this.imgArray = res.goods.goodsMedias;
          this.imgArraylen = this.imgArray.length;
          this.goodsPrices = res.goods.goodsPrices;
          // console.log(this.goods_ti)

          for (let item of this.goodsPrices) {
            this.arr.add(item.goodsPriceProp[1].propValue);
          }
          this.arr = Array.from(this.arr);
          console.log(this.arr);
          for (let i = 0; i < this.goodsPrices.length; i++) {}
        });
      },
      // 收藏功能
      oncollect() {
        if (this.iscollect == false) {
          let params = {
            type: 0,
            target: this.goodsid,
            ymhaohanToken: this.uuid
          };
          console.log(params);
          addCollect(params).then(res => {
            console.log(res);
            if (res.msg == "账号未登录！") {
              this.show5 = true;
              return;
            } else {
              console.log(234);
              if (this.collect == 0) {
                this.collect = 1;
                this.$toast.success("收藏成功");
                this.iscollect = true;
                this.isco();
                console.log(this.information);
                this.target = this.information.goods.goodsCollect[0].target;
              }
            }
          });
        } else if (this.iscollect == true) {
          let params = {
            target: this.target,
            ymhaohanToken: this.uuid
          };
          deleteCollect1(params).then(res => {
            console.log(res);
            if (res.msg == "删除成功！") {
              this.collect = 0;
              this.$toast.success("删除成功");
              this.iscollect = false;
              this.isco();
            }
          });
        }
      },
      isActive(index) {
        this.huan_bgc = index;
      },
      isActivetow(index) {
        this.huan_bgctow = index;
      },
      // 加入购物车
      vantToast() {
        this.isgouwuche = 1;
        console.log(this.goodsid);
        let params = {
          goodsId: this.goodsid,
          goodsPriceId: this.goodsPriceId,
          cnt: this.value1,
          isService: 0,
          isgouwuche: this.isgouwuche,
          ymhaohanToken: this.uuid
        };
        console.log(params);
        createGoodsObject(params).then(res => {
          if (res.flag == 0) {
            this.show5 = true;
            return;
          } else if (res.flag == 2) {
            this.$toast("请选择商品属性");
          } else if (res.flag == 1) {
            // 轻提示
            this.$toast.success("已加入购物车");
            this.show2 = false;
          }
          console.log(res);
        });
      },
      // 改变收藏按钮颜色
      isco() {
        var collorcolor = document.getElementsByClassName(
          "van-goods-action-mini-btn__icon"
        );
        // console.log(collorcolor);
        if (this.iscollect == true) {
          collorcolor[0].setAttribute("id", "isactive");
        } else if (this.iscollect == false) {
          collorcolor[0].removeAttribute("id");
        }
      },
      // 初次渲染
      drawingreviewone() {
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.pagesize,
          goodsId: this.goodsid,
          ymhaohanToken: this.uuid
        };
        return new Promise((resolve, reject) => {
          getpinglunlist(params).then(res => {
            this.Comments = res.page.mList;
            this.allp = res.page.mList;
            console.log(res);
            resolve();
          });
        });
      },
      // 渲染评论
      drawingreview() {
        let params = {
          mPageNow: this.mPageNow,
          mPageSize: this.pagesize,
          goodsId: this.goodsid,
          ymhaohanToken: this.uuid
        };
        getpinglunlist(params).then(res => {});
      },
      // 全部
      all() {
        this.cllors = 0;
        this.drawingreviewone();
      },
      // 好评
      reputationgood() {
        let arr = [];
        for (var i = 0; i < this.allp.length; i++) {
          if (this.allp[i].fenShu == 5) {
            arr.push(this.allp[i]);
          }
        }
        this.Comments = arr;
        this.drawingreview();
        this.cllors = 1;
      },
      reputationgoods() {
        for (var i = 0; i < this.allp.length; i++) {
          if (this.allp[i].fenShu == 5) {
            this.good_reputation.push(this.allp[i]);
          }
        }
      },
      ClickImg(imgurl,item){
        let imgs = item.pictures.split(',');
        for (let i = 0; i <imgs.length ; i++) {
          imgs[i] = this.myhttp+imgs[i]
        }
        ImagePreview(imgs);
      },
      // 中评
      midds() {
        let arr = [];
        for (var i = 0; i < this.allp.length; i++) {
          if (this.allp[i].fenShu == 3 || this.allp[i].fenShu == 4) {
            arr.push(this.allp[i]);
          }
        }
        this.Comments = arr;
        this.drawingreview();
        this.cllors = 2;
      },
      middss() {
        for (var i = 0; i < this.allp.length; i++) {
          if (this.allp[i].fenShu == 3 || this.allp[i].fenShu == 4) {
            this.difference.push(this.allp[i]);
          }
        }
        console.log(this.difference);
      },
      // 差评
      negativessss() {
        let arr = [];
        for (var i = 0; i < this.allp.length; i++) {
          if (this.allp[i].fenShu <= 2) {
            arr.push(this.allp[i]);
          }
        }
        this.Comments = arr;
        this.drawingreview();
        this.cllors = 3;
      },
      differences() {
        let arr = [];
        console.log(this.allp);
        for (var i = 0; i < this.allp.length; i++) {
          if (this.allp[i].fenShu <= 2) {
            arr.push(this.allp[i]);
            this.negative = arr;
          }
        }
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.goodsid = this.$route.params.comonid;
      this.drawingreviewone().then(res => {
        this.reputationgoods();
        this.middss();
        this.differences();
      });
    },
    mounted() {
      this.particulars();
    }
  };
</script>
<style src='../../assets/css/lw_shop.css'>
</style>

<style scoped>
  .head {
    display: flex;
    justify-content: space-between;
    height: 88px;
    line-height: 88px;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #333333;
    border-bottom: 1px solid #eee;
  }
  .head .left {
    padding-left: 24px;
  }
  .head .right {
    width: 34px;
    height: 9px;
    padding-right: 24px;
  }
  .head .right img {
    width: 100%;
    height: 100%;
  }
  .all_big {
    margin-top: 30px;
    margin-bottom: 20px;
    display: flex;
    margin-left: 20px;
  }
  .comment ul li {
    height: 48px;
    margin-right: 20px;
    line-height: 48px;
    text-align: center;
    background-color: #f5f5f5;
    border-radius: 24px;
    padding-left: 20px;
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #999999;
    padding-right: 20px;
    margin-bottom: 20px;
  }
  .comment ul {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 50px;
    margin-left: 20px;
  }
  .comment ul li {
    display: flex;
  }
  .active {
    background-color: #5784fe !important;
    color: #ffffff !important;
  }
  .eval_big {
    margin-bottom: 60px;
  }
  .eval_big .pics {
    display: flex;
    margin-bottom: 10px;
  }
  .eval_big .pics li {
    width: 168px;
    height: 150px;
    overflow: hidden;
  }
  .eval_big .pics li img {
    width: 100%;
    height: 100%;
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
    height: 48px;
    width: 48px;
  }
  .evaluate {
    height: calc(90% - 24px);
    padding: 0 24px 24px 24px;
    background-color: #fff;
    margin-bottom: 100px;
    overflow: auto;
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
    margin-bottom: 10px;
    color: #5b5b5b;
  }
  .time_big {
    margin-bottom: 10px;
    margin-top: 10px;
    display: flex;
    color: #5b5b5b;
    margin-right: 10px;
    font-size: 20px;
  }
  .time_big .time {
    margin-right: 10px;
  }
  .eval_big .pics li {
    width: 168px;
    height: 150px;
    overflow: hidden;
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
  .van-goods-action {
    height: 88px;
  }
  .van-goods-action-big-btn,
  .van-goods-action-mini-btn {
    height: 88px;
    line-height: 88px;
  }
  .van-goods-action-mini-btn {
    line-height: 50px;
  }
  .join {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #ffffff;
    background-color: #5784fe;
    opacity: 0.7;
    border: none;
  }
  .shop {
    width: 216px;
    opacity: 0.7;
    height: 88px;
    background-color: #832fd7;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    border: none;
    color: #ffffff;
  }
  /* 购物车小圆点 */
  .buttlast .dot {
    width: 12px;
    height: 12px;
    background-color: #d30000;
    border-radius: 50%;
    position: absolute;
    left: 240px;
    top: 20px;
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
  .picnone {
    display: none;
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
  /* 步进器 */
  #evaluate .van-stepper__minus {
    width: 87px;
    height: 56px;
    border-radius: 10px 0px 0px 10px;
    border: solid 1px #e7e7e7;
  }
  #evaluate .van-stepper__minus::before {
    width: 20px !important;
  }
  #evaluate .van-stepper__plus {
    width: 87px;
    height: 56px;
    border-radius: 0px 10px 10px 0px;
    border: solid 1px #999999;
  }
  #evaluate .van-stepper__plus::before {
    width: 20px !important;
  }
  #evaluate .van-stepper__plus::after {
    height: 20px !important;
  }
  #evaluate .van-stepper__input {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    width: 100px;
    height: 56px;
  }
</style>

