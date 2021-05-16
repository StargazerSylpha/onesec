<template>
    <div id="user-list-container">
        <div><!--category-edit-navi-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-change-content-top"><!--category-edit-content-->
            <div class="function-title">用户列表</div>

            <div id="user-list-table" class="info-change-items-content-left">
                <el-table :data="userList" v-loading="getUserListLoading">
                    <el-table-column prop="uid" width="100" label="UID"></el-table-column>
                    <el-table-column prop="usertype" width="100" label="用户类型"></el-table-column>
                    <el-table-column prop="username" width="160" label="用户名"></el-table-column>
                    <el-table-column prop="nickname" width="160" label="昵称"></el-table-column>
                    <el-table-column prop="email" width="300" label="电子邮箱"></el-table-column>
                    <el-table-column prop="sex" width="70" label="性别"></el-table-column>
                    <el-table-column prop="birthday" width="100" label="生日"></el-table-column>
                    <el-table-column prop="regtime" width="160" label="注册时间" ></el-table-column>
                    <!--表格隐藏列仅接受v-if和v-show，不接受display和visibility 不过这样也好 v-if连源代码都不会显示-->
                    <el-table-column prop="userobject" v-if="false" label="usertObject" ></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openEditUser(scope.row.uid,scope.row.userobject)">编辑</el-button>
                            <el-button type="text" @click="deleteUser(scope.row.uid,scope.row.userobject)">删除（注销）</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <el-dialog id="edit-user-dialog" title="编辑用户信息" :visible="editUserForm.dialogVisivle" width="15%" :before-close="closeEditUserDialog">
                <div><!--editCategoryForm-->
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="信息" name="info">

                            <div><strong>UID：</strong> {{editUserForm.uid}}</div>
                            <div class="edit-form-item-row-space"><strong>注册时间：</strong> {{editUserForm.regtime}}</div>

                            <div class="edit-form-item-row-space"><strong>用户类型：</strong></div>
                            <el-radio-group v-model="editUserForm.usertype" class="edit-form-item-row-space">
                                <el-radio :label="0">普通用户</el-radio>
                                <el-radio :label="1">管理员</el-radio>
                            </el-radio-group>

                            <div class="edit-form-item-row-space"><strong>用户名：</strong></div>
                            <el-input type="text" v-model="editUserForm.username" class="edit-form-item-row-space" size="small" placeholder="用户名（6~20字符）" minlength="6" maxlength="20" >
                            </el-input>

                            <div class="imp-info-item-descrption edit-form-item-row-space">
                                <section style="color: red">提示：</section>
                                <section>更改用户名后，<span style="color: red;">需要使用新的用户名才能登录！</span></section>
                            </div>

                            <div class="edit-form-item-row-space"><strong>昵称：</strong></div>
                            <el-input type="text" v-model="editUserForm.nickname" class="edit-form-item-row-space" size="small" placeholder="昵称（6~20字符）" minlength="6" maxlength="20" >
                            </el-input>

                            <div class="edit-form-item-row-space"><strong>电子邮箱：</strong></div>
                            <el-input type="email" v-model="editUserForm.email" class="edit-form-item-row-space" size="small" placeholder="邮箱（6~50字符）" minlength="6" maxlength="50" >
                            </el-input>

                            <div class="edit-form-item-row-space"><strong>性别：</strong></div>
                            <el-radio-group v-model="editUserForm.sex" class="edit-form-item-row-space">
                                <el-radio :label="0">保密</el-radio>
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>

                            <div class="edit-form-item-row-space"><strong>出生日期：</strong></div>
                            <div style="margin-top: 5px;">
                                <el-date-picker type="date" style="width: 100%;"  size="small" v-model="editUserForm.birthday" placeholder="请选择生日..."></el-date-picker>
                            </div>

                            <!--两个btn放在一起会让中间出现间隔，所以需要用div隔开！-->
                            <div class="edit-form-item-row-space">
                                <el-button type="primary" size="small" style="width: 100%;" @click="editUserInfo" :loading="editUserForm.submitBtnLoading">提 交</el-button>
                            </div>

                        </el-tab-pane>

                        <el-tab-pane label="密码" name="password">
                            <div><strong>UID：</strong> {{editUserForm.uid}} <strong>设置新密码</strong></div>

                            <div class="edit-form-item-row-space"><strong>新密码：</strong></div>
                            <el-input type="password" v-model="editUserForm.password" class="edit-form-item-row-space" size="small" placeholder="密码（8~20字符）" minlength="8" maxlength="20" show-password>
                            </el-input>

                            <div class="edit-form-item-row-space">
                                <el-button type="primary" size="small" style="width: 100%;" @click="changeUserPassword" :loading="editUserForm.submitBtnLoading">提 交</el-button>
                            </div>
                        </el-tab-pane>

                        <!--
                        <el-tab-pane label="头像" name="avatar">
                        </el-tab-pane>
                        -->

                        <el-tab-pane label="删除" name="delete">
                            <div><strong>UID：</strong> {{editUserForm.uid}} <strong>删除用户</strong></div>
                            <div class="edit-form-item-row-space"><strong style="color: red">删除后无法反悔，请谨慎确认！</strong></div>

                            <div class="edit-form-item-row-space">
                                <el-button type="danger" size="small" style="width: 100%;" @click="confirmDeleteUser" :loading="editUserForm.submitBtnLoading">删 除</el-button>
                            </div>
                        </el-tab-pane>
                    </el-tabs>

                    <div class="edit-form-item-row-space">
                        <el-button size="small" style="width: 100%;" @click="closeEditUserDialog">关 闭</el-button>
                    </div>


                </div>

            </el-dialog>

        </div>

    </div>

</template>

<script>
import store from "../store";
import {authLogout, autoLogout, dateFormatter} from "../assets/function";
import {Message, MessageBox} from "element-ui";
import router from "../router";

export default {
    name: "UserList",
    data() {
        return {
            activeTab: "info",
            userList: [],
            getUserListLoading: false,
            editUserForm: {
                dialogVisivle:false,
                uid:-1,
                username:"",
                usertype:-1,
                email:"",
                nickname:"",
                birthday:"",
                sex:0,
                avatar:"",
                regtime:"",

                password:"",
                submitBtnLoading: false,
            },
        }
    },
    mounted() {
        document.title = '用户列表' + ' - ' + store.state.pageTitle
        this.getUserList();

    },
    methods: {
        getUserList() {
            this.getUserListLoading = true;
            let authData = "accessToken=" + localStorage.getItem("accessToken");
            axios.post(store.state.apiUrl + "/api/user/getUserList",authData).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    let resultList = response.data.data;
                    //js的对象for循环中间不是冒号，是in
                    for(let i = 0;i < resultList.length; i++) {
                        /**
                         * 这里采用对象赋值时不能直接地让两个对象相等
                         * let userObject = resultList[i];
                         * 因为后面将type和sex修改后会使userObject暂存的对象内容也修改（即两个对象指向同一内存地址）
                         * 这里采用先stringify后parse的方法 即可避免
                         */
                        let userObject = JSON.parse(JSON.stringify(resultList[i]));
                        resultList[i].usertype = (resultList[i].usertype === 0) ? "[0]普通用户" :
                            ((resultList[i].usertype === 1 ? "[1]管理员" : "[类型出错]"));
                        resultList[i].sex = (resultList[i].sex === 0) ? "[0]保密" :
                            ((resultList[i].sex === 1 ? "[1]男" : "[2]女"));
                        resultList[i].birthday = dateFormatter(resultList[i].birthday,false);
                        resultList[i].regtime = dateFormatter(resultList[i].regtime,true);
                        resultList[i].userobject = userObject;
                    }
                    this.userList = resultList;
                    this.getUserListLoading = false;

                } else if(response.data.errcode === 1001) {
                    autoLogout();
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    //加载失败不用解除转圈圈
                }
            });
        },
        closeEditUserDialog() {
            /**
             * dialog的右上角关闭x号实现关闭功能需要填写 :before-close，
             * 但直接在:before-close内写dialogVisible = false是不起作用的，必须另起一个函数写
             */
            this.editUserForm.dialogVisivle = false;
            this.activeTab = "info";
        },
        openEditUser(_uid, _userobj) {
            this.editUserForm.dialogVisivle = true;
            this.activeTab = "info";

            this.editUserForm.uid = _uid;
            this.editUserForm.usertype = _userobj.usertype;
            this.editUserForm.sex = _userobj.sex;
            this.editUserForm.username = _userobj.username;
            this.editUserForm.email = _userobj.email;
            this.editUserForm.birthday = dateFormatter(_userobj.birthday,false);
            this.editUserForm.nickname = _userobj.nickname;
            this.editUserForm.avatar = _userobj.avatar;
            this.editUserForm.regtime = dateFormatter(_userobj.regtime,true);
        },

        deleteUser(_uid,_userobj) {
            this.openEditUser(_uid,_userobj);
            this.activeTab = 'delete';
            this.deleteUserUid = _uid;
        },
        editUserInfo() {
            this.editUserForm.submitBtnLoading = true;
            let accessToken = localStorage.getItem("accessToken");
            let postData = {
                "uid": this.editUserForm.uid,
                "username": this.editUserForm.username,
                "nickname": this.editUserForm.nickname,
                "usertype": this.editUserForm.usertype,
                "email": this.editUserForm.email,
                "sex": this.editUserForm.sex,
                "birthday": dateFormatter(this.editUserForm.birthday,false)
            }


            if(postData.username === null || postData.username.length < 6 || postData.username.length > 20) {
                this.$message({
                    type:"error",
                    message: "用户名应当为6~20位字母、数字！",
                });
                this.editUserForm.submitBtnLoading = false;
                return;
            }
            if(postData.nickname === null || postData.nickname.length < 6 || postData.username.length > 20) {
                this.$message({
                    type:"error",
                    message: "昵称应当为6~20位字母、数字！",
                });
                this.editUserForm.submitBtnLoading = false;
                return;
            }
            if(postData.email === null || postData.email.length < 6 || postData.email.length > 50) {
                this.$message({
                    type:"error",
                    message: "电子邮箱格式有误！",
                });
                this.editUserForm.submitBtnLoading = false;
                return;
            }
            if(postData.birthday === null) {
                this.$message({
                    type:"error",
                    message: "生日不能为空！",
                });
                this.editUserForm.submitBtnLoading = false;
                return;
            }

            axios.post(store.state.apiUrl + "/api/user/editUserInfo?accessToken=" + accessToken,postData).then(response => {
                if(response.status === 200) {
                    if(response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "修改成功！",
                        });
                        this.getUserList();
                        this.editUserForm.submitBtnLoading = false;

                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.editUserForm.submitBtnLoading = false;
                    }
                }
            }).catch(error => {
                this.$message({
                    type: "error",
                    message: "[" + error.response.data.errcode + "]" + error.response.data.msg,
                });
                this.editUserForm.submitBtnLoading = false;

            });
        },
        changeUserPassword() {
            this.editUserForm.submitBtnLoading = true;
            if(this.editUserForm.password === null || this.editUserForm.password.length < 8 || this.editUserForm.password.length > 20) {
                this.$message({
                    type:"error",
                    message: "密码应当为8~20位字母、数字及常用符号！",
                });
                this.editUserForm.submitBtnLoading = false;
                return;
            }

            let accessToken = localStorage.getItem("accessToken");
            let postData = "accessToken=" + accessToken + "&uid=" + this.editUserForm.uid + "&password=" + this.editUserForm.password;
            axios.post(store.state.apiUrl + "/api/user/editUserPassword",postData).then(response => {
                if(response.status === 200) {
                    if(response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "修改成功！",
                        });
                        this.editUserForm.password = "";
                        this.editUserForm.submitBtnLoading = false;
                        this.getUserList();
                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.editUserForm.submitBtnLoading = false;
                    }
                }
                //string类型怎么输应该都不会400 就不用catch了
            });
        },
        confirmDeleteUser() {
            this.editUserForm.submitBtnLoading = true;
            this.$confirm("请再次确认是否要删除该用户","用户删除二次确认",{
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                //...
                this.editUserForm.submitBtnLoading = true;
                let accessToken = localStorage.getItem("accessToken");
                let postData = "accessToken=" + accessToken + "&uid=" + this.editUserForm.uid;
                axios.post(store.state.apiUrl + "/api/user/deleteUser",postData).then(response => {
                    if(response.status === 200) {
                        if(response.data.errcode === 0) {
                            this.$message({
                                type:"success",
                                message: "删除成功！",
                            });
                            this.getUserList();
                            this.editUserForm.dialogVisivle = false;
                            this.editUserForm.submitBtnLoading = false;

                        } else if(response.data.errcode === 1001) {
                            autoLogout();
                        } else {
                            this.$message({
                                type: "error",
                                message: "[" + response.data.errcode + "]" + response.data.msg,
                            });
                            this.editUserForm.submitBtnLoading = false;
                        }
                    }
                    //应该不用人为输long型uid 不用catch
                });
            }).catch(() => {
                this.editUserForm.submitBtnLoading = false;
            });
        }
    }
}
</script>

<style>
/**
 * 应用于dialog__body 的修改 style不能加scope 不然修改不会生效
 * https://www.jianshu.com/p/bf0e73a3f7d3
 */

#user-list-table .el-button{
    /*表格最右列按钮 padding缩小*/
    padding: 5px;
}

#edit-user-dialog .el-dialog__body {
    padding: 0px 15px 15px 15px;
}

</style>