<template>
  <div>
    <div class="title">
      <div class="back" @click="$router.push('/recharge')">
        <span>关闭</span>
      </div>
      <div class="page-name">
        <span>账单详情</span>
      </div>
      <div></div>
    </div>
    <div class="b-val">
      <div class="b-all">
        <span>+{{info.money}}</span>
        <span>充值到账</span>
      </div>
      <div class="b-detal">
        <div>
          <span>交易账号</span>
          <span>{{info.owner}}</span>
        </div>
        <div>
          <span>交易说明</span>
          <span>充值余额</span>
        </div>
        <div>
          <span>账单分类</span>
          <span>充值</span>
        </div>
        <div>
          <span>创建时间</span>
          <span>{{ info.createtime | timeReplace }}</span>
        </div>
        <div>
          <span>订单号</span>
          <span>{{info.ordercode}}</span>
        </div>
        <div>
          <span>兑换码</span>
          <span>{{info.code}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCodeById} from '@/api/index.js'

  export default {
    data() {
      return {
        id: '',
        info: [],
        timer: '',
        uuid: ""
      }
    },
    filters: {
      // 时间戳转换,
          timeReplace: function(val){
            const add0 = function (endTimer) {
              return endTimer < 10 ? "0" + endTimer : endTimer;
            }

            if(val != '' && val != undefined){
              let time = new Date(val);
              let y = time.getFullYear();
              let m = time.getMonth() + 1;
              let d = time.getDate();
          return (y + "-" + add0(m) + "-" + add0(d));
        }
      }
    },
    created() {
      this.id = this.$route.params.id
      this.uuid = localStorage.getItem("uuid");
      this.getgetCodeById(this.id);
    },
    methods: {
      getgetCodeById: function (id) {
        let params = {
          id: id,
          ymhaohanToken: this.uuid
        }
        getCodeById(params).then(res => {
          this.info = res.data[0]
          console.log(res)
        })
      }
    }
  }

</script>

<style scoped>
  .title {
    display: flex;
    height: 100px;
    line-height: 100px;
    padding: 0 3%;
    font-size: 32px;
    background-color: #5784fe;
  }

  .title > div {
    color: #ffffff;
    flex: 1;
  }

  .page-name {
    font-size: 32px;
    text-align: center;
  }

  .b-val {
    padding: 3%;
  }

  .b-all {
    text-align: center;
    height: 200px;
    padding: 20px;
  }

  .b-all > span:nth-of-type(1) {
    font-size: 40px;
    color: #333333;
    display: inline-block;
    width: 100%;
  }

  .b-all > span:nth-of-type(2) {
    font-size: 28px;
    color: #999999;
  }

  .b-detal > div {
    height: 70px;
  }

  .b-detal > div:after {
    display: block;
    content: '';
    clear: both;
  }

  .b-detal > div > span {
    font-size: 28px;
  }

  .b-detal > div > span:nth-of-type(2) {
    float: right;
  }
</style>
