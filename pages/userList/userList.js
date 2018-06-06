// pages/userList/userList.js

var http = require('../../utils/http.js')
const app = getApp()
const userTypeMap = {
  "candidate": '个人用户',
  "interviewer": "企业用户",
  
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [{
      userName: 'dongmeiqi',
      userType: '',
      contact: '11012011911',
      logo: '../../static/icon/jd_portrait.png',
      userTypeDetail: {
        name: '个人用户',
      }
    }, {
      userName: 'interviewer',
      userType: 'interviewer',
      contact: '11012011911',
      logo: '../../static/icon/jd_portrait.png',
      userTypeDetail: {
        name: '企业用户',
      },
      companyDetail: {
        name: '京东'
      }
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http('users').then((res) => {
      console.log(res);
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