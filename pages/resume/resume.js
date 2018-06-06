// pages/resume/resume.js
var app = getApp();
const http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resumeData: {
      name: '',
      department: '',
      experience: '',
      birthDate: '',
      city: '',
      phone:'',
      email: '',
      education: [],
      workExperience: [],
      projectExperience: [],
      skills: [],
      evaluation: '',
      jobExpectation: {
        position: '',
        nature: '',
        salary: '',
        city: '',
        advantage: ''
      },
      entryTime: '',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let templateData = {};
    templateData.userInfo = app.globalData.userInfo;
    // this.setData(templateData);
    let self = this;
    http('mine/resume', {
      userName: app.globalData.userId,
    }).then((res) => {
      if (!res.data.length) {
        http('mine/addResume', {
          userName: app.globalData.userId,
          name: '前端开发',
          department: '本科',
          experience: '1年',
          birthDate: '1995.12',
          city: '哈尔滨',
          phone: '18846440384',
          email: '1125479840@qq.com',
          education: JSON.stringify([{
            graductionYear: '2018',
            school: '哈尔滨理工大学',
            profession: '网络工程',
          }]),
          workExperience: JSON.stringify([{
            time: '2017.01-2018.05',
            company: '滴滴出行',
            position: 'web前端工程师',
            desc: '',
          }]),
          projectExperience: JSON.stringify([{
            time: '2017.01-2017.06',
            name: 'xxx项目',
            mission: '页面开发',
            desc: '',
          }]),
          skills: JSON.stringify([{
            name: 'javascript,html,css',
            degree: {
              label: '精通',
              value: '80%',
            },
          }]),
          evaluation: '吃苦耐劳，责任心强',
          jobExpectation: JSON.stringify({
            position: 'web前端工程师',
            nature: '全职',
            salary: '15k',
            city: '北京',
            advantage: '擅长JS，能独立开发前端项目，会切图。'
          }),
          entryTime: '可快速到岗',
        },'POST').then((res) => {
          console.log(res);
        })
      } else {
        templateData.resumeData = res.data[0];
        self.setData(templateData);
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