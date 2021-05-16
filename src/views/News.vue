<template>
    <div id="news-container">


        <div id="news-header" class="container-header">
            <span id="news-title" class="header-title">{{pjtitle}}</span>

            <div class="header-subtitle">新闻</div>
        </div>

        <div id="news-content">
            <el-row>
                <el-col class="news-left-navi">
                    <div id="news-left-navi">
                        <div id="news-navi-logo" @click="backHome">
                            <img class="news-navi-logo-img" :src="logosrc">
                        </div>

                        <div class="news-left-navi-line"></div>

                        <div id="news-left-navi-tab">
                            <el-tabs tab-position="left" value="ent" @tab-click="tabClick">
                                <el-tab-pane label="首页" name="home"></el-tab-pane>
                                <el-tab-pane label="快讯" name="kx"></el-tab-pane>
                                <el-tab-pane label="娱乐" name="ent"></el-tab-pane>
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
            user: {
                isLogin: true,
                nickname: "",
                avatar: "",
            },
            logosrc: "data:image/png;base64,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",
        }
    },
    mounted() {
        document.title = '新闻 - ' + store.state.pageTitle;

    },
    methods: {
        tabClick: function (res) {
            alert(res.name)
        },
        backHome: function () {
            this.$router.push("/");
        }
    },
}
</script>

<style scoped>

#news-navi-logo:hover {
    cursor: pointer;
}
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
    /*width: 100px;*/
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