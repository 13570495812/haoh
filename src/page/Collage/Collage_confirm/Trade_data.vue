<template>
  <div>
    <div>
      <div class="describe">
      </div>
      <div class="spend">
        <ul>
          <li>
            <span>购买数量</span>
            <van-stepper
              class="numbers_bujin"
              v-model="value1"
            />
          </li>
          <li>
            <span>商城优惠</span>
            <span>包邮</span>
          </li>
          <li>
            <span>配送方式</span>
            <span>快递 包邮</span>
          </li>
          <li>
            <textarea name="" id="" cols="30" rows="10" placeholder="卖家留言：填写内容和备注商品信息"></textarea>
          </li>
          <li>匿名购买<van-switch v-model="checked"/></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button } from "vant";
import { Stepper } from "vant";
import { CouponCell, CouponList } from 'vant';
import { Switch } from 'vant';

Vue.use(Button);
Vue.use(Stepper);
Vue.use(CouponCell).use(CouponList);
Vue.use(Switch);

export default {
  name: "Trade_data",
  data() {
    return {
      original_price: "199.00",
      freight: "10.00",
      coupon: "20.00",
      real_payment: "189.00",
      static: "已完成",
      number: "00000000000000000000000000",
      data_time: "2017-11-11 11:11",
      value1: 1,
      checked: true
    };
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
textarea {
  margin: 0 auto;
  display: block;
  height: 100%;
  width: 100%;
}
</style>
