<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div class="news-home-mid">
                    <!-- 新闻列表-->
                    <div id="news-home-mid-list">
                        <div id="news-home-mid-title" class="function-title">搜索结果：「{{getArticleSearchResultForm.keyword}}」</div>
                        <div class="news-item-list">
                            <NewsItem v-for="article in articleList" :article="article" :key="article.id"></NewsItem>
                            <el-button ref="getArticleListBtn" v-if="getArticleSearchResultForm.btnDisplay" type="primary" size="small" style="width: 100%" @click="articleSearch" :loading="getArticleSearchResultForm.loadingNotice">加 载 更 多</el-button>

                        </div>

                    </div>

                </div>
            </el-col>

            <el-col class="news-home-right-col">
                <div id="news-home-right">

                    <div id="news-home-right-top-search">
                        <SearchWidget></SearchWidget>
                    </div>

                    <div id="news-home-right-mid-user" class="news-home-right-compo">
                        <UserInfo></UserInfo>
                    </div>
                    <div id="news-home-right-bottom-news" class="news-home-right-compo">
                        <TrendingWidget></TrendingWidget>
                    </div>

                </div>
            </el-col>

        </el-row>



    </div>
</template>

<script>

import store from "../store";

export default {
    name: "NewsSearch",
    components: {
        SearchWidget: () => import("../components/SearchWidget"),
        UserInfo: () => import("../components/UserInfo"),
        NewsItem: () => import("../components/NewsItem"),
        TrendingWidget: () => import("../components/TrendingWidget"),

    },
    mounted() {
        this.getArticleSearchResultForm.keyword = this.$route.query.keyword;
        this.articleSearch();
    },
    data() {
        return {
            getArticleSearchResultForm: {
                btnDisplay: true,
                loadingNotice: false,
                page:0,
                keyword:"",

            },
            articleList:[],
            newArticleList:[],
        }
    },
    methods: {
        articleSearch: function() {
            this.getArticleSearchResultForm.loadingNotice = true;

            axios.get(store.state.apiUrl + "/api/article/articleSearch", {
                params:{
                    "page":this.getArticleSearchResultForm.page,
                    "keyword": this.getArticleSearchResultForm.keyword,
                }
            }).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    this.newArticleList = response.data.data;
                    this.getArticleSearchResultForm.page ++;
                    this.articleList = this.articleList.concat(this.newArticleList);
                    this.getArticleSearchResultForm.loadingNotice = false;

                } else if(response.data.errcode === 20101) {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    this.getArticleSearchResultForm.btnDisplay = false;
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                }
            });
        }
    },
}
</script>

<style scoped>

#news-home-mid-title {
    margin-top: 5px;
}


#news-home-mid-list {
    padding: 10px;
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