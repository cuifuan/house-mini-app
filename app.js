// app.js
import {
  promisifyAll,
  promisify
} from 'miniprogram-api-promise';
import {
  store
} from './store/store';
// const wxp = {}
// promisify all wx's api
// promisifyAll(wx, wxp)
// console.log(wxp.getSystemInfoSync())
// wxp.getSystemInfo().then(console.log)
// wxp.showModal().then(wxp.openSetting())

// compatible usage
// wxp.getSystemInfo({
//     success(res) {
//         console.log(res)
//     }
// })

// promisify single api
// promisify()().then(console.log)
App({
  onLaunch() {
    let self = this
    let isLoad = false
    if (!isLoad) {
      wx.loadFontFace({
        family: 'alifont',
        source: 'url("https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/font/PingFang%20SC.ttf?sign=baa3d13e406819f42c22e86f0589669f&t=1654460546")',
        success: function (e) {
          console.log(e, '动态加载字体成功')
          self.isLoad = true
        },
        fail: function (e) {
          console.log(e, '动态加载字体失败')
        },
        global: true
      })
    }

    // wx.loadFontFace({
    //   family: 'Bitstream Vera Serif Bold',
    //   source: 'url("https://sungd.github.io/Pacifico.ttf")',
    //   success(res) {
    //     console.log(res.status)
    //   },
    //   fail: function(res) {
    //     console.log(res.status)
    //   },
    //   complete: function(res) {
    //     console.log(res.status)
    //   }
    // })
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
  },
  // onShow(options) {
  //     // 更新
  //     store.update();
  // },
})