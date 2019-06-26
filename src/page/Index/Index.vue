<template>
  <div class="homePage">
    <div class='homePage-body'>
      <header class="homePage-header">
      <div class="head-left">
        <van-icon
          class="icon"
          name="location"
        />{{city}}
      </div>
      <div class="homePage-midder">
        <div class="homePage-seach">
          <van-search
            @focus="searchgo"
            placeholder="输入商品名，或地名搜索"
            v-model="seachValue"
          />
        </div>
      </div>
      <div
        class="homePage-right"
        @click="shares"
      >
        <img src="../../assets/img/shaer2.png" /> 分享
      </div>
    </header>
    <!--轮播图-->
    <div class="SowingMap">
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
        >
          <img
            v-lazy="image.imgurl"
            @click="Wheeljump(image.id)"
            width="100%"
            height="100%"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <nav class="home-nav">
      <div
        v-for="item,index in Navarr"
        class="home-nav-box"
        :key="item.productClassId"
        @click="goback(item.herf,index)"
      >
        <div class="home-nav-img">
          <img :src="item.img" />
        </div>
        <span>{{item.className}}</span>
      </div>
    </nav>
    </div>
    <div class="home-activity" v-if="registershow" @click="$router.push('/register')">
      <img src="../../assets/img/Sharearedenvelope2.png" />
      <span class="home-activity-title">现金红包 注册即送</span>
    </div>
    <div
      class="Commodity-list"
      v-if="loading"
    >
      <div class="Commodity-header">
        <h1>商品推荐</h1>
      </div>
      <div class="new-commodity-content-box"  v-if="Selectionofgoods.length > 0">
        <p class="new-title">商家精选<span>好汉商城</span></p>
        <div class="NCC-box-group">
          <div class="box" v-for="item in Selectionofgoods" @click="Godetails(item.goodsid)">
            <img :src="item.goodsMedias[0].mediaId" alt="">
            <p>{{item.goodsName}}</p>
          </div>
        </div>
      </div>
      <div class="new-commodity-content-box"  v-if="loading">
        <p class="new-title">实惠好货<span>好汉商城</span></p>
        <div class="NCC-box-group">
          <div class="box" v-for="item in Goodgoods" @click="Godetails(item.goodsid)">
            <img :src="item.goodsMedias[0].mediaId" alt="">
            <p>{{item.goodsName}}</p>
          </div>
        </div>
      </div>

      <div class="new-commodity-content-box"  v-if="loading" style="margin-bottom: 20px;">
        <p class="new-title">新品推荐<span>好汉商城</span></p>
        <div class="NCC-box-group">
          <div class="box" v-for="item in NewShopping" @click="Godetails(item.goodsid)">
            <img :src="item.picture" alt="">
            <p>{{item.goodsName}}</p>
          </div>
        </div>
      </div>
      <Guesslike
        v-if="loadingmy"
        :carouselList="carouselList"
      ></Guesslike>
    </div>
    <div id="I-popup" v-if="CutXieyi&&CutXieyi2">
      <div class="I-box">
        <div class="I-title">
          用户协议
        </div>
        <div class="I-contain">
          <textarea style="width:100%; height:100%;" aria-readonly>
牛牛好汉商城与用户共同确认：
 牛牛好汉商城（以下称"本商城"）隐私权保护声明系本商城保护用户个人隐私的承诺。鉴于网络的特性，本商城将无可避免地与您产生直接或间接的互动关系，故特此说明本商城对用户个人信息所采取的收集. 使用和保护政策，请您务必仔细阅读：
一. 协议内容及签署
1. 您在注册牛牛好汉商城账户时点击提交“我已阅读并且同意牛牛好汉商城的使用协议” 即视为您接受本协议及各类规则，并同意受其约束。
2. 牛牛好汉商城有权根据需要不时地制订. 修改本协议及/或各类规则，并以网站公示的方式进行公告。变更后的协议和规则一经在用户端公布后，立即自动生效。
二. 在使用牛牛好汉商城服务过程中，您承诺遵守下列使用规范：
1. 会员承诺其注册信息的正确性。
2. 如果会员提供给牛牛好汉商城的资料有变更，请及时做出相应的修改。
3. 会员不得出现恶意注册恶意点击等行为。
4. 所有返还商品均会按照协议返还到会员账户，返还可用于商城消费（返还商品除外），不可以申请提现。
5. 牛牛好汉商城会员帐户如果一年内无登陆记录，将被视为休眠账户作冻结处理。
6. 超过两年无登陆记录，牛牛好汉商城保留注销该帐户的权利。
7. 在使用牛牛好汉商城服务过程中实施的所有行为均遵守国家法律. 法规等规范性文件及牛牛好汉商城各项规则的规定和要求，不违背社会公共利益或公共道德，不损害他人的合法权益，不违反本协议及相关规则。您如果违反前述承诺，产生任何法律后果的，您应以自己独自承担所有的法律责任，并确保牛牛好汉商城免于因此产生任何损失。如牛牛好汉商城因此承担相应责任或者赔偿相关损失，则您承诺牛牛好汉商城可以向您追偿，相关责任或损失由您最终承担。
8. 在交易过程中，遵守诚实信用原则，不扰乱网上交易的正常秩序，不从事与网上交易无关的行为。
9. 不以虚构或歪曲事实的方式不当评价商品和服务。
10. 不对牛牛好汉商城平台上的任何数据作商业性利用，包括但不限于在未经牛牛好汉商城事先书面同意的情况下，以复制、传播等任何方式使用牛牛好汉商城站上展示的资料。
11. 牛牛好汉商城严禁会员通过以下行为获得利益，一经发现，牛牛好汉商城有权追回会员账号及其关联账号（关联账户由牛牛好汉商城根据自身系统数据判定，判定依据包括但不限于会员登记信息. 交易信息. 第三方反馈信息. 设备终端信息. IP地址等，下同）并视情节严重可中止会员账号直至注销会员账号，同时该会员必须承担由此给牛牛好汉商城带来的所有损失：
a)购买产品后恶意取消订单；
b)劫持流量；
c)违反购物所在网站用户协议及其规则；
d)其他违反法律法规或者违反诚实信用. 公平原则的行为。
12. 牛牛好汉商城严禁各种针对牛牛好汉商城活动的作弊行为。对于查实的作弊行为，我们有权收回该账号及其关联账号全部的邀请奖励. 取消邀请资格，扣除一定的返还，并列入牛牛好汉商城黑名单账户。作弊行为包括但不限于：使用相同的电脑或设备，相同的IP地址在同一天内注册多个账号，以骗取邀请奖励的行为；以注册送钱或注册送代金券等利益诱导用户来注册牛牛好汉商城获取奖励的行为；获取返还后恶意取消交易或退款退货的行为等。
13. 牛牛好汉商城禁止会员在牛牛好汉商城的合作商城内进行任何形式的推广。
14. 您不得使用任何装置. 软件或例行程序干预或试图干预牛牛好汉商城平台的正常运作或正在牛牛好汉商城上进行的任何交易. 活动。您不得采取任何将导致不合理的庞大数据负载加诸牛牛好汉商城网络设备的行动，否则牛牛好汉商城将追究您的相关责任，包括但不限于取消相关返还. 收回相关邀请奖励. 取消邀请资格. 列入牛牛好汉商城黑名单账户. 冻结账户或者注销账户等。如造成牛牛好汉商城损失或者承担相应法律责任的，牛牛好汉商城有权要求您赔偿并最终承担相应的责任。
您了解并同意牛牛好汉商城有权作如下处理：
1. 牛牛好汉商城有权对您是否违反上述承诺做出单方认定，并根据单方认定结果适用规则予以处理，这无须征得您的同意。
2. 经国家行政或司法机关的生效法律文书确认您存在违法或侵权行为，或者牛牛好汉商城根据自身的判断，认为您的行为涉嫌违反本协议和/或规则的条款或涉嫌违反法律法规的规定的，则牛牛好汉商城有权在牛牛好汉商城上公示您的该等涉嫌违法或违约行为及牛牛好汉商城已对您采取的措施。
3. 对于您在牛牛好汉商城上发布的涉嫌违法或涉嫌侵犯他人合法权利或违反本协议和/或规则的信息，牛牛好汉商城有权予以删除，且按照规则的规定进行处罚。
4. 对于您在牛牛好汉商城上实施的行为，包括您未在牛牛好汉商城上实施但已经对牛牛好汉商城及其用户产生影响的行为，牛牛好汉商城有权单方认定您行为的性质及是否构成对本协议和/或规则的违反，并据此作出相应处罚。您应自行保存与您行为有关的全部证据，并应对无法提供充要证据而承担的不利后果。
5. 对于您涉嫌违反承诺的行为对任意第三方造成损害的，您均应当以自己的名义独立承担所有的法律责任，并应确保牛牛好汉商城免于因此产生损失或增加费用。如牛牛好汉商城因此承担相应责任或者赔偿相关损失，则您承诺牛牛好汉商城可以向您追偿，相关责任或损失由您最终承担，相关损失包括合理的律师费用. 相关机构的查询费用等。
6. 如您涉嫌违反有关法律或者本协议之规定，使牛牛好汉商城遭受任何损失，或受到任何第三方的索赔，或受到任何行政管理部门的处罚，您应当赔偿牛牛好汉商城因此造成的损失及（或）发生的费用，包括合理的律师费用. 相关机构的查询费用等。
7. 牛牛好汉商城上展示的资料（包括但不限于文字. 图表. 标识. 图像. 数字下载和数据编辑）均为牛牛好汉商城或其内容提供者的财产或者权利；牛牛好汉商城上所有内容的汇编是属于牛牛好汉商城的著作权；牛牛好汉商城上所有软件都是牛牛好汉商城或其关联公司或其软件供应商的财产或者权利，上述知识产权均受法律保护。如您侵犯上述权利，牛牛好汉商城有权根据规则对您进行处理并追究您的法律责任。
8. 牛牛好汉商城并无能力对您的相关注册. 登记资料进行实质性审查，因此一旦因您的的注册. 登记资料的问题导致的相关后果应全部由您自己承担，牛牛好汉商城对此不承担责任。如果根据法律法规要求牛牛好汉商城先行承担了相关责任，那么您承诺牛牛好汉商城有权向您追偿，由您最终承担上述责任。
9.如果手机号更换请务必到牛牛好汉商城线下店申请注销原账户，如因为客户未书面告知造成损失由客户自行承担。如果根据法律法规要求牛牛好汉商城先行承担了相关责任，那么您承诺牛牛好汉商城有权向您追偿，由您最终承担上述责任。
三、责任范围和责任限制
1．我们将通过您的IP地址来收集非个人化的信息，例如您的浏览器性质、操作系统种类、给您提供接入服务的ISP的域名等，以优化在您计算机屏幕上显示的页面。通过收集上述信息，我们亦进行客流量统计，从而改进网站的管理和服务。
2. 我们承诺在未经您同意及确认之前，本商城不会将您为参加本商城之特定活动所提供的资料利用于其它目的。
3. 牛牛好汉商城将对您所提供的资料进行严格的管理及保护，将使用相应的技术，防止您的个人资料丢失、被盗用或遭篡改。牛牛好汉商城将在必要时委托专业技术人员代为对该类资料进行电脑处理，以符合专业分工时代的需求。如牛牛好汉商城将电脑处理之通知送达予您。而您未在通知规定的时间内主动明示反对，本商城将推定您已同意。
4. 当政府机关依照法定程序要求牛牛好汉商城披露个人资料时，牛牛好汉商城将根据执法单位之要求或为公共安全之目的提供个人资料。在此情况下的任何披露，牛牛好汉商城均不承担任何责任。
5. 牛牛好汉商城将建立和维持合理的程序，以保护未成年人个人资料的保密性及安全性。牛牛好汉商城郑重声明：任何18岁以下的未成年人参加网上活动应事先得到家长或其法定监护人（以下统称为"监护人"）的可经查证的同意。
5.1 监护人应承担保护未成年人在网络环境下的隐私权的首要责任。
5.2 牛牛好汉商城收集未成年人的个人资料，仅为回复未成人特定要求的目的，一旦回复完毕即从记录中删除，而不会保留这些资料做进一步的利用。
5.3 未经监护人同意，牛牛好汉商城将不会使用未成年人的个人资料，也不会向任何第三方披露或传送可识别该未成人的个人资料。牛牛好汉商城如收集监护人或未成年人的姓名或其它网络通讯资料之目的仅是为获得监护人同意，如果在经过一段合理时间仍未获得同意时，将主动从记录中删除此类资料。
5.4 若经未成人之监护人同意，牛牛好汉商城可对未成年人之个人资料进行收集，牛牛好汉商城将向监护人提供：
5.4.1 审视自其子女或被监护人收集之资料的机会；
5.4.2 拒绝其子女或被监护人的个人资料被进一步的收集或利用的机会；
5.4.3 变更或删除其子女或被监护人个人资料的方式。
5.5 监护人有权拒绝本商城与其子女或被监护人做进一步的联络。
5.6 牛牛好汉商城收集未成年人的个人资料，这些资料只是单纯作为保护未成年人参与网络活动时的安全，而非作为其它目的之利用。牛牛好汉商城保证不会要求未成年人提供额外的个人资料，以作为允许其参与网上活动的条件。
6. Cookies是指一种技术，当使用者访问设有Cookies装置的牛牛好汉商城时，牛牛好汉商城服务器会自动发送Cookies至您的浏览器内，并储存到您的电脑硬盘内，此Cookies便负责记录日后您到访牛牛好汉商城的种种活动、个人资料、浏览习惯、消费习惯甚至信用记录。运用Cookies技术，牛牛好汉商城能够为您提供更加周到的个性化服务。牛牛好汉商城将会运用Cookies追访您的购物喜好，从而向您提供感兴趣的信息资料或储存密码，以便您访问本商城时不必每次重复输入密码。
四、免责
除上述第三-4条规定属免责外，下列情况时本商城亦毋需承担任何责任：
1．由于您将用户密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露。
2．任何由于黑客攻击、计算机病毒侵入或发作、因政府管制而造成的暂时性关闭等影响网络正常经营之不可抗力而造成的个人资料泄露、丢失、被盗用或被篡改等。
3．由于与牛牛好汉商城链接的其它网站所造成之个人资料泄露及由此而导致的任何法律争议和后果。
注：本商城之保护隐私声明的修改及更新权均属于牛牛好汉商城
          </textarea>
        </div>
        <div class="I-btn-group">
          <button @click="cancel">取消</button>
          <button @click="popupClick">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import bus from "@/assets/js/bus.js";
  import { Swipe, SwipeItem } from "vant";
  import { Search } from "vant";
  import { Lazyload } from "vant";
  import HomeSupCmd from "./HomeSupCmd.vue";
  import Guesslike from "./Guesslike.vue";
  import {
    logout,
    getClassList,
    Indexpage,
    GetList,
    activityGoodsList,
    caiNinLike,
    getxieyi
  } from "@/api/index.js";
  Vue.use(Lazyload);
  Vue.use(Search);
  Vue.use(Swipe).use(SwipeItem);
  export default {
    data() {
      return {
        seachValue: "", //搜索内容，
        images: [],
        httpUrl: "http://www.ymhaohan.cn/",
        Navarr: [
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          },
          {
            Imgsrc: require("../../assets/img/Secondskill.png"),
            title: "标题内容"
          }
        ],
        params: {
          type: 0,
          pageSize: 6,
          pageNum: 1,
          status: 0
        },
        //商品推荐
        Selectionofgoods: [],
        //实惠好货
        Goodgoods: [],
        //新品推荐
        NewShopping: [],
        //加载状态
        loading: false,
        loadings: false,
        loadingmy: false,
        carouselList: [],
        city: "定位中",
        uuid: 0,
        center: {
          lng: 116.40387397,
          lat: 39.91488908
        },
        zoom: 15,
        registershow: false, //红包是否显示
        CutXieyi:false,
        CutXieyi2:false,
        xieyidata:''
      };
    },
    mounted() {
      if(this.$route.params.cutId){
        this.CutXieyi=true;
      }
      this.islogin();
      this.getxieyi();
      caiNinLike({ ymhaohanToken: this.uuid }).then(res => {
        if (res.flag == "0") {
          this.loadingmy = false;
        } else {
          this.carouselList = res.goodsList;
          if (this.carouselList == false) {
            this.loadingmy = false;
          } else {
            this.loadingmy = true;
          }
        }
      });
      getClassList().then(res => {
        console.log(res)
        // res.splice(0, 1, { className: "秒杀", herf: "/activity" });
        res[0].img = require('../../assets/img/yinliao ('+0+').png')
        res[1].img = require('../../assets/img/yinliao ('+1+').png')
        res[2].img = require('../../assets/img/yinliao ('+2+').png')
        res[3].img = require('../../assets/img/yinliao ('+3+').png')
        res[4].img = require('../../assets/img/yinliao ('+4+').png')
        res[5].img = require('../../assets/img/yinliao ('+5+').png')
        res[6].img = require('../../assets/img/yinliao ('+6+').png')
        res[7].img = require('../../assets/img/yinliao ('+7+').png')
        res[8].img = require('../../assets/img/yinliao ('+8+').png')
        res[9].img = require('../../assets/img/suo (2).png')
        // res[9].img = require('../../assets/img/yinliao.png')
        this.Navarr = res;
      });
      Indexpage().then(res => {
        for (let i = 0, item; (item = res.goodsList1[i++]); ) {
          if (item.goodsMedias != false) {
            item.goodsMedias[0].mediaId =
              this.httpUrl + item.goodsMedias[0].mediaId;
            if (item.goodsMedias[1]) {
              item.goodsMedias[1].mediaId =
                this.httpUrl + item.goodsMedias[1].mediaId;
            } else {
              item.goodsMedias.push({
                mediaId:
                  "http://www.jzdlink.com/wordpress/wp-content/uploads/2017/10/huxiaodai-128x128.jpg"
              });
            }
          } else {
            item.goodsMedias.push({
              mediaId:
                "http://www.jzdlink.com/wordpress/wp-content/uploads/2017/10/huxiaodai-128x128.jpg"
            });
          }
        }
        for (let i = 0, item; (item = res.goodsList2[i++]); ) {
          if (item.goodsMedias != false) {
            item.goodsMedias[0].mediaId =
              this.httpUrl + item.goodsMedias[0].mediaId;
            if (item.goodsMedias[1]) {
              item.goodsMedias[1].mediaId =
                this.httpUrl + item.goodsMedias[1].mediaId;
            } else {
              item.goodsMedias.push({
                mediaId:
                  "http://www.jzdlink.com/wordpress/wp-content/uploads/2017/10/huxiaodai-128x128.jpg"
              });
            }
          } else {
            item.goodsMedias.push({
              mediaId:
                "http://www.jzdlink.com/wordpress/wp-content/uploads/2017/10/huxiaodai-128x128.jpg"
            });
          }
        }
        this.Selectionofgoods = res.goodsList1;
        this.Goodgoods = res.goodsList2;
        if (this.Goodgoods == false && this.Selectionofgoods == false) {
          this.loading = false;
        } else {
          this.loading = true;
        }
      });
      GetList({ type: 1 }).then(res => {
        for (let item of res.data) {
          if(item.val.includes('/')){
            var ids =item.val.split('/');
            var id=ids[ids.length-1];
            this.images.push({imgurl:this.httpUrl + item.img,id:id});
          }else{
            this.images.push({imgurl:this.httpUrl + item.img,id:false});
          }
        }
      });
      activityGoodsList({ type: 5, pageSize: 6, pageNum: 1, status: 0 }).then(
        res => {
          console.log(res);
          for (let i = 0, item; (item = res.data[i++]); ) {
            item.picture = this.httpUrl + item.picture;
          }
          this.NewShopping = res.data;
          this.loadings = true;
        }
      );
    },
    methods: {
      cancel(){
        let uuid = localStorage.getItem("uuid");
        let params = {ymhaohanToken:uuid};
        logout(params).then(res=>{
          if(res.flag==="1"){
            let storage = window.localStorage;
            storage.clear();
            this.$router.push('/login');
          }
          else {
            console.log("logout error");
          }
        });
      },
      popupClick(){
        this.CutXieyi=false;
      },
      getxieyi(){
        getxieyi().then(
          res=>{
            if(res.data.mList){
              for (let i = 0; i <res.data.mList.length ; i++) {
                if(res.data.mList[i].pkey=='用户协议'){
                  this.xieyidata=res.data.mList[i].pvalue;
                }
              }
            }
            this.CutXieyi2=true;
          }
        )
      },
      islogin() {
        // 定位
        let _this=this
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              var longitude = position.coords.longitude;
              var latitude = position.coords.latitude;
              // 使用百度地图JS API
              var point = new BMap.Point(longitude, latitude);
              var geoc = new BMap.Geocoder();
              geoc.getLocation(point, function(rs) {
                var addComp = rs.addressComponents;
                _this.city=addComp.city
              });
            },
            function(error) {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  console.log("用户拒绝对获取地理位置的请求。");
                  break;
                case error.POSITION_UNAVAILABLE:
                  console.log("位置信息是不可用的。");
                  break;
                case error.TIMEOUT:
                  console.log("请求用户地理位置超时。");
                  break;
                case error.UNKNOWN_ERROR:
                  console.log("未知错误npm 。");
                  break;
              }
            }
          );
        } else {
          alert("浏览器不支持定位功能！");
        }
      },
      Godetails(value) {
        //跳转到商品详情
        this.$router.push({ path: "Particulars/" + value });
      },
      searchgo() {
        //点击跳转搜索
        this.$router.push({ path: "/product_list" });
      },
      goback(herf,index) {
        if (herf != undefined) {
          bus.$emit("onclass", 1);
          this.$router.push({ path: herf });
        } else {
          index +=1;
          this.$router.push({ path: "/classify" ,query:{shows:index}});
          bus.$emit("onclass", 2);
        }
      },
      shares() {
        if (navigator.userAgent.indexOf("Html5Plus") > -1) {
          //5+ 原生分享
          window.plusShare(
            {
              title: "好汉商城", //应用名字
              content: "这是分享的具体内容....",
              href: location.href, //分享出去后，点击跳转地址
              thumbs: ["https://api.ixiaowai.cn/api/api.php?b5b7a50d"] //分享缩略图
            },
            function(result) {
              //分享回调
            }
          );
        } else {
          //原有wap分享实现
        }
      }
      ,Wheeljump(id){
        if(id){
          this.$router.push({ path: "Particulars/" +id});
        }else{
          return;
        }
      }
    },
    components: {
      HomeSupCmd,
      Guesslike
    },
    created() {
      //获取uuid
      this.uuid = localStorage.getItem("uuid");
      //判断用户是否登录,显示红包
      if( this.uuid == ''){
        this.registershow = true
      }
    }
  };
</script>
<style src='@/assets/css/homePage.css'>
</style>
