import {
  request
} from '../../utils/request'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    count: 0,
    rentList: [],
    isloading: false,
    pageNo: 1,
    pageSize: 10,
    pageCount: 0,
    roomNoStr: '',
    tab: [{
      label: "业主租金",
      class: "bran_type_item",
      value: 1
    }, {
      label: "租客租金",
      class: "bran_type_item",
      value: 2
    }],
    defaultActive: 0,
    rentType: 1,
    isPush: false
  },
  searchList(e) {
    this.setData({
      pageNo: 1,
      pageCount: 0,
      rentList: []
    })
    this.getRoomList();
  },
  editRentFrom(options) {
    let rentListId = options.currentTarget.dataset.id;
    let type = options.currentTarget.dataset.type;
    let isYz = type === 1 ? 'yevu' : 'zuke';
    let that = this
    wx.navigateTo({
      url: '/pages/rent-order/rent-order?id=' + rentListId + '&isYz=' + isYz,
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function (data) {
          console.log(data)
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
  },
  getRoomList() {
    // 防止重复触发上拉数据
    if (this.data.isloading) {
      return
    }
    this.setData({
      isloading: true,
    });
    wx.showLoading({
      title: "数据加载中...",
    });
    let param = {
      roomNoStr: this.data.roomNoStr,
      pageNo: this.data.pageNo,
      pageSize: this.data.pageSize,
      rentType: this.data.rentType
    }
    console.log(param)
    request('rentList/list', 'POST', param)
      .then((res) => {
        let pageNo = this.data.pageNo
        this.setData({
          rentList: [...this.data.rentList, ...res.data],
          pageNo: res.pageNo,
          pageCount: res.pageCount
        });
        wx.hideLoading();
        this.setData({
          isloading: false,
        });
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!this.data.isloading) {
      this.getRoomList();
    }
    this.changeActive(0)
  },
  changeTab(e) {
    console.log(e.currentTarget.dataset.id)
    let index = e.currentTarget.dataset.id;
    this.changeActive(index)
  },
  changeActive(index) {
    let tabData = this.data.tab;
    for (let i = 0; i < tabData.length; i++) {
      let classStr = 'bran_type_item';
      if (i === index) {
        classStr = 'bran_type_item_active'
      }
      tabData[i].class = classStr
    }
    this.setData({
      tab: tabData,
      rentType: tabData[index].value,
      pageNo: 1,
      pageCount: 0,
      rentList: []
    })
    this.getRoomList()
  },
  toBack() {
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 数据重置成功后 关闭效果
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断页面数据加载完
    let curNo = this.data.pageNo;
    if (curNo === this.data.pageCount) {
      wx.showToast({
        title: '数据已加载完',
        icon: 'success',
        duration: 2000
      })
    } else {
      this.setData({
        pageNo: curNo + 1
      })
      this.getRoomList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});