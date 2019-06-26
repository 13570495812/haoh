<template>
  <div id="app">
    <router-view />
  </div>
</template>
  <script>
    import {msglist} from './api/index'
    import { Notify } from 'vant';
    import Vue from 'vue'
    Vue.use(Notify);
  export default {
    name: "App",
    data() {
      return {
        uuid: "",
        msg:''
      };
    },
    mounted() {
      if(localStorage.getItem("uuid")){
        this.uuid=localStorage.getItem("uuid");
        let params = {ymhaohanToken: this.uuid, createtime: this.date_time};
        msglist(params).then(res=>{
          console.log(res)
          if(res.flag!=0){
            if(res.list!=false){
              this.msg=res.list[0].content;
              Notify({
                message: this.msg,
                duration: 3000,
                background: '#1989fa'
              });
            }
          }
        })
      }
    },
    methods: {
    }
  };
</script>

<style>
  button{
    box-shadow: none !important;
    border-radius: 0 !important;
  }
  .van-notify{
    height: 80px !important;
    font-size: 24px  !important;
    line-height: 1.2em  !important;
  }
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  html,
  body {
    height: 100%;
  }
  #app {
    width: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  html,
  body {
    -webkit-text-size-adjust: none;
  }
  html,
  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  input {
    -webkit-appearance: none;
  }
  selector {
    cursor: pointer;
  }
  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
  }
  .container {
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>

