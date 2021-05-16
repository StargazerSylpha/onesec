<template>
    <div>
        <div id="news-item-container">
            <el-row>
                <el-col class="news-item-img">
                    <div id="news-item-img">
                        <img width="200" height="120" :src="article.banner">
                    </div>
                </el-col>
                <el-col class="news-item-detail">
                    <div id="news-item-detail">
                        <div id="news-item-detail-word">
                            <span class="news-item-detail-title-text" @click="toNewsDetail">{{ article.title }}</span>
                        </div>
                        <div id="news-item-detail-category" class="news-item-detail-category-text">
                            <span class="news-item-detail-link" @click="toCategory"><i class="el-icon-folder-opened"></i>分类：{{ article.catName }}</span>
                            <span class="news-item-detail-link" @click="toUserDetail" style="margin-left: 10px;"><i class="el-icon-user"></i>作者：{{ article.authorNickname }} </span>
                            <span style="margin-left: 10px;"><i class="el-icon-time"></i>时间：{{dateFormat(article.publishDate)}}</span>
                        </div>
                    </div>

                </el-col>

            </el-row>

        </div>

        <div class="news-item-line"></div>

    </div>

</template>

<script>
import {dateFormatter} from "../assets/function";
export default {
    name: "NewsItem",
    props:['article'],
    data() {
        return {

        }
    },
    methods: {
        dateFormat(_date) {
            return dateFormatter(_date,true);
        },
        toUserDetail: function () {
            console.log("authorUid:" + this.article.author);
        },
        toCategory() {
            this.$router.push("/news/category/" + this.article.category);
        },
        toNewsDetail() {
            this.$router.push("/news/detail/" + this.article.id);
        }
    }
}
</script>

<style scoped>
.news-item-detail-title-text:hover {
    color: #409eff;
    cursor: pointer;
}
#news-item-container {
    height: 120px;
    padding: 10px 0px 10px 0px;

}
#news-item-container:hover {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /*element提供*/
}

.news-item-line {
    background-color: #eaeaea;
    height: 1px;
}

.news-item-img {
    width: 200px;
}
.news-item-detail-link:hover {
    color:#409eff;
    cursor: pointer;
}
.news-item-detail {
    margin-left: 10px;
    width: 520px;

}

#news-item-detail-word {
    height: 85px;
}

#news-item-detail-category {
    margin-top: 15px;
    height: 20px;

}

.news-item-detail-category-text {
    font-size: 13px;
    color: #999999;
    white-space: nowrap; /*禁止换行*/
}
.news-item-detail-title-text {
    font-size: 20px;
    color: #303133;
    font-weight: bold;

}

</style>