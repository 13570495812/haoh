<template>
    <div class="app-body">
      <router-view/>
      <Footers class="footer-button"></Footers>
    </div>
</template>

<script>
  import Footers from './footer.vue'
    export default {
        data(){
          return{

          }
        },
        components:{
          Footers
        }
    }
</script>

<style scoped>
  .app-body{
    position: relative;
    height: 100%;
  }
  .app-body .footer-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 88px;
  }
</style>
