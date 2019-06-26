<template>
  <div class="c_sub-but">
    <div>
      <!--Collage_others-->
      <van-button
        round
        plain
        type="danger"
        class="b-black"
        @click="$router.push('/')"
      >{{right_val}}</van-button>
    </div>
  </div>
</template>

<script>
import { pdetail } from "@/api/index.js";
export default {
  name: "Bottom_button",
  data() {
    return {
      right_val: ""
    };
  },
  created: function() {
    let uuid = localStorage.getItem("uuid");
    let num;
    let params = { ymhaohanToken: uuid, out_trade_no: num };
    pdetail(params).then(res => {
      if (res.kaituan && res.kaituan.status == 1 && res.kaituan.goodsnum-1 == res.kaituan.peoples.length) {
        this.right_val = "提醒发货"
      }
      else if (res.kaituan && res.kaituan.status == 1  && res.kaituan.goodsnum-1 > res.kaituan.peoples.length) {
       this.right_val = "邀请好友"
      }
      else {
        this.right_val = "提醒发货"
      }
    });
  }
};
</script>

<style scoped>
.c_sub-but {
  padding: 0 3%;
  background-color: #ffffff;
}
.c_sub-but > div {
  height: 90px;
  text-align: right;
}
.c_sub-but > div > button {
  margin-top: 20px;
  background-color: rgb(255, 42, 71);
}
</style>
