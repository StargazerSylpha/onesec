<template>
    <div id="news-comment-container">
        <div id="news-comment-title" class="function-title">参与评论</div>

        <div id="news-comment-type-area">

            <el-row>
                <el-col  style="width: 660px;">
                    <!--不设最高限值，毕竟1000多字的评论也有-->
                    <el-input v-model="addCommentForm.comment" type="textarea" placeholder="请输入评论..." minlength="2" rows="3" resize="none"></el-input>
                </el-col>
                <el-col style="width: 60px;margin-left: 10px;">
                     <el-button @click="addComment" id="news-comment-submit-btn" type="primary" style="width: 60px;height: 60px;" :loading="addCommentForm.submitBtnLoading">提 交</el-button>
                </el-col>

            </el-row>
        </div>

        <div id="news-comment-line"></div>

        <div class="comment-loading-notice" v-if="getCommentListForm.noticeDisplay">{{getCommentListForm.notice}}</div>

        <div id="news-comment-item-list">

            <NewsCommentItem v-for="item in commentList" :key="item.id" :comment="item"></NewsCommentItem>
        </div>

        <div class="news-comment-list-pagi" >
            <el-pagination layout="prev,pager,next" :page-size="getCommentListForm.pageSize" @current-change="pageChange" :current-page="getCommentListForm.currentPage" :total="getCommentListForm.total"></el-pagination>
        </div>

    </div>
</template>

<script>
import store from "../store";
import {autoLogout, dateFormatter} from "../assets/function";

export default {
    name: "NewsComment",
    components: {
        NewsCommentItem: ()=>import("../components/NewsCommentItem"),
    },
    props:['article'],
    mounted() {
        this.getCommentList();
    },
    data() {
        return {
            commentList:[],
            addCommentForm: {
                comment:"",
                submitBtnLoading:false,

            },
            getCommentListForm: {
                pageSize:20,
                currentPage:1,
                total:0,

                notice:"评论加载中，请稍后...",
                noticeDisplay:true,
            },


        }
    },
    methods: {
        addComment() {
            //会导致文字穿越按钮，不管了，问题不大
            this.addCommentForm.submitBtnLoading = true;
            let postData = {
                article:this.article,
                comment:this.addCommentForm.comment
            }

            if(postData.comment.length < 1) {
                this.$message({
                    type: "error",
                    message: "请输入评论内容！",
                });
                this.addCommentForm.submitBtnLoading = false;
            } else {
                axios.post(store.state.apiUrl + "/api/comment/addComment?accessToken=" + localStorage.getItem("accessToken") + "&t=" + Math.random(),postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "评论成功！",
                        });
                        this.addCommentForm.submitBtnLoading = false;
                        this.addCommentForm.comment = "";
                        this.getCommentListForm.currentPage = 1;
                        this.getCommentList();

                    } else if(response.data.errcode === 1001) {
                        this.$message({
                            type:"error",
                            message: "请先登录！",
                        });
                        this.addCommentForm.submitBtnLoading = false;
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.addCommentForm.submitBtnLoading = false;
                    }
                });
            }

        },
        pageChange: function (_page) {
            this.getCommentListForm.currentPage = _page;
            this.getCommentList(_page - 1);
        },
        getCommentList(_pageId) {
            this.commentList = [];
            this.getCommentListForm.noticeDisplay = true;
            this.getCommentListForm.notice = "评论加载中，请稍后...";
            let page = (_pageId == null || typeof _pageId === "undefined" || _pageId < 1) ? 0 : _pageId;

            axios.get(store.state.apiUrl + "/api/comment/getCommentList?t=" + Math.random(),{
                params:{
                    article:this.article,
                    page:_pageId
                }
            }).then(response => {
                if(response.data.errcode === 0) {
                    let resultList = response.data.data;
                    this.getCommentListForm.total = response.data.size;
                    for(let i = 0; i < resultList.length; i++) {
                        resultList[i].publishDate = dateFormatter(resultList[i].publishDate,true);
                    }

                    this.commentList = resultList;
                    this.getCommentListForm.noticeDisplay = false;
                } else  {
                    this.getCommentListForm.notice = "[" + response.data.errcode+ "]" + response.data.msg;
                    this.getCommentListForm.noticeDisplay = true;

                }
            }).catch(error => {
                this.getCommentListForm.notice = "[" + error.response.data.errcode+ "]" + error.response.data.msg;
                this.getCommentListForm.noticeDisplay = true;
            });
        },
    }
}
</script>

<style scoped>
.comment-loading-notice {
    color: #999999;
    font-size: 13px;
    margin-top: 10px;
    text-align: center;
}
.news-comment-list-pagi {
    margin-top: 10px;
}
#news-comment-type-area {
    margin-top:20px;
}
.el-button {
    padding: 12px 12px 12px 12px;
}

#news-comment-line {
    height: 1px;
    background-color: #eaeaea;
    margin-top: 20px;
}


</style>