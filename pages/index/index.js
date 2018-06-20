//index.js
//获取应用实例
var http = require('../../utils/http.js')
const app = getApp()

Page({
  data: {
    header: {
     title: '人才招聘系统',
     leftIcon: false,
     rightIcon: false
    },
    isLogin: app.isLogin,
    pageNo: 1,
    showBtn: false, // 默认不显示加载更多按钮
    isLoading: false, // 请求状态
    positionList: [],
    showCity: false,
    city: '全国',
    cities: [
      {
        nameStr: '全国',
        cityGroup: [['全国'], ['北京'], ['上海'], ['石家庄'], ['哈尔滨'], ['双鸭山']]
      }]
  },
  //事件处理函数
  gotoCustomInfo: function () {
    app.navTo('customInfo')
  },

  /**
   * 查看职位详情
   */
  viewPositionDetail: (e) => {
    app.navTo('positionDetail', {
      positionId: e.currentTarget.dataset.pid
    })
  },
  // 查询数据
  search(e) {
    if (!e.value) return
    this.data.keyword = e.value
    this.loadData()
  },
  // 搜索
  iconSearch() {
    var self = this
    wx.createSelectorQuery().select('.input').fields({ properties: ['value'] }, function (args) {
      self.search(args)
    }).exec()
  },
  confirmSearch() {
    this.iconSearch();
  },
  // 改变城市
  changeCity: function () {
    this.setData({
      showCity: true
    })
  },
  // 选择城市
  selectCity: function (e) {
    let tempData = {}
    tempData.city = e.currentTarget.dataset.cityName
    tempData.showCity = false
    if (!tempData.city) return
    this.setData(tempData)
  },
  /**
   * 加载更多
   *
   */
  loadMore() {
    console.log(this.data.isLoading)
    if(this.data.isLoading) return
    this.loadData(this.data.pageNo + 1)
  },
  /**
   * 通用请求数据函数
   *
   * @param {Number} pageNo 自定义的页码请求
   */
  loadData(pageNo) {
    let tempData = {
      isLoading: true
    } // 临时的页面数据对象，用于一次性的使用setData函数，提高性能
    var options = {}
    if (pageNo) options.data = { pageNo: pageNo }
    tempData.pageNo = 1;
    tempData.isLoading = false;
    tempData.showBtn = false;
    // tempData.positionList = [{
    //   positionId: 1,
    //   companyLogo: '../../static/icon/jd_portrait.png',
    //   companyFullName: '京东',
    //   city: '北京',
    //   salary: '15k-40k',
    //   createTime: '4月15日',
    //   cities: [{
    //     nameStr: '北京'
    //   }, {
    //     nameStr: '海淀区'
    //   }]
    // }]
    // this.setData(tempData)
    console.log('app.isLogin', app.isLogin, this.data.city, this.data.keyword)
    http('data/webJob', {
      city: this.data.city,
      keyword: this.data.keyword ? this.data.keyword: '',
    }).then((res) => {
      console.log(res);
      if (res.statu == 301) {
          app.navTo('login');
      } else {
        this.setData({
          positionList: res.data
        })
        // if (!res.data.length) {
        //   http('data/position', {
        //     name: '前端工程师', companyLogo: '../../static/icon/jd_portrait.png', companyFullName: '京东', city: '北京', salary: '15k-30k', createTime: '4月15日', cities: JSON.stringify([{ nameStr: '北京' }, { nameStr: '海淀区' }]), experience: '1-3年', department: '本科',
        //     haveCollect: 'haveCollecct',
        //     jobNature: "移动互联网",
        //     advantage: '待遇丰厚，免费午餐，零食',
        //     companyInfo: '京东JD.COM-专业的综合网上购物商城，销售超数万品牌，4020万种商品，囊括家电、手机、电脑、母婴、个护、服装、图书、食品、旅游等13大品类。秉承客户为先的理念，京东所售商品100%正品行货、全国联保、机打发票。提供专业配送、售后服务，为您提供愉悦的购物体验！',
        //     companyId: '12000',
        //     positionDesc: JSON.stringify(['工作内容：', '1.进行竞品分析和需求调研，负责产品整合营销活动，', '2.文笔好，对新媒体文案，创意，黑客增长感兴趣，分析数据，协助部门经理提升公司产品粉丝量，曝光度，app下载量', '3.公众号运营和活动策划等', '4.完成上级临时交办的其他工作', '岗位要求：', '1.大学本科及以上学历', '2.公司在快速成长，要适应能力强，吃苦耐劳，有责任心']),
        //     owner: 'dongmeiqi'

        //   }, 'POST').then((res) => {
        //     console.log(res);
        //   })
        // }
      }
    })
   
  },
  onLoad: function (options) {
    // const { userName, userType, _id} = options;
    // console.log(userName, userType, _id);
  },
  onShow(options) {
    this.loadData()
  }
})
