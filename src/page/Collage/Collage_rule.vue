<template>
    <div id="Collagerule">
        <div class="refund_header">
            <van-icon name="arrow-left" class="refund_return" @click="$router.back(-1)" />
            <span class="apply">拼团规则</span>
        </div>

        <div class="content">
            <div class="parts">
                <van-row type="flex" justify="space-around">
                    <van-col span="6"><span>1</span>开团/参团</van-col>
                    <van-col span="6"><span>2</span>满员发货 </van-col>
                </van-row>
            </div>
            <div class="rule_text">
                <h4>规则说明</h4>
                <article>
                    <p>1.在团有效时间内未凑齐成团人数，即拼购失败，系统自动取消订单并全额退款，支付金额将会原路退回账户。</p>
                    <p>2.团有效时间，即拼购时间，可在拼购详情页查看倒计时。</p>
                    <p>3.针对生鲜类商品，如遇质量问题，可以联系商家、客服补发或者退款</p>
                </article>
            </div>
        </div>
    </div>

</template>

<script>
import Vue from 'vue';
import { Row, Col } from 'vant';
import { Badge, BadgeGroup } from 'vant';

Vue.use(Badge);
Vue.use(BadgeGroup);
Vue.use(Row).use(Col);
Vue.use(Badge);

export default {
    data() {
        return {

        }
    }
}
</script>


<style scoped>

#Collagerule {
    position: relative;
    width: 90%;
    height: 100%;
}
.refund_header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 90px;
    text-align: center;
    background: white;
    z-index: 100;
}
.refund_body {
    position: relative;
    left: 0;
    top: 90px;
}
.refund_return {
    position: absolute;
    font-size: 45px;
    top: 20px;
    left: 10px;
}
.apply {
    font-size: 40px;
    line-height: 90px;
}
.content {
    position: relative;
    top: 90px;
    width: 100%;
    padding: 25px;
    padding-top: 100px;
}
.parts span {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin-right: 7px;
    background-color: rgb(243, 29, 57);
    border-radius: 50px;
    text-align: center;
    line-height: 40px;
    color: aliceblue;
}
.parts  p {
    position: absolute;
    top: 140px;
    font-size: 20px;
    color: darkgrey;
}
.rule_text {
    margin-top: 100px;
}
.rule_text h4 {
    color: rgb(243, 29, 57);
    font-size: 28px;
}
.rule_text article  p{
    padding: 10px;
    text-align: left;
    letter-spacing: 3px;
    font-size: 23px;
}
</style>

