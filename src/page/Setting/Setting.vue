<template>
  <div id="big">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="back"></van-icon>
      </div>
      <div class="page-name">
        <span>设置</span>
      </div>
      <div></div>
    </div>
    <div class="contaner">
      <div>
        <p>版本信息</p>
        <p>V&nbsp;{{vers}}</p>
      </div>
      <div @click='tiao("aboutU")'>
        <p>关于我们</p>
        <p><van-icon name="arrow" /></p>
      </div>
    </div>
    <div class="bakk">
      <button id='confirmBtn' type="button" class="mui-btn mui-btn-blue mui-btn-outlined" @click="u_logout">退出登录</button>
    </div>
  </div>
</template>

<script>
  import {logout} from "@/api/index.js";
  import {getSystemCurrVersionNo} from "@/api/index.js";
  import Vue from 'vue';
  import { Toast } from 'vant';

  Vue.use(Toast);
  export default {
    data(){
      return{
        vers:"0.0"
      }
    },
    methods: {
      back() {
        this.$router.push({name:'Personal',params:{index:'4'}});
      },
      tiao(name) {
        this.$router.push('/about_us');/*{ name: name }*/
      },
      u_logout(){
        let uuid = localStorage.getItem("uuid");
        let params = {ymhaohanToken:uuid};
        logout(params).then(res=>{
          if(res.flag==="1"){
            let storage = window.localStorage;
            storage.clear();
            this.$router.push('/login');
          }
          else {
            console.log("logout error");
          }
        });
        /*let uInf = localStorage.getItem("uInf");
              let locals = localStorage.getItem("uuid");
              locals = null;
              uInf = null;
        localStorage.setItem("uInf",uInf);
        localStorage.setItem("uuid",locals);*/
      }
    },
    mounted(){
      let uuid = localStorage.getItem("uuid");
      let params = {ymhaohanToken:uuid};
      getSystemCurrVersionNo(params).then(res=>{
        if(res.state===0){
          this.vers = res.currversion.pvalue;
        }
        else {
          Toast('信息获取失败，请重试！');
        }
      })
    }
  }
</script>

<style scoped>
  #big {
    height: 100%;
    width: 100%;
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
  .head-right>.ico>span {
    font-size: 0.3rem;
  }

  .contaner {
    margin-top: 0.3rem;
    background: #ffffff;
  }

  .contaner>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
  }

  .contaner>div>p {
    font-size:30px;
    text-align: center;
    padding-left: 25px;
    padding-right: 25px;
  }

  .contaner>div>span {
    font-size: 0.7rem;
  }

  .bakk {
    margin-top: 1rem;
    height: 100px;
  }

  .bakk>button {
    height: 1rem;
    width: 100%;
    font-size: 0.4rem;
    border: none;
    background: #ffffff;
    color: #8CA8FE;
  }
</style>
