<style type="text/css">
  * {
    box-sizing: border-box;
  }

  ul {
    list-style-type: none;
  }

  body {
    width: 100%;
    height: 100%;
    font-family: Verdana, sans-serif;
    background: #ffffff;
  }
  #timevue{
    position: fixed;
    width:100%;
    height: 100%;
    padding-top: 200px;
    padding-bottom: 200px;
    background: #ececec;
  }
  #calendar{
    width:80%;
    margin: 0 auto;
    /*box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.1), 0 1px 5px 0 rgba(0,0,0,0.12);*/
  }
  .month {
    width: 100%;
    background: #00B8EC;
  }

  .month ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .year-month:hover {
    background: rgba(150, 2, 12, 0.1);
  }

  .choose-year {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 0.5rem;
  }

  .choose-month {
    text-align: center;
    font-size: 1rem;
  }

  .arrow {
    padding: 30px;
  }

  .arrow:hover {
    background: rgba(100, 2, 12, 0.1);
  }

  .month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
  }

  .weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #00B8EC;
    display: flex;
    flex-wrap: wrap;
    color: #FFFFFF;
    justify-content: space-around;
  }

  .weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
  }

  .days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .days li {
    list-style-type: none;
    display: inline-block;
    width: 14.2%;
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
    font-size: 0.4rem;
    color: #000;
  }

  .days li .active {
    padding: 6px 10px;
    border-radius: 50%;
    background: #00B8EC;
    color: #fff;
  }

  .days li .other-month {
    padding: 5px;
    color: gainsboro;
  }

  .days li:hover {
    background: #e1e1e1;
  }
</style>


<template>
  <div id="timevue">
    <div id="calendar">
      <div class="month">
        <ul>
          <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
          <li class="year-month" @click="pickYear(currentYear,currentMonth)">
            <span class="choose-year">{{ currentYear }}</span>
            <span class="choose-month">{{ currentMonth }}月</span>
          </li>
          <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
      </div>
      <ul class="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color:red">六</li>
        <li style="color:red">日</li>
      </ul>
      <ul class="days">
        <li @click="pick(day)" v-for="day in days">
          <!--今天-->
          <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
          <span v-else>
   <!--今天-->
   <span v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()" class="active">{{ day.getDate() }}</span>
   <span v-else>{{ day.getDate() }}</span>
   </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<!--<script src="http://cdnjs.cloudflare.com/ajax/libs/vue/1.0.18/vue.min.js" type="text/javascript" charset="utf-8"></script>-->
<script type="text/javascript">
  import Vue from 'vue'
  export default {
    data() {
      return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        days: [],
        showclose: true
      }
    },
    methods: {
      initData: function (cur) {
        var date;
        if (cur) {
          date = new Date(cur);
        } else {
          date = new Date();
        }
        this.currentDay = date.getDate();
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentWeek = date.getDay(); // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7;
        }
        var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
        console.log("today:" + str + "," + this.currentWeek);
        this.days.length = 0;
        // 今天是周日，放在第一行第7个位置，前面6个
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str);
          d.setDate(d.getDate() - i);
          console.log("y:" + d.getDate());
          this.days.push(d);
        }
        for (var i = 1; i <= 35 - this.currentWeek; i++) {
          var d = new Date(str);
          d.setDate(d.getDate() + i);
          this.days.push(d);
        }
      },
      pick: function (date) {
        console.log(this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
        localStorage.setItem('timer',this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()))
      },
      pickPre: function (year, month) {
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(dx) 参数dx为 上月最后一天的前后dx天
        var d = new Date(this.formatDate(year, month, 1));
        d.setDate(0);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },
      pickNext: function (year, month) {
        var d = new Date(this.formatDate(year, month, 1));
        d.setDate(35);
        this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
      },
      pickYear: function (year, month) {
        alert(year + "," + month);
      },

      // 返回 类似 2016-01-02 格式的字符串
      formatDate: function (year, month, day) {
        var y = year;
        var m = month;
        if (m < 10) m = "0" + m;
        var d = day;
        if (d < 10) d = "0" + d;
        return y + "-" + m + "-" + d
      },
    },
    created: function () {
      this.initData(null);
    }
  }
</script>
