'use strict';

var _icon = require('vant/es/icon');

var _icon2 = _interopRequireDefault(_icon);

var _navBar = require('vant/es/nav-bar');

var _navBar2 = _interopRequireDefault(_navBar);

var _swipeCell = require('vant/es/swipe-cell');

var _swipeCell2 = _interopRequireDefault(_swipeCell);

var _swipe = require('vant/es/swipe');

var _swipe2 = _interopRequireDefault(_swipe);

var _swipeItem = require('vant/es/swipe-item');

var _swipeItem2 = _interopRequireDefault(_swipeItem);

require('vant/es/icon/style');

require('vant/es/nav-bar/style');

require('vant/es/swipe-cell/style');

require('vant/es/swipe/style');

require('vant/es/swipe-item/style');

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

require('./assets/js/share');

require('lib-flexible');

var _bus = require('../config/bus');

var _bus2 = _interopRequireDefault(_bus);

var _vueDirectiveTouch = require('vue-directive-touch');

var _vueDirectiveTouch2 = _interopRequireDefault(_vueDirectiveTouch);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
_vue2.default.prototype.$bus = _bus2.default;
_vue2.default.prototype.$bus = _bus2.default;

_vue2.default.use(_swipe2.default).use(_swipeItem2.default);

_vue2.default.use(_swipeCell2.default);
_vue2.default.use(_navBar2.default);
_vue2.default.use(_icon2.default);

new _vue2.default({
  el: '#app',
  router: _router2.default,
  mode: 'history',
  render: function render(h) {
    return h(_App2.default);
  }
});

// document.addEventListener('plusready', function () {
//   var webview = plus.webview.currentWebview();
//   plus.key.addEventListener('backbutton', function () {
//     webview.canBack(function (e) {
//       if (e.canBack) {
//         webview.back();
//       } else {
//         //webview.close(); //hide,quit
//         //plus.runtime.quit();
//         //首页返回键处理
//         //处理逻辑：1秒内，连续两次按返回键，则退出应用；
//         var first = null;
//         plus.key.addEventListener('backbutton', function () {
//           //首次按键，提示‘再按一次退出应用’
//           if (!first) {
//             first = new Date().getTime();
//             setTimeout(function () {
//               first = null;
//             }, 1000);
//           } else {
//             if (new Date().getTime() - first < 1500) {
//               plus.runtime.quit();
//             }
//           }
//         }, false);
//       }
//     });
//   });
// });