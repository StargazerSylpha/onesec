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
                    <div class="imp-info-item-value"><i class="el-icon-user-solid"></i> {{userInfo.uid}} [{{userInfo.usertype}}]</div>
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
                            <span class="imp-info-item-descrption">将会对外展示的名称，6~20位字符</span>
                        </div>
                        <div class="imp-info-item-input">
                            <el-input placeholder="请输入昵称" minlength="6" maxlength="20" prefix-icon="el-icon-edit" v-model="infoForm.nickname" clearable show-word-limit>
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
                        <el-button class="imp-info-submit-btn" type="primary" icon="el-icon-edit-outline"
                                   :loading="submitBtn.loading" @click="changeInfo">提 交</el-button>
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
                username: '',
                uid:'',
                regtime:'',
                usertype: '',
            },
            infoForm: {
                nickname:'',
                sex:0,
                birthday:'',
            },




            submitBtn: {
                loading: false,
            },

        }
    },
    mounted: function (url, config) {
        document.title = '修改资料' + ' - ' + store.state.pageTitle
        let authData = "accessToken=" + localStorage.getItem("accessToken");
        axios.post(store.state.apiUrl + "/api/user/getUserInfo",authData).then(response => {
            if(response.status === 200 && response.data.errcode === 0) {
                this.userInfo.uid = response.data.data.uid;
                this.userInfo.username = response.data.data.username;
                this.userInfo.usertype = (response.data.data.usertype === 1) ? "管理员" : "注册用户";
                this.userInfo.regtime = dateFormatter(response.data.data.regtime,true);
                this.infoForm.nickname = response.data.data.nickname;
                this.infoForm.sex = response.data.data.sex;
                this.infoForm.birthday = dateFormatter(response.data.data.birthday,false);
            } else if(response.data.errcode === 1001) {
                this.autoLogout();
            } else {
                this.$message({
                   type: "error",
                   message: "[" + response.data.errcode + "]" + response.data.msg,
                });
            }
        });
    },
    methods: {
        autoLogout: function () {
            authLogout();
            this.$message({
                type:"error",
                message:"登录状态已过期，请重新登录！",
            });
            this.$router.push("/auth/login");
        },
        changeInfo:function () {
            this.submitBtn.loading = true;
            let nickname = this.infoForm.nickname;
            let sex = this.infoForm.sex;
            let birthday = dateFormatter(this.infoForm.birthday,false);
            if(nickname != null && sex != null && birthday != null) {
                let postData = "nickname=" + nickname + "&sex=" + sex + "&birthday=" + birthday + "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/user/changeInfo",postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "修改成功！",
                        });
                        this.submitBtn.loading = false;
                    } else if(response.data.errcode === 1001) {
                        this.autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.submitBtn.loading = false;
                    }
                });
            }


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


#info-items-content {
    margin-top: 20px;
    margin-left: 5px;
}


</style>
