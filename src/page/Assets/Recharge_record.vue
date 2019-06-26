<template>
  <div class="Recharge_record">
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left"></van-icon>
      </div>
      <div class="page-name">
        <span>记录</span>
      </div>
      <div></div>
    </div>
    <div>
      <div>
        <div class="yea-mon">{{y}}-{{m}}</div>
        <div class="record">
          <ul>
            <li class="record-val" v-for="item in val">
              <div class="head-img">
                <img :src="item.picture"/>
              </div>
              <div class="record-det">
                <span>{{item.paytype}}</span>
                <span>{{item.edittime}}</span>
                <span>{{item.edittime}}</span>
              </div>
              <div class="record-money">
                <span>{{item.money}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {extraList} from '@/api/index.js'

  export default {
    name: "Recharge_record",
    data(){
      return{
        time:"",
        y:"",
        m:"",
        y_m:"2017-11",
        val:[],
      }
    },
    mounted(){
      let uuid = localStorage.getItem("uuid");
      let params = {ymhaohanToken:uuid,pageNum:1,pageSize:100};
      extraList(params).then(res=>{
        if(res.code===0){
          this.val = res.data;
          this.time = res.edittime;
          this.y = moment(this.time).format("YYYY");
          this.m = moment(this.time).format("MM");
        }
      });
    }
  }
</script>

<style scoped>
  .Recharge_record{
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
  }
  .title>div{
    color: #ffffff;
    flex: 1;
  }
  .page-name{
    font-size: 32px;
    text-align: center;
  }
  .yea-mon{
    background-color: #f5f5f5;
    padding: 0 3%;
    height: 60px;
    line-height: 60px;
    font-size: 24px;
    color: #333333;
  }
  .record{
    padding: 0 3%;
  }
  .record-val{
    display: flex;
    height: 80px;
    padding: 20px 0;
    border-bottom: 1px solid #e7e7e7;
  }
  .head-img,.record-money{
    flex: 1;
  }
  .record-money>span{
    float: right;
    font-size: 30px;
    color: #333333;
  }
  .record-det{
    flex: 5;
  }
  .record-det>span:nth-of-type(1){
    display: inline-block;
    width: 100%;
  }
  .record-det>span:nth-of-type(2){
    font-size: 22px;
    color: #999999;
  }
  .record-det>span:nth-of-type(3){
    margin-left: 20px;
    font-size: 22px;
    color: #999999;
  }
  .head-img>img{
    height: 80px;
    width: 80px;
  }
</style>
