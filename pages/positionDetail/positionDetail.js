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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let tempData = {
      isLoading: false,
    } // 临时的页面数据对象，用于一次性的使用setData函数，提高性能
    // wx.showLoading({ title: '数据加载中...' })
    tempData.isLoading = false;
    // this.setData(tempData)
    // tempData.isLoading = false;
    //   tempData.positionName = '前端工程师';
    //   tempData.haveCollect = 'haveCollecct';
    //   tempData.salary = '10k-15k';
    //   tempData.positionAddress = '北京市海淀区';
    //   tempData.jobNature = '移动互联网';
    //   tempData.workYear = '1年以上';
    //   tempData.education = '本科';

    //   tempData.advantage = '待遇丰厚，免费午餐，零食';
    //   tempData.companyShortName = '京东';
    //   tempData.companyInfo = '京东JD.COM-专业的综合网上购物商城，销售超数万品牌，4020万种商品，囊括家电、手机、电脑、母婴、个护、服装、图书、食品、旅游等13大品类。秉承客户为先的理念，京东所售商品100%正品行货、全国联保、机打发票。提供专业配送、售后服务，为您提供愉悦的购物体验！';

    //   tempData.companyId = 1200;
    //   tempData.positionDesc = ['工作内容：','1.进行竞品分析和需求调研，负责产品整合营销活动，', '2.文笔好，对新媒体文案，创意，黑客增长感兴趣，分析数据，协助部门经理提升公司产品粉丝量，曝光度，app下载量', '3.公众号运营和活动策划等', '4.完成上级临时交办的其他工作', '岗位要求：', '1.大学本科及以上学历', '2.公司在快速成长，要适应能力强，吃苦耐劳，有责任心'];
    //   // 处理公司logo
    //   tempData.companyLogo = '../../static/icon/jd_portrait.png';
    //   tempData.companyLogo = tempData.companyLogo.substring(tempData.companyLogo.indexOf("//"), tempData.companyLogo.length)

    //   // 处理职位描述
    //   let descs = []
    //   this.setData(tempData)

      http(app.apiName.positionDetail, options).then((res) => {
        tempData.isLoading = false
        wx.hideToast()

        tempData.positionName = res.data.name
        tempData.haveCollect = res.data.haveCollect
        tempData.salary = res.data.salary
        tempData.positionAddress = res.data.cities.map((item) => item.nameStr).join('');
        tempData.jobNature = res.data.jobNature
        tempData.workYear = res.data.experience
        tempData.education = res.data.department

        tempData.advantage = res.data.advantage
        tempData.companyShortName = res.data.companyFullName
        tempData.companyInfo = res.data.companyInfo
        tempData.companyId = res.data.companyId

        // 处理公司logo
        tempData.companyLogo = res.data.companyLogo
        // tempData.companyLogo =tempData.companyLogo.length)

        // 处理职位描述
        let descs = []
        tempData.positionDesc = res.data.positionDesc
        tempData.userData = app.globalData.userData;
        // tempData.positionDesc.replace(/<p>(.*)<\/p>/ig, function () {
        //   let args = arguments
        //   let brRegExp = /^(<br>)/
        //   let brs = args[1].match(/<br>/ig)
        //   // 如果只有与一个P标签的情况，将会匹配出多个br标签
        //   // 也有可能存在只有一个p标签和一个br标签的情况
        //   if (brs != null) {
        //     if (brRegExp.test(args[1])) {
        //       return // 过滤换行符
        //     } else {
        //       descs = args[1].split(/<br>/)
        //       return
        //     }
        //   }
        //   descs.push(args[1])
        // })
        // tempData.positionDesc = descs

        // 处理评价列表
        // tempData.page = JSON.parse(res.data.page)
        // for (let item of tempData.page.result) {
        //   let time = new Date(item.createTime)
        //   item.createTime = `${time.getFullYear()}/${time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1)}/${time.getDate() > 9 ? time.getDate() : '0' + time.getDate()}`
        //   item.companyScore = parseInt(item.companyScore)
        //   item.comprehensiveScore = parseInt(item.comprehensiveScore)
        //   item.describeScore = parseInt(item.describeScore)
        //   item.interviewerScore = parseInt(item.interviewerScore)
        // }
        this.setData(tempData)
      })

    
  }
})
