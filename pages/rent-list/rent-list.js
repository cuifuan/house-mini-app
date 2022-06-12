import {
  request
} from '../../utils/request'
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
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function (options) {
    if (!this.data.isloading) {
      this.getRoomList();
    }
    this.changeActive(0)
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      // 映射容器的实例
      store,
      // 映射容器的数据字段
      // fields: ['rentInfo'],
      // 映射容器修改的方法
      actions: ['setRentInfo']
    })
  },
  searchList(cb) {
    this.setData({
      pageNo: 1,
      pageCount: 0,
      rentList: []
    })
    this.getRoomList(cb);
  },
  getRoomList(cb) {
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
    request('rentList/list', 'POST', param)
      .then((res) => {
        this.setData({
          pageNo: res.pageNo,
          pageCount: res.pageCount
        });
        // 调用 setRentList action ，将数据写入 store
        let rentList = [...this.data.rentList, ...res.data];
        // this.setRentList(rentList)
        wx.hideLoading();
        this.setData({
          isloading: false,
          rentList: rentList
        });
        cb && cb()
      })
  },
  changeTab(e) {
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
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { 
    this.searchList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 解绑
    // this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.searchList(() => {
      wx.stopPullDownRefresh();
    })
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
  onShareAppMessage: function () { },
  removeById: function (e) {
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          wx.showLoading({
            title: '删除中...',
          })
          let id = e.currentTarget.dataset.id
          request('rentList/removeById/' + id, 'GET')
            .then((res) => {
              wx.hideLoading()
              console.log(res.data)
              if (res.data) {
                wx.showToast({
                  title: '删除成功'
                })
                setTimeout(() => {
                  that.searchList()
                }, 1800)
              }
            })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getRentInfo: function (args) {
    let index = args.currentTarget.dataset.id
    let rentInfo = this.data.rentList[index]
    console.log(rentInfo.rentListId)
    let renListId = rentInfo.rentListId
    // 开启加密存储
    wx.setStorage({
      key: "rentListId",
      data: renListId
    })
    // wx.setStorage('', )
    wx.navigateTo({
      url: "/pages/rent-info/rent-info"
    })
  }
});