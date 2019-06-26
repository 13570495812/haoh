<template>
    <div class="Collection_header" id="Collection_header">
        <div class="header_left" @click="back()">
           <span></span>
        </div>
        <div class="header_mid">
            <span>我的收藏</span>
        </div>
        <div class="header_right" @click="bianji">
           <span>{{msg}}</span>
        </div>
    </div>
</template>

<script>
  import bus from '@/assets/js/bus.js';
    export default {
      data(){
         return{
           msg:'编辑'
         }
      },
      methods:{
        bianji(){
          if(this.msg==='编辑'){
            bus.$emit('Collectionisbol',true);
            this.msg='完成'
          }else{
            bus.$emit('Collectionisbol',false);
            this.msg='编辑'
          }
        },
        back(){
          this.$router.push({path:'/Personal',query:{index:4}});
        }
      }
    }
</script>

<style scoped>
   *{
     margin: 0;
     padding: 0;
   }
   #Collection_header{
     width: 100%;
     line-height: 90px;
   }
   #Collection_header{
     display: flex;
     flex-flow: nowrap;
     justify-content: space-between;
   }
   #Collection_header .header_left{
     flex: 1;
     position: relative;
     height: 100%;
   }
   #Collection_header .header_left span{
     position: absolute;
     top: 25px;
     left: 25px;
    display: block;
    width: 17px;
    height: 30px;
    background-image: url(../../assets/img/left-arrow2.png);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
  }
  #Collection_header .header_mid{
    flex: 3;
    font-size: 36px;
    line-height: 90px;
    text-align: center;
  }
  #Collection_header .header_right{
    flex: 1;
    font-size: 30px;
    line-height: 90px;
    margin-right: 25px;
    text-align: right;
  }
</style>
