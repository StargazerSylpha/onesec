<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div class="news-home-mid">
                    <!-- 主要内容-->
                    <div class="news-detail">
                        <div id="news-detail-head">
                            <div id="news-detail-head-title" class="news-detail-head-title">
                                <span>{{articleDetail.title}}</span>
                            </div>

                            <div id="news-detail-head-description">
                                <span class="news-detail-head-description">
                                    <i class="el-icon-user"></i> <span @click="toUserDetail">{{articleDetail.authorNickname}}</span>
                                </span>
                                <span class="news-detail-head-description" style="margin-left: 10px;">
                                    <i class="el-icon-time"></i> {{articleDetail.publishDate}}
                                </span>
                                <span class="news-detail-head-description" style="margin-left: 10px;">
                                     <i class="el-icon-folder-opened"></i> <span @click="toCategory">{{articleDetail.catName}}</span>
                                </span>
                            </div>
                            <div id="news-detail-content" class="news-detail-content" v-html="articleDetail.content">
                            </div>
                        </div>
                    </div>

                    <div id="news-detail-share">
                        <NewsShare :article="articleDetail"></NewsShare>
                    </div>

                    <div id="news-detail-comment" class="news-detail">
                        <NewsComment></NewsComment>
                    </div>

                </div>
            </el-col>

            <el-col class="news-home-right-col">
                <div id="news-home-right">

                    <div id="news-home-right-top-search">
                        <el-input placeholder="请输入要搜索的关键词" v-model="searchKeyword"  prefix-icon="el-icon-search" clearable>
                            <el-button slot="append" >搜 索</el-button>
                        </el-input>
                    </div>

                    <div id="news-home-right-mid-user" class="news-home-right-compo">
                        <UserInfo></UserInfo>
                    </div>
                    <div id="news-home-right-bottom-news" class="news-home-right-compo">
                        <div id="news-home-right-bottom-news-title" class="function-title">推荐阅读</div>
                        <div id="news-home-right-bottom-news-list">
                            <ul>
                                <li>1.balabalabala</li>
                                <li>2.balabalabala</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </el-col>

        </el-row>



    </div>
</template>

<script>

import store from "../store";
import {dateFormatter} from "../assets/function";

export default {
    name: "NewsDetail",
    components: {
        UserInfo: () => import("../components/UserInfo"),
        NewsShare: () => import("../components/NewsShare"),
        NewsComment: () => import("../components/NewsComment")
    },
    mounted() {
        let _articleId = this.$route.params.articleId;

        axios.get(store.state.apiUrl + "/api/article/getArticle", {params:{"id":_articleId}}).then(response => {
            if(response.status === 200 && response.data.errcode === 0) {
                this.articleDetail.publishDate = dateFormatter(response.data.data.publishDate,true);
                this.articleDetail.category = response.data.data.category;
                this.articleDetail.catName = response.data.data.catName;
                this.articleDetail.title = response.data.data.title;
                this.articleDetail.authorNickname = response.data.data.authorNickname;
                this.articleDetail.authorAvatar = response.data.data.authorAvatar;
                /**
                 * articleService
                 * 前端v-html插入代码时不能是htmlescape的状态，否则会直接显示代码
                 * 应当在api层unescape一下，虽然会带\转义斜杠
                 */
                this.articleDetail.content = response.data.data.content;
                this.articleDetail.id = response.data.data.id;
                this.articleDetail.banner = response.data.data.banner;
                this.articleDetail.author = response.data.data.author;

            } else {
                this.$message({
                    type: "error",
                    message: "[" + response.data.errcode + "]" + response.data.msg,
                });

            }
        }).catch(error => {
            this.$message({
                type: "error",
                message: "[" + error.response.data.errcode + "]" + error.response.data.msg,
            });
        });


        document.title = '登录' + ' - 新闻 - ' + store.state.pageTitle;
    },
    data() {
        return {
            articleDetail: {
                /*
                 * banner,author
                 */
                banner:"", //传给share组件，用以分享时获得图片
                id:-1, //这个传给share和评论组件，用于收藏和评论
                category:-1,
                publishDate:"2000-01-01 00:00:00",
                catName: "categoryName",
                title:"articleTitle",
                authorNickname:"authorNickname",
                authorAvatar:store.state.defaultAvatar,
                content:"内容加载中...",
                author:-1,

            },
            searchKeyword:"",

        }
    },
    methods: {
        toUserDetail: function () {
            console.log("authorUid:" + this.articleDetail.author);
        },
        toCategory() {
            this.$router.push("/news/category/" + this.articleDetail.category);
        }
    },
}
</script>

<style scoped>

.news-detail {
    padding: 10px;
}
.news-detail-head-title {
    font-size: 30px;
    color: #303133; /*element 主要文字 颜色*/
    height: 100%;
    font-weight: bold;
}
#news-detail-head-description {
    margin-top: 10px;
}

.news-detail-head-description {
    color: #999999;
    font-size: 15px;
}

.news-detail-head-description:hover {
    color: #409eff;
    cursor: pointer;
}


.news-detail-content {
    margin-top: 20px;
}

#news-detail-share {
    margin-top: 20px;

}
#news-detail-comment {
    margin-top: 20px;
}

#news-home-right-bottom-news-list {
    margin-top: 15px;
}

#news-home-right-bottom-news-list ul {
    list-style: none;
    margin: 0px 0px 0px 5px;

    padding-inline-start: 0px;
}

#news-home-right-bottom-news-list li {
    font-size: 17px;
    line-height: 25px;
    color: #606266;
}

</style>