<template>
  <div class="Message_notification">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push({name:'Personal',params:{index:'4'}})"></van-icon>
      </div>
      <div class="page-name">
        <span>联系我们</span>
      </div>
      <div></div>
    </div>
    <div class="show_n_e">
      <div @click="callPhone(number)">
        <span class="val-title"><img src="@/assets/img/phone.png"/>在线客服</span>
        <span>{{number}}</span>
      </div>
      <div>
        <span class="val-title"><img src="@/assets/img/email.png"/>E-mail地址</span>
        <span>{{email}}</span>
      </div>
      <div class="inputText">
          <input placeholder="请输入你的留言" type="text" v-model="inputtext" id="text"/>
          <div> <button @click="play">发送</button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant';
  import Vue from 'vue'
  import {addLeaveWord,getEmailandphone} from '../../api/index'
  Vue.use(Toast);
  export default {
    name:'Message_notification',
    data(){
      return{
        number:'020-4545321',
        email:'www.yanghfe@163.com',
        inputtext:''
      }
    },
    mounted(){
      this.getEmmailAndPhone();
    },
    methods:{
      // 调用拨号功能
      callPhone (phoneNumber) {
        window.location.href = 'tel://' + phoneNumber;
        console.log("call phone");
      },
      play(){
        if(this.inputtext==''){
          Toast('文字不能为空')
        }else{
          addLeaveWord({words:this.inputtext,ymhaohanToken:localStorage.getItem('uuid')}).then(res=>{
             if(res.msg=='留言成功！'){
               Toast('留言成功！');
             }
          })
        }
      },
      getEmmailAndPhone(){
        getEmailandphone({key:'在线客服/E-mail地址'}).then(res=>{
          for (let i = 0; i <res.data.mList.length ; i++) {
             if(res.data.mList[i].pkey=='在线客服'){
               this.number =res.data.mList[i].pvalue;
             }else if(res.data.mList[i].pkey=='E-mail地址'){
               this.email=res.data.mList[i].pvalue;
             }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .Message_notification{
    height: 100%;
    background-color: #ffffff;
  }
  .title{
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #5784fe;
    color: #ffffff;
  }
  .title>div{
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .show_n_e{
  }
  .show_n_e>div{
    text-align: center;
    height: 240px;
    width: 90%;
    margin: 50px auto;
    border: 3px solid #e7e7e7;
    border-radius: 5px;
    color: #00000080;
  }
  .show_n_e>div>span:nth-of-type(1){
    display: inline-block;
    width: 100%;
    margin-top: 70px;
  }
  .val-title{
    display: inline-block;
    margin-top: 15px;
  }
  .val-title>img{
    height: 25px;
    width: 30px;
    margin-right: 15px;
  }
  .show_n_e>div>span:nth-of-type(2){
    display: inline-block;
    margin-top: 20px;
  }
  .inputText{
    width: 90%;
    margin: 0 auto;
  }
  .inputText input{
    margin-top: 20px;
    border: 1px solid #000;
    width: 80%;
    padding-left: 20px;
    text-align: center;
    height: 70px;
    margin-bottom: 20px;
  }
  .inputText button{
     display: block;
     width: 200px;
     margin: 0 auto;
     height: 60px;
    color: #fff;
      background-color: #5784fe;
  }

</style>
