<template>
  <div class="p-static">
    <span><img :src="img_url">{{static}}</span>
    <span>{{s_static}}</span>
  </div>
</template>

<script>
import { pdetail } from "@/api/index.js";
export default {
  name: "Success_trade",
  data() {
    return {
      static: "",
      s_static: "",
      img_url: ""
    };
  },
  mounted() {
    let uuid = localStorage.getItem("uuid");
    let num;
    let params = { ymhaohanToken: uuid, out_trade_no: num };
    this.img_url = require("@/assets/img/packaging.png");
    this.static = "拼团成功";
    this.s_static = "商家正在校验打包中...";
    pdetail(params).then(res => {
      if (
        res.kaituan &&
        res.kaituan.status == 1 &&
        res.kaituan.goodsnum - 1 > res.kaituan.peoples.length
      ) {
        this.static = "拼团中";
        this.s_static = "即将关闭，尽快参团吧！";
      }
    });
  }
};
</script>

<style scoped>
.p-static {
  height: 190px;
  text-align: center;
  background-color: rgb(255, 42, 71);
}
.p-static > span {
  display: inline-block;
  color: #ffffff;
}
.p-static > span:nth-of-type(1) {
  width: 100%;
  margin-top: 50px;
  font-size: 34px;
}
.p-static > span:nth-of-type(2) {
  margin-top: 10px;
  font-size: 26px;
}
.p-static > span:nth-of-type(1) > img {
  position: relative;
  top: 5px;
  width: 39px;
  height: 37px;
  margin-right: 30px;
}
</style>
