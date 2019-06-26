<template>
  <div id="submit_bar">
    <van-submit-bar
      :price="money"
      :button-text='lengthText'
      @submit="onSubmit"
    >
      <div
        class="Submitbar_checked"
        style="z-index: 888888"
        @click="onAllClick()"
      >
        <img
          src="../../assets/img/check.png"
          :src="isAllClicksrc"
        />
        <span>全选</span>
      </div>
    </van-submit-bar>
  </div>
</template>

<script>
  import { createGoodsObject } from "../../api/index.js";
  import bus from "../../assets/js/bus.js";
  import Vue from "vue";
  import { SubmitBar } from "vant";
  Vue.use(SubmitBar);
  export default {
    data() {
      return {
        checked: true,
        isAllClick: false,
        isAllClicksrc: require("../../assets/img/check.png"),
        CartArray: [],
        money: 0,
        lengthText: "结算(0)"
      };
    },
    methods: {
      onSubmit() {
        for (let i = 0; i <this.CartArray.length ; i++) {
          this.CartArray[i].mediaIdDatu=this.CartArray[i].mediaIdDatu.split('.cn/')[1];
        }
        console.log(this.CartArray);
        if (this.CartArray == false) {
          console.log(1234);
          return;
        } else {
          console.log(1234);
          this.$router.push({ path: "/Payment" });
          localStorage.setItem("choosepro", JSON.stringify(this.CartArray));
        }
      },
      onAllClick() {
        if (!this.isAllClick) {
          this.isAllClicksrc = require("../../assets/img/checked3.png");
          this.isAllClick = true;
          bus.$emit("onAllClick", this.isAllClick);
        } else {
          this.isAllClicksrc = require("../../assets/img/check.png");
          this.isAllClick = false;
          bus.$emit("onAllClick", this.isAllClick);
        }
      }
    },
    mounted() {
      var left = this;
      bus.$on("getItemed", val => {
        let money = 0;
        let arr = val.filter(item => item.isbol == true);
        left.CartArray = arr;
        left.lengthText = `结算(${arr.length})`;
        for (let i = 0, item; (item = arr[i++]); ) {
          money += item.price * item.stock;
        }
        left.money = money * 100;
      });
      bus.$on("deletesure", val => {
        console.log(1);
        (this.money = 0), (this.lengthText = "结算(0)");
      });
    }
  };
</script>

<style>
  #submit_bar {
    display: block;
  }
  #submit_bar .van-submit-bar {
    background-color: #fff !important;
    position: fixed !important;
    bottom: 90px !important;
  }
  #submit_bar .van-submit-bar__bar {
    height: 100px !important;
    font-size: 40px !important;
  }
  #submit_bar .van-button--danger {
    background-color: #8bc9fa !important;
    border-color: #8bc9fa !important;
  }
  #submit_bar .van-submit-bar .van-button {
    width: 250px !important;
    height: 100% !important;
    font-size: 34px !important;
    margin: 0 !important;
  }
  #submit_bar .van-submit-bar__price {
    font-size: 36px;
  }
  #submit_bar .Submitbar_checked {
    margin-left: 20px !important;
  }
  #submit_bar .Submitbar_checked img {
    float: left !important;
    width: 40px !important;
    height: 40px !important;
    border-radius: 50% !important;
    margin-top: 5px !important;
  }
  #submit_bar .Submitbar_checked span {
    margin-left: 15px !important;
    font-size: 30px !important;
  }
</style>
