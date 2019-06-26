<template>
	<div class="ShoppingCart-control" id="ShoppingCart-control">
		<div class="btn-group">
		<button class="btn install" @click="AddCollects">移入收藏夹</button>
		<button class='btn delete' @click="deleteshop">删除</button>
		</div>
    <van-dialog
      className='deletedialog'
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
       message="确定要删除吗"
      :show-cancel-button='true'
    >
    </van-dialog>
	</div>
</template>

<script>
  import Vue from 'vue'
  import { Dialog } from 'vant';
  import bus from '../../assets/js/bus'
  import {addCollect} from '@/api/index.js'
  Vue.use(Dialog);
  import { Toast } from 'vant';
  Vue.use(Toast);
	export default{
	  data(){
	    return{
	     show:false,
        cartlist:[],
        indexs:[],
        uuid:0,
	    }
    },
		  methods:{
        AddCollects(){
          if(this.cartlist.filter(item=>item.isbol==true).length>0){
              for (let i = 0; i <this.cartlist.length; i++) {
                addCollect({type:0,target:this.cartlist[i].goodsId,ymhaohanToken:this.uuid}).then(res=>{
                  Toast(res.msg);
                })
              }
          }else{
            Toast('请选择商品')
          }
        },
          deleteshop() {
            this.show = true;
          },
        beforeClose(action,done){
          if (action === 'confirm') {
            if(this.cartlist.filter(item=>item.isbol==true).length>0){
              bus.$emit('deleteALL',this.indexs);
              done();
            }else{
              console.log(this.cartlist.filter(item=>item.isbol==true))
              Toast('请选择要删除的商品')
              done();
              return;
            }
            // console.log('成功删除')
            // setTimeout(done, 1000);
          } else {
            done();
          }
        }
      },
    mounted(){
        var left =this;
        bus.$on('getItemed',(val,index)=>{
          left.cartlist=val.filter(item=>item.isbol==true);
          let objid =""
          for (let i = 0,item;item=left.cartlist[i++];) {
            if(i<=1){
              objid = "'"+item.goodsObjectId+"'";
            }else{
              objid +=",'"+item.goodsObjectId+"'";
            }
          }
           left.indexs.push(objid);
        })
      bus.$on('deletesure',(val)=>{
          this.cartlist=[];
          this.indexs=[];
          this.show=false;
      })
    },
    created() {
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
    }
	}
</script>
<style src="../../assets/css/deleteshopping.css"></style>
<style>
  .ShoppingCart-control .van-dialog .van-button--large>span {
    color:  #5784fe !important;
  }
  .ShoppingCart-control .van-button{
    margin: 0;
  }
</style>
<style scoped>
	.ShoppingCart-control{
		padding: 20px;
		width: 100%;
		height: 90px;
		box-sizing: border-box;
		background-color: #fff;
	}
  .ShoppingCart-control	.btn-group{
		float: right;
	}
  .ShoppingCart-control	.btn{
		margin-right: 25px ;
		padding: 10px;
    border-radius: 10em;
		background:none;
		font-size: 30px;
	}
  .ShoppingCart-control	.clear{
		border: 1px solid deeppink;
		color: deeppink;
	}
  .ShoppingCart-control	.install{
		border: 1px solid #007AFF;
		color: #007AFF;
	}
  .ShoppingCart-control	.delete{
		padding: 10px 20px;
		border: 1px solid red;
		color: red;
		margin-right: 0px ;
	}
</style>
<style>
  .ShoppingCart-control  .van-button{
    background-color: white !important;
  }
</style>
