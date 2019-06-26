<template>
  <div>
    <div class="title">
      <div class="back" @click="$router.push('/Personal')">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="page-name">
        <span>账单</span>
      </div>
      <div></div>
    </div>
    <div>
      <!--选择类别筛选-->
      <div class="screen">
        <span @click="show_type=true"><div>全部分类</div><div></div></span>
        <span @click="opentimer"><div>月份</div><div></div></span>
      </div>
      <div>
        <div class="yea-mon" style="height:40px;">{{y_m}}</div>
        <div class="record">
          <ul>
            <li class="record-val" v-for="item,index in val">
              <div class="head-img">
                <img :src="iconImg[2]" alt=""/>
              </div>
              <div class="record-det">
                <span>{{ item.explain }}</span>
                <span>{{item.code}}</span>
                <span>{{cartime[index]}}</span>
              </div>
              <div class="record-money">
              <span>{{item.total}}</span>
            </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <van-popup v-model="show_type" position="top" :overlay="false">
      <div class="classification">
        <div>
          <div v-for="item,index in checinfo" class="class-info" size="normal" @click="show_type=false,gettypelookbill(index)">{{item.name}}</div>
        </div>
      </div>
    </van-popup>
    <!--时间组件-->
    <div id="timevue" v-if="timershow">
      <div class="cancle" v-if="timershow2" @click="close">
        <span  class="cancle-i">x</span>
      </div>
      <div id="calendar">
        <div class="month">
          <ul>
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
              <span class="choose-year">{{ currentYear }}</span>
              <span class="choose-month">{{ currentMonth }}月</span>
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
        </div>
        <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:red">六</li>
          <li style="color:red">日</li>
        </ul>
        <ul class="days">
          <li v-for="day in days">
            <!--今天-->
            <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
            <span v-else>
           <!--今天-->
           <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
           <span v-else>{{ day.getDate() }}</span>
           </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { bill } from "@/api/index.js"
  import Vue from 'vue';
  import { Popup } from 'vant';
  import { DatetimePicker } from 'vant';
  import { Button } from 'vant';
  import { Toast } from 'vant';
  Vue.use(Toast);
  Vue.use(Button);
  Vue.use(DatetimePicker);
  Vue.use(Popup);
  export default {
    name: "Bill_list",
    data(){
      return{
        duihuamma: '', // 兑换码
        y_m:"",
        minDate:new Date(2001, 1, 1),
        val:[],
        currentDate: new Date(),
        overlay:"false",
        show_ym: false,
        show_type: false,
        date_val:"0000-00",
        timershow: false,
        timershow2: true,
        checktime: '',
        checktimeYear: '',
        checktimeMonth: '',
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        showclose: true,
        checinfo:[
          {name: '全部分类'},
          {name: '消费'},
          {name: '充值'},
          {name: '牛牛币'}
        ],
       uuid: '',
        checknum: -1,  //选中类别
        userInfoId: '',
        cartime: [],
        iconImg: {
          1: require('../../assets/img/WeChat3.png'),
          2: require('../../assets/img/alipay1.png'),
          3: require('../../assets/img/code.png'),
          4: require('../../assets/img/Rebatetobuy2.png')
        },
        dateday:{year:0,mouth:0}
      }
    },
    methods: {
      getdata(type,year,mouth){
        let params={}
        if(year&&mouth){
          params={
            year:year,
            mouth:mouth,
            ymhaohanToken: this.uuid
          }
        }else{
          if(type==-1){
            params ={
              ymhaohanToken: this.uuid
            }
          }else if(type==4){
            params ={
              payType:type,
              ymhaohanToken: this.uuid
            }
          }else{
            params ={
              type: type,
              ymhaohanToken: this.uuid
            }
          }
        }
        bill(params).then(res=>{
          this.val = res.data
          if(res.message== "暂无任何账单"){
            Toast("还没有账单")
          }else{
            for (let i= 0;i< this.val.length; i++){
              this.cartime.push(format(this.val[i].createTime))
            }
          }
        })
      },
      gettypelookbill(index){
         if(index==0){
           this.getdata(-1)
         }else if(index==1){
           this.getdata(2)
         }else if(index==2){
           this.getdata(1)
         }else if(index==3){
           this.getdata(4)
         }
      },
      opentimer: function(){
        this.show_ym=true;
        this.timershow = true
        this.checktime= localStorage.getItem('timer');
        this.timershow2 = true
      },
      close: function(){
        this.timershow = false
        this.timershow2 = false
        console.log(this.checktimeYear, this.checktimeMonth)
        console.log(this.checknum)
        //全部查询
        if(this.checknum == 0){
          this.val = []
          this.cartime = []
          let params ={
            userId: this.userInfoId,
            ymhaohanToken: this.uuid
          }
          console.log(params)
          bill(params).then(res=>{
            this.val = res.data
            console.log(this.val)

            if(this.val.length > 0){
              for (let i= 0;i< this.val.length; i++){
                this.cartime.push(format(this.val[i].createTime))
              }
            }else{
              Toast("还没有账单")
            }
          })
        }
        // 兑换码
        if(this.checknum == 1){
          this.val = []
          this.cartime = []
          let params ={
            year: this.checktimeYear,
            month: this.checktimeMonth,
            type: this.checknum,
            userId: this.userInfoId,
            ymhaohanToken: this.uuid
          }
          bill(params).then(res=>{
            this.val = res.data
            console.log(this.val)
            if(res.message== "暂无任何账单"){
              Toast("还没有账单")
            }else{
              for (let i= 0;i< this.val.length; i++){
                this.cartime.push(format(this.val[i].createTime))
              }
            }

          })
        }
        // 充值
        if(this.checknum == 2){
          this.val = []
          this.cartime = []
          let params ={
            year: this.checktimeYear,
            month: this.checktimeMonth,
            type: this.checknum,
            userId: this.userInfoId,
            ymhaohanToken: this.uuid
          }
          bill(params).then(res=>{
            this.val = res.data
            if(res.message== "暂无任何账单"){
              Toast("还没有账单")
            }else{
              for (let i= 0;i< this.val.length; i++){
                this.cartime.push(format(this.val[i].createTime))
                console.log(1111,this.cartime)
              }
            }
          })
        }
        // 返利购
        if(this.checknum == 3){
          this.val = []
          this.cartime = []
          let params ={
            year: this.checktimeYear,
            month: this.checktimeMonth,
            type: this.checknum,
            ymhaohanToken: this.uuid
          }
          bill(params).then(res=>{
            this.val = res.data
            if(res.message== "暂无任何账单"){
              Toast("还没有账单")
            }else{
              for (let i= 0;i< this.val.length; i++){
                this.cartime.push(format(this.val[i].createTime))
              }
            }
          })
        }

      },
      initData: function (cur) {
        var date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = date.getDay(); // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
        console.log("today:" + str + "," + this.currentWeek);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          console.log("y:" + d.getDate());
          this.days.push(d);
        }
        for (var i = 1; i <= 35 - this.currentWeek; i++) {
          var d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
      },
      pickPre: function (year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        var d = new Date(this.formatDate(year, month, 1));
        d.setDate(0);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        if(this.currentMonth>=10){
          this.getdata(0,this.currentYear,this.currentMonth);
        }else{
          this.getdata(0,this.currentYear,'0'+this.currentMonth);
        }
      },
      pickNext: function (year, month) {
        var d = new Date(this.formatDate(year, month, 1));
        d.setDate(35);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
        if(this.currentMonth>=10){
          this.getdata(0,this.currentYear,this.currentMonth);
        }else{
          this.getdata(0,this.currentYear,'0'+this.currentMonth);
        }
      },
      pickYear: function (year, month) {
        if(this.currentMonth>=10){
          this.getdata(0,this.currentYear,this.currentMonth);
        }else{
          this.getdata(0,this.currentYear,'0'+this.currentMonth);
        }
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function (year, month, day) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
      //信息接口
      querinfo: function (index) {
        this.checknum = index
      },
      a: function () {
        console.log(this.checktimeYear,this.checktimeMonth)
      }
    },
    created: function () {
      this.initData(null);
      //获取uuid 登录状态
      this.uuid = localStorage.getItem("uuid");
      this.userInfoId = localStorage.getItem("userInfoId")
      //全部查询
      let params ={
        ymhaohanToken: this.uuid
      }
      bill(params).then(res=>{
        this.val = res.data
        if(res.message== "暂无任何账单"){
          Toast("还没有账单")
        }else{
          for (let i= 0;i< this.val.length; i++){
            this.cartime.push(format(this.val[i].createTime))
          }
        }
      })
  }
  }
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
<style src="@/assets/css/Date.css"></style>
<style src="@/assets/css/Collapse.css"></style>
<style scoped>
  .cancle{
    width:90%;
    margin: 0 auto;
    text-align: right;
    padding-right: 0.2rem;
    padding-bottom: 0.5rem;
    background: none;
  }
  .cancle-i{
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-top: 0.2rem;
    text-align: center;
    font-size: 0.7rem;
    line-height: 50px;
    background: rgba(0,0,0,0.3);
    color: rgba(0,0,0,0.3) ;
    border-radius: 50%;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #5784fe;
  }
  .title>div{
    color: #ffffff;
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .screen{
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 3%;
  }
  .screen>span{
    display: flex;
    align-items: center;
    font-size: 28px;
    color: #999999;
    margin-right: 100px;
  }
  .screen>span>div{
    float: left;
  }
  .screen>span>div:nth-of-type(2){
    position: relative;
    transform: translateY(30%);
    margin-left: 10px;
    width: 0;
    height: 0;
    border: solid;
    border-width: 12px 7px;
    border-color: #999999 transparent transparent transparent;
  }
  .yea-mon{
    background-color: #f5f5f5;
    padding: 0 3%;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #333333;
  }
  .record{
    padding: 0 3%;
  }
  .record-val{
    display: flex;
    height: 80px;
    line-height: 50px;
    padding:0;
    margin-top: 0.2rem;
    border-bottom: 1px solid #e7e7e7;
  }
  .head-img,.record-money{
    flex: 1;
  }
  .record-money>span{
    float: right;
    font-size: 30px;
    color: #333333;
  }
  .record-det{
    flex: 5;
    line-height: 25px;
  }
  .record-det>span:nth-of-type(1){
    font-size: 22px;
    display: inline-block;
    width: 100%;
  }
  .record-det>span:nth-of-type(2){
    display: inline-block;
    font-size: 22px;
    line-height: 22px;
    color: #999999;
    padding-top: 0.2rem;
  }
  .record-det>span:nth-of-type(3){
    margin-left: 20px;
    font-size: 22px;
    color: #999999;
    padding-bottom: 0.6rem;
  }
  .head-img>img{
    height: 80px;
    width: 80px;
  }
  .classification{
    height: 200px;
    line-height: 200px;
    background-color: #ffffff;
  }
  .class-info{
    display: inline-block;
    width: 2.5rem;
    height: 1rem;
    line-height:1rem;
    text-align: center;
    font-size: 0.35rem;
    margin-top: 0.3rem;
    border: solid 1px #ececec ;
  }
  .classification>div>span{
    height: 48px;
    background-color: #cce1f8;
    border-radius: 10px;
    border: solid 1px #0177fb;
  }
  .show-date{
    height: 100px;
    padding: 0 3%;
    margin-bottom: 50px;
  }
  .show-date>input{
    text-align: center;
    border: none;
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #0177fb;
  }
</style>
<style type="text/css">
  * {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: Verdana, sans-serif;
    background: #ffffff;
  }
  #timevue{
    position: fixed;
    left: 0;
    top: 12%;
    width:100%;
    height: 100%;
    padding-top: 50px;
    padding-bottom: 100px;
    background: #ececec;
  }
  #calendar{
    width:80%;
    margin: 0 auto;
    /*box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);*/
  }
  .month {
    width: 100%;
    background: #00B8EC;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 0.5rem;
  }

  .choose-month {
    text-align: center;
    font-size: 1rem;
  }

  .arrow {
    padding: 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 0.4rem;
    color: #000;
  }

  .days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }

  .days li:hover {
    background: #e1e1e1;
  }
</style>
