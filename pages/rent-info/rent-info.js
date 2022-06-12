// pages/rent-info/index.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
import {
  request
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {},
    // 业主界面才存在水电煤
    isYz: false,
    show: false,
    showTimeLine: false,
    copyIcon: "https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/icon/%E5%A4%8D%E5%88%B6%E6%96%87%E4%BB%B6.png?sign=fb4653adda3a69d7fc3e984dd08bfb19&t=1654490629"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store,
      actions: ['setRentInfo']
    })
    this.getRentInfoData()
  },
  /**
   * 根据 id 获取对象
   */
  getRentInfoData: function (cb) {
    wx.showLoading({
      title: '数据加载中',
    })
    const self = this
    wx.getStorage({
      key: 'rentListId',
      success(res) {
        console.log(res)
        let params = {
          "rentListId": res.data
        }
        request('rentList/getById', 'POST', params)
          .then((res) => {
            wx.hideLoading()
            console.log(res.data)
            self.setData({
              model: res.data,
              isYz: res.data.rentType === 1
            })
            wx.setNavigationBarTitle({
              title: self.data.isYz ? '业主租单详情' : '租客租单详情'
            })
          })
          cb && cb()
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
    this.getRentInfoData()
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
    // this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getRentInfoData(() => {
      wx.stopPullDownRefresh();
    })
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

  },
  submitForm() {

  },
  editRentFrom() {
    //   let index = options.currentTarget.dataset.id;
    //   let type = options.currentTarget.dataset.type;
    // let isYz = this.data.isYz;
    // let that = this
    this.setRentInfo(this.data.model)
    wx.navigateTo({
      url: '/pages/rent-order/rent-order',
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function (data) {
      //     if (data.data === "ok") {
      //       that.searchList("")
      //     }
      //   }
      // },
      // success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      // res.eventChannel.emit('acceptDataFromOpenerPage', {
      //   data: 'areYouOk'
      // })
      // }
    })
  },
  copyData: function (e) {
    let val = e.currentTarget.dataset.val
    wx.setClipboardData({
      data: val,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res) // data
          }
        })
      }
    })
  },
  openImgList: function (e) {
    this.setData({
      show: true
    })
  },
  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ show: false });
  },
  showTimeLine: function () {
    this.setData({ showTimeLine: true });
  },
  preview(event) {
    console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.model.uploaderList // 需要预览的图片http链接列表
    })
  }
})