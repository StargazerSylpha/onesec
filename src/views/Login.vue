<template>
    <div id="login-content">
        <div id="auth-navi">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>账户中心</el-breadcrumb-item>
                <el-breadcrumb-item>登录</el-breadcrumb-item>

            </el-breadcrumb>
        </div>

        <div id="login-form">
            <el-tabs value="pwdlogin">
                <el-tab-pane label="密码登录" name="pwdlogin">
                    <el-form :model="loginForm" :rules="loginFormRules">
                        <div id="username">
                            <el-form-item prop="username"><el-input placeholder="用户名" prefix-icon="el-icon-user" maxlength="20" minlength="6" v-model="loginForm.username" clearable></el-input></el-form-item>
                        </div>
                        <div id="password">
                            <el-form-item prop="password"><el-input placeholder="密码" v-model="loginForm.password" maxlength="20" minlength="8" prefix-icon="el-icon-lock" show-password clearable></el-input></el-form-item>
                        </div>
                        <div id="login-btn-area" style="margin-top: 20px;">
                            <el-form-item><el-button type="primary" icon="el-icon-s-promotion"
                                                     class="btn-width" :loading="loginBtnLoading" @click="doLogin">登 录</el-button></el-form-item>
                        </div>

                    </el-form>
                    <div id="reg-btn-area" style="margin-top: 10px;">
                        <el-button-group class="btn-width" >
                            <el-button icon="el-icon-edit-outline" style="width: 50%;" plain @click="toReg">注 册</el-button>

                            <el-button icon="el-icon-service" style="width: 50%;" @click="findPassword">无法登录</el-button>
                        </el-button-group>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="验证码登录" name="smslogin" disabled></el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>

import store from "../store";
import {authLogout} from "../assets/function";

/**
 * 加功能：在url上添加返回页urlencode地址，定向跳转
 */
export default {
    name: "Login",
    store,
    data: function () {
        return {
            loginForm: {
                username:"",
                password:"",
            },
            loginFormRules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 6,max: 20, message: '用户名应当为6~20位字母、数字'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '密码应当为8~20位字母、数字及常用符号'}
                ],
            },

            loginBtnLoading: false,
        }
    },
    mounted: function () {
        document.title = '登录' + ' - ' + store.state.pageTitle;

    },
    methods: {

        findPassword: function () {
            this.$message({
                message: "请联系在线客服处理",
                type: "error"
            });
            console.log(store.state.isAdmin === true ? "t":"f")
        },
        toReg() {
            this.$router.push('register');
        },
        doLogin() {

            this.loginBtnLoading = true;

            if(this.loginForm.username.length >= 6 && this.loginForm.username.length <= 20 &&
                this.loginForm.password.length >= 8 && this.loginForm.password.length <= 20) {
                let loginData = "username=" + this.loginForm.username + "&password=" + this.loginForm.password;
                axios.post(store.state.apiUrl + "/api/auth/login",loginData).then(response =>  {
                    if(response.status === 200 && response.data.errcode === 0) {
                        /**
                         * 设置localstorage，方便account.vue等组件读取展示用户信息
                         * @type {string}
                         */
                        let userInfo = JSON.stringify({
                            "uid": response.data.uid,
                            "username": response.data.username,
                            "usertype":response.data.usertype
                        });
                        localStorage.setItem("userInfo", userInfo);
                        localStorage.setItem("accessToken",response.data.accessToken);
                        this.$message({
                            type:"success",
                            message:"登录成功！"
                        });
                        if(typeof (this.$route.query.redirectUrl) === "undefined" || this.$route.query.redirectUrl.length < 8) {
                            this.$router.push("/account");
                        } else {
                            window.location = decodeURIComponent(this.$route.query.redirectUrl);
                        }

                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        authLogout();
                        this.loginBtnLoading = false;
                    }

                });


            } else {
                this.$message({
                   message: "请将账号与密码填写完整！",
                   type: "error",
                });
                authLogout();
                this.loginBtnLoading = false;
            }


        }

    },

}
</script>

<style scoped>
    #login-form {
        margin-top: 15px;
    }
    #username {
        margin-top: 10px;

    }
    #password {
        margin-top: 20px;

    }
    .btn-width {
        width: 100%;
    }




</style>
