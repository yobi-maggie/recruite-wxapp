// pages/deliver/deliver.js
var http = require('../../utils/http.js')
var time = require('../../utils/util.js');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionDeliver: [],
  },

  /**
   * 查看投递详情
   */
  viewDeliverDetail: () => {
    getApp().navTo('deliverDetail')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http('users/get', {
      userName: app.globalData.userData.userName,
    }).then((res) => {
      console.log(res);
      let positionList = res.data.deliver;
      positionList.forEach((item) => {
        console.log(item.time, Number(item.time))
        item.date = time.formatTime(Number(item.time), 'Y/M/D');
      })
      console.log(positionList)
      if (res.status == 200) {
        this.setData({
          positionDeliver:positionList
        })
      }
    })
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

  }
})
