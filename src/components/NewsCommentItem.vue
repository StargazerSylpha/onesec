<template>
    <div id="news-comment-item-container">
        <div id="news-comment-item-main">
            <el-row>
                <el-col class="news-comment-item-avatar-col">
                    <div>
                        <img @click="toCommentUser" width="50" height="50" class="comment-user-avatar" :src="comment.authorAvatar" :onerror="defaultAvatar" >
                    </div>
                </el-col>
                <el-col class="news-comment-item-content-col">
                    <div id="news-comment-item-content-container">
                        <div id="comment-header">
                            <span class="comment-header-nickname" @click="toCommentUser">{{comment.authorNickname}}</span>

                            <!--<span class="comment-header-time">{{comment.publishDate}}</span>-->
                        </div>

                        <div id="comment-content" v-html="comment.comment" >

                        </div>
                        <div id="comment-function">
                            <span class="cmt-function-btn">#{{comment.cid}}</span>
                            <span class="cmt-function-btn" style="margin-left: 10px;">{{comment.publishDate}}</span>
                            <!--<span class="cmt-function-btn" style="margin-left: 10px;">举报</span>-->
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="news-comment-item-line"></div>
    </div>
</template>

<script>
import store from "../store";
export default {
    name: "NewsCommentItem",
    store,
    props:['comment'],
    data() {
        return {
            defaultAvatar: 'this.src = "' + store.state.defaultAvatar + '"',
        }
    },
    methods: {
        toCommentUser() {
            console.log(this.comment.author);

        }
    }
}
</script>

<style scoped>
.cmt-function-btn {
    font-size: 10px;
    color: #909399;
}
.cmt-function-btn:hover {
    cursor: pointer;
    color: #c0c4cc;
}
#comment-function {
    margin-top: 10px;
}
#comment-content {

    margin-top: 10px;
    white-space: pre-wrap;
}
.comment-header-nickname:hover {
    color: #409eff;
    cursor: pointer;
}
.comment-header-nickname {
    color: #606266;
    font-size: 15px;
}
/*
comment item 作者昵称右侧 发表时间
.comment-header-time {
    color: #999999;
    margin-left: 10px;
}

 */
#comment-header {
    font-size: 15px;
}
#news-comment-item-main {
    padding: 10px 0 10px 0;
}
.news-comment-item-avatar-col {
    width: 50px;
}
.comment-user-avatar {
    border-radius: 50%;
    border:1px solid #409eff;
}
.comment-user-avatar:hover {
    cursor: pointer;
}
.news-comment-item-line {
    height: 1px;
    background-color: #eaeaea;

}
.news-comment-item-content-col {
    width: 670px;
    margin-left: 10px;

}
</style>