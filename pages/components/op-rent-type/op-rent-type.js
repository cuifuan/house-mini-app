// pages/components/op-rent-type..js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //是否显示modal弹窗
    show: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
    oneButton: [{
      text: '确定'
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    openConfirm: function () {
      this.setData({
        dialogShow: true
      })
    },
    tapDialogButton(e) {
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    },
    tapOneDialogButton(e) {
      this.setData({
        showOneButtonDialog: true
      })
    }
  }
})