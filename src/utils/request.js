'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

// axios.defaults.withCredentials=true;
// 创建axios实例
var service = _axios2.default.create({
    // baseURL: process.env.BASE_API, // api 的 base_url
    baseURL: 'http://www.ymhaohan.cn',
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    // Do something with request error
    console.log(error); // for debug
    _promise2.default.reject(error);
});

// response 拦截器
service.interceptors.response.use(function (response) {
    // 根据接口状态码判断业务状态
    var status = response.status;
    var res = response.data;
    if (status !== 200) {
        return _promise2.default.reject('error');
    } else {
        return response.data;
    }
}, function (error) {
    console.log('err' + error); // for debug
    return _promise2.default.reject(error);
});

exports.default = service;