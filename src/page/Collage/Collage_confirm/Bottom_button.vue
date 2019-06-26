<template>
  <div class="sub-but">
    <div>
      <!--Collage_others-->
      <span>合计金额：￥69.00</span>
      <van-button
        round
        plain
        type="danger"
        class="b-black"
        @click="$router.push('/payment')"  
        style="color: #fffffff"
      >确定付款</van-button>
      <!-- 跳转到付款页面 -->
    </div>
  </div>
</template>

<script>
import { pdetail } from "@/api/index.js";
export default {
  name: "Bottom_button",
  data() {
    return {};
  }
};
</script>

<style scoped>
.sub-but {
  position: relative;
  padding: 0 3%;
  background-color: #ffffff;
}
.sub-but > div {
  height: 90px;
  text-align: right;
}
.sub-but > div > button {
  background-color: #69abe9dc;
  height: 100%;
  color: #ffffff;
  border-radius: 0;
  border: none;
}
.sub-but span {
  position: absolute;
  left: 25px;
  top: 40px;
}
</style>
