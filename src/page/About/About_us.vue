<template>
  <div>
    <div class="title">
      <div class="back">
        <van-icon name="arrow-left" @click="$router.push('/setting')"></van-icon>
      </div>
      <div class="page-name">
        <span>关于我们</span>
      </div>
      <div></div>
    </div>
    <div class="a-body">{{msage}}</div>
  </div>
</template>

<script>
  export default {
    name:"About_us",
    data(){
      return{
        msage:'图文'
      }
    }
  }
</script>

<style src="@/assets/css/body.css"></style>
<style scoped>
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
  .a-body{
    padding: 0 3%;
    text-align: center;
    font-size: 32px;
    color: #333333;
  }
</style>

