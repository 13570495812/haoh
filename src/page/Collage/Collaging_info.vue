<template>
    <div class="container">
        <div class="title">
            <div class="back">
                <van-icon name="arrow-left" @click="$router.back(-1)"></van-icon>
            </div>
            <div class="page-name">
                <span>{{page_name}}</span>
            </div>
            <div class="share">
                <span><van-icon name="share"/></span>
            </div>
        </div>
        <div class="content">
            <div class="good">
                <div class="good_img">
                    <img src="../../assets/img/banner.png"/>
                </div>
                <div class="good_info">
                    <p class="good_title">{{good_text}}</p>
                    <van-tag mark type="danger" size="large">{{good_type}}</van-tag>
                    <span class="good_price">￥{{good_price}}</span>
                    <p class="good_count">{{p_num}}人已拼</p>
                    <span class="good_ab"><van-icon class="good_icon" name="certificate"/>平台发货</span>
                    <span class="good_ab"><van-icon class="good_icon" name="certificate"/>可申请退款</span>
                </div>
            </div>
            <div class="p_success">还差
                <span>{{need_num}}人</span>拼团成功，剩余
                <span>{{hours}}</span>:
                <span>{{minute}}</span>:
                <span>{{second}}</span>
            </div>
            
            <div class="failure_content">
                <div class="fail_img" v-for="(item, index) in PTusers">
                    <div class="commander" v-if="index==0">团长</div>
                    <img src="../../assets/img/user-header.png"/>
                </div>
                <div class="fail_img" v-for="None in 4-PTusers">
                    <img src="../../assets/img/NOTuser.png"/>
                </div>
            </div>
            
            <div class="invite">邀请好友</div>
            <div class="rule">拼团规则</div>
            <!--<div class="invite" @click="joinIn">我要参团</div>-->
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {joinTeam, pintuanING, getActGood} from '@/api/index.js'
    import {Icon} from 'vant'
    
    Vue.use(Icon);
    
    export default {
        data() {
            return {
                uuid: '',
                page_name: '拼团详情',
                good_text: '拼购百草二人而威尔而玩儿果干。。。。。。。。。。。',
                good_price: 29.9,
                p_num: '2.3万',
                good_type: '4人拼',
                need_num: 2,
                hours: '08',
                minute: '56',
                second: '34',
                kaituanId: '',
                goodsid: '',
                recommendId: '',
                PTusers: []
            }
        },
        created() {
            this.uuid = localStorage.getItem('uuid');
            console.log(this.uuid)
            this.kaituanId = this.$route.query.kaituanId;
            this.goodsid = this.$route.query.goodsid;
            this.recommendId = this.$route.query.recommendId;
            console.log(this.uuid);
        },
        methods: {
            joinIn() {
                let params = {
                    kaituanid: this.kaituanId,
                    ymhaohanToken: this.uuid
                };
                joinTeam(params).then(res => {
                    console.log(res);
                })
            },
            PTing() {
                let params = {
                    goodsid: this.goodsid
                };
                pintuanING(params).then(res => {
                    console.log(res);
                    this.PTusers = res.data.mList;
                })
            },
            getGood() {
                let params = {
                    recommendId: this.recommendId,
                    goodsid: this.goodsid
                }
                getActGood(params).then(res => {
                    console.log(res);
                })
            }
        },
        mounted() {
            this.PTing();
            this.getGood();
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
        display: inline-block;
    }
    
    .title {
        display: flex;
        height: 100px;
        line-height: 100px;
        padding: 0 3%;
        font-size: 32px;
        border-bottom: 1px solid #f5f5f5;
        background-color: #ffffff;
    }
    
    .title > div {
        flex: 1;
    }
    
    .page-name {
        font-size: 32px;
        text-align: center;
    }
    
    .content {
        padding-top: 30px;
    }
    
    .good {
        margin: 0 30px;
        border: 3px #f5f5f5 solid;
        overflow: hidden;
    }
    
    .good_img {
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 40%;
        height: 100%;
        left: 0;
    }
    
    .good_img img {
        width: 270px;
        height: 300px;
    }
    
    .good_info {
        position: relative;
        vertical-align: top;
        display: inline-block;
        top: 0;
        width: 390px;
        height: 100%;
        margin-left: 10px;
    }
    
    .good_price {
        font-size: 36px;
        color: red;
        font-weight: bold;
    }
    
    .good_count {
        color: darkgray;
    }
    
    .good_ab {
        display: inline-block;
        height: 30px;
        margin-top: 20px;
        margin-right: 20px;
    }
    
    .good_icon {
        color: red;
        margin-right: 10px;
    }
    
    .p_success {
        position: relative;
        width: 100%;
        height: 100px;
        text-align: center;
        vertical-align: middle;
        font-size: 32px;
        margin-top: 40px;
        display: inline-block;
    }
    
    .p_success :first-child {
        color: #e40404;
    }
    
    .p_success :not(:first-child) {
        color: #ffffff;
        background-color: #683e59;
    }
    
    .invite {
        margin: 0 auto;
        width: 700px;
        height: 80px;
        line-height: 80px;
        background: linear-gradient(to right, rgb(255, 96, 96), rgb(255, 18, 51));
        color: #ffffff;
        text-align: center;
        font-size: 32px;
        border-radius: 15px;
    }
    
    .rule {
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
        margin: 30px 0;
    }
    
    .share span {
        float: right;
    }
    
    .failure_content {
        position: relative;
        padding: 50px 120px;
        display: flex;
        justify-content: space-around;
    }
    
    .fail_img {
        position: relative;
    }
    
    .failure_content .fail_img img {
        height: 100px;
        border-radius: 50%;
    }

    .commander:first-child {
        position: absolute;
        left: 15%;
        top: -15%;
        width: 70px;
        height: 30px;
        border-radius: 20px;
        background: red;
        color: white;
        text-align: center;
    }
</style>
