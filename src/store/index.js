import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pjtitle:'＃一秒资讯',
        pageTitle: '一秒资讯',
        apiUrl: "http://localhost:8081",
        //img有一个onerror属性，传入的是函数方法，可以设置默认底图（即原图加载失败的替代图）
        defaultAvatar: "//arraycats-1253302621.cos.ap-shanghai.myqcloud.com/img/akalin.jpg",
        defaultBanner: "//arraycats-1253302621.cos.ap-shanghai.myqcloud.com/img/newsimg.jpg",
        copyright:"Copyright © 2021 Project ONESEC / Sylpha Project Co., Ltd. All Rights Reserved.",
        version: "Ver. 0.3_186e841_preview",

    },
    mutations: {
        //mutations、actions仅能传递一个参数！不支持传多个参数！
        //vuex不靠谱，尽量只存静态数据

    },
    actions: {
    },
    modules: {
    }
})
