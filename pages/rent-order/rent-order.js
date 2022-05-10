const util = require('../../utils/util.js');
const {
  WxValidate
} = require('../../utils/WxValidate.js');
const {
  request,
  BASE_URL
} = require('../../utils/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    rentDate: '',
    startDate: '',
    endDate: '',
    community: '',
    // 已选择的图片临时路径数组
    uploaderList: [],
    // 已选择图片个数
    uploaderNum: 0,
    // 用来判断是否可继续选择图片,当传至9张时不可继续上传
    showUpload: true,
    building: '',
    tipShow: false,
    communityList: [],
    isEnd: true,
    roomNo: '',
    nextDate: '',
    unionName: '',
    isUpdate: false,
    rentListId: 0,
    isYz: false,
    rentType: 2,
    // 弹窗
    showDialog: false
  },
  //获取数据
  getData(val) {
    let params = {
      'keyword': val ? val : this.data.community
    }
    request(
        'query/communityList',
        'GET',
        params)
      .then((res) => {
        this.setData({
          communityList: res.data
        })
      })
  },
  // 删除图片
  clearImg: function (e) {
    var nowList = []; //新数据
    var uploaderList = this.data.uploaderList; //原数据

    for (let i = 0; i < uploaderList.length; i++) {
      if (i == e.currentTarget.dataset.index) {
        continue;
      } else {
        nowList.push(uploaderList[i])
      }
    }
    this.setData({
      uploaderNum: this.data.uploaderNum - 1,
      uploaderList: nowList,
      showUpload: true
    })
  },
  //展示图片
  showImg: function (e) {
    var that = this;
    wx.previewImage({
      urls: that.data.uploaderList,
      current: that.data.uploaderList[e.currentTarget.dataset.index]
    })
  },
  //上传图片
  upload: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.uploaderNum, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let temp_list = []
        let tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        temp_list = temp_list.concat(tempFilePaths);
        for (var i = 0; i < temp_list.length; i++) {
          that.upload_server(temp_list[i])
        }
      }
    })
  },
  upload_server: function (path) {
    console.log(BASE_URL)
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    let that = this
    wx.uploadFile({
      url: BASE_URL + "/upload/v2",
      filePath: path,
      name: 'file',
      header: {
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + wx.getStorageSync('token')
      },
      success: function (res) {
        let data = JSON.parse(res.data);
        if (data.code != 0) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        let uploaderList = that.data.uploaderList.concat(data.data.url);
        that.setData({
          uploaderList: uploaderList,
          uploaderNum: uploaderList.length,
        })
        if (uploaderList.length == 9) {
          that.setData({
            showUpload: false
          })
        }
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast(); //隐藏Toast
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    if (options) {
      let isYz = options.isYz === 'yevu';
      this.setData({
        isYz: isYz
      })

      if (options.id) {
        wx.setNavigationBarTitle({
          title: '更新租单'
        })
        let data = {
          rentListId: options.id,
        }
        request('rentList/getById', 'POST', data)
          .then((res) => {
            let model = res.data;
            this.setData({
              community: model.community,
              building: model.building,
              roomNo: model.roomNo,
              nextDate: model.nextDate,
              startDate: model.startDate,
              endDate: model.endDate,
              rent: model.rent,
              unionName: model.unionName,
              phoneNo: model.phoneNo,
              waterNo: model.waterNo,
              electricNo: model.electricNo,
              gasNo: model.gasNo,
              isUpdate: true,
              rentListId: options.id,
              uploaderList: model.uploaderList,
              uploaderNum: model.uploaderList.length
            })
          })
      }
    }
    this.getData()
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
  bindNextDateChange: function (e) {
    this.setData({
      nextDate: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // if(this.data.id !== 0){
    // }
  },
  //当键盘输入时，触发input事件
  bindInputCommunity: function (e) {
    //用户实时输入值
    var prefix = e.detail.value
    this.getData(prefix);
    this.setData({
      tipShow: true
    })
  },
  //点击的值
  changeCommunity(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      communityId: e.currentTarget.dataset.id,
      community: e.currentTarget.dataset.name,
      isshow: true,
      tipShow: false
    })
  },
  // 匹配结果存在，显示自动联想词下拉列表
  focusStall() {
    this.setData({
      array: this.data.stallpicker
    })
  },

  bindBlurCommunity(e) {
    this.setData({
      tipShow: false
    })
  },
  submit: function (e) {
    //获取要验证的内容
    let params = e.detail.value;
    console.log(params);

    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    //在此写通过后的逻辑
    wx.showLoading({
      title: '提交中',
    })
    let that = this
    this.setData({
      rentType: this.data.isYz ? 1 : 2
    });
    request('rentList/addOrUpdate', 'POST', this.data)
      .then((res) => {
        if (res.data) {
          wx.hideLoading()
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(() => {
            if (that.data.isUpdate) {
              const eventChannel = that.getOpenerEventChannel()
              eventChannel.emit('acceptDataFromOpenedPage', {
                data: 'ok'
              });
            }
            wx.navigateBack({
              delta: 1
            })
          }, 2500)
        } else {
          wx.hideLoading()
          wx.showToast({
            title: '请求失败' + res.msg,
            icon: 'error',
            duration: 2000
          })
        }
      })
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
  onUnload: function () {},

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

  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 2000
    })
  },
})