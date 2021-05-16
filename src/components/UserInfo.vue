<template>
    <div>
        <div id="user-info-avatar">
            <img class="user-info-avatar" width="90" height="90" :src="user.avatar">
        </div>

        <div id="user-info-username" class="container-username">
            <span>欢迎，{{user.nickname}}</span>
        </div>

        <div id="user-info-btn" class="container-btn">
            <el-button-group id="notLoginBtn" v-if="!user.isLogin">
                <el-button type="primary" icon="el-icon-s-promotion" @click="toLogin">登 录</el-button>
                <el-button icon="el-icon-edit-outline" @click="toReg">注 册</el-button>
            </el-button-group>
            <el-button-group id="isLoginBtn" v-if="user.isLogin">
                <el-button icon="el-icon-setting" @click="toAcc">账户中心</el-button>
                <el-button type="danger" icon="el-icon-close" plain @click="logout">登 出</el-button>
            </el-button-group>
        </div>

        <div id="user-info-notice">
            <span>登录后可以对文章点赞、评论、收藏哦</span>
        </div>
    </div>
</template>

<script>
import store from "../store";
import {authLogout} from "../assets/function";

export default {
    name: "UserInfo",
    data() {
        return {
            user: {
                isLogin: false,
                nickname: "",
                avatar: store.state.defaultAvatar,
            }
        }
    },
    mounted() {
        let authData = "accessToken=" + localStorage.getItem("accessToken");
        axios.post(store.state.apiUrl + "/api/user/getUserInfo",authData).then(response => {
            if(response.status === 200 && response.data.errcode === 0) {
                this.user.isLogin = true;
                this.user.nickname = response.data.data.nickname;
                this.user.avatar = response.data.data.avatar;
            } else if(response.data.errcode === 1001) {
                this.user.isLogin = false;
                this.user.nickname = "请登录";
                this.user.avatar = store.state.defaultAvatar;
            } else {
                this.$message({
                    type: "error",
                    message: "[" + response.data.errcode + "]" + response.data.msg,
                });
            }
        });

    },
    methods: {
        toLogin() {
            this.$router.push('/auth/login?redirectUrl=' + encodeURIComponent(window.location.href));
        },
        toReg() {
            this.$router.push('/auth/register');
        },
        toAcc() {
            this.$router.push('/account');
        },
        logout() {
            this.$confirm("确认登出吗？","登出",{
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                authLogout();
                this.user.isLogin = false;
                this.user.nickname = "请登录";
                this.user.avatar = store.state.defaultAvatar;
                this.$message({
                    type:"success",
                    message:"登出成功！",
                });

            });
        }
    },

}
</script>

<style scoped>
.user-info-avatar {
    margin: 5px 90px 0px 90px;
    border-radius: 50%;
    border: solid 1px #409eff;
}

#user-info-username{
    text-align: center;
    margin-top: 15px;
}

#user-info-btn {
    margin-top: 15px;
    text-align: center;
}

#user-info-notice {
    margin-top: 15px;
    font-size: 10px;
    color: #999999;
    text-align: center;

}
</style>