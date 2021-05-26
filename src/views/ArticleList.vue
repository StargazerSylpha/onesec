<template>
    <div id="article-list-container">
        <div><!--category-edit-navi-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-change-content-top"><!--category-edit-content-->
            <div class="function-title">文章列表</div>

            <div id="article-list-table" class="info-change-items-content-left">


                <div>
                    <el-row>
                        <el-col style="width: 900px;">
                            <el-pagination layout="prev,pager,next" :page-size="getArticleListForm.pageSize" @current-change="pageChange" :current-page="getArticleListForm.currentPage" :total="getArticleListForm.total"></el-pagination>
                        </el-col>

                        <el-col style="margin-left: 10px;width: 300px;">
                            <div><!--article-search-container-->
                                <el-form :model="articleSearchForm">
                                    <el-input placeholder="请输入搜索关键字..." style="width: 200px;" size="small" v-model="articleSearchForm.searchKeyword"></el-input>
                                    <el-button :loading="articleSearchForm.submitBtnLoading" type="primary" size="small" style="margin-left: 10px;" @click="articleSearch(0)">搜 索</el-button>
                                </el-form>
                            </div>
                        </el-col>
                    </el-row>

                </div>


                <div class="edit-form-item-row-space">
                    <el-table class="article-list-table" :data="articleList" v-loading="getArticleListLoading">
                        <el-table-column prop="id" width="100" label="文章ID" sortable></el-table-column>
                        <el-table-column prop="title" width="400"  label="文章标题" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-link :underline="false" @click="toNewsDetail(scope.row.id)">{{scope.row.title}}</el-link>
                            </template>
                        </el-table-column>
                        <el-table-column prop="category" width="150" label="分类ID & 分类名称" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="author" width="180" label="UID & 作者昵称"></el-table-column>
                        <el-table-column prop="banner" width="200" label="横幅URL" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="publishDate" width="160" label="发布日期" sortable></el-table-column>
                        <!--表格隐藏列仅接受v-if和v-show，不接受display和visibility 不过这样也好 v-if连源代码都不会显示-->
                        <el-table-column label="操作" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="text" @click="toEditArticle(scope.row.id)">编辑</el-button>
                                <el-button type="text" @click="deleteArticle(scope.row.id,scope.row.title)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="edit-form-item-row-space">
                    <el-pagination layout="prev,pager,next" :page-size="getArticleListForm.pageSize" @current-change="pageChange" :current-page="getArticleListForm.currentPage" :total="getArticleListForm.total"></el-pagination>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import store from "../store";
import {autoLogout, dateFormatter} from "../assets/function";

export default {
    name: "ArticleList",
    data() {
        return {
            getArticleListLoading:false,
            articleList:[],
            getArticleListForm: {
                total:0,
                currentPage:1,
                pageSize:20,
            },
            articleSearchForm: {
                searchKeyword:"",
                submitBtnLoading:false,
            }
        }
    },
    mounted() {
        document.title = '文章列表' + ' - ' + store.state.pageTitle;
        this.getArticleList();
    },
    methods: {
        deleteArticle(_articleId,_articleTitle) {
            this.$confirm("请确认是否要删除文章：[" + _articleId+ "]" + _articleTitle ,"删除文章",{
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let authData = "id=" + _articleId +  "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/article/deleteArticle",authData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "删除成功！",
                        });
                        this.getArticleList();
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
        toNewsDetail(_articleId) {
            //vue主做单页应用，新页面打开窗口被取缔掉了不方便
            let url = this.$router.resolve("/news/detail/" + _articleId);
            window.open(url.href,"_blank");
        },
        toEditArticle(_articleId) {
            this.$router.push("/console/articleEdit?type=edit&id=" + _articleId);
        },
        pageChange(_newPage) {
            //后台页码从0开始...
            this.getArticleListForm.currentPage = _newPage;
            if(this.articleSearchForm.searchKeyword.length < 1) {
                this.getArticleList(_newPage - 1);
            } else {
                this.articleSearch(_newPage - 1);
            }


        },
        getArticleList(_pageId) {
            this.getArticleListLoading = true;

            let page = (_pageId == null || typeof _pageId === "undefined" || _pageId < 1) ? 0 : _pageId;

            axios.get(store.state.apiUrl + "/api/article/getArticleList?page=" + page).then(response => {
                if(response.data.errcode === 0) {
                    let resultList = response.data.data;
                    this.getArticleListForm.total = response.data.size;
                    //js的对象for循环中间不是冒号，是in
                    for(let i = 0;i < resultList.length; i++) {
                        /**
                         * 这里采用对象赋值时不能直接地让两个对象相等
                         * let userObject = resultList[i];
                         * 因为后面将type和sex修改后会使userObject暂存的对象内容也修改（即两个对象指向同一内存地址）
                         * 这里采用先stringify后parse的方法 即可避免
                         */
                        resultList[i].author = "[" + resultList[i].author + "]" + resultList[i].authorNickname;
                        resultList[i].publishDate = dateFormatter(resultList[i].publishDate,true);
                        resultList[i].category = "[" + resultList[i].category + "]" + resultList[i].catName;
                    }
                    this.articleList = resultList;
                    this.getArticleListLoading = false;

                } else  {
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
        articleSearch: function(_pageId) {
            //1.搜索按键禁用
            this.articleSearchForm.submitBtnLoading = true;
            let page = (_pageId == null || typeof _pageId === "undefined" || _pageId < 1) ? 0 : _pageId;
            if(this.articleSearchForm.searchKeyword.length < 1) {
                this.getArticleListForm.currentPage = 1;
                this.getArticleList();
                this.articleSearchForm.submitBtnLoading = false;
                return;
            }
            //2.表格白圈圈启动
            this.getArticleListLoading = true;
            axios.get(store.state.apiUrl + "/api/article/articleSearch", {
                params:{
                    "page":page,
                    "keyword": this.articleSearchForm.searchKeyword,
                }
            }).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {

                    let resultList = response.data.data;
                    this.getArticleListForm.total = response.data.size;
                    //js的对象for循环中间不是冒号，是in
                    for(let i = 0;i < resultList.length; i++) {

                        resultList[i].author = "[" + resultList[i].author + "]" + resultList[i].authorNickname;
                        resultList[i].publishDate = dateFormatter(resultList[i].publishDate,true);
                        resultList[i].category = "[" + resultList[i].category + "]" + resultList[i].catName;
                    }
                    this.articleList = resultList;
                    this.getArticleListLoading = false;
                    this.articleSearchForm.submitBtnLoading = false;

                } else if(response.data.errcode === 20101) {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    this.articleSearchForm.submitBtnLoading = false;
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.article-list-table .el-button{
    /*表格最右列按钮 padding缩小*/
    padding: 5px;
}
</style>