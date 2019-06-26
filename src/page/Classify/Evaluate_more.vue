<template>
  <div class="evaluate_more" id="evaluate_more">
    <van-popup class="" v-model="show">
      <div class="popup">
        <div class="big_pro">
          <div class="number">
            10
          </div>
        </div>
      </div>
    </van-popup>
    <div class="head">
      <div class="left">
        <van-icon class="icon" name="arrow-left" @click="$router.go(-1)" />
      </div>
      <div class="midd">
        发表评价
      </div>
      <div class="right" @click="addonread">发布</div>
    </div>
    <div class="segmentation"></div>
    <div class="body clearfix">
      <div class="top">
        <div class="left">
          <img :src="httpUrl+shangpinglist[0].mediaIdDatu" alt="">
        </div>
        <div class="right">
          <div class="min_t">{{shangpinglist[0].goodsName}} </div>
          <!--<div class="min_b">规格: 长款 橙色</div>-->
        </div>
      </div>
      <div class="butt">
        <div class="star">
          描述相符
        </div>
        <div class="startow">
          <van-rate :size='bigsize' v-model="value" color='#fe48bf' />
        </div>
        <div class="starthree">
          {{value>3?'优':value>2?'一般':'差'}}
        </div>
      </div>
      <div class="import">
        <textarea v-model="content" name="" id="" cols="30" rows="10" placeholder="写下你对商品的爱之述语！"></textarea>
      </div>
      <div class="uppic" @click="index=0" style="float: left">
        <div class="thumbnail" >
          <img :src="thumbnail==''?nomore:thumbnail" alt="">
        </div>
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png, image/jpg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
      </div>

      <div class="uppic" @click="index=1" v-if="show1" style="float: left">
        <div class="thumbnail" >
          <img :src="thumbnail1==''?nomore:thumbnail1" alt="">
        </div>
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png, image/jpg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
      </div>

      <div class="uppic" @click="index=2"  v-if="show2" style="float: left">
        <div class="thumbnail" >
          <img :src="thumbnail2==''?nomore:thumbnail2" alt="">
        </div>
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png, image/jpg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
      </div>

      <div class="uppic" @click="index=3" v-if="show3" style="float: left">
        <div class="thumbnail" >
          <img :src="thumbnail3==''?nomore:thumbnail3" alt="">
        </div>
        <van-uploader :after-read="onRead" accept="image/gif, image/jpeg, image/png, image/jpg" multiple>
          <van-icon name="photograph" />
        </van-uploader>
      </div>
    </div>
    <div class="segmentation"></div>
  </div>
</template>
<script>
  import Vue from "vue";
  import { uploadFile, pinglun } from "../../api/index.js";
  import nomo from "../../assets/img/snipaste_20181121_094915.png";
  // 星星
  import { Rate } from "vant";
  Vue.use(Rate);

  // 弹出层
  import { Popup } from "vant";
  Vue.use(Popup);
  // 上传图片
  import { Uploader } from "vant";
  Vue.use(Uploader);
  // 轻提示
  import { Toast } from "vant";
  Vue.use(Toast);

  // 单选
  import { Checkbox, CheckboxGroup } from "vant";
  Vue.use(Checkbox).use(CheckboxGroup);

  export default {
    data() {
      return {
        value: 5,
        show: false,
        value2: 5,
        bigsize: 40,
        checked: true,
        content: "",
        uuid: "",
        picurl: "",
        nomore: nomo,
        thumbnail: "",
        thumbnail1:'',
        thumbnail2:'',
        thumbnail3:'',
        show1:false,
        show2:false,
        show3:false,
        index:0,
        httpUrl:'http://www.ymhaohan.cn/',
        shangpinglist:this.$route.query.shangpinglist,
        iffirst:true
      };
    },
    methods: {
      onRead(file) {
        let imglast = file.file.type.split("/")[1];
        let imgs = file.content;
        if(this.index==0){
          this.thumbnail = imgs;
          this.show1=true;
        }else if(this.index==1){
          this.thumbnail1 = imgs;
          this.show2=true;
        }else if(this.index==2){
          this.thumbnail2 = imgs;
          this.show3=true;
        }else if(this.index==3){
          this.thumbnail3 = imgs;
        }
        let params = {
          base64: imgs,
          fileSubfix: imglast
        };
        uploadFile(params).then(res => {
          if (res.state == "0") {
            this.$toast("上传成功");
          }
          if(!this.iffirst){
            this.picurl += ','+res.fileUrl;
            console.log(this.picurl)
          }else{
            this.iffirst=false;
            this.picurl=res.fileUrl;
          }
        });
      },
      addonread() {
        let params = {
          out_trade_no:this.$route.query.out_trade_no,
          goodsPriceId: this.$route.query.goodsPriceId,
          fenShu: this.value,
          pictures: this.picurl,
          content: this.content,
          goodsId: this.$route.query.goodsId,
          ymhaohanToken: this.uuid
        };
        if (params.content == "") {
          this.$toast("请输入内容");
          return;
        } else {
          console.log(params)
          pinglun(params).then(res => {
            if (res.flag == 1) {
              this.$toast("发布成功");
              this.$router.push({path:'/My_order',query:{index:3}});
            }
          });
        }
      },
      huoquxingxi(){
         // this.
        // shangpingId
      } //获取信息接口
    },
    created() {
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
    }
  };
</script>
<style src='../../assets/css/uppic.css'></style>
<style src='../../assets/css/login.css'></style>
<style scoped>
  .clearfix:after{
    content: '';
    display: block;
    clear: both;
  }
  .evaluate_more {
    background-color: #fff !important;
    height: 100vh;
    width: 100vw;
  }
  .segmentation {
    height: 20px;
    width: 100%;
    background-color: #f5f5f5;
  }
  .evaluate_more .head {
    background-color: #fff;
    justify-content: space-between;
    display: flex;
    height: 88px;
    line-height: 88px;
    text-align: center;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #333333;
  }
  .head .left .icon {
    font-size: 0.34rem;
    margin-left: 24px;
  }
  .head .right {
    font-family: HiraginoSansGB-W3;
    font-size: 30px;
    padding-right: 24px;
    color: #5784fe;
  }
  .body .top {
    display: flex;
  }
  .body {
    margin-top: 20px;
    background-color: #fff;
    padding: 24px;
    padding-bottom: 0;
  }
  .body .left {
    width: 113px;
    height: 113px;
  }
  .body .left img {
    width: 113px;
    height: 113px;
  }

  .body .right {
    width: 500px;
    margin-left: 20px;
  }
  .body .min_t {
    margin-bottom: 10px;
    font-family: HiraginoSansGB-W3;
    font-size: 24px;
    color: #333333;
  }
  .body .min_b {
    font-family: HiraginoSansGB-W3;
    font-size: 20px;
    color: #999999;
  }
  .body .butt {
    border-bottom: 1px solid #eee;
    margin-top: 50px;
    display: flex;
    padding-bottom: 32px;
  }
  .body .butt .star {
    margin-right: 40px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
  }
  .body .butt .starthree {
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    margin-left: 82px;
    color: #333333;
  }
  .import textarea {
    width: 100%;
    height: 200px;
    border: none;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #bbbbbb;
    margin-top: 24px;
  }
  .uppic {
    position: relative;
    margin-left: 10px;
    border-bottom: 1px solid #eee;
  }
  .anonymity {
    justify-content: space-between;
    height: 98px;
    background-color: #fff;
    line-height: 98px;
    display: flex;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #999999;
    padding-left: 30px;
    padding-right: 30px;
  }
  .last_star {
    display: flex;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
    margin-top: 30px;
  }
  .last_star .star {
    margin-right: 40px;
    padding-left: 25px;
  }
  .starthree {
    margin-left: 40px;
    font-family: HiraginoSansGB-W3;
    font-size: 28px;
    color: #333333;
  }
  .big_pro {
    width: 660px;
    position: relative;
    height: 675px;
    background: url("../../assets/img/hbao.png");
  }
  .number {
    background-color: #fc5744;
    font-size: 100px;
    font-weight: 600;
    color: #fff;
    left: 220px;
    line-height: 140px;
    top: 100px;
    height: 120px;
    width: 130px;
    position: absolute;
  }
  .thumbnail {
    height: 100px;
    position: absolute;
    bottom: 0;
    width: 100px;
  }
  .thumbnail img {
    height: 90%;
    width: 100%;
  }
</style>
<style>
  #evaluate_more .van-icon-photograph {
    font-size: 0px !important;
  }
</style>


