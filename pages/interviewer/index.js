// pages/interviewer/index.js
var http = require('../../utils/http.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    positionList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempData = {};
    http('data/webJob', {
      owner: app.globalData.userData.userName
    }).then((res) => {
      console.log(res);
      tempData.positionList = res.data;
      this.setData(tempData)
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
  deletePosition(e) {
    console.log(e);
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      confirmText: '删除',
      success: function (response) {
        if (response.confirm) {
          http('data/position_delete', {
            positionId: e.currentTarget.dataset.pid
          }, 'DELETE').then((res) => {
            console.log(res);
            self.onLoad();
          })
        } else if (response.cancel) {
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})