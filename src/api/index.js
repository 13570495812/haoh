'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GetList = GetList;
exports.read = read;
exports.bill = bill;
exports.detailByProductId = detailByProductId;
exports.Indexpage = Indexpage;
exports.towxpay = towxpay;
exports.getSignature = getSignature;
exports.activityGoodsList = activityGoodsList;
exports.getAllActiveTitle = getAllActiveTitle;
exports.activityGoodsDetail = activityGoodsDetail;
exports.uploadFile = uploadFile;
exports.detail = detail;
exports.addCollect = addCollect;
exports.deleteCollect = deleteCollect;
exports.myCollect = myCollect;
exports.deleteCollect1 = deleteCollect1;
exports.getGoodCouponList = getGoodCouponList;
exports.couponList = couponList;
exports.receiveCoupon = receiveCoupon;
exports.getClassList = getClassList;
exports.searchGoods = searchGoods;
exports.keepConn = keepConn;
exports.list = list;
exports.sendMessaEx = sendMessaEx;
exports.add = add;
exports.add2 = add2;
exports.login = login;
exports.usermessage = usermessage;
exports.member = member;
exports.checklogin = checklogin;
exports.updateMember = updateMember;
exports.getUserCouponList = getUserCouponList;
exports.phoneUpdate = phoneUpdate;
exports.appWeiXinAuth = appWeiXinAuth;
exports.GetloginStatus = GetloginStatus;
exports.myAddr = myAddr;
exports.newAdd = newAdd;
exports.addrupdate = addrupdate;
exports.deleteAddr = deleteAddr;
exports.getSystemCurrVersionNo = getSystemCurrVersionNo;
exports.orderList = orderList;
exports.addshuxing = addshuxing;
exports.weifahuolist = weifahuolist;
exports.yifahuolist = yifahuolist;
exports.setDefault = setDefault;
exports.myDefaultAddr = myDefaultAddr;
exports.beReturned = beReturned;
exports.waitlist = waitlist;
exports.ordelist = ordelist;
exports.msglist = msglist;
exports.unRead = unRead;
exports.getPaySuccessCode = getPaySuccessCode;
exports.caiNinLike = caiNinLike;
exports.pinglun = pinglun;
exports.createGoodsObject = createGoodsObject;
exports.logout = logout;
exports.extraList = extraList;
exports.topay = topay;
exports.DeleteShop = DeleteShop;
exports.useCode = useCode;
exports.pdetail = pdetail;
exports.getpinglunlist = getpinglunlist;
exports.towapwxpay = towapwxpay;
exports.towapalipay = towapalipay;
exports.collagePage = collagePage;
exports.toDayCollage = toDayCollage;
exports.joinTeam = joinTeam;
exports.pintuanING = pintuanING;
exports.getActGood = getActGood;
exports.kaituanList = kaituanList;
exports.openKaiTuan = openKaiTuan;
exports.quxiaodingdan = quxiaodingdan;
exports.querenshouhuo = querenshouhuo;
exports.getGoodObjectById = getGoodObjectById;
exports.toYuePay = toYuePay;
exports.towxpayRecharge = towxpayRecharge;
exports.generatePayCode = generatePayCode;
exports.getCodeById = getCodeById;
exports.msggetList = msggetList;
exports.getxieyi = getxieyi;
exports.addLeaveWord = addLeaveWord;
exports.yiwancheng = yiwancheng;
exports.getdetailmsg = getdetailmsg;
exports.getEmailandphone = getEmailandphone;
exports.getactivitypeople = getactivitypeople;
exports.addpintuanpeople = addpintuanpeople;
exports.addCard = addCard;
exports.toalipay = toalipay;
exports.todingdanalipay = todingdanpay;
var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _request = require('@/utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
function GetList(params) {
    return (0, _request2.default)({
        url: '/api/carousel/getList',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 账单查询
function bill(params) {
    return (0, _request2.default)({
        url: '/api/recordSearch/getList',
        method: 'get',
        params: params
    });
}

// 待付款订单详情
function detailByProductId(params) {
    return (0, _request2.default)({
        url: '/phoneorder/detailByProductId',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//首页
function Indexpage(params) {
    return (0, _request2.default)({
        url: '/phone/index/indexPage',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//微信支付
function toReChargWxPay(params) {
    return (0, _request2.default)({
        url: '/phone/toReChargWxPay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//充值码 微信支付
function towxpay(params) {
    return (0, _request2.default)({
        url: '/phone/towxpay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}

//使用余额为他人充值
function generatePayCode(params) {
    return (0, _request2.default)({
        url: '/api/rechargeCode/generatePayCode',
        method: 'get',
        params: params
    });
}
//为他人充值   微信充值接口
function towxpayRecharge(params) {
    return (0, _request2.default)({
        url: '/phone/towxpayRecharge',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 根据ID获取充值码信息
function getCodeById(params) {
    console.log(params);
    return (0, _request2.default)({
        url: '/api/rechargeCode/getCodeById',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 分享
function getSignature(params) {
    return (0, _request2.default)({
        url: '/weixinshare/api/getSignature',
        method: 'get',
        params: params
    });
}
//活动商品列表
function activityGoodsList(params) {
    return (0, _request2.default)({
        url: '/api/recommend/activityGoodsList',
        method: 'get',
        params: params
    });
}
//秒杀活动详情列表
function getAllActiveTitle(params) {
    return (0, _request2.default)({
        url: 'phone/index/getAllActiveTitle',
        method: 'get',
        params: params
    });
}
//活动商品详情
function activityGoodsDetail(params) {
    return (0, _request2.default)({
        url: '/api/recommend/activityGoodsDetail',
        method: 'get',
        params: params
    });
}
//上传图片
function uploadFile(params) {
    return (0, _request2.default)({
        url: '/phone/uploadFile',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}

//商品详情
function detail(params) {
    return (0, _request2.default)({
        url: '/phone/detail/' + params.goodsId,
        method: 'post',
        params: params

    });
}
function getdetailmsg(params) {
    return (0, _request2.default)({
        url: '/phone/getGoodsPropsInfo/',
        method: 'post',
        params: params
    });
}
// 商品收藏
function addCollect(params) {
    return (0, _request2.default)({
        url: '/phone/addCollect',
        method: 'get',
        params: params
    });
}
// 商品删除收藏
function deleteCollect(params) {
    return (0, _request2.default)({
        url: '/phone/deleteCollect',
        method: 'get',
        params: params
    });
}
// 商品购物车列表
function myCollect(params) {
    return (0, _request2.default)({
        url: '/phone/myCollect',
        method: 'get',
        params: params
    });
}
// 商品详情删除收藏(带有 1 的)
function deleteCollect1(params) {
    return (0, _request2.default)({
        url: '/phone/deleteCollect1',
        method: 'get',
        params: params
    });
}

//商品优惠券列表
function getGoodCouponList(params) {
    return (0, _request2.default)({
        url: '/api/coupon/getGoodCouponList',
        method: 'get',
        params: params
    });
}
//优惠卷列表接口
function couponList(params) {
    return (0, _request2.default)({
        url: '/api/recommend/activityGoodsList',
        method: 'get',
        params: params
    });
}
//用户领取优惠券接口
function receiveCoupon(params) {
    return (0, _request2.default)({
        url: '/api/coupon/receiveCoupon',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 商品分类
function getClassList(params) {
    return (0, _request2.default)({
        url: '/phone/getClassList',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 商品列表
function searchGoods(params) {
    return (0, _request2.default)({
        url: '/phone/searchGoods',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 生成会话
function keepConn(params) {
    return (0, _request2.default)({
        url: '/userinfo/keepConn',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//地址接口
function list(params) {
    return (0, _request2.default)({
        url: '/addr/list',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 注册
function sendMessaEx(params) {
    return (0, _request2.default)({
        url: '/reg/sendMessaEx',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//加入拼团人数
function addpintuanpeople(params) {
    return (0, _request2.default)({
        url: '/api/recommend/openKaiTuan.do',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 注册提交
function add(params) {
    return (0, _request2.default)({
        url: '/phonereg/add',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 注册提交2
function add2(params) {
    return (0, _request2.default)({
        url: '/phonereg/add2',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//获取用户协议信息
function getxieyi(params) {
    return (0, _request2.default)({
        url: '/api/sysMessage/getUserAgreement',
        method: 'get',
        data: _qs2.default.stringify(params)
    });
}
// 登录
function login(params) {
    return (0, _request2.default)({
        url: '/logincon/login',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 4、	修改密码发送短信验证码
function usermessage(params) {
    return (0, _request2.default)({
        url: '/phoneindexutil/usermessage',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//personal
function member(params) {
    return (0, _request2.default)({
        url: '/phone/member',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//check_login
function checklogin(params) {
    return (0, _request2.default)({
        url: '/phonereg/checklogin',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//personal_msgfix
function updateMember(params) {
    return (0, _request2.default)({
        url: '/phone/updateMember',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//coupon_list
function getUserCouponList(params) {
    return (0, _request2.default)({
        url: '/api/coupon/getUserCouponList',
        method: 'get',
        params: params
    });
}
// 提交修改密码
function phoneUpdate(params) {
    return (0, _request2.default)({
        url: '/ phoneindexutil/phoneUpdate',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 微信登陆
function appWeiXinAuth(params) {
    return (0, _request2.default)({
        url: '/login/appWeiXinAuth',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
function GetloginStatus(params) {
    return (0, _request2.default)({
        url: '/cart/load',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//my_address
function myAddr(params) {
    return (0, _request2.default)({
        url: '/addr/myAddr',
        method: 'get',
        params: params
    });
}
//new_address
function newAdd(params) {
    return (0, _request2.default)({
        url: '/addr/add',
        method: 'get',
        params: params
    });
}
//edit_address
function addrupdate(params) {
    return (0, _request2.default)({
        url: '/addr/update',
        method: 'get',
        params: params
    });
}
//delete_address
function deleteAddr(params) {
    return (0, _request2.default)({
        url: '/addr/delete',
        method: 'get',
        params: params
    });
}
//get_version
function getSystemCurrVersionNo(params) {
    return (0, _request2.default)({
        url: '/phone/index/getSystemCurrVersionNo',
        method: 'get',
        params: params
    });
}
//my_order_all
function orderList(params) {
    return (0, _request2.default)({
        url: '/phoneorder/list',
        method: 'get',
        params: params
    });
}
//no_tra
function weifahuolist(params) {
    return (0, _request2.default)({
        url: '/phoneorder/weifahuolist',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//is_tra
function yifahuolist(params) {
    return (0, _request2.default)({
        url: '/phoneorder/yifahuolist',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//已完成
function yiwancheng(params) {
    return (0, _request2.default)({
        url: '/phoneorder/haspingjialist',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//addr_setdef
function setDefault(params) {
    return (0, _request2.default)({
        url: '/addr/setDefault',
        method: 'get',
        params: params
    });
}
//addr_def
function myDefaultAddr(params) {
    return (0, _request2.default)({
        url: '/addr/myDefaultAddr',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//coin_return
function beReturned(params) {
    return (0, _request2.default)({
        url: '/api/extraList/beReturned',
        method: 'get',
        params: params
    });
}
//no_pay
function waitlist(params) {
    return (0, _request2.default)({
        url: '/phonewaitorder/list',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//alr_suc
function ordelist(params) {
    return (0, _request2.default)({
        url: '/phoneorder/daipingjialist',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 消息页面 普通信息
function msglist(params) {
    return (0, _request2.default)({
        url: '/message/msglist',
        method: 'get',
        params: params
    });
}
function addLeaveWord(params) {
    return (0, _request2.default)({
        url: '/phone/addLeaveWord',
        method: 'post',
        params: params
    });
}
// 消息页面接口 公告
function msggetList(data) {
    return (0, _request2.default)({
        url: '/api/sysMessage/getList',
        method: 'post',
        params: data
    });
}
// 未读消息
function unRead(params) {
    return (0, _request2.default)({
        url: '/message/unRead',
        method: 'get',
        params: params
    });
}
// 设置消息已读
function read(params) {
    return (0, _request2.default)({
        url: '/message/read',
        method: 'get',
        params: params
    });
}
//5、充值码，支付成功后获取充值码信息
function getPaySuccessCode(params) {
    return (0, _request2.default)({
        url: '/api/rechargeCode/getPaySuccessCode',
        method: 'get',
        params: params
    });
}
//猜你喜欢
function caiNinLike(params) {
    return (0, _request2.default)({
        url: '/phone/index/caiNinLike',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 添加评论
function pinglun(params) {
    return (0, _request2.default)({
        url: '/phoneorder/pinglun',
        method: 'post',
        params: params
    });
}
// 加入购物车
function createGoodsObject(params) {
    return (0, _request2.default)({
        url: '/phone/createGoodsObject',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//获取邮箱和客服,内容
function getEmailandphone(params) {
    return (0, _request2.default)({
        url: '/api/sysMessage/getKeyValue',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//获取参团人数
function getactivitypeople(params) {
    return (0, _request2.default)({
        url: 'api/recommend/getTuanGouRenShu',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}

//logout
function logout(params) {
    return (0, _request2.default)({
        url: '/phone/logout',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//extra
function extraList(params) {
    return (0, _request2.default)({
        url: '/api/extraList/extraList',
        method: 'get',
        params: params
    });
}
//生成待支付订单号
function topay(params) {
    return (0, _request2.default)({
        url: '/phone/topay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//删除商品
function DeleteShop(params) {
    return (0, _request2.default)({
        url: '/cart/delete',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//ex_code
function useCode(params) {
    return (0, _request2.default)({
        url: '/api/rechargeCode/useCode',
        method: 'get',
        params: params
    });
}
//trade_detal
function pdetail(params) {
    return (0, _request2.default)({
        url: '/phoneorder/detail',
        method: 'get',
        params: params
    });
}
// 商品评论获取接口
function getpinglunlist(params) {
    return (0, _request2.default)({
        url: '/phone/getpinglunlist',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//调出微信H5支付进行支付-生成预支付接口
function towapwxpay(params) {
    return (0, _request2.default)({
        url: '/phone/towapwxpay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//生成预支付接口-并调出支付宝H5支付
function towapalipay(params) {
    return (0, _request2.default)({
        url: '/phone/towapalipay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}

//拼团首页
function collagePage(params) {
    return (0, _request2.default)({
        url: '/phone/index/activePage',
        method: 'get',
        params: params
    });
}
//拼团-今日必拼
function toDayCollage(params) {
    return (0, _request2.default)({
        url: '/phone/index/todayPinTuan',
        method: 'get',
        params: params
    });
}
// 5、   我要参团
function joinTeam(params) {
    return (0, _request2.default)({
        url: 'api/recommend/jiatuan',
        method: 'get',
        params: params
    });
}
// 6、   正在拼团
function pintuanING(params) {
    return (0, _request2.default)({
        url: '/phone/index/kaituanIng',
        method: 'get',
        params: params
    });
}
// 7、   获取活动商品
function getActGood(params) {
    return (0, _request2.default)({
        url: '/api/recommend/activityGoodsDetail',
        method: 'get',
        params: params
    });
}
// //
// export function getActGood(params) {
//   return request({
//     url: '/api/recommend/activityGoodsDetail',
//     method: 'get',
//     params: params
//   })
// }

//正在拼团
function kaituanList(params) {
    return (0, _request2.default)({
        url: '/phone/index/kaituanIng',
        method: 'get',
        params: params
    });
}
//我要开团
function openKaiTuan(params) {
    return (0, _request2.default)({
        url: '/api/recommend/openKaiTuan',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}

function quxiaodingdan(params) {
    return (0, _request2.default)({
        url: '/phoneorder/quxiaodingdan',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
function querenshouhuo(params) {
    return (0, _request2.default)({
        url: '/phoneorder/querenshouhuo',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//立即购买
function getGoodObjectById(params) {
    return (0, _request2.default)({
        url: '/phone/getGoodObjectById',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
//虚拟币和余额购买
function toYuePay(params) {
    return (0, _request2.default)({
        url: '/phone/toYuePay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 购物者加数量
function addCard(params) {
    return (0, _request2.default)({
        url: '/cart/addCartProductStock',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 获取属性
function addshuxing(params) {
    return (0, _request2.default)({
        url: '/phoneorder/getGoodsPricePropByPriceId',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
// 支付宝支付
function toalipay(params) {
    return (0, _request2.default)({
        url: '/phone/toalipay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}
function todingdanpay(params) {
    return (0, _request2.default)({
        url: '/phone/reChargeAlipay',
        method: 'post',
        data: _qs2.default.stringify(params)
    });
}