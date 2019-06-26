<template>
  <div class="About_Us">
    <div class="head">
      <div class="left">
        <van-icon class="icon" name="arrow-left" />
      </div>
      关于我们
    </div>
    <div class="body">
      <div class="service">
        <div class="top">
          <img src="../../assets/img/phone.png" alt="">
          <div>在线客服</div>
        </div>
        <div class="butt">
          020-45454321
        </div>
      </div>
      <div class="service services">
        <div class="top">
          <img src="../../assets/img/email.png" alt="">
          <div>E-mail地址</div>
        </div>
        <div class="butt">
          www.yanghfe@163.com
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .About_Us {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
  }
  .head {
    height: 88px;
    text-align: center;
    background-color: #fff;
    line-height: 88px;
    font-family: HiraginoSansGB-W3;
    font-size: 32px;
    color: #333333;
    margin-bottom: 80px;
  }
  .head .left {
    position: absolute;
    left: 24px;
    top: 6px;
  }
  .head .left .icon {
    font-size: 29px;
    color: #333333;
  }
  .body {
    font-family: HiraginoSansGB-W3;
    font-size: 30px;
    color: #333333;
    text-align: center;
  }
  .body .top {
    margin-bottom: 20px;
  }
  .body .top img {
    display: inline-block;
  }
  .body .top div {
    display: inline-block;
  }
  .services {
    margin-top: 120px;
  }
</style>

