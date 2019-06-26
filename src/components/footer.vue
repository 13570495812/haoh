<template>
  <van-tabbar v-model="active" style="z-index:2">
    <van-tabbar-item :key="index" v-for="(item,index) in footerIconArr" :to="item.href" >
      <span :class="{'mui-tab-label':item.istrue}">
        {{item.title}}
      </span>
      <img
        slot="icon"
        :src='item.istrue?item.action:item.default'
      />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import bus from '@/assets/js/bus.js'
  import Vue from 'vue'
  import { Tabbar, TabbarItem } from 'vant';
  Vue.use(Tabbar).use(TabbarItem);
	export default {
		data() {
			return {
         footerIconArr:[{
           istrue:true,
           href:'/',
           title:'首页',
           default:require('../assets/img/home2.png'),
           action:require('../assets/img/home.png')},
           {istrue:false,href:'/activity',title:'活动',default:require('../assets/img/ativity2.png'),action:require('../assets/img/ativity.png')}
           ,{istrue:false,href:'/classify',title:'分类',default:require('../assets/img/classification2.png'),action:require('../assets/img/classification.png')},
           {istrue:false,href:'./ShoppingCart',title:'购物车',default:require('../assets/img/cart2.png'),action:require('../assets/img/cart1.png')}
           ,{istrue:false,href:'/Personal',title:'我的',default:require('../assets/img/personal2.png'),action:require('../assets/img/personal.png')}]
			      , active: 0
			 }
		},
		mounted() {
		  let className = document.getElementsByClassName('footer-button')[0].previousElementSibling;
       switch (className.className) {
         case 'homePage':
           this.active=0;
           break;
         case 'big':
           this.active=1;
           break;
         case 'cliss':
           this.active=2;
           break;
         case 'ShoppingCart':
           this.active=3;
           break;
         case 'body':
           this.active=4;
           break;
       }
		  bus.$on('onclass',(value)=>{
          this.active=value;
      })
		},
    methods:{
    },
    watch:{
      active(value){
        for (let i = 0,item; item=this.footerIconArr[i++];) {
          item.istrue=false;
        }
        this.footerIconArr[value].istrue=true;
      }
    }
	}
</script>

<style src="@/assets/css/footer.css"/>
