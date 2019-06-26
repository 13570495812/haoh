<template>
  <div id="Collaging">
    <div class="refund_header">
      <van-icon
        name="arrow-left"
        class="refund_return"
        @click="$router.back(-1)"
      />
      <span class="apply">正在拼团</span>
      <!-- <van-badges title="..." info="10"><img src="../../assets/img/more2.png" alt=""></van-badges> -->
    </div>
    <div class="content">
      <ul>
        <li v-for="team in teams">
          <span>{{team.username}}的团</span> -->
          <span>只差{{team.goodsnum - team.peoples.length-1}}人</span>
          <span>{{team.endtime}}结束</span>
          <button class="jointeam">参团</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { kaituanList } from "@/api/index.js";
import { Badge, BadgeGroup } from "vant";
import Timer from "../Activity/Timer"; 
import { format } from 'url';

Vue.use(Badge);
Vue.use(BadgeGroup);

export default {
  data() {
    return {
      teams: [
        {
          username: "念念不忘的人",
          leftnum: "1",
          lefttime: "2天22小时22分钟",
          endtime: 1543492380000,
          goodsnum: 10,
          peoples: [{}, {}]
        },
        {
          username: "Jason",
          need_num: "2",
          lefttime: "1天1小时22分钟",
          endtime: 1543492380000,
          goodsnum: 10,
          peoples: [{}, {}]
        }
      ],
      goodsid: ""
    };
  },
  components: {
      Timer : Timer
  },
  created: function() {
    this.searchList();
    for(let i =0; i<this.temas.length; i++) {
        this.teams[i].endtime = new Date(this.teams[i].endtime);
    }
    this.goodsid = this.$route.query.goodsid;
  },
  methods: {
    searchList() {
      let params = {
        goodsid: "b839d2b3b3bd4fb68359a9940d88e49e"
      };
      // console.log(params)
      kaituanList(params).then(res => {
        if (res.data && res.state == 0) {
          console.log(res.data);
          this.teams = res.data.mList;
        } else console.log(123);
      });
    }
  }
};
</script>


<style scoped>
#Collaging {
  position: relative;
  width: 100%;
  height: 100%;
}
.refund_header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: white;
  z-index: 100;
}
.refund_return {
  position: absolute;
  font-size: 45px;
  top: 20px;
  left: 10px;
}
.refund_header img {
  position: absolute;
  width: 40px;
  height: 10px;
  right: 40px;
  top: 40px;
}
.apply {
  font-size: 40px;
  line-height: 90px;
}
.content {
  position: relative;
  top: 90px;
  width: 100%;
  height: 500px;
  padding-top: 20px;
  background-color: rgb(243, 243, 241);
}
.content li {
  position: relative;
  background-color: rgb(250, 221, 221);
  border: 1px solid rgb(185, 181, 181);
  padding: 30px;
}
.content span:nth-child(2) {
  color: red;
}
.jointeam {
  position: absolute;
  display: inline-block;
  width: 100px;
  right: 10px;
  bottom: 12px;
  border-radius: 30px;
  color: #ffffff;
  background-color: rgb(247, 73, 73);
  padding: 15px;
}
.timer {
    position: absolute;
    right: 300px;
    top: 10px;
    background-color: none;
    color: red;
}
</style>
