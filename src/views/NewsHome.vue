<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div class="news-home-mid">
                    <div id="news-banner">
                        <el-carousel trigger="click">
                            <el-carousel-item>
                                <img src="//img.36krcdn.com/20210412/v2_ae552ee88c9f4066a0abc79ecb6d70fe_img_jpg" width="100%" height="300">
                            </el-carousel-item>
                            <el-carousel-item>
                                <img src="//img.36krcdn.com/20210411/v2_851121309a99417c8d6f6df682f3a2b3_img_jpeg" width="100%" height="300">
                            </el-carousel-item>
                            <el-carousel-item>
                                <img src="//img.36krcdn.com/20210412/v2_8a0631cbc25b40c6996635c50e9871bc_img_png" width="100%" height="300">
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                    <!-- 中部新闻列表-->
                    <div id="news-home-mid-list">
                        <div id="news-home-mid-title" class="function-title">最新文章</div>
                        <div>

                            <NewsItem v-for="article in articleList" :key="article.id" :article="article"></NewsItem>

                            <el-button ref="getArticleListBtn" v-if="btnDisplay" type="primary" size="small" class="getArticleListBtn" @click="getArticleList" :loading="loadingNotice">加 载 更 多</el-button>

                        </div>

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
import UserInfo from "../components/UserInfo";
import NewsItem from "../components/NewsItem";
import store from "../store";
export default {
    name: "NewsHome",
    components: {
        UserInfo,
        NewsItem,
    },

    data() {
        return {
            searchKeyword:"",
            /**
             * 因为每页的item数太小，导致一进页面就一次性全加载完了，先不管了
             * v-infinite-scroll要配合overflow:auto配合使用，不然不起作用
             */
            page:0,
            articleList:[],
            newArticleList:[],
            loadingNotice: true,
            btnDisplay: true,
        }
    },
    mounted() {
        this.getArticleList();
    },
    methods: {
        getArticleList: function() {
            this.loadingNotice = true;
            axios.get(store.state.apiUrl + "/api/article/getArticleList", {params:{"page":this.page}}).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    this.newArticleList = response.data.data;
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
.getArticleListBtn {
    width: 100%;
}

#news-home-mid-list {
    padding: 10px;
    margin-top: 10px;
}


#news-banner {
    width: 100%;
    height: 300px;
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