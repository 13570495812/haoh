'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Index = require('@/page/Index/Index');

var _Index2 = _interopRequireDefault(_Index);

var _Register = require('@/page/Login/Register');

var _Register2 = _interopRequireDefault(_Register);

var _Register3 = require('@/page/Login/Register2');

var _Register4 = _interopRequireDefault(_Register3);

var _Convert = require('@/page/Login/Convert');

var _Convert2 = _interopRequireDefault(_Convert);

var _Registe_password = require('@/page/Login/Registe_password');

var _Registe_password2 = _interopRequireDefault(_Registe_password);

var _Registe_passwordtow = require('@/page/Login/Registe_passwordtow');

var _Registe_passwordtow2 = _interopRequireDefault(_Registe_passwordtow);

var _HomePage = require('@/page/Login/HomePage');

var _HomePage2 = _interopRequireDefault(_HomePage);

var _Classify = require('@/page/Classify/Classify');

var _Classify2 = _interopRequireDefault(_Classify);

var _Product_list = require('@/page/Classify/Product_list');

var _Product_list2 = _interopRequireDefault(_Product_list);

var _Particulars = require('@/page/Classify/Particulars');

var _Particulars2 = _interopRequireDefault(_Particulars);

var _Evaluate = require('@/page/Classify/Evaluate');

var _Evaluate2 = _interopRequireDefault(_Evaluate);

var _Evaluate_more = require('@/page/Classify/Evaluate_more');

var _Evaluate_more2 = _interopRequireDefault(_Evaluate_more);

var _Login = require('@/page/Login/Login');

var _Login2 = _interopRequireDefault(_Login);

var _ParticularsPar = require('@/page/Activity/Particulars-par');

var _ParticularsPar2 = _interopRequireDefault(_ParticularsPar);

var _Activity = require('@/page/Activity/Activity');

var _Activity2 = _interopRequireDefault(_Activity);

var _Guide = require('../page/Guide/Guide');

var _Guide2 = _interopRequireDefault(_Guide);

var _Personal = require('@/page/Personal/Personal');

var _Personal2 = _interopRequireDefault(_Personal);

var _My_order = require('@/page/Order/My_order');

var _My_order2 = _interopRequireDefault(_My_order);

var _Assets = require('@/page/Assets/Assets');

var _Assets2 = _interopRequireDefault(_Assets);

var _All_assets = require('@/page/Assets/All_assets');

var _All_assets2 = _interopRequireDefault(_All_assets);

var _Recharge = require('@/page/Assets/Recharge');

var _Recharge2 = _interopRequireDefault(_Recharge);

var _Bill = require('@/page/Assets/Bill');

var _Bill2 = _interopRequireDefault(_Bill);

var _Bill_list = require('@/page/Assets/Bill_list');

var _Bill_list2 = _interopRequireDefault(_Bill_list);

var _Timer = require('@/page/Assets/Timer');

var _Timer2 = _interopRequireDefault(_Timer);

var _Recharge_code = require('@/page/Assets/Recharge_code');

var _Recharge_code2 = _interopRequireDefault(_Recharge_code);

var _Recharge_record = require('@/page/Assets/Recharge_record');

var _Recharge_record2 = _interopRequireDefault(_Recharge_record);

var _Exchange_code = require('@/page/Assets/Exchange_code');

var _Exchange_code2 = _interopRequireDefault(_Exchange_code);

var _Assets_exchange = require('@/page/Assets/Assets_exchange');

var _Assets_exchange2 = _interopRequireDefault(_Assets_exchange);

var _Exchange_success = require('@/page/Assets/Exchange_success');

var _Exchange_success2 = _interopRequireDefault(_Exchange_success);

var _My_discount = require('@/page/Discount/My_discount');

var _My_discount2 = _interopRequireDefault(_My_discount);

var _My_address = require('@/page/Address/My_address');

var _My_address2 = _interopRequireDefault(_My_address);

var _New_address = require('@/page/Address/New_address');

var _New_address2 = _interopRequireDefault(_New_address);

var _Edit_address = require('@/page/Address/Edit_address');

var _Edit_address2 = _interopRequireDefault(_Edit_address);

var _About_us = require('@/page/About/About_us');

var _About_us2 = _interopRequireDefault(_About_us);

var _Contact_us = require('@/page/About/Contact_us');

var _Contact_us2 = _interopRequireDefault(_Contact_us);

var _Trade_static = require('@/page/Transaction/Trade_static.vue');

var _Trade_static2 = _interopRequireDefault(_Trade_static);

var _ShoppingCart = require('../page/ShoppingCart/ShoppingCart.vue');

var _ShoppingCart2 = _interopRequireDefault(_ShoppingCart);

var _Payment_index = require('../page/Payment/Payment_index');

var _Payment_index2 = _interopRequireDefault(_Payment_index);

var _Envelope = require('@/page/Envelope/Envelope');

var _Envelope2 = _interopRequireDefault(_Envelope);

var _Personal_msgfix = require('@/page/Personal/Personal_msgfix');

var _Personal_msgfix2 = _interopRequireDefault(_Personal_msgfix);

var _Message_notification = require('@/page/Personal/Message_notification');

var _Message_notification2 = _interopRequireDefault(_Message_notification);

var _ShareInvitation = require('@/page/Personal/ShareInvitation');

var _ShareInvitation2 = _interopRequireDefault(_ShareInvitation);

var _InvitationCode = require('@/page/Personal/InvitationCode');

var _InvitationCode2 = _interopRequireDefault(_InvitationCode);

var _Setting = require('@/page/Setting/Setting');

var _Setting2 = _interopRequireDefault(_Setting);

var _Homepage_Index = require('@/components/Homepage_Index.vue');

var _Homepage_Index2 = _interopRequireDefault(_Homepage_Index);

var _Collection = require('@/page/Collection/Collection.vue');

var _Collection2 = _interopRequireDefault(_Collection);

var _GroupPurchase = require('@/page/Collage/GroupPurchase.vue');

var _GroupPurchase2 = _interopRequireDefault(_GroupPurchase);

var _Collage_others = require('@/page/Collage/Collage_others.vue');

var _Collage_others2 = _interopRequireDefault(_Collage_others);

var _Collaging_info = require('@/page/Collage/Collaging_info.vue');

var _Collaging_info2 = _interopRequireDefault(_Collaging_info);

var _Collage_rule = require('@/page/Collage/Collage_rule.vue');

var _Collage_rule2 = _interopRequireDefault(_Collage_rule);

var _ToDayCollage = require('@/page/Collage/ToDayCollage.vue');

var _ToDayCollage2 = _interopRequireDefault(_ToDayCollage);

var _Success_info = require('@/page/Collage/Success_info.vue');

var _Success_info2 = _interopRequireDefault(_Success_info);

var _Detailsgroup = require('@/page/Collage/Detailsgroup.vue');

var _Detailsgroup2 = _interopRequireDefault(_Detailsgroup);

var _Trade_confirm = require('@/page/Collage/Collage_confirm/Trade_confirm.vue');

var _Trade_confirm2 = _interopRequireDefault(_Trade_confirm);

var _C_Trade_static = require('@/page/Collage/Collage_Trade/C_Trade_static.vue');

var _C_Trade_static2 = _interopRequireDefault(_C_Trade_static);

var _Checklogistics = require('@/page/Order/Checklogistics.vue');

var _Checklogistics2 = _interopRequireDefault(_Checklogistics);

var _payOk = require('@/page/Payment/payOk.vue');
var _payOk2 = _interopRequireDefault(_payOk);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  routes: [{
    path: '/', //底部显示路由
    component: _Homepage_Index2.default,
    children: [{ //首页路由
      path: '/',
      name: 'Index',
      component: _Index2.default
    }, { //购物车路由
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: _ShoppingCart2.default
    }, {
      path: '/activity',
      name: 'Activity',
      component: _Activity2.default
    }, {
      path: '/groupPurchase',
      name: 'GroupPurchase',
      component: _GroupPurchase2.default
    }, {
      path: '/classify',
      name: 'Classify',
      component: _Classify2.default
    }, {
      path: '/personal',
      name: 'Personal',
      component: _Personal2.default
    }]
  }, {
    path: '/homepageIndex',
    name: 'HomepageIndex',
    component: _Homepage_Index2.default
  }, {
    path: '/setting',
    name: 'Setting',
    component: _Setting2.default
  }, {
    path: '/payment',
    name: 'Payment',
    component: _Payment_index2.default
  }, {
    path: '/payOk2',
    name: 'payOk2',
    component: _payOk2.default
  }, {
    path: '/register',
    name: 'Register',
    component: _Register2.default
  }, {
    path: '/invitationcode',
    name: 'InvitationCode',
    component: _InvitationCode2.default
  }, {
    path: '/register2',
    name: 'Register2',
    component: _Register4.default
  }, {
    path: '/shareInvitation',
    name: 'ShareInvitation',
    component: _ShareInvitation2.default
  }, {
    path: '/homePage',
    name: 'HomePage',
    component: _HomePage2.default
  }, {
    path: '/particularsaa/:id/:goodsid',
    name: 'Particularsaa',
    component: _ParticularsPar2.default
  }, {
    path: '/particulars/:id',
    name: 'Particulars',
    component: _Particulars2.default
  }, {
    path: '/Guide',
    name: 'Guide',
    component: _Guide2.default
  }, {
    path: '/my_order',
    name: 'My_order',
    component: _My_order2.default
  }, {
    path: '/assets',
    name: 'Assets',
    component: _Assets2.default
  }, {
    path: '/all_assets',
    name: 'All_assets',
    component: _All_assets2.default
  }, {
    path: '/recharge',
    name: 'Recharge',
    component: _Recharge2.default
  }, {
    path: '/bill/:id',
    name: 'Bill',
    component: _Bill2.default
  }, {
    path: '/timer',
    name: 'Timer',
    component: _Timer2.default
  }, {
    path: '/bill_list',
    name: 'Bill_list',
    component: _Bill_list2.default
  }, {
    path: '/recharge_code',
    name: 'Recharge_code',
    component: _Recharge_code2.default
  }, {
    path: '/recharge_record',
    name: 'Recharge_record',
    component: _Recharge_record2.default
  }, {
    path: '/exchange_code',
    name: 'Exchange_code',
    component: _Exchange_code2.default
  }, {
    path: '/exchange_success',
    name: 'Exchange_success',
    component: _Exchange_success2.default
  }, {
    path: '/assets_exchange',
    name: 'Assets_exchange',
    component: _Assets_exchange2.default
  }, {
    path: '/my_discount',
    name: 'My_discount',
    component: _My_discount2.default
  }, {
    path: '/my_address',
    name: 'My_address',
    component: _My_address2.default
  }, {
    path: '/new_address',
    name: 'New_address',
    component: _New_address2.default
  }, {
    path: '/edit_address',
    name: 'Edit_address',
    component: _Edit_address2.default
  }, {
    path: '/about_us',
    name: 'About_us',
    component: _About_us2.default
  }, {
    path: '/trade_static',
    name: 'Trade_static',
    component: _Trade_static2.default
  }, {
    path: '/personal_msgfix',
    name: 'Personal_msgfix',
    component: _Personal_msgfix2.default
  }, {
    path: '/message_notification',
    name: 'Message_notification',
    component: _Message_notification2.default
  }, {
    path: '/login',
    name: 'Login',
    component: _Login2.default
  }, {
    path: '/evaluate_more',
    name: 'Evaluate_more',
    component: _Evaluate_more2.default
  }, {
    path: '/registe_passwordtow',
    name: 'Registe_passwordtow',
    component: _Registe_passwordtow2.default
  }, {
    path: '/registe_password',
    name: 'Registe_password',
    component: _Registe_password2.default
  }, {
    path: '/product_list',
    name: 'Product_list',
    component: _Product_list2.default
  }, {
    path: '/convert',
    name: 'Convert',
    component: _Convert2.default
  }, {
    path: '/evaluate',
    name: 'Evaluate',
    component: _Evaluate2.default
  }, {
    path: '/contact_us',
    name: 'Contact_us',
    component: _Contact_us2.default
  }, {
    path: '/envelope',
    name: 'Envelope',
    component: _Envelope2.default
  }, { //收藏
    path: '/collection',
    name: 'Collection',
    component: _Collection2.default
  }, {
    path: '/collage_others',
    name: 'Collage_others',
    component: _Collage_others2.default
  }, {
    path: '/collaging_info',
    name: 'Collaging_info',
    component: _Collaging_info2.default
  }, {
    path: '/collage_rule',
    name: 'Collage_rule',
    component: _Collage_rule2.default
  }, {
    path: '/toDayCollage',
    name: 'ToDayCollage',
    component: _ToDayCollage2.default
  }, {
    path: '/success_info',
    name: 'Success_info',
    component: _Success_info2.default
  }, {
    path: '/detailsgroup/:id/:goodsid',
    name: 'Detailsgroup',
    component: _Detailsgroup2.default
  }, {
    path: '/trade_confirm',
    name: 'Trade_confirm',
    component: _Trade_confirm2.default
  }, {
    path: '/c_trade_static',
    name: 'C_Trade_static',
    component: _C_Trade_static2.default
  }, {
    path: '/checklogistics',
    name: 'Checklogistics',
    component: _Checklogistics2.default
  }]
});