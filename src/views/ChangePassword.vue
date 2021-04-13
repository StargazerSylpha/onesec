<template>
    <div id="changepassword-container">
        <div id="changepassword-navi">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>账户中心</el-breadcrumb-item>
                <el-breadcrumb-item>账号设置</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div id="changepassword-content">
            <div id="title" class="function-title">修改密码</div>

            <div id="info-items-content">
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

export default {
    name: "ChangePassword",
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
                    {min: 8, max: 10, message: '旧密码应当为8~20位字母、数字及常用符号'}
                ],
                newPwd: [
                    {required: true,  message: '请输入新密码', trigger: 'blur'},
                    {min: 8, max: 10, message: '新密码应当为8~20位字母、数字及常用符号'}
                ],
                reNewPwd: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {min: 8, max: 10, message: '新密码应当为8~20位字母、数字及常用符号'}
                ],
            },
        }

    },
    mounted: function () {
        document.title = '修改密码' + ' - ' + store.state.pageTitle;
    },
    methods: {
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
            } else {
                //...
            }
        },
    },
}
</script>

<style scoped>
#changepassword-content {
    margin-top: 30px;
}


#info-items-content {
    margin-top: 20px;
    margin-left: 5px;
}
</style>
