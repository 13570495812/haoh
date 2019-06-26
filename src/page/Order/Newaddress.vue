<template>
    <div class="newaddress">
       <!--标题-->
        <div class="header">
           <div><van-icon name="arrow-left" /></div>
           <div>新建地址</div>
           <div>保存</div>
       </div>
       <!-- 区县 -->
       <div class="county address-info" @click="popup()">
           省份、城市、区县
           <van-popup v-model="show" position="bottom" :overlay="false" class="address-box">
               <van-area :area-list="areaList"  class="address-box"/>
           </van-popup>
       </div>
       <!--详细地址-->
        <input  class="detailedaddress address-info" placeholder="详细地址，如街道、楼牌号等" />
        <!--姓名-->
        <input class="usernae address-info" placeholder="姓名"/>
        <!--手机号-->
        <input  class="phone address-info" placeholder="手机号码" />
        <!--默认地址-->
        <div class="defaultaddress">
           <van-checkbox v-model="checked">设为默认地址</van-checkbox>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Area } from 'vant';
import { Popup } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';

Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Popup);
Vue.use(Area);
export default {
    data(){
        return{
            checked: true,
            show:false,
        }
    },
    methods: {
        popup: function(){
          this.show=true;
        }
    }
}
</script>

<style src="@/assets/css/redio_checkbox.css"></style>

<style scoped>
.header{
    width: 100%;
    height: 100px;
    line-height: 100px;
    border-bottom: solid 1px #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.header>div:nth-child(1){
    text-align: left;
    flex: 1;
    font-size: 27px;
    margin-left: 20px;
}
.header>div:nth-child(2){
    text-align: center;
    font-size: 30px;
    flex: 1;
}
.header>div:nth-child(3){
    text-align: right;
    flex: 1;
     font-size: 28px;
    margin-right: 20px;
}
.address-info{
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    padding-left: 25px;
    color: #BFBCBC;
    border: solid 1px #eee;
}
.defaultaddress{
   width: 100%;
   height: 150px;
   font-size: 28px;
   line-height: 150px;
   text-align: center;
   color: #999;
}


</style>

