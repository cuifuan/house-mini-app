const {
  request
} = require('../../utils/request.js');
var app = getApp()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: true,
    avatarUrl: defaultAvatarUrl,
    loginClick: false
  },
  clickLogout() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认退出吗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.clearStorageSync()
          that.setData({
            userInfo: '',
            hasUserInfo: false,
            avatarUrl: defaultAvatarUrl
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let token = wx.getStorageSync('token')
    let userInfo = wx.getStorageSync('userInfo')
    if (token) {
      this.setData({
        canIUseGetUserProfile: true,
      })
      if (userInfo) {
        this.setData({
          hasUserInfo: true,
          userInfo: userInfo,
          avatarUrl: userInfo.avatar
        })
      }
    } else {
      // 获取用户登录

    }
  },
  goLogin() {
    if (this.data.loginClick) {
      return
    } else {
      this.setData({
        loginClick: true
      })
    }
    wx.showLoading({
      title: '登录中...',
    })
    // 注意使用函数的写法，避免出现错误
    let userProFile = this.getUserProfile();
    // let loginCode = ;
    let that = this;
    this.getLoginCode().then((logCode) => {
        return new Promise((resolve, reject) => {
          userProFile.then(res => {
              resolve({
                wxCode: logCode.code,
                iv: res.iv,
                rawData: res.rawData,
                encryptedData: res.encryptedData,
                signature: res.signature
              });
            })
            .catch(err => {
              reject(err);
            });
        });
      })
      .then(res => {
        console.log('promise-res', res);
        request('auth/wxlogin', 'POST', res).then((resx) => {
          // 本地缓存token
          wx.setStorageSync('token', resx.data.token)
          // 保存用户信息
          wx.setStorageSync('userInfo', resx.data.userInfo)
          that.setData({
            userInfo: resx.data.userInfo,
            hasUserInfo: true,
            avatarUrl: resx.data.userInfo.avatar,
            loginClick: false
          })
          wx.hideLoading();
        })
      })
      .catch(err => {
        console.log('userProfile-err', err);
        that.setData({
          loginClick: false
        })
        wx.hideLoading();
      });
  },
  getUserProfile() {
    return new Promise((resolve, reject) => {
      wx.getUserProfile({
        desc: '获取您的头像及昵称',
        success: userRes => {
          // console.log('getUserProfile-res', userRes);
          resolve(userRes);
        },
        fail: userErr => {
          wx.showToast({
            title: '授权失败',
            icon: 'error'
          });
          console.log('getUserProfile-err', userErr);
          reject(userErr);
        }
      });
    });
  },
  getLoginCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: loginRes => {
          console.log('loginRes', loginRes);
          resolve(loginRes);
        }
      });
    });
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