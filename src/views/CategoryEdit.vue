<template>
    <div id="category-edit-container">
        <div><!--category-edit-navi-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>稿件管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-change-content-top"><!--category-edit-content-->
            <div class="function-title">分类管理</div>

            <div id="category-list-table" class="info-change-items-content-left">
                <el-table :data="categoryList" v-loading="getCategoryListLoading">
                    <el-table-column sortable prop="catid" width="100" label="分类ID"></el-table-column>
                    <el-table-column prop="catname" label="名称"></el-table-column>
                    <el-table-column sortable prop="catindex" width="80" label="顺序"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openEditCategory(scope.row.catid,scope.row.catname,scope.row.catindex)">编辑</el-button>
                            <el-button type="text" @click="deleteCategory(scope.row.catid,scope.row.catname)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>




            <div id="add-category-container"><!--add-category-container-->
                <el-form :model="newCategoryForm" :rules="newCatrgoryFormRules"><el-form-item prop="newCategoryName">
                    <el-input show-word-limit placeholder="请输入新分类的名称..." style="width: 200px;" size="small" minlength="1" maxlength="20" v-model="newCategoryForm.newCategoryName"></el-input>
                    <el-button :loading="newCategoryForm.submitBtnLoading" type="primary" size="small" style="margin-left: 10px;" @click="addCategory">添 加</el-button>
                </el-form-item></el-form>
            </div>





            <el-dialog :close-on-click-modal="false" id="edit-category-dialog" title="编辑分类" :visible="editCategoryForm.dialogVisible" width="15%" :before-close="closeEditCategoryDialog">
                <div><!--editCategoryForm-->
                    <el-form :model="editCategoryForm">
                        <div><strong>分类ID：</strong> {{editCategoryForm.catid}}</div>

                        <div class="edit-form-item-row-space"><strong>分类名称：</strong></div>
                        <el-form-item prop="catname">
                            <el-input type="text" class="edit-form-item-row-space" size="small" placeholder="请输入新的分类名称..." minlength="1" maxlength="20" v-model="editCategoryForm.catname" show-word-limit>
                            </el-input>
                        </el-form-item>


                        <div class="edit-form-item-row-space"><strong>分类顺序：</strong></div>
                        <el-form-item prop="catindex">
                            <el-input class="edit-form-item-row-space" type="number" size="small" placeholder="请选择分类顺序..." minlength="1" v-model="editCategoryForm.catindex">
                            </el-input>
                        </el-form-item>
                        <!--span没有margin-top-bottom，只有left跟right-->
                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color: red">提示：</section>
                            <section>分类顺序为<span style="color: red">大于0且小于100的整数</span>，值越大则优先度越高，在菜单及下拉选择框内<span style="color: red">越靠前显示</span>。</section>
                        </div>
                        <!--两个btn放在一起会让中间出现间隔，所以需要用div隔开！-->
                        <div class="edit-form-item-row-space">
                            <el-button type="primary" size="small" style="width: 100%;" @click="editCategory" :loading="editCategoryForm.submitBtnLoading">提 交</el-button>
                        </div>
                        <div class="edit-form-item-row-space">
                            <el-button  size="small" style="width: 100%;" @click="closeEditCategoryDialog">关 闭</el-button>
                        </div>
                    </el-form>


                </div>

            </el-dialog>
        </div>


    </div>
</template>

<script>
import store from "../store";
import {authLogout, autoLogout, confirmLogout, dateFormatter} from "../assets/function";
import {Message, MessageBox} from "element-ui";
import router from "../router";

export default {
    name: "CategoryEdit",
    data() {
        return {
            categoryList: [],
            getCategoryListLoading:false,
            newCategoryForm: {
                newCategoryName:"",
                submitBtnLoading:false,
            },
            editCategoryForm: {
                dialogVisible:false,
                catid:-1,
                catname:"",
                catindex:-1,
                submitBtnLoading: false,
            },
            /*ryFormRules: {
                catname: [
                    {required: true, message: '请输入分类名称', trigger: 'blur'},
                    {min: 1,max: 20, message: '分类名称应当为1~20位字符'},
                ],
                catindex: [
                    {type:'number',required: true, message: '请输入分类顺序', trigger: 'blur'},
                    {min:1 , max: 3, message: '分类顺序应为1~100之间的整数'},
                ],
            },

             */
            newCatrgoryFormRules: {
                newCategoryName: [
                    {required:true,message:"请输入新分类名称",trigger:"blur"},
                    {min:1,max:20,message: "分类名称应当为1~20位字符"}
                ],
            }
        }
    },
    mounted() {
        document.title = '分类管理' + ' - ' + store.state.pageTitle
        this.getCategoryList();
    },
    methods: {
        editCategory() {

            this.editCategoryForm.submitBtnLoading = true;
            let catid = this.editCategoryForm.catid;
            let catname = this.editCategoryForm.catname;
            let catindex = this.editCategoryForm.catindex;

            if(catname === null || catname.length < 1 || catname.length > 20) {
                this.$message({
                    type: "error",
                    message: "分类输入有误，请重新输入！",
                });
                this.editCategoryForm.submitBtnLoading = false;
            } else if(catindex === null || catindex < 0 || catindex > 100) {
                this.$message({
                    type: "error",
                    message: "分类顺序有误，请重新输入！",
                });
                this.editCategoryForm.submitBtnLoading = false;
            } else {
                let postData = "catid=" + catid + "&catname=" + catname + "&catindex=" + catindex + "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/category/editCategory",postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "修改成功！",
                        });
                        this.editCategoryForm.submitBtnLoading = false;
                        this.editCategoryForm.dialogVisible = false;
                        this.getCategoryList();
                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.editCategoryForm.submitBtnLoading = false;
                    }
                });
            }


        },
        deleteCategory(_catId, _catName) {
            this.$confirm("请确认是否要删除分类：[" + _catId + "]" + _catName ,"删除分类",{
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let authData = "catid=" + _catId + "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/category/deleteCategory",authData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "删除成功！",
                        });
                        this.getCategoryList();
                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                    }
                });
            });



        },
        getCategoryList() {
            this.getCategoryListLoading = true;
            axios.get(store.state.apiUrl + "/api/category/getCategoryList").then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    this.categoryList = response.data.data;
                    this.getCategoryListLoading = false;
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    //加载失败不用解除表格转圈圈
                }
            });
        },

        openEditCategory(_catid,_catname,_catindex) {
            this.editCategoryForm.dialogVisible = true;
            this.editCategoryForm.catid = _catid;
            this.editCategoryForm.catname = _catname;
            this.editCategoryForm.catindex = _catindex;
        },
        closeEditCategoryDialog() {
            /**
             * dialog的右上角关闭x号实现关闭功能需要填写 :before-close，
             * 但直接在:before-close内写dialogVisible = false是不起作用的，必须另起一个函数写
             */

            this.editCategoryForm.dialogVisible = false;


        },
        addCategory() {
            this.newCategoryForm.submitBtnLoading = true;
            let newCatName = this.newCategoryForm.newCategoryName;
            if(newCatName.length < 1 || newCatName.length > 20) {
                this.$message({
                    type: "error",
                    message: "分类名称输入有误，请重新输入！",
                });
                this.newCategoryForm.submitBtnLoading = false;
            } else {
                let postData = "catname=" + newCatName + "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/category/addCategory",postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "添加成功！",
                        });
                        this.newCategoryForm.submitBtnLoading = false;
                        this.newCategoryForm.newCategoryName = "";
                        this.getCategoryList();

                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.newCategoryForm.submitBtnLoading = false;
                    }
                });
            }

        }
    }
}
</script>

<style>
#category-list-table .el-button{
    padding: 5px;
}

#add-category-container {
    margin-top: 20px;
}

#edit-category-dialog .el-dialog__body {
    padding: 10px 15px 15px 15px;
}





</style>