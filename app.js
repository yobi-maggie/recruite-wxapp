//app.js
App({
  onLaunch: function () {
     // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     this.navTo('login');
    //     console.log('===', res);
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = Object.assign(res.userInfo, {
                name: this.globalData.userId,
              });
              this.isLogin = true;
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userId: 'dongmeiqi',
    userData: {
      userType: 'administor',
      userName: 'administor'
    }
  },
  isLogin: false,
  navTo(routerName, qeury) {
    let routes = {
      index: "../index/index",
      search: "../search/search",
      mine: "../mine/mine",
      customInfo: "../customInfo/customInfo",
      customDetail: "../customDetail/customDetail",
      resume: "../resume/resume",
      collection: "../collection/collection",
      deliver: "../deliver/deliver",
      deliverDetail: "../deliverDetail/deliverDetail",
      positionDetail: "../positionDetail/positionDetail",
      companyDetail: "../companyDetail/companyDetail",
      interview: "../interview/interview",
      login: "../login/login",
      register: "../register/register",
      userType: '../usertype/index',
      userlist: '../userList/userList',
      positionManage: '../positionManage/positionManage'
    }

    let options = {}

    // tab页面只能用wx.switchTab()进行跳转
    if ('index' == routerName || 'search' == routerName || 'mine' == routerName) {
      options.url = routes[routerName]
      wx.switchTab(options)
    }

    if (routes[routerName]) {
      options.url = routes[routerName]
    } else {
      wx.redirectTo({
        url: routes.index
      })
      return
    }
    if (qeury) {
      let arr = []
      for (let item of Object.keys(qeury)) {
        arr.push(item + '=' + qeury[item])
      }
      options.url += '?' + arr.join('&')
    }
    console.log(options)
    wx.navigateTo(options)
  },
  picHost: 'https://static.lagou.com/',
  apiName: { // 所有接口名称
    indexList: 'index/list', // 首页列表
    positionDetail: 'data/positionDetail', // 职位详情
    companyDetail: 'company/companyId', // 公司招聘信息
    cities: 'cities', // 城市列表
    search: 'search', // 搜索职位
  }
})
