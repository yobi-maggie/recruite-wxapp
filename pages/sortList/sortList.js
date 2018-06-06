//index.js
//获取应用实例
var http = require('../../utils/http.js')
const app = getApp()

Page({
  data: {
    header: {
     title: '人才招聘',
     leftIcon: false,
     rightIcon: false
    },
    isLogin: app.isLogin,
    pageNo: 1,
    showBtn: false, // 默认不显示加载更多按钮
    isLoading: false, // 请求状态
    companyList: []
  },
  /**
   * 加载更多
   *
   */
  loadMore() {
    if(this.data.isLoading) return
    this.loadData(this.data.pageNo + 1)
  },
  /**
 * 查看公司详细招聘信息
 */
  viewCompanyDetail: (e) => {
    app.navTo('companyDetail', { companyId: e.currentTarget.dataset.cid })
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
    // if (pageNo) options.data = { pageNo: pageNo }
    // tempData.pageNo = 1;
    // tempData.isLoading = false;
    // tempData.showBtn = false;
    // tempData.companyList = [{
    //   companyId: 12000,
    //   companyLogo: '../../static/icon/jd_portrait.png',
    //   companyFullName: '京东',
    //   city: '北京',
    //   jobNature: '移动互联网',
    //   companyLevel: '上市公司',
    //   stuffNumber: '500-2000人',
    //   cities:[{
    //     nameStr: '北京'
    //   }],
    //   companyInfo: '',
    //   companyShortName: '',
    //   owner: 'dongmeiqi',
    //   position: [],
    // }]
    // console.log('setData', tempData)
    // this.setData(tempData)
    // console.log('app.isLogin', app.isLogin)
    http('data/companyList', {}, 'GET').then((res) => {
      console.log(res);
      tempData.companyList = res.data;
      this.setData(tempData);
      if (!res.data.length) {
        http('data/company', {
          companyId: 12000,
          companyLogo: '../../static/icon/jd_portrait.png',
          companyFullName: '京东',
          city: '北京',
          jobNature: '移动互联网',
          companyLevel: '上市公司',
          stuffNumber: '500-2000人',
          cities: JSON.stringify([{
            nameStr: '北京'
          }]),
          companyInfo: '京东是中国的综合网络零售商，是中国电子商务领域受消费者欢迎和具有影响力的电子商务网站之一，在线销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品、在线旅游等12大类数万个品牌百万种优质商品。京东在2012年的中国自营B2C市场占据49%的份额，凭借全供应链继续扩大在中国电子商务市场的优势。京东已经建立华北、华东、华南、西南、华中、东北六大物流中心，同时在全国超过360座城市建立核心城市配送站。2012年8月14日，京东与苏宁开打"史上最惨烈价格战" 。2013年3月30日19点整正式切换了域名，并且更换新的logo [1]  。',
          companyShortName: '京东',
          owner: 'dongmeiqi',
        }, 'POST').then((res) => {
          console.log(res);
        })
      }
    })


  },
  onLoad: function () {
    // this.loadData()
  },
  onShow() {
    this.loadData()
    console.log('show');
  }
})
