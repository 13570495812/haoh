<template>
  <div
    class="New_address"
    id="New_address"
  >
    <div class="title">
      <div class="back">
        <van-icon
          name="arrow-left"
          @click="$router.back(-1)"
        ></van-icon>
      </div>
      <div class="page-name">
        <span>新建地址</span>
      </div>
      <div class="more">
        <span @click="save_address">保存</span>
      </div>
    </div>
    <div class="input">
      <div
        class="city"
        v-model="pcd"
        @click="show=true"
      >{{pcd}}</div>
      <input
        class="street"
        v-model="address"
        placeholder="详细地址，如街道、楼牌号等"
      />
      <input
        class="name"
        v-model="name"
        placeholder="姓名"
      />
      <input
        class="number"
        type="number"
        oninput="if(value.length>11)value=value.slice(0,11)"
        v-model="phone"
        placeholder="手机号码"
      />
      <!--无法阻止特殊字符-->
      <van-checkbox v-model="checked">设为默认地址</van-checkbox>
    </div>
    <van-popup
      v-model="show"
      position="bottom"
    >
      <van-area
        :area-list="areaList"
        @cancel="onCancel"
        @confirm="onConfirm"
        :columns-num="3"
        title="选择省市区"
        :item-height="60"
      />
    </van-popup>
    <div id="mapss"></div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { newAdd } from "@/api/index.js";
  import { customAdd } from "@/assets/js/city_data_3";
  import { Checkbox, CheckboxGroup } from "vant";
  import { Toast } from "vant";
  import { Area } from "vant";

  Vue.use(Area);
  Vue.use(Toast);
  Vue.use(Checkbox).use(CheckboxGroup);
  export default {
    name: "New_address",
    data() {
      return {
        itemheight:100,
        show: false,
        checked: false,
        pcd: "省份、城市、区县",
        provinceId: "",
        cityId: "",
        districtId: "",
        address: "",
        name: "",
        phone: "",
        areaList: "",
        isService: 0,
        lon: 0,
        lat: 0,
        map:null,
      };
    },
    methods: {
      getlocal(){
        var localSearch = new BMap.LocalSearch(this.map);
        var keyword = this.pcd+this.address;
        let _this=this;
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.getPoi(0);
          let uuid = localStorage.getItem("uuid");
          let params = {
            ymhaohanToken: uuid,
            provinceId: _this.provinceId,
            cityId: _this.cityId,
            districtId: _this.districtId,
            name: _this.name,
            phone: _this.phone,
            address: _this.address,
            isService: _this.isService,
            lon: poi.point.lng,
            lat: poi.point.lat
          };
          newAdd(params).then(res => {
            if (res.state === "0") {
              Toast(res.message);
              _this.$router.push("/my_address");
            } else {
              Toast(res.message);
            }
          });

        });
        localSearch.search(keyword);
      },
      save_address() {
        if (this.checked === true) {
          this.isService = "1";
        } else if (this.checked === false) {
          this.isService = "0";
        }
        if (this.address.length < 6) {
          Toast("输入地址必须大于6个字符");
          return;
        }
        this.getlocal();
      },
      onCancel() {
        this.show = false;
      },
      onConfirm(value) {
        let val = "";
        for (let i = 0; i < value.length; i++) {
          val = val + value[i].name + "-";
        }
        this.pcd = val;
        this.provinceId = value[0].name;
        this.cityId = value[1].name;
        this.districtId = value[2].name;
        this.show = false;
      }
    },
    mounted() {
      this.map = new BMap.Map("mapss");
      this.areaList = customAdd().areaList;
    }
  };
</script>

<style scoped>
  .New_address {
    height: 100%;
    background-color: #ffffff;
  }
  .title {
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #ffffff;
    border-bottom: 1px solid #e7e7e7;
  }
  .title > div {
    flex: 1;
  }
  .page-name {
    font-size: 32px;
    text-align: center;
  }
  .more {
    text-align: right;
  }
  .input {
    text-align: center;
  }
  .input > input {
    padding: 0 3%;
    width: 100%;
    height: 90px;
    border: none;
    border-bottom: 1px solid #e7e7e7;
    font-size: 28px;
  }
  ::-webkit-input-placeholder {
    color: #999999;
  }
  .van-checkbox {
    color: #999999;
    margin-top: 30px;
    overflow: visible;
  }
  .city {
    text-align: left;
    font-size: 28px;
    padding-left: 30px;
    color: #999999;
    height: 90px;
    line-height: 90px;
  }
</style>
<style>
  #New_address .van-popup--bottom{
    top: 50%;
  }
  #New_address .van-picker{
    height: 100%;
    font-size: 30px;
  }
  #New_address .van-picker__confirm,#New_address .van-picker__cancel{
    font-size: 30px;
  }
  #New_address .van-picker__title{
    font-size: 30px;
  }
  #New_address .van-picker-column__item{
    font-size: 30px;
  }
  #New_address .van-picker__frame:after{
    border: none;
  }
  #New_address .van-picker__columns{
    height: 100% !important;
  }
  #New_address  .van-picker-column{
    height: 100% !important;
  }
  #New_address .van-picker__toolbar{
    height: 100px;
    line-height: 100px;
    border-bottom: 1px solid #ccc;
  }
  #New_address .van-icon-success:before{
    font-size: 0.35rem !important;
  }
</style>
