<template>
    <div id="toDayCollage">
        <header>
            <router-link to="/grouppurchase">
                <van-icon name="arrow-left" />
            </router-link>
            <h2>今日拼团</h2>
            <div>
                <span>10</span>
                <img src="../../assets/img/more2.png">
            </div>
        </header>
        <div class="body">
            <ul v-for="re in toDayCollageAll">
                <li><img v-lazy="'http://www.ymhaohan.cn/'+re.goodsMedias[0].mediaId"></li>
                <li>{{re.goodsBrief}}</li>
                <li><span>{{re.peoplenum}}人拼团</span><span>￥{{re.recommendedprice}}</span></li>
                <li><span>{{re.peoplenum * re.kaituanNum[0].inCount}}人已拼</span><span></span></li>
            </ul>
            <div class="loadding">
                <div v-if="loadding" class="loaddingIcon">
                    <van-loading />
                </div>
                <p v-if="loaddingTips">暂无更多商品</p>
            </div>
        </div>
    </div>
</template>

<script>  import "../../assets/css/spellgroup.css";

import {toDayCollage} from '../../api/index.js'
export default{
    name: 'GroupPurchase',
    data() {
        return {
            mPageNow: 1,
            toDayCollageAll: []
        }
    },
    created: function(){
        let param = {
            titleid: 'aecf938627a145dea8803dbbc6a2656f',
            type: 2,
            mPageNow: this.mPageNow,
            mPageSize: 10
        }
        toDayCollage(param).then(res => {
            this.toDayCollageAll = res.data.mList;
        })
    },
    methods: {
        
    },
    mounted: function(){
        
    },
    updated: function(){
        
    }
    
}

</script>
<style scoped>
    #toDayCollage{
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgb(246, 246, 248);
    }
    #toDayCollage header{
        position: relative;
        height: 90px;
        background: #ffffff;
    }
    #toDayCollage header i {
        font-size: 36px;
        height: 100%;
        line-height: 90px;
        padding: 0 15px;
    }
    #toDayCollage header h2{
        position: absolute;
        width: 60%;
        left: 20%;
        top: 10px;
        text-align: center
    }
    #toDayCollage header div{
        position: absolute;
        top: 0px;
        right: 15px;
        height: 100%;
    }
    #toDayCollage header div span{
        display: block;
        margin-top: 15px;
        width: 38px;
        text-align: center;
        font-size: 12px;
        padding: 2px 0;
        border-radius: 50px;
        background: rgb(239, 61, 61);
        color: #ffffff;
    }
    #toDayCollage header div img{
         position: absolute;
         top: 42px;
         right: 0;
    }
    #toDayCollage .body{
        position: relative;
        width: 100%;
        height: calc(100% - 190px);
        padding: 7.5px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #toDayCollage .body img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #toDayCollage .body ul{
        display: inline-table;
        vertical-align: top;
        width: 45%;
        background: #ffffff;
        margin: 7.5px;
    }
    #toDayCollage .body ul li{
        margin: 0px 15px 15px 15px;
    }
    #toDayCollage .body ul li:first-child{
        height: 200px;
        margin: 0 0 15px 0;
    }
    #toDayCollage .body ul li:nth-child(2){
        height: 43px;
        text-overflow: ellipsis; 
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    #toDayCollage .body ul li:nth-child(3) span:first-child{
        color: rgb(229, 0, 0);
    }
    #toDayCollage .body ul li:nth-child(3) span:last-child{
        color: rgb(229, 0, 0);
        font-size: 24px;
        font-weight: bold;
        margin-left: 15px;
    }
    #toDayCollage .body ul li:last-child{
       color: #999;
    }
</style>
