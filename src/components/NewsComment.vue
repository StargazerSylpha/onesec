<template>
    <div id="news-comment-container">
        <div id="news-comment-title" class="function-title">参与评论</div>

        <div id="news-comment-type-area">

            <el-row>
                <el-col  style="width: 660px;">
                    <!--不设最高限值，毕竟1000多字的评论也有-->
                    <el-input type="textarea" placeholder="请输入评论..." minlength="2" rows="3" resize="none"></el-input>
                </el-col>
                <el-col style="width: 60px;margin-left: 10px;">
                     <el-button id="news-comment-submit-btn" type="primary" style="width: 60px;height: 60px;">提 交</el-button>
                </el-col>

            </el-row>
        </div>

        <div id="news-comment-line"></div>

        <div id="news-comment-item-list">
            <NewsCommentItem></NewsCommentItem>
        </div>

    </div>
</template>

<script>
export default {
    name: "NewsComment",
    components: {
        NewsCommentItem: ()=>import("../components/NewsCommentItem"),
    },
}
</script>

<style scoped>
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