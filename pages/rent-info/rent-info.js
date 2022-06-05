// pages/rent-info/index.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      community: '{{community}}',
      building: '{{building}}',
      roomNo: '{{roomNo}}'
    },
    // 业主界面才存在水电煤
    isYz: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store,
      // fields: ['rentInfo'],
      actions: ['getRentInfo']
    })
    // console.log()
    // let model = this.getRentInfo()
    let model = {
      "btnType": "warn",
      "building": "18",
      "community": "测试房源",
      "electricNo": "12121313",
      "endDate": "2028-02-06",
      "gasNo": "134314345",
      "imgText": "",
      "intervalDate": "季付",
      "nextDate": "2022-05-08",
      "pageNo": null,
      "pageSize": null,
      "phoneNo": "19500008888",
      "rent": 7800,
      "rentListId": 2,
      "rentType": 1,
      "roomNo": "202",
      "roomNoStr": null,
      "roomType": "4房2厅2卫",
      "startDate": "2022-02-07",
      "unionName": "测试人员",
      "uploaderList": [],
      "userId": "U10000",
      "waterNo": "11121212091703",
      "rentCycle":3,
      "rentMonth": 2600
    }
    this.setData({
      isYz: model.rentType === 1,
      model: model
    })
    wx.setNavigationBarTitle({
      title: this.data.isYz ? '业主租单详情' : '租客租单详情'
    })
    // 判断有无参数
    // if (options) {
    //   let index = options.id


    // let model = this.getRentList(index)
    // console.log(model.uploaderList)
    // }

  },
  /**
   * 获取系统信息 设置相机的大小适应屏幕
   */
  setCameraSize() {
    //获取设备信息
    const res = wx.getSystemInfoSync();
    //获取屏幕的可使用宽高，设置给相机
    this.setData({
      cameraHeight: res.windowHeight,
      cameraWidth: res.windowWidth
    })
    console.log(res)
  },
  /**
   * 开始录像的方法
   */
  startShootVideo() {
    this.setData({
      videoSrc: ''
    })
    console.log("========= 调用开始录像 ===========")
    let that = this
    this.ctx.startRecord({
      timeoutCallback: () => { },
      success: (res) => { },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration: 4000
        })
        console.log("========= 调用开始录像失败 ===========")
      }
    })
  },
  /**
   * 结束录像
   */
  stopShootVideo() {
    wx.hideLoading();
    // console.log("========= 调用结束录像 ===========")
    this.ctx.stopRecord({
      compressed: true, //压缩视频
      success: (res) => {
        console.log(res)
        this.setData({
          videoSrc: res.tempVideoPath
        })
      },
      fail() {
        wx.showToast({
          title: '录像失败',
          icon: 'none',
          duration: 4000
        })
        console.log("========= 调用结束录像失败 ===========")
      }
    })
  },

  //touch start 手指触摸开始
  handleTouchStart: function (e) {
    this.setData({
      startTime: e.timeStamp
    })
  },

  //touch end 手指触摸结束
  handleTouchEnd: function (e) {
    // wx.hideLoading();
    let endTime = e.timeStamp;
    //判断是点击还是长按 点击不做任何事件，长按 触发结束录像
    if (endTime - this.data.startTime > 350) {
      //长按操作 调用结束录像方法
      this.stopShootVideo();
    } else {
      this.setData({
        textFlag: ''
      })
    }

  },

  /**
   * 长按按钮进行录像
   */
  handleLongPress: function (e) {
    // 长按方法触发，调用开始录像方法
    this.startShootVideo();
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

  },
  submitForm() {

  },
  editRentFrom(){
  //   let index = options.currentTarget.dataset.id;
  //   let type = options.currentTarget.dataset.type;
    let isYz = this.data.isYz;
    let that = this
    wx.navigateTo({
      url: '/pages/rent-order/rent-order?id=' + this.data.rentListId + '&isYz=' + isYz,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          if (data.data === "ok") {
            that.searchList("")
          }
        }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: 'areYouOk'
        })
      }
    })
  }
})