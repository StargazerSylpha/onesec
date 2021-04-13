<template>
    <div id="news-container">


        <div id="news-header" class="container-header">
            <span id="news-title" class="header-title">{{pjtitle}}</span>
        </div>

        <div id="news-content">
            <el-row>
                <el-col class="news-left-navi">
                    <div id="news-left-navi">
                        <div id="news-navi-logo">
                            <img src="//tb2.bdstatic.com/tb/editor/images/face/i_f25.png" class="news-navi-logo-img">
                        </div>

                        <div class="news-left-navi-line"></div>

                        <div id="news-left-navi-tab">
                            <el-tabs tab-position="left" @tab-click="tabClick">
                                <el-tab-pane label="首页" name=""></el-tab-pane>
                                <el-tab-pane label="快讯" name="kx"></el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-col>

                <el-col class="news-main">
                    <div id="news-main">
                        <router-view></router-view>
                    </div>
                </el-col>
            </el-row>




        </div>
        <div id="news-copyright" class="container-copyright">
            <span>Copyright &copy; 2021 Project ONESEC / Sylpha Project Co., Ltd. All Rights Reserved.</span>
        </div>
    </div>
</template>

<script>
import store from '../store';
export default {
    name: "News",
    store,
    data() {
        return {
            pjtitle: store.state.pjtitle,
        }
    },
    mounted() {
        document.title = '新闻 - ' + store.state.pageTitle;
    },
    methods: {
        tabClick: function (res) {
            alert(res.name)
        }
    },
}
</script>

<style scoped>
#news-content {
    margin: 20px auto 20px auto;
    width: 1200px;

}
.news-left-navi {
    width: 120px;

}

#news-navi-logo {
    height: 100px ;

}

.news-navi-logo-img {
    width: 100px;
    height: 100px;
    float: right;

}


.news-left-navi-line {
    height: 1px;
    background-color: #409eff;
    width: 20px;
    margin-top: 30px;
    float: right;

}

#news-left-navi-tab {
    margin-top: 50px;

}

.news-main {

    width: 1060px;
    margin-left: 20px;

}

/**
 * 重写el-tabs样式
 */
.el-tabs--left {
    float: right;
    margin-right: -10px;
}
.el-tabs__header.is-left {
    float: right;
    margin-right: -10px;
}

</style>