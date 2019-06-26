<template>
  <div class="Exchange_code">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push('/assets_exchange')"></van-icon>
      </div>
      <div class="page-name">
        <span>兑换充值码</span>
      </div>
      <div></div>
    </div>
    <div class="e-code">
      <div class="e-code-val">
        <input style="width: 95%" type="text" class="s-show" contenteditable="true" v-model="val">
        <div>
        </div>
        <span class="note">请输入7位兑换码</span>
      </div>
      <div>
        <div class="exsub" @click="museCode">兑换</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useCode } from '@/api/index.js'
  import Vue from 'vue';
  import { Button } from 'vant';
  import { Toast } from 'vant';

  Vue.use(Toast);
  Vue.use(Button);
  export default {
    name: "Exchange_code",
    data(){
      return{
        val:"",
        uuid:'',
        code: ''
      }
    },
    created() {
      this.uuid = localStorage.getItem("uuid");
      this.code = localStorage.getItem("code");
    },
    methods:{
      e_code(){
        var spans = document.getElementsByClassName('e-span')
        var inp = document.getElementById('e-input')
        inp.onkeyup = function () {
          var values = inp.value
          for (var i = 0; i < spans.length; i++) {
            spans[i].innerHTML = values[i]
            if (spans[i].innerHTML === 'undefined') {
              spans[i].innerHTML = ''
            }
          }
        }
      },
      museCode(){
        if (this.val == "" || this.val == undefined || this.val == null){
          alert("请输入正确的兑换码")
        }else {
          let params = {ymhaohanToken:this.uuid,code:this.val};
          console.log(params)
          useCode(params).then(res=>{
            console.log(res)
            if(res.code===0){
              Toast('交易成功');
            }
            else {
              Toast('兑换失败，请重试！');
            }
          });
        }
        }
    },
  }
</script>

<style src="@/assets/css/toast.css"></style>
<style src="@/assets/css/Button_next.css"></style>
<style scoped>
  .Exchange_code{
    height: 100%;
    background-color: #ffffff;
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
  .e-code{
    padding: 0 3%;
  }
  .e-code-val{
    position: relative;
    padding: 85px 0 30px 0;
    overflow: hidden;
  }
  .s-show{
    width: 80%;
    height: 100px;
    font-size: 0.48rem;
    text-align: center;
    margin: 0 auto;
    position: relative;
    display: flex;
    border-bottom: solid 3px #ececec;
  }
  .s-show>span{
    flex: 1;
    margin: 0 6px;
    display: block;
    font-size: 80px;
    text-align: center;
    line-height: 110px;
    width: 84px;
    height: 110px;
    border-radius: 15px;
    border: solid 1px #999999;
  }
  #e-input{
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 110px;
    font-size: 70px;
  }
  .note{
    font-size: 24px;
    line-height: 70px;
    color: #5784fe;
  }
  .exsub{
    margin: 60px 0;
    width: 100%;
    height: 88px;
    line-height: 88px;
    background-color: #5784fe;
    border-radius: 15px;
    color: #ffffff !important;
    font-size: 34px !important;
    text-align: center;
  }
</style>
