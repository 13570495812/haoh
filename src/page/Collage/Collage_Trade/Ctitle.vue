<template>
  <div class="title">
    <div class="back">
      <van-icon name="arrow-left" @click="$router.push('/detailspage')"></van-icon>
    </div>
    <div class="page-name">
      <span>订单详情</span>
    </div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: "ctitle",
    data(){
      return{
      }
    }
  }
</script>

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
</style>
