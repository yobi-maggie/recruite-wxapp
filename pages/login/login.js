/*
 * @Author: guojingfeng
 * @Date: 2017-09-30 10:21:45
 * @Last Modified by:   guojingfeng
 * @Last Modified time: 2017-09-30 10:21:45
 */
var http = require('../../utils/http.js')
const app = getApp()
Page({
  data: {
  },
  goToRegister() {
    app.navTo('register');
  },
  formSubmit(e) {
    console.log(e);
    let { userName, password } = e.detail.value;
    console.log(userName, password)
    const that = this;
    if (!userName || !password) {
      wx.showModal({
        title: '提示',
        content: '请填写用户名密码',
      })
      return false;
    }
    http('users/login', {
      userName: userName,
      password: password,
    }, 'POST').then((res) => {
      if(res.status == 200) {
        app.globalData.userId = res.data.userName;
        app.globalData.userData = res.data;
        // app.isLogin
        // app.globalData.userInfo.name = res.data;
        app.isLogin = true;
        app.navTo('index');
      } else if (res.status == 500){
        wx.showModal({
          title: '提示',
          content: res.msg,
          confirmText: '注册',
          success: function(response) {
            if (response.confirm) {
              app.navTo('register');
            } else if (response.cancel) {
            }  
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
      }
    })
  }
})
