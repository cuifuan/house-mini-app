// pages/rent-info/index.js
import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from '../../store/store'
import {
  request
} from '../../utils/request';
const util = require('../../utils/util');
const {
  WxValidate
} = require('../../utils/WxValidate.js');
import moment from 'moment';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      rentCycle: 0,
      rentMonth: 0
    },
    // 业主界面才存在水电煤
    isYz: false,
    show: false,
    showTimeLine: false,
    copyIcon: "https://6375-cuifuan-4gl00gnn986698af-1311152798.tcb.qcloud.la/icon/%E5%A4%8D%E5%88%B6%E6%96%87%E4%BB%B6.png?sign=fb4653adda3a69d7fc3e984dd08bfb19&t=1654490629",
    showRentForm: true,
    incomeDate: util.formatDate(new Date()),
    nextRent: 0,
    remark: '',
    rentMoney: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绑定 MobX store
    this.storeBindings = createStoreBindings(this, {
      store,
      actions: ['setRentInfo']
    })
    this.getRentInfoData()
  },
  /**
   * 根据 id 获取对象
   */
  getRentInfoData: function (cb) {
    wx.showLoading({
      title: '数据加载中',
    })
    const self = this
    wx.getStorage({
      key: 'rentListId',
      success(res) {
        console.log(res)
        let params = {
          "rentListId": res.data
        }
        request('rentList/getById', 'POST', params)
          .then((res) => {
            wx.hideLoading()
            self.setData({
              model: res.data,
              isYz: res.data.rentType === 1
            })
            wx.setNavigationBarTitle({
              title: self.data.isYz ? '业主租单详情' : '租客租单详情'
            })
          })
        cb && cb()
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getRentInfoData()
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
    // this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getRentInfoData(() => {
      wx.stopPullDownRefresh();
    })
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

  },
  editRentFrom() {
    //   let index = options.currentTarget.dataset.id;
    //   let type = options.currentTarget.dataset.type;
    // let isYz = this.data.isYz;
    // let that = this
    this.setRentInfo(this.data.model)
    wx.navigateTo({
      url: '/pages/rent-order/rent-order',
      // events: {
      //   // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      //   acceptDataFromOpenedPage: function (data) {
      //     if (data.data === "ok") {
      //       that.searchList("")
      //     }
      //   }
      // },
      // success: function (res) {
      // 通过eventChannel向被打开页面传送数据
      // res.eventChannel.emit('acceptDataFromOpenerPage', {
      //   data: 'areYouOk'
      // })
      // }
    })
  },
  copyData: function (e) {
    let val = e.currentTarget.dataset.val
    wx.setClipboardData({
      data: val,
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res) // data
          }
        })
      }
    })
  },
  openImgList: function (e) {
    this.setData({
      show: true
    })
  },
  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({
      show: false
    });
  },
  showTimeLine: function () {
    this.setData({
      showTimeLine: true
    });
  },
  preview(event) {
    // console.log(event.currentTarget.dataset.src)
    let currentUrl = event.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: this.data.model.uploaderList // 需要预览的图片http链接列表
    })
  },
  /**
   * 交租窗口
   */
  showRentFrom() {
    this.initValidate()
    const zq = this.data.model.rentCycle
    const price = this.data.model.rentMonth
    // 计算下次交租日期
    const nextDate = this.data.model.nextDate
    let riqi = moment(nextDate).add(zq, 'months').format('YYYY-MM-DD')
    this.setData({
      showRentForm: true,
      nextRent: zq * price,
      rentMoney: this.data.model.rent,
      nextDateX: riqi
    })
  },
  /**
   * 交租日期
   */
  bindIncomeDateChange(e) {
    this.setData({
      incomeDate: e.detail.value
    })
  },
  bindNextDateXChange(e) {
    this.setData({
      nextDateX: e.detail.value
    })
  },
  initValidate() {
    // 验证规则
    let rules = {
      //需要验证的字段
      community: {
        required: true,
        maxlength: 20
      },
      building: {
        required: true,
      },
      roomNo: {
        required: true,
      },
      rent: {
        required: true,
        number: true
      },
      nextDate: {
        required: true,
      },
    }
    //自定义验证信息
    let message = {
      community: {
        required: '请输入小区',
        maxlength: '小区名字不能超过20个字'
      },
      building: {
        required: '请输入楼号',
      },
      roomNo: {
        required: '请输入房间号',
      },
      rent: {
        required: '请输入租金',
        number: '请输入正确的租金'
      },
      nextDate: {
        required: '请输入交租日期',
      },
    }
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  submitRentForm(e) {
    wx.showLoading({
      title: '数据提交中...',
    })
    const address = this.data.model.community + ' ' + this.data.model.building + '-' + this.data.model.roomNo
    const params = {
      address: address,
      rentType: this.data.model.rentType,
      incomeDate: this.data.incomeDate,
      rentListId: this.data.model.rentListId,
      rentMoney: this.data.rentMoney,
      nextDateX: this.data.nextDateX,
      nextRent: this.data.nextRent,
      remark: this.data.remark
    }
    request('api/v1/finance/add', 'POST', params)
      .then((res) => {
        wx.hideLoading()
        if(res && res.code === 0){
          wx.showToast({
            title: '数据已提交完成',
            icon: 'success',
            duration: 2000
          })
        }
      })
  }
})