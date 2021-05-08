<template>
    <div id="account-container">
        <el-container>
            <el-header id="acc-header">
                <div id="acc-title" class="header-title">{{pjtitle}}</div>


                <div id="acc-homebtn" class="header-subtitle">
                    <span>账户中心 <i class="el-icon-s-home"></i> <el-link type="primary" @click="backHome">回到首页</el-link></span>
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
                                <el-menu :default-openeds="menuOpen" :default-active="$route.name" :router="true">
                                    <el-submenu index="user" class="acc-navi-css" >
                                        <i class="el-icon-setting" slot="title"></i><span slot="title">账号设置</span>

                                        <el-menu-item index="changeInfo" class="acc-navi-css"><i class="el-icon-edit-outline"></i>修改资料</el-menu-item>

                                        <!--<el-menu-item index="changeEmail" class="acc-navi-css"><i class="el-icon-message"></i>修改邮箱</el-menu-item>-->
                                        <el-menu-item index="changePassword" class="acc-navi-css"><i class="el-icon-lock"></i>修改密码</el-menu-item>
                                        <!--修改手机 / 注销账号 / 钱包余额与明细 / 签到 -->
                                    </el-submenu>

                                    <el-submenu index="comment" class="acc-navi-css">
                                        <i class="el-icon-chat-line-square" slot="title"></i><span slot="title">我的评论</span>

                                        <el-menu-item index="commentList" class="acc-navi-css"><i class="el-icon-chat-round"></i>全部评论</el-menu-item>
                                        <el-menu-item index="commentSetting" class="acc-navi-css"><i class="el-icon-set-up"></i>评论设置</el-menu-item>


                                    </el-submenu>
                                </el-menu>
                            </div>
                        </el-col>
                        <el-col :span="20">
                            <div id="acc-content">
                                <router-view></router-view>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>

            <el-footer>
                <div class="container-copyright">
                    <span>Copyright &copy; 2021 Project ONESEC / Sylpha Project Co., Ltd. All Rights Reserved.</span>
                </div>
            </el-footer>
        </el-container>


    </div>
</template>

<script>
import store from '../store';

export default {
    name: "Account",
    store,
    data: function () {
        return {
            pjtitle: store.state.pjtitle,
            menuOpen:['user','comment'],
            userInfo: {
              userName: '',
            },

            accNaviActive: '',
            naviWidth: '',
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

        this.userInfo.userName = (typeof (JSON.parse(localStorage.getItem("userInfo")).username) === 'undefined')?
            (""): (JSON.parse(localStorage.getItem("userInfo")).username) ;





    },
    methods: {
        backHome: function () {
            this.$router.push('/news');
        },
        logout: function () {
            this.$confirm("确认登出吗？","登出",{
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                authLogout();
                this.$message({
                    type:"success",
                    message:"登出成功！",
                });
                this.$router.push("/auth/login");

            });

        },


    },
    computed: {
        /*
        routeName: function () {
            return this.$route.name;
        },

         */

    },
    watch: {
        /*
        routeName: function () {
            this.accNaviActive = this.$route.name;
        },
        */
    },


}
</script>

<style scoped>

    /**
     * element ui具有默认边距：https://www.meiwen.com.cn/subject/mnebhctx.html
     */
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

    .acc-navi-css {
        background-color: #eaeaea;
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
