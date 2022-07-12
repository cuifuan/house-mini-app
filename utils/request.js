// 引入env中的url
const {
  baseUrl
} = require('./env.js').dev; //这里上线的时候换成线上地址

module.exports = {
  BASE_URL: baseUrl,
  /**
   * 二次封装wx.request
   * url:请求的接口地址
   * method:请求方式 GET,POST....
   *  data:要传递的参数
   * header:请求头
   */
  request: (url, method, data, header) => {

    // console.log('这是我封装的ajax请求', url, method, data, header);

    let _url = `${baseUrl}/${url}`; //这里使用ES6的写法拼接的字符串

    return new Promise((resolve, reject) => {
      if (header == null) {
        header = {}
      }
      if (method === 'POST') {
        header = {
          'content-type': 'application/json;charset=UTF-8',
          'Cross-Origin-Opener-Policy': 'same-origin',
          'Cross-Origin-Embedder-Policy': 'require-corp'
        }
      }
      let token = wx.getStorageSync('token');
      if (token) {
        header.Authorization = 'Bearer ' + token
      }
      wx.request({
        url: _url,
        method: method,
        data: data,
        header: header,
        success: (res) => {
          const data = res.data;
          if (res.statusCode == 200) {
            //统一拦截--------401未登录活登录已过期token过期
            if (data.code == 401) {
              wx.hideLoading();
              wx.showToast({
                title: '检测到未登录或登录过期,跳转中...',
                icon: 'none',
                duration: 5000,
                success: () => {
                  setTimeout(() => {
                    wx.reLaunch({
                      url: '/pages/user/user', //拼接参数--表明是401--过去的
                    })
                  }, 4000);
                }
              })
              wx.clearStorage({
                success: (res) => {
                  console.log("清除Storage")
                },
              })
            }
            if (data.code == 0) {
              resolve(data);
              wx.hideLoading();
            }
            if (data.code == -1 || data.code == 500) {
              wx.hideLoading();
              wx.showToast({
                title: data.msg,
                icon: 'none',
                duration: 3000
              })
            }
            if (data.code == 404) {
              wx.hideLoading();
              wx.showToast({
                title: '参数效验失败',
                icon: 'none'
              })
            }
            if (data.code == 403) {
              // wx.hideLoading();
              wx.showToast({
                title: '没有相关权限',
                icon: 'none'
              })
            }
            if (data.code == 402) {
              wx.hideLoading();
              wx.showToast({
                title: '账户已禁用',
                icon: 'none'
              })
            }
          } else {
            // wx.hideLoading();
            wx.showToast({
              title: '请求有误',
              icon: 'none'
            })
          }
        },
        fail() {
          // wx.hideLoading();
          reject('发送失败');
          wx.reLaunch({
            url: '/pages/login/login', //
          })
          wx.showModal({
            title: '提示',
            content: '网络错误',
            success(res) {
              if (res.confirm) {
                console.log('用户点击确定');
              } else if (res.cancel) {
                console.log('用户点击取消');
              }
            }
          })
        }
      });

    });
  },
}