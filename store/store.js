import {
  observable,
  action
} from 'mobx-miniprogram'

// 数据仓库
export const store = observable({

  rentList: [], // 租单列表

  getRentList: action(function (index) {
    return this.rentList[index]
  }),

  // 设置租单列表，从网络上获取到数据之后调用
  setRentList: action(function (list) {
    this.rentList = list
  }),

})