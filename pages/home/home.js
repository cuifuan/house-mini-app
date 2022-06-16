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
        "name": "本月预估应收",
        "value": 0
      },
      {
        "id": 2,
        "name": "本月预估应付",
        "value": 0
      },
      {
        "id": 3,
        "name": "统计预估利润",
        "value": 0
      }
    ],
    // 显示弹窗选择
    showDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
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
    wx.navigateTo({
      url: this.data.gridList[index].path,
    })
  },
  // 获取头部统计数据
  getDash() {
    wx.showLoading({
      title: '刷新中',
    })
    request('rentList/dash', 'POST')
      .then((res) => {
        let cardList = this.data.cardList
        cardList[0].value = res.data.income
        cardList[1].value = res.data.expense
        cardList[2].value = res.data.profit
        this.setData({
          cardList: cardList
        })
        wx.hideLoading({
          success: (res) => {
            wx.stopPullDownRefresh()
          }
        })
      })
  },

  // 获取九宫格
  getGridList() {
    this.setData({
      gridList: [
        {
          id: 1,
          name: "新增业主租单",
          icon: "/images/owner.png",
          path: "/pages/rent-order/rent-order?isYz=yevu&&isAdd=true"
        },
        {
          id: 2,
          name: "新增租客租单",
          icon: "/images/zuke.png",
          path: "/pages/rent-order/rent-order?isYz=zuke&&isAdd=true"
        }, {
          id: 3,
          name: "租单列表",
          icon: "/images/rentList.png",
          path: "/pages/rent-list/rent-list"
        },
        {
          id: 4,
          name: "租金流水",
          icon: "/images/money.png",
          path: "/pages/finance/finance"
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