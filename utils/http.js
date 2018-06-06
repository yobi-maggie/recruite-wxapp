/*
 * @Author: guojingfeng
 * @Date: 2017-09-15 13:37:55
 * @Last Modified by: guojingfeng
 * @Last Modified time: 2017-10-13 13:30:18
 */
var baseUrl = 'http://localhost:8080/'
const app = getApp();

/**
 * 对微信网络请求的简易封装
 *
 * @param {any} apiName 接口地址对应名称
 * @param {any} options 微信请求支持的参数
 * @returns
 */
module.exports = function (apiName, options, methods, callback) {
  let that = this;
  let { userId } = app.globalData;
  return new Promise((resolve, reject) => {
    var header = {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': 'userid=' + app.globalData.userId//读取cookie
    };
    var config = {
      url: baseUrl + apiName,
      method: methods, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function (res) {
        // success
        resolve(res.data)
      },
      fail: function () {
        // fail
        reject('fail')
      }
    }

    if (options) Object.assign(config, {
      data: options,
    })
    var requestTask = wx.request(config)

    callback && callback(requestTask)
  }).catch(err => console)
}
