// pages/register/register.js
var http = require('../../utils/http.js')
const app = getApp()
const userTypes = [{
  name: '管理员',
  value: 'administor',
  checked: false,
}, {
  name: '求职者',
  value: 'candidate',
  checked: true,
}, {
  name: '招聘者',
  value: 'interviewer',
  checked: false,
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
      repassword: '',
      password: '',
      userName: '',
      contact: '',
      userTypes: userTypes,
      userType: '',
  },
  repassword: function (e) {   //获取input输入的值
    var that = this;
    console.log('repassword', e);
    that.setData({
      repassword: e.detail.value
    })
  },
  password: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      password: e.detail.value
    })
  },
  userName: function (e) {   //获取input输入的值
    var that = this;
    that.setData({
      userName: e.detail.value
    })
  },
  userType: function (e) {
    console.log(e.detail.value);
  },
  contact: function (e) {  //获取input输入值
    var that = this;
    that.setData({
      contact: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  radioChange: function (e) {
    this.setData({
      userType: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  goToLogin() {
    app.navTo('login');
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  formSubmit(e) {
    console.log(e);
    let { userName, password, repassword, contact, userType} = e.detail.value;
    console.log(userName, password, repassword, contact, userType)
    http('users/regist', {
      userName: userName,
      password: password,
      repassword: repassword,
      contact: contact,
      userType: userType,
    }, 'POST').then((res) => {
      console.log(res);
      if (res.status == 200) {
        wx.showModal({
          title: '提示',
          content: res.msg,
          confirmText: '去登录',
          success: function (response) {
            if (response.confirm) {
              app.navTo('login');
            } else if (response.cancel) {
            }
          }
        });

      } else {
        wx.showModal({
          title: '提示',
          content: res.msg,
        })
      }
    })
  }
})