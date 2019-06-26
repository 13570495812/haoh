<template>
  <div class="My_address">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.back(-1)"></van-icon>
      </div>
      <div class="page-name">
        <span>地址管理</span>
      </div>
      <div></div>
    </div>
    <div class="address-list" :style="vals">
      <div v-for="item,index in list">
        <van-radio-group v-model="radio">
          <van-swipe-cell :right-width="100">
            <span slot="left">选择</span>
            <van-cell-group >
              <!--<van-radio :name="item"/>-->
              <label>
              <van-radio :name="index" @click="onChange(index)"/>
              <div class="address" @click="onChange(index)">
                <div @click="goback">
                  <span>{{item.name}}&nbsp;&nbsp;{{item.phone}}</span>
                  <span>{{item.provinceId}}-{{item.cityId}}-{{item.districtId}}-{{item.address}}</span>
                </div>
                <van-icon name="edit" @click="editAddr(item,item.name,item.phone,item.provinceId,item.cityId,item.districtId,item.address,item.isService,item.addrId,item.lon,item.lat)"/>
              </div>
              </label>
            </van-cell-group>
            <span slot="right" @click="ondelete(item.addrId)" style="margin-left: 30px;">删除</span>
          </van-swipe-cell>
        </van-radio-group>
      </div>
    </div>
    <div class="bottom" :style="vals">
      <div class="n-address" @click="$router.push('/new_address')">+ 新建地址</div>
    </div>
  </div>
</template>

<script>
  import {myAddr} from '@/api/index.js'
  import {deleteAddr} from '@/api/index.js'
  import Vue from 'vue'
  import { Icon } from 'vant';
  import { SwipeCell } from 'vant';
  import { Cell, CellGroup } from 'vant';
  import { Button } from 'vant';
  import { RadioGroup, Radio } from 'vant';
  import { Toast } from 'vant';
  import { Dialog } from 'vant';
  Vue.use(Dialog);
  Vue.use(Toast);
  Vue.use(RadioGroup);
  Vue.use(Radio);
  Vue.use(Button);
  Vue.use(Cell).use(CellGroup);
  Vue.use(SwipeCell);
  Vue.use(Icon);
  export default {
    name: "My_address",
    data(){
      return{
        radio: 0,
        list: [],
        vals:"",
        log: 0,
        num: "",
        addr:"",
        ifture:false
      }
    },
    methods: {
      onOpen(){
        let uuid = localStorage.getItem("uuid");
        let params = {ymhaohanToken:uuid};
        myAddr(params).then(res=>{
          console.log(res);
          let index = res.data.findIndex(item => item.isService==='1');
          this.radio = index;
          console.log(res.data[index]);
          console.log(index);
          if(res.state==="0"){
            this.list = res.data;
            console.log(this.list)
          }
          else {
            Toast(res.message);
          }
        })
      },
      editAddr(item,name,phone,provinceId,cityId,districtId,address,isService,addrId,lon,lat){
        console.log(item);
        this.$router.push({name: 'Edit_address',params:{
            index:item,
            name:name,
            phone:phone,
            provinceId:provinceId,
            cityId:cityId,
            districtId:districtId,
            address:address,
            isService:isService,
            addrId:addrId,
            lon:lon,
            lat:lat
          }})
      },
      /*onAdd() {

      },

      onEdit(item, index) {

      },*/
      /*onClose(clickPosition, instance) {
        switch (clickPosition) {
          case 'left':
          case 'cell':
          case 'outside':
            instance.close();
            break;
          case 'right':
            Dialog.confirm({
              message: '确定删除吗？'
            }).then(() => {
              /!*this.ondelete(instance);*!/
              instance.close();
            });
            break;
        }
      },*/
      ondelete(addrId) {
        console.log(addrId);
        let uuid = localStorage.getItem("uuid");
        let addr_Id = addrId;
        let params = {ymhaohanToken:uuid,addrid:addr_Id};
        Dialog.confirm({
          title: '删除地址',
          message: '是否删除该地址？'
        }).then(() => {
          deleteAddr(params).then(res=>{
            console.log(res);
            if(res.state==="0"){
              console.log(res.message);
              localStorage.removeItem("choosepro");
              this.onOpen();
            }
          })
        }).catch(() => {
          // on cancel
        });
      },
      goback(){
        if(!this.iftrue){
          this.$router.back(-1);
          this.iftrue=true;
        }
      },
      onChange(e){        //获取当前选中地址信息
        this.addr = this.list[e];
        let def_addr = this.addr;
        localStorage.setItem("def_addr", JSON.stringify(def_addr));
      },
    },
    created(){
      let uuid = localStorage.getItem("uuid");
      if(uuid===null||uuid===""){
        this.vals = "display:none";
      }
      else if(uuid!==null){
        this.log = 1;
      }
    },
    mounted(){
      this.onOpen();
    }
  }
</script>

<style src="@/assets/css/body.css"></style>
<style src="@/assets/css/Swipe_cell.css"></style>
<style src="@/assets/css/redio_checkbox.css"></style>
<style src="@/assets/css/Button.css"></style>
<style src="@/assets/css/toast.css"></style>
<style src="@/assets/css/Dialog.css"></style>
<style scoped>
  .My_address{
    height: 100%;
    background-color: #e7e7e750;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #ffffff;
  }
  .title>div{
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .address-list{
    height: 80%;
    overflow: auto;
    margin-top: 20px;
  }
  .address-list>div{
    background-color: #ffffff;
  }
  .address{
    float: left;
    width: 90%;
  }
  .address:after{
    display: block;
    content: "";
    clear: both;
  }
  .address>div{
    float: left;
    height: 150px;
    width: 92%;
  }
  .address>i{
    float: left;
  }
  .address>div>span{
    display: inline-block;
    width: 100%;
    font-size: 28px;
  }
  .address>div>span:nth-of-type(1){
    font-size: 30px;
    margin-top: 30px;
  }
  .address>div>span:nth-of-type(2){
    margin-top: 20px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .bottom{
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 3%;
    background-color: #ccc;
  }
  .n-address{
    width: 100%;
    height: 88px;
    line-height: 88px;
    border-radius: 15px;
    border: 1px solid #5784fe;
    color: #5784fe;
    font-size: 34px;
    text-align: center;
    background-color: #ffffff;
  }
</style>
