// pages/positionDetail/positionDetail.js
var http = require('../../utils/http')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      title: '职位详情',
      leftIcon: true,
      rightIcon: true
    },
    userData: {},
    isLoading: false, // 请求状态
    isDeliver: false,
    positionDetail: {
      positionName: '', // 职位名称
      haveCollect: '', // 是否已收藏
      salary: '', // 薪水
      positionAddress: '', // 地址
      jobNature: '', // 职位类型
      workYear: '', // 工作年龄
      education: '', // 文化要求
      advantage: '', // 职位诱惑
      companyLogo: '', // 公司logo
      companyId: '', // 公司ID
      companyShortName: '', // 公司名称
      companyInfo: '', // 公司简介信息
      positionDesc: '', // 职位描述
      page: '', // 评价相关信息
      stuffNumber: '5000以上',
      companyLevel: 'D轮以上',
    }
  },

  goBack() {
    wx.navigateBack()
  },

  goHome() {
    app.navTo('index')
  },

  /**
   * 查看公司详细招聘信息
   */
  viewCompanyDetail: (e) => {
    app.navTo('companyDetail', { companyId: e.currentTarget.dataset.cid })
  },
  deliverResume() {
    console.log(this.data.positionDetail, this.data.userData)
    let userData = this.data.userData;
    let userDeliver = [].concat(userData.deliver);
    userDeliver.push(this.data.positionDetail);
    this.data.isDeliver = true;
    let positionDetail = Object.assign({}, this.data.positionDetail);
    let deliver = [].concat(positionDetail.deliver);
    deliver.push(this.data.userData);
   
    let position = Object.assign({}, positionDetail, {
      deliver: deliver
    });
    let user = Object.assign({}, userData, {
      deliver: userDeliver
    })
    // const position = JSON.stringify(positionDetail);
    http('data/deliver', {
      positionDetail: JSON.stringify(position)
    }, 'POST').then((res) => {
      console.log(res)
    })
    http('users/deliver', {
      userDetail: JSON.stringify(user)
    }, 'POST').then((res) => {
      if(res.status == 200) {
        const userName = res.data[0].userName;
        // const password = res.data[0].password;
        this.setData({
          isDeliver: true,
        })
        http('users/get', {
          userName: userName,
        }).then((result) => {
          app.global.userData = result.data;
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempData = {
      isLoading: false,
    } // 临时的页面数据对象，用于一次性的使用setData函数，提高性能
    // wx.showLoading({ title: '数据加载中...' })
    tempData.isLoading = false;
      http(app.apiName.positionDetail, options).then((res) => {
        tempData.isLoading = false
        wx.hideToast()
        let positionDetail = Object.assign({}, res.data);
        positionDetail.positionId = res.data.positionId;
        positionDetail.positionName = res.data.name
        positionDetail.haveCollect = res.data.haveCollect
        positionDetail.salary = res.data.salary
        positionDetail.positionAddress = res.data.cities.map((item) => item.nameStr).join('');
        positionDetail.deliver = res.data.deliver
        positionDetail.jobNature = res.data.jobNature
        positionDetail.workYear = res.data.experience
        positionDetail.education = res.data.department
        positionDetail.stuffNumber = res.data.stuffNumber
        positionDetail.companyLevel = res.data.companyLevel
        positionDetail.advantage = res.data.advantage
        positionDetail.companyShortName = res.data.companyFullName
        positionDetail.companyInfo = res.data.companyInfo
        positionDetail.companyId = res.data.companyId
        // 处理公司logo
        positionDetail.companyLogo = res.data.companyLogo
        // tempData.companyLogo =tempData.companyLogo.length)
        console.log('user:::', app.globalData.userData)
        const deliver = app.globalData.userData.deliver.filter((item) => item.positionId == res.data.positionId);
        console.log(deliver)
        tempData.isDeliver = deliver.length ? true : false;
        // 处理职位描述
        let descs = []
        positionDetail.positionDesc = res.data.positionDesc
        tempData.userData = app.globalData.userData;
        tempData.positionDetail = positionDetail;
        console.log(tempData)
        this.setData(tempData);
      })

    
  }
})
