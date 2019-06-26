<template>
  <div class="payOk-group">
    <div class="payOk">
         <div class="payok-icon">
         </div>
         <div class="payok-text">
            支付成功
         </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "payOk"
    }
</script>

<style scoped>
  .payOk-group{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .payOk .payok-icon{
     margin:  0 auto;
    width: 300px;
    height: 300px;
    background-image: url(../../assets/img/checked3.png);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  .payOk .payok-text{
    margin-top: 20px;
  }
  .payOk{
    position: fixed;
    width: 60%;
    height: 700px;
    top: 50%;
    left: 50%;
    text-align: center;
    font-size: 70px;
    color: #5784fe;
    transform: translate(-50%,-50%);
  }

</style>
