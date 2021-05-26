<template>
    <div id="account-container">
        <el-container>
            <el-header id="acc-header">
                <div id="acc-title" class="header-title">{{pjtitle}}</div>


                <div id="acc-homebtn" class="header-subtitle">
                    <span>控制台 <i class="el-icon-s-home"></i> <el-link type="primary" @click="backHome">回到首页</el-link></span>
                </div>

                <div id="acc-user">
                    <span id="acc-username" class="container-username">欢迎，<i class="el-icon-user"></i> {{userInfo.userName}}</span>
                    <el-link type="primary" @click="logout" style="margin-left: 10px;">登出</el-link>
                </div>
            </el-header>
            <el-main>
                <div id="acc-main">
                    <el-row>
                        <el-col :span="4" :style="naviWidth">
                            <div id="acc-navi">
                                <el-menu :default-openeds="menuOpen" :default-active="$route.name" @select="menuJump">
                                    <el-menu-item index="account" class="acc-navi-css"><i class="el-icon-s-operation"></i>账户中心</el-menu-item>
                                    <el-submenu index="article" class="acc-navi-css" >
                                        <i class="el-icon-document" slot="title"></i><span slot="title">稿件管理</span>
                                        <el-menu-item index="articleList" class="acc-navi-css"><i class="el-icon-folder-opened"></i>文章列表</el-menu-item>
                                        <el-menu-item index="articleEdit" class="acc-navi-css"><i class="el-icon-document-add"></i>文章撰写</el-menu-item>
                                        <el-menu-item index="categoryEdit" class="acc-navi-css"><i class="el-icon-collection-tag"></i>分类管理</el-menu-item>

                                    </el-submenu>

                                    <el-submenu index="config" class="acc-navi-css">
                                        <i class="el-icon-setting" slot="title"></i><span slot="title">站点设置</span>

                                        <el-menu-item index="trendingList" class="acc-navi-css"><i class="el-icon-s-promotion"></i>推荐位管理</el-menu-item>



                                    </el-submenu>

                                    <el-submenu index="user" class="acc-navi-css">
                                        <i class="el-icon-user" slot="title"></i><span slot="title">用户管理</span>

                                        <el-menu-item index="userList" class="acc-navi-css"><i class="el-icon-notebook-1"></i>用户列表</el-menu-item>



                                    </el-submenu>


                                    <el-submenu index="comment" class="acc-navi-css">
                                        <i class="el-icon-chat-line-square" slot="title"></i><span slot="title">评论管理</span>

                                        <el-menu-item index="commentList" class="acc-navi-css"><i class="el-icon-notebook-2"></i>评论列表</el-menu-item>



                                    </el-submenu>
                                </el-menu>
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div id="acc-content">
                                <router-view v-if="contentDisplay"></router-view>
                                <div v-if="!contentDisplay" class="not-admin"><!--not-admin-->
                                    <img width="130" height="110" src="data:image/jpg;base64,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" >
                                    <div class="not-admin-notice">Error：没有权限，可能你是管理，或者我不是管理</div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>

            <el-footer>
                <div class="container-copyright">
                    <span>{{$store.state.copyright}} {{$store.state.version}}</span>
                </div>
            </el-footer>
        </el-container>


    </div>
</template>

<script>
import store from '../store';
import {autoLogout, confirmLogout} from "../assets/function";

export default {
    name: "Console",
    store,
    data: function () {
        return {
            pjtitle: store.state.pjtitle,
            menuOpen:['user','comment','article','config'],
            userInfo: {
                userName: '',
            },

            accNaviActive: '',
            naviWidth: '',
            contentDisplay:false,
        }
    },
    mounted: function() {
        /*连接直接访问页面时导航tag激活
        this.accNaviActive = this.$route.name;
        */
        /*分辨率过窄时防止导航变形*/
        let screenWidth = document.documentElement.clientWidth;
        if(screenWidth <= 1250) {
            this.naviWidth = 'width:200px;';
        } else {
            this.naviWidth = '';
        }
        /*
        this.userInfo.userName = (typeof (JSON.parse(localStorage.getItem("userInfo")).username) === 'undefined')?
            (""): (JSON.parse(localStorage.getItem("userInfo")).username) ;

         */

        let authData = "accessToken=" + localStorage.getItem("accessToken");
        axios.post(store.state.apiUrl + "/api/user/getUserInfo",authData).then(response => {
            if(response.status === 200 && response.data.errcode === 0) {
                if(response.data.data.usertype === 1) {
                    this.contentDisplay = true;
                }
                this.userInfo.userName = response.data.data.username;
            } else if(response.data.errcode === 1001) {
                //account.vue组件可以因为自动跳转而不用鉴权
                //但articleList和TrendingList是公用api，get不用鉴权，容易给普通用户展现
                //所以必须要设置自动autoLogout
                autoLogout();
            } else {
                this.$message({
                    type: "error",
                    message: "[" + response.data.errcode + "]" + response.data.msg,
                });
            }
        });





    },
    methods: {
        menuJump(_index,_indexPath) {
            if(_index === "account") {
                this.$router.push("/account")
            } else {
                this.$router.push(_index);
            }

        },
        backHome: function () {
            this.$router.push('/news');
        },
        logout: function () {
            confirmLogout();

        },


    },


}
</script>

<style scoped>

/**
 * element ui具有默认边距：https://www.meiwen.com.cn/subject/mnebhctx.html
 */

.not-admin-notice {
    margin-top: 20px;
    color: #909399;
    font-size: 20px;
    font-style: oblique;
}
#acc-header {
    width: 100%;
    height: 60px;
    background-color: white;
    padding: 10px;


    display: flex;
    display: -webkit-flex;
    align-items: center;    /*弹性flex 布局*/


}


.el-main {
    padding: 0px; /*el-main自带20px padding*/

}

.el-footer {
    padding: 0px;
}


#acc-navi {
    /*width: 300px; */
    /*margin-left: 20px;*/
}



#acc-content {
    background-color: white;
    /*margin-right: 20px;*/
    padding: 20px;

}

#acc-main {
    padding: 20px;
    /*margin-top: 20px;*/
}

#acc-user {
    position: absolute;
    right: 40px;
}


.el-menu-item.is-disabled {
    background-color: #eaeaea;
}
</style>
