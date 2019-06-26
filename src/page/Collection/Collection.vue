<template>
    <div class="collection">
      <Conheader></Conheader>
      <ConBody></ConBody>
      <Consfooter v-show="isshow"></Consfooter>
    </div>
</template>

<script>
  import ConBody from './Collection_body.vue'
  import Conheader from './Collection_header.vue'
  import Consfooter from './Collection_bottom.vue'
  import bus from '@/assets/js/bus.js'
  export default {
        name: "Collection",
        data(){
          return{
            isshow:false
          }}
        ,
        components:{
          ConBody,
          Conheader,
          Consfooter
        },
        mounted(){
          let _this=this;
          bus.$on('Collectionisbol',function (value) {
            _this.isshow=value;
          })
        }
    }
</script>

<style scoped>
 .collection{
    height: 100%;
   background-color: #ffffff;
 }
</style>
