<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div class="news-home-mid">
                    <!-- 新闻列表-->
                    <div id="news-home-mid-list">
                        <div id="news-home-mid-title" class="function-title">分类：{{categoryName}}</div>
                        <div class="news-item-list">
                            <!--...-->
                            <NewsItem v-for="article in articleList" :key="article.id" :article="article"></NewsItem>
                            <el-button style="width: 100%" ref="getArticleListBtn" v-if="btnDisplay" type="primary" size="small" class="getArticleListBtn" @click="getArticleList" :loading="loadingNotice">加 载 更 多</el-button>
                        </div>

                    </div>

                </div>
            </el-col>

            <el-col class="news-home-right-col">
                <div id="news-home-right">

                    <div>
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
    name: "NewsCategory",
    components: {
        UserInfo: () => import("../components/UserInfo"),
        NewsItem: () => import("../components/NewsItem"),
        SearchWidget: () => import("../components/SearchWidget"),
        TrendingWidget: () => import("../components/TrendingWidget")

    },
    mounted() {
        this.category = this.$route.params.categoryId;
        this.getArticleList();
    },
    data() {
        return {
            category:-1,
            categoryName:"",
            page:0,
            articleList:[],
            newArticleList:[],
            loadingNotice: true,
            btnDisplay: true,

        }
    },
    methods: {
        getArticleList: function() {
            this.loadingNotice = true;
            axios.get(store.state.apiUrl + "/api/article/getArticleList", {
                params:{
                    category: this.category,
                    "page":this.page
                }
            }).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    this.newArticleList = response.data.data;
                    this.categoryName = this.newArticleList[0].catName;
                    document.title = "分类：" +  this.categoryName + ' - 新闻 - ' + store.state.pageTitle;
                    this.page ++;
                    this.articleList = this.articleList.concat(this.newArticleList);
                    this.loadingNotice = false;

                } else if(response.data.errcode === 2021) {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    this.btnDisplay = false;
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