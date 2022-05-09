Page({
  mixins: [require('../../mixin/common')],
  data: {
    message: "",
    keyword: ""
  },
  // 允许当前页面可分享
  onShareAppMessage() {

  },
  checkStatus() {
    if (!this.data.check) {
      this.setData({
        msg: true,
      });
    }
    const that = this;
    setTimeout(() => {
      that.setData({
        msg: false,
      });
    }, 320);
  },
  search(e) {
    let that = this
    wx.showLoading({
      title: '玩命查询中...',
    })
    wx.request({
      url: 'https://www.zabbix.store/basic-api/api/search',
      // url: 'http://192.168.0.111:8080/covid-sh/api/search',
      method: "post",
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: {
        "token": 'cuifuan123',
        "address": that.data.keyword
      },
      success(res) {
        wx.hideLoading()
        that.setData({
          message: res.data.data,
        });
      }
    })
  },
});