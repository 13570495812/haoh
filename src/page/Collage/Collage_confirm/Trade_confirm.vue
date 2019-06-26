<template>
  <div>
    <Ctitle></Ctitle>
    <Tradeaddress></Tradeaddress>
    <div class="goods-title">商品详情</div>
    <Goodsdetal></Goodsdetal>
    <Tradedata></Tradedata>
    <Bottombutton></Bottombutton>
  </div>
</template>

<script>
import Ctitle from "./Ctitle";
import Tradeaddress from "./Trade_address";
import Goodsdetal from "./Goods_detal";
import Tradedata from "./Trade_data";
import { pdetail } from "@/api/index.js";
import Bottombutton from "./Bottom_button";

export default {
  name: "trade_confirm",
  components: {
    Ctitle,
    Tradeaddress,
    Goodsdetal,
    Tradedata,
    Bottombutton
  }
};
</script>

<style src="@/assets/css/body.css"></style>
<style scoped>
.goods-title {
  height: 80px;
  background-color: #ffffff;
  line-height: 80px;
  padding: 0 3%;
  margin-top: 20px;
}
</style>
