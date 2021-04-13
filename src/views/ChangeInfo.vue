<template>
    <div id="changeinfo-container">
        <div id="changeinfo-navi">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>账户中心</el-breadcrumb-item>
                <el-breadcrumb-item>账号设置</el-breadcrumb-item>
                <el-breadcrumb-item>修改资料</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div id="changeinfo-content">
            <div id="title" class="function-title">修改资料</div>

            <div id="info-items-content">
                <div id="info-username">
                    <div>
                        <span class="imp-info-item-title">用户名：</span>
                        <span class="imp-info-item-descrption">6~20位字母、数字，不可修改</span>
                    </div>
                    <div class="imp-info-item-value"><i class="el-icon-user"></i> {{userInfo.username}}</div>
                    <div class="imp-info-item-line"></div>
                </div>

                <div id="info-uid" class="imp-info-item-top">
                    <div>
                        <span class="imp-info-item-title">UID：</span>

                    </div>
                    <div class="imp-info-item-value"><i class="el-icon-user-solid"></i> {{userInfo.uid}}</div>
                    <div class="imp-info-item-line"></div>
                </div>

                <div id="info-regtime" class="imp-info-item-top">
                    <div>
                        <span class="imp-info-item-title">注册时间：</span>
                    </div>
                    <div class="imp-info-item-value"><i class="el-icon-s-check"></i> {{userInfo.regtime}}</div>
                    <div class="imp-info-item-line"></div>
                </div>


                    <div id="info-nickname" class="imp-info-item-top">
                        <div>
                            <span class="imp-info-item-title">昵称：</span>
                            <span class="imp-info-item-descrption">将会对外展示的名称，1~20位字符</span>
                        </div>
                        <div class="imp-info-item-input">
                            <el-input placeholder="请输入昵称" minlength="6" maxlength="20" prefix-icon="el-icon-edit" v-model="infoForm.nickname"clearable show-word-limit>
                            </el-input>
                        </div>
                        <div class="imp-info-item-line"></div>
                    </div>

                    <div id="info-sex" class="imp-info-item-top">
                        <div>
                            <span class="imp-info-item-title">性别：</span>
                        </div>
                        <div class="imp-info-item-input">
                            <el-radio-group v-model="infoForm.sex">
                                <el-radio :label="0">保密</el-radio>
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="imp-info-item-line"></div>
                    </div>

                    <div id="info-birthday" class="imp-info-item-top">
                        <div>
                            <span class="imp-info-item-title">出生日期：</span>
                            <span class="imp-info-item-descrption">生日当天说不定会有惊喜（？）</span>
                        </div>
                        <div class="imp-info-item-input">
                            <el-date-picker type="date" style="width: 100%;" v-model="infoForm.birthday" placeholder="请选择生日"></el-date-picker>
                        </div>
                        <div class="imp-info-item-line"></div>
                    </div>

                    <div>
                        <el-button class="imp-info-submit-btn" type="primary" icon="el-icon-edit-outline" :loading="submitBtn.loading" @click="changeInfo">提 交</el-button>
                    </div>

            </div>
        </div>

    </div>
</template>

<script>
import store from '../store';
export default {
    name: "ChangeInfo",
    store,
    data:function () {
        return {

            userInfo: {
                username: 'admin',
                uid:'409efa1',
                regtime:'2099-12-31 23:59:59',
            },
            infoForm: {
                nickname:'Sylpha',
                sex:0,
                birthday:'2000-01-01',
            },




            submitBtn: {
                loading: false,

            }

        }
    },
    mounted: function () {
        document.title = '修改资料' + ' - ' + store.state.pageTitle;
    },
    methods: {
        changeInfo:function () {
            this.submitBtn.loading = true;
            this.$message({
               type: 'success',
               message: '修改成功！',
            });
            this.submitBtn.loading = false;

        }
    },
    computed: {
        /*
        userNickname: function() {
            return this.user.nickname;
        },
        userSex: function() {
            return this.user.sex;
        },
        userBirthday: function() {
            return this.user.birthday;
        },
        */
    },
    watch: {
        /*
        userNickname: function () {
            this.submitBtn.disable = false;
        },
        userSex: function () {
            this.submitBtn.disable = false;
        },
        userBirthday: function () {
            this.submitBtn.disable = false;
        },

         */
    }
}
</script>

<style scoped>
#changeinfo-content {
    margin-top: 30px;
}

.function-title {
    font-size: 20px;
    color: #606266;
    border-left: 10px solid #409eff;
}

#info-items-content {
    margin-top: 20px;
    margin-left: 5px;
}


</style>
