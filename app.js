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
    this.autoUpdate()
    // let self = this
    // let isLoad = false
    // if (!isLoad) {
    //   wx.loadFontFace({
    //     family: 'alifont',
    //     source: 'url("https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/font/PingFang%20SC.ttf?sign=baa3d13e406819f42c22e86f0589669f&t=1654460546")',
    //     success: function (e) {
    //       console.log(e, '动态加载字体成功')
    //       self.isLoad = true
    //     },
    //     fail: function (e) {
    //       console.log(e, '动态加载字体失败')
    //     },
    //     global: true
    //   })
    // }

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
  autoUpdate:function(){
    console.log(new Date())
    var self=this
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          //2. 小程序有新版本，则静默下载新版本，做好更新准备
          updateManager.onUpdateReady(function () {
            console.log(new Date())
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  //3. 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                } else if (res.cancel) {
                  //如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                  wx.showModal({
                    title: '温馨提示~',
                    content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                    success: function (res) {     
                      self.autoUpdate()
                      return;                 
                      //第二次提示后，强制更新                      
                      if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate()
                      } else if (res.cancel) {
                        //重新回到版本更新提示
                        self.autoUpdate()
                      }
                    }
                  })
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null
  },
  // onShow(options) {
  //     // 更新
  //     store.update();
  // },
})