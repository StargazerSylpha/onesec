<template>

    <div id="user-comment-container">
        <div><!--category-edit-navi-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>稿件管理</el-breadcrumb-item>
                <el-breadcrumb-item>我的评论</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-change-content-top"><!--category-edit-content-->
            <div class="function-title">我的评论</div>

            <div id="user-comment-table" class="info-change-items-content-left">
                <div>

                    <el-pagination layout="prev,pager,next" @current-change="pageChange" :current-page="getUserCommentForm.currentPage" :page-size="getUserCommentForm.pageSize" :total="getUserCommentForm.total" ></el-pagination>


                    <div class="edit-form-item-row-space">
                        <el-table class="user-comment-table" :data="commentList" v-loading="getUserCommentForm.tableLoading">
                            <el-table-column prop="cid" width="100" label="评论ID" sortable></el-table-column>
                            <el-table-column prop="articleTitle" width="400"  label="所属文章ID & 标题" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-link :underline="false" @click="toNewsDetail(scope.row.article)">{{scope.row.articleTitle}}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="comment" width="400" label="评论内容" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-link :underline="false" @click="showCommentDetail(scope.row.cid,scope.row.comment)">{{scope.row.comment}}</el-link>
                                </template>
                            </el-table-column>
                            <el-table-column prop="publishDate" width="160" label="发布日期" sortable></el-table-column>
                            <!--表格隐藏列仅接受v-if和v-show，不接受display和visibility 不过这样也好 v-if连源代码都不会显示-->
                            <el-table-column label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="text" @click="deleteComment(scope.row.cid)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="edit-form-item-row-space">
                        <el-pagination layout="prev,pager,next" @current-change="pageChange" :current-page="getUserCommentForm.currentPage" :page-size="getUserCommentForm.pageSize" :total="getUserCommentForm.total"></el-pagination>
                    </div>

                    <el-dialog :close-on-click-modal="true" id="comment-detail-dialog" :title="commentDialogTitle" :visible="commentDialogDisplay" width="30%" :before-close="closeCommentDialog">
                        <div style="white-space: pre-wrap;" v-html="commentDetail"><!--editCategoryForm-->
                            <!--添加这个css样式，可以使内容中\n \r效果展示出来-->
                        </div>
                        <el-button size="small" style="width: 100%;" class="edit-form-item-row-space" @click="closeCommentDialog">关 闭</el-button>
                    </el-dialog>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../store";
import {autoLogout, dateFormatter} from "../assets/function";

export default {
    name: "UserComment",
    data() {
        return {
            getUserCommentForm: {
                pageSize:20,
                currentPage:1,
                total:-1,

                tableLoading: false,


            },
            commentList:[],
            commentDialogDisplay:false,
            commentDetail:"",
            commentDialogTitle:"评论详细内容",
        }
    },
    mounted() {
        document.title = '我的评论' + ' - ' + store.state.pageTitle;
        this.getUserComment();
    },
    methods: {

        deleteComment(_cid) {
            this.$confirm("请确认是否要删除评论：#" + _cid ,"删除评论",{
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let authData = "cid=" + _cid +  "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/comment/userDeleteComment?t=" + Math.random(),authData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "删除成功！",
                        });
                        this.getUserComment();
                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode+ "]" + response.data.msg,
                        });
                    }
                }).catch(error => {
                    this.$message({
                        type: "error",
                        message: "[" + error.response.data.errcode+ "]" + error.response.data.msg,
                    });
                });
            });



        },
        pageChange(_newPage) {
            //后台页码从0开始...
            this.getUserCommentForm.currentPage = _newPage;
            this.getUserComment(_newPage - 1);
        },
        getUserComment(_pageId) {
            this.getUserCommentForm.tableLoading = true;

            let page = (_pageId == null || typeof _pageId === "undefined" || _pageId < 1) ? 0 : _pageId;
            let postData = "page=" + page + "&accessToken=" + localStorage.getItem("accessToken");
            axios.post(store.state.apiUrl + "/api/comment/getUserComment?t=" + Math.random(),postData).then(response => {
                if(response.data.errcode === 0) {
                    let resultList = response.data.data;
                    this.getUserCommentForm.total = response.data.size;
                    for(let i = 0; i < resultList.length; i++) {
                        resultList[i].publishDate = dateFormatter(resultList[i].publishDate,true);
                        resultList[i].articleTitle = "[" + resultList[i].article + "]" + resultList[i].articleTitle;
                    }
                    this.commentList = resultList;
                    this.getUserCommentForm.tableLoading = false;
                } else if(response.data.errcode === 1001) {
                    autoLogout();
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode+ "]" + response.data.msg,
                    });

                }
            }).catch(error => {
                this.$message({
                    type: "error",
                    message: "[" + error.response.data.errcode+ "]" + error.response.data.msg,
                });
            });
        },
        showCommentDetail(_cid,_cCmt) {
            this.commentDialogDisplay = true;
            this.commentDetail = _cCmt;
            this.commentDialogTitle = "#" + _cid + " 评论详细内容"
        },
        closeCommentDialog() {
            /**
             * dialog的右上角关闭x号实现关闭功能需要填写 :before-close，
             * 但直接在:before-close内写dialogVisible = false是不起作用的，必须另起一个函数写
             */
            this.commentDialogDisplay = false;
        },

        toNewsDetail(_articleId) {
            //vue主做单页应用，新页面打开窗口被取缔掉了不方便
            let url = this.$router.resolve("/news/detail/" + _articleId);
            window.open(url.href,"_blank");
        },
    }
}
</script>

<style>

.user-comment-table .el-button {
    padding: 5px;
}

#comment-detail-dialog .el-dialog__body {
    padding: 0px 15px 15px 15px;
}

</style>