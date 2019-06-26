<template>
  <div class="About_Us">
    <div class="head">
      <div class="left">
        <van-icon
          class="icon"
          name="arrow-left"
          @click="$router.back(-1)"
        ></van-icon>
      </div>
      消息通知
    </div>
    <div class="body" :style="vals" v-if="msg_list.length > 0 ? true: false">
      <ul>
        <li v-for="(item,index) in msg_list" :key="index">
          <div class="top">
            <div class="left">{{item.content}}</div>
            <div class="right">{{item.orderdetail?item.orderdetail.createTime:item.createTime | timeReplace}}</div>
          </div>
          <div class="butt">
            <div class="left">
              <div class="min_top" v-if="item.type!=9">{{item.orderdetail?item.orderdetail.goodsdetails.length==0?'':item.orderdetail.goodsdetails[0].goodsName:''}}</div>
              <div class="min_butt" v-if="item.type!=9">订单编号：{{item.targetId}}</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="msg" v-if="msg_list.length===0">暂无通知</div>
    </div>
    <!--// 广告消息-->
    <div class="body" :style="vals" v-if="msg_list1.length > 0 ? true: false">
      <ul>
        <li v-for="(item1,index) in msg_list1" :key="index">
          <div class="top">
            <div class="left">{{item1.sys_content}}</div>
          </div>
          <div class="timer-show">{{item1.sys_createTime | timeReplace}}</div>
        </li>
      </ul>
      <div  class="msg" v-if="msg_list1.length===0">暂无通知</div>
    </div>
  </div>
</template>

<script>
  import { msglist, read, msggetList } from "@/api/index.js";
  export default {
    data() {
      return {
        myhttp: "http://www.ymhaohan.cn/",
        vals: "",
        // 图片数组
        piclist: [],
        log: 0,
        date_time: new Date(),
        msg_list: [],
        msg_list1: [],
        // 消息id
        messageid: [],
        uuid: ''
      };
    },
    filters: {
      // 时间戳转换,
      timeReplace: function(val){
        const add0 = function (endTimer) {
          return endTimer < 10 ? "0" + endTimer : endTimer;
        }

        if(val != '' && val != undefined){
          let time = new Date(val);
          let y = time.getFullYear();
          let m = time.getMonth() + 1;
          let d = time.getDate();
          return (y + "-" + add0(m) + "-" + add0(d));
        }
      }
    },
    created() {
    	localStorage.setItem('weiduxiaoxi',1);
      this.uuid = localStorage.getItem("uuid");
      if (this.uuid === null || this.uuid === "") {
        this.vals = "display:none";
      } else if (this.uuid !== null) {
        this.log = 1;
      }
    },
    mounted: function () {
      // 渲染,返利到账
      let params = {ymhaohanToken: this.uuid, createtime: this.date_time};
      msglist(params).then(res => {
        if(res.list==undefined){
          return;
        }
        this.msg_list = res.list;
        if(this.msg_list.length>0){
          for (var i = 0; i < this.msg_list.length; i++) {
            if (this.msg_list[i].orderdetail) {
              this.piclist.push(this.msg_list[i].orderdetail.goodsdetails[0]);
            }
          }
          // 已读
          for (var i = 0; i < this.msg_list.length; i++) {
            this.messageid.push(this.msg_list[i].messageid);
          }
        }
        if(this.messageid.length>0){
          for (var i = 0; i < this.messageid.length; i++) {
            read({messageid: this.messageid[i], ymhaohanToken: this.uuid}).then(
              res => {
                console.log(res);
              }
            );
          }
        }
      });
      // // 公告  /api/sysMessage/getList
      // let data = {
      //   ymhaohanToken: this.uuid
      // }
      // msggetList(data).then(res => {
      //   if(res.data){
      //     this.msg_list1 = res.data
      //   }else{
      //     this.msg_list1=[]
      //   }
      // })
    }
  };
</script>

<style scoped>
  .timer-show{
    margin-top: 10px;
  }
  .About_Us {
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
  }
  .head {
    height: 88px;
    text-align: center;
    background-color: #fff;
    line-height: 88px;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #333333;
  }
  .head .left {
    position: absolute;
    left: 24px;
    top: 6px;
  }
  .head .left .icon {
    font-size: 29px;
    color: #333333;
  }
  .body ul {
    margin: 20px 24px;
    font-size: 30px;
  }
  .body li {
    margin-bottom: 20px;
    position: relative;
    background-color: #fff;
    padding: 20px 24px;
  }
  .body .top {
    line-height: 30px;
    display: flex;
    justify-content: space-between;
  }
  .butt {
   display: flex;
    justify-content: space-between;
  }
  .body .butt .min_butt {
    font-family: HiraginoSansGB-W3;
    font-size: 30px;
    color: #999999;
  }
</style>

