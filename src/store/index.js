import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pjtitle:'＃Project ONESEC',
        pageTitle: 'Project ONESEC',
        apiUrl: "http://localhost:8081",
        defaultAvatar: "//arraycats-1253302621.cos.ap-shanghai.myqcloud.com/img/akalin.jpg",

    },
    mutations: {
        //mutations、actions仅能传递一个参数！不支持传多个参数！


    },
    actions: {
    },
    modules: {
    }
})
