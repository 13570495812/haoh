<template>
    <div class="Collection_bottom" id="Collection_footer">
        <div class="footer-left" :class="{'footer-left-check':isclick}" @click="clickAll">
           <i></i>
           <span>全选</span>
        </div>
        <div class="footer-right">
          <button  @click="deleteAll">删除</button>
        </div>
    </div>
</template>

<script>
   import bus from '@/assets/js/bus.js'
    export default {
      data(){
        return{
          isclick:false,
          collectionArr:[]
        }
      },methods:{
        clickAll(){
          this.isclick=!this.isclick;
          bus.$emit('Cl_clickAll',this.isclick);
        },
        deleteAll(){
          bus.$emit('Cl_deleteAll',this.collectionArr);
        }
      },
      mounted(){
        bus.$on('Cl_itemdelete',(collectionArr)=>{
          collectionArr=collectionArr.filter(item=>item.isbol==true);
          this.collectionArr=collectionArr;
        })
      }
    }
</script>

<style scoped>
       #Collection_footer{
         width: 100%;
         background-color: #fff;
         height: 130px;
         position: fixed;
         bottom: 0;
         left: 0;
         display: flex;
         flex-flow: row;
         justify-content: space-between;
         padding-top: 20px;
       }
       #Collection_footer .footer-right button{
         width: 493px;
         height: 88px;
         background-color: #5784fe;
         border-radius: 44px;
         font-size: 34px;
         color: #ffffff;
         letter-spacing:2px;
         margin-right: 39px;
        }
       #Collection_footer .footer-left{
         margin-left: 37px;
         margin-top: 25px;
         font-size: 30px;
       }
       #Collection_footer .footer-left i{
         display: block;
         float: left;
         width: 36px;
         height: 36px;
         background-image: url(../../assets/img/check.png);
         -webkit-background-size: 100% 100%;
         background-size: 100% 100%;
         margin-right: 15px;
         color: #ccc;
       }
       #Collection_footer .footer-left-check i{
         background-image: url(../../assets/img/checked2.png);
         -webkit-background-size: 100% 100%;
         background-size: 100% 100%;
       }
</style>
