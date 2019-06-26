'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  init: function init() {
    var AK = 'DE62882740f1ba3905be84a1d20a1e9f';
    var BMapURL = 'https://api.map.baidu.com/api?v=2.0&s=1&ak=' + AK + '';
    return new _promise2.default(function (resolve, reject) {
      // 如果已加载直接返回
      // if (typeof BMap !== 'undefined') {
      //   resolve(BMap)
      //   return true
      // }
      // 百度地图异步加载回调处理
      window.onBMapCallback = function () {
        console.log('百度地图脚本初始化成功...');
        // eslint-disable-next-line
        resolve(BMap);
      };
      // 插入script脚本
      var scriptNode = document.createElement('script');
      scriptNode.setAttribute('type', 'text/javascript');
      scriptNode.setAttribute('src', BMapURL);
      document.body.appendChild(scriptNode);
    });
  }
};