// pages/rent-info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      community: '{{community}}',
      building: '{{building}}',
      roomNo: '{{roomNo}}'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断有无参数
    if (options) {

    }
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
      timeoutCallback: () => {},
      success: (res) => {},
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

  }
})