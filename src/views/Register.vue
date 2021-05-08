<template>
    <div id="register-content">
        <div id="auth-navi">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>账户中心</el-breadcrumb-item>
                <el-breadcrumb-item>注册</el-breadcrumb-item>

            </el-breadcrumb>
        </div>

        <div id="register-form">
            <el-tabs value="pwdreg">
                <el-tab-pane label="用户名注册" name="pwdreg">
                    <el-form :model="regForm" :rules="regFormRules" ref="regForm">
                        <div id="username">
                            <el-form-item prop="username">
                                <el-input placeholder="用户名（6~20位字母、数字，不可修改）" maxlength="20" minlength="6" prefix-icon="el-icon-user" v-model="regForm.username" clearable></el-input>
                            </el-form-item>
                        </div>
                        <div id="email" class="input-top">
                            <el-form-item prop="email">
                                <el-input type="email" placeholder="电子邮箱" prefix-icon="el-icon-message" maxlength="50" minlength="6" v-model="regForm.email" clearable></el-input>
                            </el-form-item>
                        </div>
                        <div id="password" class="input-top">
                            <el-form-item prop="password">
                                <el-input placeholder="密码（8~20位字母、数字及常用符号）" maxlength="20" minlength="8" v-model="regForm.password" prefix-icon="el-icon-lock" show-password clearable></el-input>
                            </el-form-item>
                        </div>
                        <div id="repassword" class="input-top">
                            <el-form-item prop="repassword">
                                <el-input placeholder="确认密码" v-model="regForm.repassword" maxlength="20" minlength="8" prefix-icon="el-icon-lock" show-password clearable></el-input>
                            </el-form-item>

                        </div>

                        <div id="reg-btn-area" style="margin-top: 20px;">
                            <el-form-item>
                                <el-button type="primary" icon="el-icon-s-promotion" class="btn-width" :loading="regBtnLoading" @click="doReg">注 册</el-button>
                            </el-form-item>

                        </div>
                    </el-form>
                    <div id="login-btn-area" style="margin-top: 15px;">
                        <el-button icon="el-icon-s-home" class="btn-width" @click="toLogin"  plain>返回登录</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="验证码注册" name="smsreg" disabled></el-tab-pane>
            </el-tabs>
        </div>

    </div>
</template>

<script>
import store from "../store";

export default {
    name: "Register",
    store,
    data() {
        return {
            regForm: {
                username: '',
                email: '',
                password: '',
                repassword: '',
            },
            regFormRules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 6,max: 20, message: '用户名应当为6~20位字母、数字'},
                ],
                email: [
                    {required: true, type: 'email', message: '请输入电子邮箱', trigger: 'blur'},
                    {min: 6, max: 50, message: '电子邮箱最长50个字符'},
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '密码应当为8~20位字母、数字及常用符号'}
                ],
                repassword: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '密码应当为8~20位字母、数字及常用符号'}
                ],
            },
            regBtnLoading: false,

        }
    },
    methods: {
        toLogin() {
            this.$router.push('login');
        },
        doReg() {
            this.regBtnLoading = true;
            this.$refs['regForm'].validate((result) => {
                if(result) {
                    if(this.regForm.password !== this.regForm.repassword) {
                        this.$message({
                            type: "error" ,
                            message :"两次输入的密码不一致！"
                        });
                        this.regBtnLoading = false;
                    } else {
                        let postData = "username=" + this.regForm.username
                            + "&password=" + this.regForm.password
                            + "&email=" + this.regForm.email;
                        axios.post(store.state.apiUrl + "/api/auth/register",postData).then(response => {
                            if(response.status === 200 && response.data.errcode === 0) {
                                this.$message({
                                    type: "success",
                                    message: "注册成功！正在转向登录页..."
                                });
                                localStorage.removeItem("userInfo");
                                localStorage.removeItem("accessToken");
                                this.$router.push("login");
                            } else {
                                this.$message({
                                    type: "error",
                                    message: "[" + response.data.errcode + "]" + response.data.msg,
                                });
                                this.regBtnLoading = false;
                            }
                        })
                    }
                }
            })
        },
    },
    mounted: function () {
        document.title = '注册' + ' - ' + store.state.pageTitle;
    },
}
</script>

<style scoped>
    #register-form {
        margin-top: 15px;
    }
    #username {
        margin-top: 10px;

    }
    .input-top {
        margin-top: 20px;
    }

    .btn-width {
        width: 100%;
    }

</style>
