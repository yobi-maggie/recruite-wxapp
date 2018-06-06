// pages/companyDetail/companyDetail.js
const http = require('../../utils/http.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 
       * 页面配置 
       */
    winWidth: 0,
    winHeight: 0,  
    header: {
      title: '公司详情',
      leftIcon: true,
      rightIcon: true
    },
    currentTab: 0,
    isLoading: false, // 请求状态
    companyInfo: '',
    companyShortName: '',
    companyFullName: '',
    companyId: '',
    companyLogo: '',
    city: '',
    cities: [],
    selectedIndex: 0, // 默认选中的职位类型
    currentData: {}, // 当前展示的列表数据
    dataList: [],
    jobNature: '',
    companyLevel: '',
    stuffNumber: '',
    positionList: [],
  },

  goBack() {
    wx.navigateBack()
  },

  goHome() {
    app.navTo('index')
  },
    /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },  
  /** 
     * 点击tab切换 
     */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    wx.redirectTo({
      url: '../positionDetail/positionDetail?positionId=' + e.currentTarget.dataset.pid
    })
  },

  /**
   * 职位类型切换
   *
   * @param {any} e 事件
   */
  changeType: function (e) {
    let index = e.currentTarget.dataset.index
    if (index == this.data.selectedIndex || this.data.dataList[index].value.totalCount == 0) return
    let currentData = this.data.dataList[index]
    ;(currentData.value.totalCount < currentData.value.pageSize * currentData.value.pageNo || currentData.value.totalCount == currentData.value.pageSize * currentData.value.pageNo) ? currentData.hasMore = false : currentData.hasMore = true
    this.setData({
      currentData,
      selectedIndex: index
    })
  },

  /**
   * 根据职位类型加载更多的数据
   *
   */
  loadMore: function (){
    let query = {
      data: {
        pageNo: this.data.currentData.value.pageNo + 1,
        companyId: this.data.companyId,
        positionFirstType: this.data.currentData.key
      }
    }
    let tempData = {
      isLoading: false
    }
    this.setData(tempData)
    http(app.apiName.companyDetail.replace('companyId', this.data.companyId), query).then(res => {
      tempData.isLoading = false
      // 复制内容
      tempData.currentData = this.data.currentData
      tempData.dataList = this.data.dataList
      // 添加新内容
      let toObj = tempData.dataList[this.data.selectedIndex]
      let fromObj = res.content.data.pageMap[tempData.currentData.key]
      toObj.value.result = toObj.value.result.concat(fromObj.result)
      toObj.value.pageNo = fromObj.pageNo
      toObj.value.pageSize = fromObj.pageSize
      toObj.value.start = fromObj.start
      toObj.value.totalCount = fromObj.totalCount

      // 设置当前列表
      tempData.currentData = toObj
      let v = tempData.currentData.value
      ;(v.totalCount < v.pageSize * v.pageNo || v.totalCount == v.pageSize * v.pageNo) ? tempData.currentData.hasMore = false : tempData.currentData.hasMore = true

      this.setData(tempData)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempData = {
      isLoading: false
    }
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });  
    http('data/companyDetail', options).then((res) => {
      tempData = res.data;
      tempData.positionList = res.data.position;
      this.setData(tempData);
    })
  }
})
