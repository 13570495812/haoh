<template>
    <div>
      <div class="title">
        <div class="back">
          <van-icon name="arrow-left" @click="$router.push('/personal')"></van-icon>
        </div>
        <div class="page-name">
          <span>查看物流</span>
        </div>
        <div class="more">
          <img class="seach" src="@/assets/img/seach.png"/>
          <img src="@/assets/img/more2.png"/>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "Logistics"
    }
</script>

<style scoped>

</style>
