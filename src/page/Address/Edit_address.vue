<template>
  <div class="Edit_address" id="Edit_address">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.back(-1)"></van-icon>
      </div>
      <div class="page-name">
        <span>修改地址</span>
      </div>
      <div class="more">
        <span @click="addrsub">保存</span>
      </div>
    </div>
    <div class="input">
      <input class="city" v-model="pcd" readonly placeholder="省份、城市、区县" @click="show=true"/>
      <input class="street" v-model="address" placeholder="详细地址，如街道、楼牌号等"/>
      <input class="name" v-model="name" placeholder="姓名"/>
      <input class="number" type="number" oninput="if(value.length>11)value=value.slice(0,11)" v-model="phone" placeholder="手机号码"/>           <!--无法阻止特殊字符-->
      <van-checkbox v-model="checked">设为默认地址</van-checkbox>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-area
        :area-list="areaList"
        @cancel="onCancel"
        @confirm="onConfirm"
        :columns-num="3"
        title="选择省市区"
        :item-height="60"
        v-if="isshow"
      />
    </van-popup>
    <div id="maps"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { addrupdate } from '@/api/index.js';
  import { customAdd } from '@/assets/js/city_data_3';
  import { Checkbox, CheckboxGroup } from 'vant';
  import { Toast } from 'vant';
  Vue.use(Toast);
  Vue.use(Checkbox).use(CheckboxGroup);
  export default {
    name: "Edit_address",
    data(){
      return{
        show:false,
        checked:false,
        areaList:"",
        pcd:"",
        provinceId:this.$route.params.provinceId,
        cityId:this.$route.params.cityId,
        districtId:this.$route.params.districtId,
        address:this.$route.params.address,
        name:this.$route.params.name,
        phone:this.$route.params.phone,
        isService:this.$route.params.isService,
        addrId:this.$route.params.addrId,
        lon:this.$route.params.lon,
        lat:this.$route.params.lat,
        map:null,
        position:0,
        isshow:false
      }
    },
    mounted(){
      setTimeout(()=>{
        this.isshow=true
      },500)
      this.map = new BMap.Map("maps");
      this.pcd = this.provinceId+"-"+this.cityId+"-"+this.districtId+"-";
      if(this.isService==='0'){
        this.checked = false;
      }
      else if(this.isService==='1'){
        this.checked = true;
      }
      this.areaList = customAdd().areaList;
      console.log(this.checked);
    },
    methods:{
      getlocal(){
          this.map.centerAndZoom(new BMap.Point(121.4, 31.2), 11);
          this.map.addControl(new BMap.NavigationControl());
         var localSearch = new BMap.LocalSearch(this.map);
          var keyword = this.pcd+this.address;
          console.log(keyword)
          let _this=this;
          localSearch.setSearchCompleteCallback(function (searchResult) {
            var poi = searchResult.getPoi(0);
            _this.lon=poi.point.lng;
            _this.lat=poi.point.lat;
          });
          localSearch.search(keyword);
      },
      onCancel(){
        this.show = false;
      },
      onConfirm(value){
        console.log(value);
        let val = "";
        for(let i=0;i<value.length;i++){
          val = val+value[i].name+"-";
        }
        this.pcd = val;
        this.provinceId = value[0].name;
        this.cityId = value[1].name;
        this.districtId = value[2].name;
        this.show = false;
      },
      addrsub(){
        if(this.checked===true){
          this.isService = '1';
        }
        else if(this.checked===false){
          this.isService = '0';
        }
        let uuid = localStorage.getItem("uuid");
        let params = {
          ymhaohanToken:uuid,
          id:this.addrId,
          provinceId:this.provinceId,
          cityId:this.cityId,
          districtId:this.districtId,
          name:this.name,
          phone:this.phone,
          address:this.address,
          isService:this.isService,
          lon:this.lon, //经度
          lat:this.lat  //维度
        };
        if(this.address.length<6){
            Toast("输入地址必须大于6个字符");
            return
        }
        addrupdate(params).then(res=>{
          if(res.state==="0"){
            Toast("编辑成功！");
            this.getlocal()
          }
          else {
            Toast("编辑失败，请重试！");
          }
          console.log(res);
        })
      }
    }
  }
</script>
<!--<style src="@/assets/css/Date.css"></style>-->
<!--<style src="@/assets/css/redio_checkbox.css"></style>-->
<!--<style src="@/assets/css/Poplist.css"></style>-->
<style scoped>
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #ffffff;
    border-bottom: 1px solid #e7e7e7;
  }
  .title>div{
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .more{
    text-align: right;
  }
  .input{
    text-align: center;
  }
  .input>input{
    padding: 0 3%;
    width: 100%;
    height: 90px;
    border: none;
    border-bottom: 1px solid #e7e7e7;
    font-size: 28px;
  }
  ::-webkit-input-placeholder {
    color:    #999999;
  }
  .van-checkbox{
    color: #999999;
    margin-top: 30px;
    overflow: visible;
  }
</style>
<style>
  #Edit_address .van-picker__frame:after{
    border: none;
  }
  #Edit_address .van-popup--bottom{
    top: 50%;
  }
  #Edit_address .van-picker{
    height: 100%;
    font-size: 30px;
  }
  #Edit_address .van-picker__confirm,#Edit_address .van-picker__cancel{
    font-size: 30px;
  }
  #Edit_address .van-picker__title{
    font-size: 30px;
  }
  #Edit_address .van-picker-column__item{
    font-size: 30px;
  }
  #Edit_address .van-picker__columns{
    height: 100% !important;
  }
  #Edit_address  .van-picker-column{
    height: 100% !important;
  }
  #Edit_address .van-picker__frame{
    border: none
  }
  #Edit_address .van-picker__toolbar{
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
  }
  #Edit_address .van-icon-success:before{
    font-size: 0.35rem !important;
  }
</style>
