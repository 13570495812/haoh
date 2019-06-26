<template>
  <div class="Personal_megfix">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push({name:'Personal',params:{index:'4'}})"></van-icon>
      </div>
      <div class="page-name">
        <span>{{page_name}}</span>
      </div>
      <div class="more">
        <!--<van-tag round type="danger">90</van-tag>
        <img src="@/assets/img/more2.png"/>-->
      </div>
    </div>
    <div class="u-head">
      <div>
        <!--<img src="@/assets/img/user-header4.png"/>-->
        <!--<UploadImg></UploadImg>-->
        <van-uploader :after-read="onRead">         <!--上传头像-->
          <!--<van-icon name="photograph" />-->
          <img class="head-img" :src="img_url===''?def_url:img_url"/>
        </van-uploader>
        <span>点击修改头像</span>
      </div>
    </div>
    <div class="fix_msg">
      <table class="fix_tab">
        <tr>
          <td>账号</td>
          <td>{{username}}</td>
        </tr>
        <tr>
          <td>昵称</td>
          <td><input class="nicname" v-model="user.realName" @blur="msgfix('n')"/></td>
        </tr>
        <tr>
          <td>性别</td>
          <td>
            <van-radio-group v-model="radio" @change="msgfix('s')">
              <van-radio name="1"><span class="male">女</span></van-radio>
              <van-radio name="2"><span class="female">男</span></van-radio>
            </van-radio-group>
          </td>
        </tr>
        <tr>
          <td>出生日期</td>
          <td>
            <!--<input class="choice-date" type="date" v-model="datevalue" :placeholder="datevalue"/>-->
            <input class="choice-date" v-model="user.date" :placeholder="datevalue" readonly="readonly" @click="c_date"/>
          </td>
        </tr>
        <tr>
          <td>收货地址</td>
          <td><span class="u-address">默认-{{u_address}}</span></td>
        </tr>
      </table>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import {updateMember} from '@/api/index.js'
  import {uploadFile} from '@/api/index.js'
  import {myAddr} from '@/api/index.js'
  import moment from "moment"
  import UploadImg from './Upload_img';
  import Vue from 'vue';
  import { Tag } from 'vant';
  import { RadioGroup, Radio } from 'vant';
  import { DatetimePicker } from 'vant';
  import { Popup } from 'vant';
  import {member} from "@/api/index.js";
  import { Toast } from 'vant';
  import { Uploader } from 'vant';

  Vue.use(Uploader);
  Vue.use(Toast);
  Vue.use(Popup);
  Vue.use(DatetimePicker);
  Vue.use(RadioGroup);
  Vue.use(Radio);
  Vue.use(Tag);
  export default {
    name: "Personal_megfix",
    data() {
      return {
        username:"",
        page_name: '个人资料',
        userInfoId: "",
        u_address: "",
        radio: "",
        show: false,
        minDate: new Date(1900,1,1),
        currentDate: new Date(), /*choice date*/
        datevalue: null,
        user: {
          header: "",
          account: "",
          realName: "",        //昵称
          sex: "",
          date: "",
        },
        img_url:"",
        img_type:"",
        def_url:require("@/assets/img/snipaste_20181121_094915.png")
      }
    },
    /*mounted(){
      let vm = this;
      setInterval(function(){
        vm.time = vm.getCurrentDateTime();
      },1000);
    },*/
    mounted() {
      let isUInf = JSON.parse(localStorage.getItem("uInf"));
      console.log(isUInf);
      this.username = isUInf.username;
      let uuid = localStorage.getItem("uuid");
      let UII = isUInf.userInfoId;
      let params = {userInfoId: UII, ymhaohanToken: uuid};
      console.log(params);
      member(params).then(res => {
        console.log(res);
        localStorage.setItem("userInfoId",res.xunlibi.userInfoId)
        this.user.header = res.userinfodetails.header;
        /*this.user.account = res.account;*/
        this.user.realName = res.memberinfo.realName;
        this.user.sex = res.memberinfo.sex;
        this.radio = parseFloat(this.user.sex)+1;
        this.radio = this.radio.toString();
        this.user.date = moment(res.memberinfo.birthDay).format('YYYY-MM-DD');
      });
      myAddr(params).then(res=> {                                             //获取默认地址
        /*let index = res.data.map(item => item.isService).indexOf('0');*/
        let index = res.data.findIndex(item => item.isService === '1');
        if(index===null){
          this.u_address = "无";
        }
        else if(index!==null){
          this.u_address = res.data[index].provinceId+res.data[index].cityId+res.data[index].districtId+res.data[index].address;
        }
        console.log(index);
      });
      console.log(uuid);
      console.log(this.user.sex);
      console.log(this.user.realName);
      console.log(this.u_address);
      console.log(this.user);
    },
    methods: {
      c_date() {
        this.show = true;
      },
      onCancel() {
        this.show = false;
      },
      onConfirm(value) {
        this.show = false;
        // let val;
        // let date = document.getElementsByTagName("van-datetime-picker");
        // val = toString(date);
        console.log(value);
        this.datevalue = moment(value).format('YYYY-MM-DD');
        this.user.date = this.datevalue;
        this.msgfix('t');
      },
      /*getCurrentDateTime(){       //时间转换
        return moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }*/
      msgfix(e) {
        let uuid = localStorage.getItem("uuid");
        if (e === "s") {
          let c_sex = this.radio - 1;
          let params = {sex: c_sex, ymhaohanToken: uuid};
          console.log("事件" + e + "/性别" + params.sex);
          updateMember(params).then(res => {
            console.log(res.code + "/" + res.flag);
            if (res.code === 0 && res.flag === "1") {
              /*Toast('性别修改成功！');*/
            }
            else {
              Toast('修改失败，请重试！');
            }
          });
          console.log("sssssssss");
        }
        else if (e === "n") {
          if (this.user.realName !== null) {
            let c_name = this.user.realName;
            let params = {realName: c_name, ymhaohanToken: uuid};
            updateMember(params).then(res => {
              console.log(res.code + "/" + res.flag);
              if (res.code === 0 && res.flag === "1") {
                /*Toast('昵称修改成功！');*/
              }
              else {
                Toast('修改失败，请重试！');
              }
            });
          }
          else {
            console.log("eeeeeeeee");
          }
          console.log("nnnnnnnnn");
        }
        else if (e === "t") {
          if (this.user.date !== null) {
            let c_date = this.datevalue;
            let params = {birthDay: c_date, ymhaohanToken: uuid};
            updateMember(params).then(res => {
              console.log(res.code + "/" + res.flag);
              if (res.code === 0 && res.flag === "1") {
                /*Toast('生日修改成功！');*/
              }
              else {
                Toast('修改失败，请重试！');
              }
            });
          }
          else {
            console.log("eeeeeeeee");
          }
          console.log("ttttttttt");
        }
      },
      onRead(file) {                    //上传头像
        this.img_url = file.content;
        this.img_type=file.file.type.split('/')[1];
        console.log(file);
        let uuid = localStorage.getItem("uuid");
        let params = {ymhaohanToken: uuid,base64:this.img_url,fileSubfix:this.img_type};
        uploadFile(params).then(res=>{
          if(res.state===0){
            this.img_url = "http://www.ymhaohan.cn/"+res.fileUrl;
            let params = {ymhaohanToken: uuid,header:this.img_url};
            updateMember(params).then(res => {
              console.log(res.code + "/" + res.flag);
              if (res.code === 0 && res.flag === "1") {
                Toast('头像修改成功！');
              }
              else {
                Toast('修改失败，请重试！');
              }
            });
            console.log(this.img_url);
          }
          else {
            Toast(res.msg);
          }
        })
      }
    },
    components: {
      UploadImg
    },
  }
</script>

<style src="@/assets/css/Date.css"></style>
<style src="@/assets/css/redio_checkbox.css"></style>
<style src="@/assets/css/uploader.css"></style>
<style scoped>
  .Personal_megfix{
    height: 100%;
    background-color: #ffffff;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #ffffff;
  }
  .title>div{
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .more{
    position: relative;
    text-align: right;
  }
  .van-tag--round{
    font-size: 16px;
    position: absolute;
    transform: translateX(50%);
    top: 20px;
    right: 15px;
  }
  .u-head{
    border-bottom: 20px solid #e7e7e7;
  }
  .u-head>div{
    width: 180px;
    margin: 100px auto 50px auto;
    text-align: center;
  }
  .head-img{
    width: 180px;
    height: 180px;
    border-radius: 90px;
  }
  .u-head>div>span{
    display: inline-block;
    font-size: 26px;
    color: #999999;
    margin-top: 25px;
  }
  .fix_msg{
    padding-left: 3%;
  }
  .fix_tab{
    width: 100%;
  }
  .fix_tab>tr{
    display: flex;
    border-bottom: 1px solid #e7e7e7;
  }
  .fix_tab td{
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    color: #333333;
  }
  .fix_tab>tr>td:nth-of-type(1){
    flex: 2;
  }
  .fix_tab>tr>td:nth-of-type(2){
    flex: 5;
  }
  .u-address{
    display: block;
    width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .van-radio-group>div{                  /*不可控*/
    float: left;
    margin-right: 100px;
    margin-top: -13px;
  }
  .van-radio-group:after{
    display: block;
    content: '';
    clear: both;
  }
  .male,.female{                         /*不可控*/
    position: relative;
    top: 10px;
  }
  .choice-date, .nicname{
    border: none;
    height: 90%;
  }
  .myInvitation{
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    margin-left: 0.3rem;
    border-bottom: 1px solid #eee;
  }
</style>
