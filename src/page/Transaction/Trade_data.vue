<template>
  <div>
    <div>
      <div class="describe details">订单详情</div>
      <div class="static">
        <ul>
          <li>
            <span>订单状态：</span>
            <span>{{status}}</span>
          </li>
          <li>
            <span>订单编号：</span>
            <span>{{out_trade_no}}</span>
          </li>
          <li>
            <span>订单创建时间：</span>
            <span>{{times}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Button } from "vant";

  Vue.use(Button);
  export default {
    name: "Trade_data",
    data() {
      return {
        CartArray: [],
        freight: "10.00",
        static: "已支付",
        number: "00000000000000000000000000",
        data_time: "2017-11-11 11:11",
        times:''
      };
    },
    props:['time','out_trade_no','status']
    ,
    methods: {
      timestampToTime(timestamp) {
        var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + "-";
        var M =
          (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
        var D = date.getDate() + " ";
        var h = date.getHours() + ":";
        var m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ":";
        var s = (date.getSeconds()<10?'0'+ date.getSeconds(): date.getSeconds());
        return Y + M + D + h + m + s;
      }
    },
    created() {
    },
    mounted() {
      console.log(this.time)
      this.times = this.timestampToTime(this.time);
    }
  };
</script>

<style src="@/assets/css/Button.css"></style>
<style scoped>
  .describe {
    display: flex;
    padding: 3%;
    background-color: #ffffff;
    justify-content: space-between;
  }
  .describe > div {
    display: flex;
    align-items: center;
  }
  .describe > div > img {
    width: 70px;
    height: 38px;
    margin-right: 15px;
  }
  .describe > div > span {
    font-size: 26px;
  }
  .is-f {
    color: #999999;
  }
  .spend {
    padding: 0 3%;
    background-color: #ffffff;
    margin-bottom: 15px;
  }
  .spend > ul > li {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    font-size: 22px;
    color: #333333;
  }
  .details {
    font-size: 28px;
    border-bottom: 1px solid #e7e7e7;
  }
  .static {
    padding: 0 3%;
    background-color: #ffffff;
    height: 200px;
    border-bottom: 1px solid #e7e7e7;
  }
  .static > ul > li {
    font-size: 24px;
    height: 50px;
    line-height: 50px;
  }
</style>
