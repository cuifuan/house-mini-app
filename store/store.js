import {
    observable,
    action
} from 'mobx-miniprogram'

// 数据仓库
export const store = observable({

    rentInfo: {}, // 租单详情

    activeTabbarIndex: 0,

    getRentInfo: action(function () {
        return this.rentInfo
    }),

    // 设置租单详情
    setRentInfo: action(function (rentInfo) {
        this.rentInfo = rentInfo
    }),

    updateActiveTabbarIndex: action(function (index) {
        this.activeTabbarIndex = index
    })

})