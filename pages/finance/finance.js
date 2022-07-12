import {
  request
} from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    option1: [
      { text: '全部', value: 0 },
      { text: '业主', value: 1 },
      { text: '租客', value: 2 },
    ],
    option2: [
      { text: '默认当月', value: 'a' },
      { text: '当年', value: 'b' },
      { text: '上个月', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
  },
  handleSingleSelect(e) {
    this.setData({
      'singleSelect.value': e.detail.value,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getFinance()
  },
  /**
   * 获取数据
   */
  getFinance() {
    const self = this
    const params = {
      pageNo: 1,
      pageSize: 10
    }
    request('api/v1/finance/page', 'POST', params)
      .then((res) => {
        if (res && res.code === 0) {
          console.log(res.data)
          self.setData({
            dataList: res.data.records
          })
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

  }
})