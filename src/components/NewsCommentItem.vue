<template>
    <div id="news-comment-item-container">
        <div id="news-comment-item-main">
            <el-row>
                <el-col class="news-comment-item-avatar-col">
                    <div>
                        <img @click="toCommentUser" width="50" height="50" class="comment-user-avatar" :src="commentUserAvatar" >
                    </div>
                </el-col>
                <el-col class="news-comment-item-content-col">
                    <div id="news-comment-item-content-container">
                        <div id="comment-header">
                            <span class="comment-header-nickname" @click="toCommentUser">administrator1145141</span>
                            <span class="comment-header-time">2020-01-01 14:44:44</span>
                        </div>

                        <div id="comment-content">
                            1
                        </div>
                        <div id="comment-function">
                            <span class="cmt-function-btn">回复</span>
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
    data() {
        return {
            commentUserAvatar: store.state.defaultAvatar,
        }
    },
    methods: {
        toCommentUser() {
            console.log(123)
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
}
.comment-header-nickname:hover {
    color: #409eff;
    cursor: pointer;
}
.comment-header-time {
    color: #999999;
    margin-left: 10px;
}
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