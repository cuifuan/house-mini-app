// app.js
App({
  onLaunch() {
    // @font-face {
    //   font-family: 'PingFang-SC';
    //   src: url("https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/font/PingFang%20SC%20Regular.ttf?sign=dd333f61c6e163c52dd51e81175d357d&t=1650814801");
    // }
    wx.loadFontFace({
      family: 'PingFang-SC',
      source: 'url("https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/font/PingFang%20SC.ttf?sign=0f3c98da6f45019801b5c990b205b853&t=1651685380")',
      success: console.log
    })
    // wx.loadFontFace({
    //   family: 'PingFangSC-Medium',
    //   source: 'url("")',
    //   global: true,
    //   success: function () {
    //     console.log('load font success')
    //   }
    // })
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
  },
  globalData: {
    userInfo: null
  }
})