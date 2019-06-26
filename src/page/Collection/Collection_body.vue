<template>
  <div class="Commodity_card">
    <div class="Commodity_card_containers" v-if="isshow">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <div class="Card_wrap" :key="index" v-for="(item,index) in collectionArr" >
          <CartBody :items="item" :index="index"></CartBody>
      </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import  Vue from 'vue'
  import  {myCollect,deleteCollect} from'@/api/index.js'
  import CartBody from './Collection_card.vue'
  import { Toast } from 'vant';
  import bus from '@/assets/js/bus.js'

  Vue.use(Toast);
  export default{
    components:{
      CartBody,
    },
    data(){
      return{
        uuid:0,
        collectionArr:[],
        isshow:false,
        loading:false,
        finished: false
      }
    },
    mounted(){
      this.update();
      let _this =this;
      bus.$on('Cl_itemClick',function (item,index) {
         _this.collectionArr[index]=item;
         bus.$emit('Cl_itemdelete', _this.collectionArr);
      })
      bus.$on('Cl_deleteAll',(values)=>{
        if(values==false){
          Toast('请选择要删除的收藏')
        }else{
          for(let item of values){
            deleteCollect({id:item.id,ymhaohanToken:this.uuid}).then(
              res=>{
                Toast('删除成功')
                this.update();
              }
            )
          }
        }
      })
    },
    methods:{
      update(){
            this.loading = false
					 this.finished = true
        myCollect({ymhaohanToken:this.uuid,mPageSize:120}).then(res=>{
          console.log(res);
          if(res.state==1){
            return;
          }else {
            res.data.mList=res.data.mList.filter(item=>item.type==0);
            for (let item of res.data.mList) {
              item.isbol = false;
            }
            this.collectionArr = res.data.mList;
            console.log(this.collectionArr)
            this.isshow=true;
          }
        })
      },
      onLoad(){
        this.update()
      }
    },
    created(){
      this.uuid = localStorage.getItem("uuid");
    }
  }
</script>

<style scoped="scoped">

  .clearfix:after{
    display: block;
    content: "";
    clear: both;
  }

  .Commodity_card_header{
    text-align: left;
    height: 80px;
    font-size: 30px;
    color: #ccc;
    background-color: #fff;
  }
  .Commodity_card .Commodity_card_icon{
    display: block;
    float: left;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-image:url(../../assets/img/checked2.png);
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
    margin: 20px 10px;
  }
  .Commodity_card_header span:first-of-type{
    float: left;
    margin: 20px 0;
    margin-left: 10px;
  }
  .Commodity_card_header span:last-of-type{
    float: right;
    color: #000000;
    margin: 20px 0;
    margin-right: 20px;
  }
  button{
    margin: 0;
    padding: 0;
    border: none;
  }
  .movefile{
    position: relative;
    top: -17px;
    font-size: 30px;
    height: 100%;
    width: 50%;
    background-color: #ff5e57;
    color: white;
  }
  .deletefile{
    height: 100%;
    width: 50%;
    background-color: red;
    color: white;
  }
  .Card_wrap{
    margin-bottom: 20px;
    background-color: #fff;
  }
  .Commodity_card_containers{
    position: relative;
    width: 100%;
    margin-bottom: 60px;
  }
</style>
