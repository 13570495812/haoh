<template>
    <div class="container">
        <div class="title">
            <div class="back">
                <van-icon name="arrow-left" @click="$router.push('/Personal')"></van-icon>
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
                    <p>{{good_text}}</p>
                    <van-tag mark type="danger" size="large">{{good_type}}</van-tag>
                    <span class="good_price">￥{{good_price}}</span>
                    <p class="good_count">{{p_num}}人已拼</p>
                    <span class="good_ab"><van-icon class="good_icon" name="certificate"/>平台发货</span>
                    <span class="good_ab"><van-icon class="good_icon" name="certificate"/>可申请退款</span>
                </div>
            </div>
            <div class="p_success">
                <van-icon name="certificate"/>
                拼团成功
            </div>
            
            <div class="failure_content">
                <div class="fail_img">
                    <div class="commander">团长</div>
                    <img src="../../assets/img/user-header.png">
                </div>
                <div class="fail_img">
                    <img src="../../assets/img/NOTuser.png"/>
                </div>
                <div class="fail_img">
                    <img src="../../assets/img/NOTuser.png"/>
                </div>
            </div>
            
            <div class="goIndex" @click="toIndex">去首页逛逛</div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {getActGood} from '@/api/index.js'
    import {Icon} from 'vant';
    import {Row, Col} from 'vant';
    import {Tag} from 'vant';
    import {Button} from 'vant';
    
    Vue.use(Button);
    Vue.use(Tag);
    Vue.use(Row);
    Vue.use(Icon);
    
    export default {
        data() {
            return {
                page_name: '拼团详情',
                good_text: '拼购百草果干。。。。。。。。。。。。。。。。',
                good_price: 29.9,
                p_num: '2.3万',
                good_type: '4人拼',
                goodsid: '',
                recommendId: '',
            }
        },
        created() {
            this.goodsid = this.$route.query.goodsid;
            this.recommendId = this.$route.query.recommendId;
        },
        methods: {
            toIndex() {
                this.$router.push('/');
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
            this.getGood();
        }
        
    }
</script>

<style scoped>
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
        width: 100%;
        height: 100px;
        text-align: center;
        vertical-align: middle;
        font-size: 36px;
        margin-top: 40px;
    }
    
    .goIndex {
        width: 90%;
        height: 90px;
        line-height: 90px;
        margin: 0 auto;
        text-align: center;
        font-size: 30px;
        border-radius: 10px;
        color: #ffffff;
        background: linear-gradient(to right, rgb(255, 96, 96), rgb(255, 18, 51));
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
    }
    
    .commander {
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
