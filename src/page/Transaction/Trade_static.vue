<template>
  <div v-if="ifshow">
    <Ctitle></Ctitle>
    <Successfultrade :status="status"></Successfultrade>
    <Tradeaddress :userInformation="userInformation"></Tradeaddress>
    <div class="goods-title">商品详情</div>
    <Goodsdetal :userInformation="userInformation"></Goodsdetal>
    <Tradedata
      :status="status"
      :out_trade_no="out_trade_no"
      :time="userInformation.product.goodsObjects[0].updateTime"
    ></Tradedata>
  </div>
</template>

<script>
  import Successfultrade from "./Successful_trade";
  import Ctitle from "./Ctitle";
  import Tradeaddress from "./Trade_address";
  import Goodsdetal from "./Goods_detal";
  import Tradedata from "./Trade_data";
  import Bottombutton from "./Bottom_button";
  import { pdetail, detailByProductId } from "../../api/index.js";
  export default {
    name: "trade_static",
    data() {
      return {
        uuid: 0,
        ifshow: false,
        out_trade_no: this.$route.query.out_trade_no,
        uuid: localStorage.getItem("uuid"),
        userInformation: {},
        status: this.$route.query.status,
        item: this.$route.query.item,
        daiuserInformation: {}
      };
    },
    components: {
      Successfultrade,
      Ctitle,
      Tradeaddress,
      Goodsdetal,
      Tradedata,
      Bottombutton
    },
    mounted() {
      console.log(this.status);
      if (this.status == "待付款") {
        detailByProductId({
          ymhaohanToken: this.uuid,
          productId: this.out_trade_no
        }).then(res => {
          console.log(res.obj);
          this.daiuserInformation = res.obj;
          this.userInformation = res.obj;
          console.log(this.daiuserInformation);
          this.ifshow = true;
        });
      } else {
        pdetail({
          ymhaohanToken: this.uuid,
          out_trade_no: this.out_trade_no
        }).then(res => {
          console.log(res)
          console.log(res.obj);
          this.userInformation = res.obj;
          this.ifshow = true;
        });
      }
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
