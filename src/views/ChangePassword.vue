<template>
    <div id="changepassword-container">
        <div id="changepassword-navi">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>账户中心</el-breadcrumb-item>
                <el-breadcrumb-item>账号设置</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div id="changepassword-content" class="info-change-content-top">
            <div id="title" class="function-title">修改密码</div>

            <div id="info-items-content" class="info-change-items-content-left">
                <el-form :model="changePwdForm" :rules="changePwdFormRules">
                <div>
                    <div>
                        <span class="imp-info-item-title">旧密码：</span>
                    </div>
                    <div class="imp-info-item-input">
                        <el-form-item prop="oldPwd">
                            <el-input type="password" placeholder="请输入旧密码" prefix-icon="el-icon-lock" maxlength="20" minlength="8" v-model="changePwdForm.oldPwd" show-password clearable></el-input>
                        </el-form-item>
                    </div>
                </div>

                <div class="imp-change-item-top">
                    <div>
                        <span class="imp-info-item-title">新密码：</span>

                    </div>
                    <div class="imp-info-item-input">
                        <el-form-item prop="newPwd">
                            <el-input type="password"  placeholder="请输入新密码（8~20位字母、数字及常用符号）" prefix-icon="el-icon-lock" maxlength="20" minlength="8" v-model="changePwdForm.newPwd" show-password clearable ></el-input>
                        </el-form-item>
                    </div>

                </div>

                <div class="imp-change-item-top">
                    <div>
                        <span class="imp-info-item-title">确认新密码：</span>

                    </div>
                    <div class="imp-info-item-input">
                        <el-form-item prop="reNewPwd">
                            <el-input type="password" placeholder="请再次输入新密码" prefix-icon="el-icon-lock" maxlength="20" minlength="8" v-model="changePwdForm.reNewPwd" show-password clearable></el-input>
                        </el-form-item>
                    </div>

                </div>

                <div>
                    <el-form-item>
                        <el-button class="imp-change-submit-btn" type="primary" icon="el-icon-edit-outline" :loading="submitBtn.loading" @click="changePassword">提 交</el-button>
                    </el-form-item>
                </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
import store from "../store";
import {autoLogout} from "../assets/function";

export default {
    name: "ChangePassword",
    store,
    data: function () {
        return {
            changePwdForm: {
                oldPwd: '',
                newPwd: '',
                reNewPwd: '',
            },
            submitBtn: {
                loading: false,

            },
            changePwdFormRules: {
                oldPwd: [
                    {required: true,  message: '请输入旧密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '旧密码应当为8~20位字母、数字及常用符号'}
                ],
                newPwd: [
                    {required: true,  message: '请输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '新密码应当为8~20位字母、数字及常用符号'}
                ],
                reNewPwd: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '新密码应当为8~20位字母、数字及常用符号'}
                ],
            },
        }

    },
    mounted: function () {
        document.title = '修改密码' + ' - ' + store.state.pageTitle;
        let authData = "accessToken=" + localStorage.getItem("accessToken");
        axios.post(store.state.apiUrl + "/api/user/getUserInfo",authData).then(response => {
            if(response.status === 200 && response.data.errcode === 0) {
                //...
            } else if(response.data.errcode === 1001) {
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
        /*
        autoLogout: function (type,msg) {
            authLogout();
            if(typeof type === "undefined" || typeof msg === "undefined") {
                this.$message({
                    type:"error",
                    message:"登录状态已过期，请重新登录！",
                });
            } else {
                this.$message({
                    type:type,
                    message:msg,
                });
            }
            this.$router.push("/auth/login");
        },

         */
        changePassword: function () {
            this.submitBtn.loading = true;
            let oldPwd = this.changePwdForm.oldPwd;
            let newPwd = this.changePwdForm.newPwd ;
            let reNewPwd = this.changePwdForm.reNewPwd;
            if (oldPwd.length < 8 || oldPwd.length > 20 ||
                newPwd.length < 8 || newPwd.length > 20 ||
                reNewPwd.length < 8 || reNewPwd.length > 20  ) {
                this.$message({
                    message: '密码应为8~20位字母、数字及常用符号！',
                    type: 'error',
                });
                this.submitBtn.loading = false;
            } else if (newPwd !== reNewPwd) {
                this.$message({
                    message: '两次输入的新密码不一致！',
                    type: 'error',
                });
                this.submitBtn.loading = false;
            } else if(newPwd === oldPwd) {
                this.$message({
                    message: '新密码与旧密码不可以相同！',
                    type: 'error',
                });
                this.submitBtn.loading = false;
            } else {
                let postData = "accessToken=" + localStorage.getItem("accessToken") +
                                "&oldpassword=" + oldPwd + "&newpassword=" + newPwd;
                axios.post(store.state.apiUrl + "/api/user/changePassword",postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        autoLogout("success","密码修改成功！请重新登录");
                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.submitBtn.loading = false;
                    }
                });
            }
        },
    },
}
</script>

<style scoped>

</style>
