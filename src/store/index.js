import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pjtitle:'＃一秒资讯',
        pageTitle: '一秒资讯',
        apiUrl: "http://localhost:8081",
        defaultAvatar: "//arraycats-1253302621.cos.ap-shanghai.myqcloud.com/img/akalin.jpg",


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
