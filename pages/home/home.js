import {
  request
} from '../../utils/request'
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperList: [],
    // 九宫格数据
    gridList: [],
    cardList: [{
        "id": 1,
        "name": "本月应收",
        "value": 160000.90
      },
      {
        "id": 2,
        "name": "本月应付",
        "value": 60000.90
      },
      {
        "id": 3,
        "name": "统计利润",
        "value": 100000.00
      }
    ],
    // 显示弹窗选择
    showDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDash()
    this.getGridList()
  },
  toMessage() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  },
  // 点击九宫格
  clickTik(e) {
    let index = e.currentTarget.dataset.index
    let id = this.data.gridList[index].id
    // if(id === 2){
    //   console.log("新增租单")
    //   this.setData({
    //     showDialog: true
    //   })
    // }else{
    wx.navigateTo({
      url: this.data.gridList[index].path,
    })
    // }
  },
  // 获取头部统计数据
  getDash() {
    request('rentList/dash', 'POST')
      .then((res) => {
        let cardList = this.data.cardList
        cardList[0].value = res.data.income
        cardList[1].value = res.data.expense
        cardList[2].value = res.data.profit
        this.setData({
          cardList: cardList
        })
      })
  },

  // 获取九宫格
  getGridList() {
    this.setData({
      gridList: [{
          id: 1,
          name: "感染记录",
          icon: "https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/icon/%E7%97%85%E6%AF%92.png?sign=b2ad506b1b36047871c0dcecff0d1a69&t=1651921292",
          path: "/pages/covid/covid"
        }, {
          id: 2,
          name: "新增业主租单",
          icon: "https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/icon/%E6%96%B0%E5%A2%9E.png?sign=364df300873f6e0b4355dfcfc7df9097&t=1651921478",
          path: "/pages/rent-order/rent-order?isYz=yevu"
        },
        {
          id: 3,
          name: "新增租客租单",
          icon: "https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/icon/%E6%96%B0%E5%A2%9E.png?sign=364df300873f6e0b4355dfcfc7df9097&t=1651921478",
          path: "/pages/rent-order/rent-order?isYz=zuke"
        }, {
          id: 4,
          name: "租单列表",
          icon: "https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/icon/%E5%88%97%E8%A1%A8.png?sign=963b28bae02278ba9cc2daf9ba79d1c4&t=1651921542",
          path: "/pages/rent-list/rent-list"
        }
      ]
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
    this.getDash()
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