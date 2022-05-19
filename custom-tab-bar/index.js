import {
    storeBindingsBehavior
} from "mobx-miniprogram-bindings"
import {
    store
} from "../store/store"
Component({
    options: {
        styleIsolation: "shared"
    },
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: {
            active: () => store.activeTabbarIndex
        },
        actions: {
            updateActive: 'updateActiveTabbarIndex'
        }
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        "list": [{
                "pagePath": "/pages/home/home",
                "text": "首页",
                "selectedIconPath": "/images/tabBar/dash_active.png",
                "iconPath": "/images/tabBar/dash.png"
            },
            {
                "pagePath": "/pages/user/user",
                "text": "我",
                "selectedIconPath": "/images/tabBar/my_active.png",
                "iconPath": "/images/tabBar/my.png"
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onChange(event) {
            console.log(this.data)
            console.log(event.detail)
            // event.detail 的值为当前选中项的索引
            // this.setData({
            //     active: event.detail
            // });
            this.updateActive(event.detail)
            wx.switchTab({
                url: this.data.list[event.detail].pagePath,
            })
        },
    }
})