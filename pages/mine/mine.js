// pages/mine/mine.js
let app = getApp()
var http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '人才招聘系统',
      leftIcon: false,
      rightIcon: false
     },
    isLogin: app.isLogin,
    userData: {},
    userInfo: app.globalData.userInfo,
  },

  /**
   * 查看简历
   */
  viewResume: function () {
    app.navTo('resume')
  },

  /**
   * 查看投递
   */
  viewDeliver: () => {
    app.navTo('deliver')
  },

  /**
   * 查看面试
   */
  viewInterview: () => {
    app.navTo('interview')
  },

  /**
   * 查看收藏
   */
  viewCollect: () => {
    app.navTo('collection')
  },

  gotoLogin: () => {
    app.navTo('login')
  },
  viewUserList: () => {
    app.navTo('userlist')
  },

  viewPositionList() {
    app.navTo('positionManage')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userData: app.globalData.userData,
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        isLogin: true
      })
      console.log(app.globalData.userInfo)
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userData: app.globalData.userData,
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onShow() {
    this.onLoad();
    console.log()
    this.setData({
      isLogin: app.isLogin,
    })
  },
  goLogout() {
    console.log('0000')
    http('users/signout', {
      
    },'GET').then((res) => {
        console.log('===', res);
        if (res.status == 200) {
          app.globalData.userId = "";
          this.setData({
            isLogin: false
          })
          app.navTo('login')
        }
    })
  }
})
