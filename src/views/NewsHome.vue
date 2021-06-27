<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div class="news-home-mid">
                    <div id="news-banner">
                        <el-carousel trigger="click">
                            <el-carousel-item v-for="item in trendingList" :key="item.id" :item="item">
                                <div class="hover-pointer" @click="toTrending(item.link)">
                                    <img :src="item.banner" :onerror="defaultBanner" width="100%" height="300">
                                    <div class="banner-bg">
                                        <!--最长字数35-->
                                        <span>{{item.title}}</span>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>

                    </div>
                    <!-- 中部新闻列表-->
                    <div id="news-home-mid-list">
                        <div id="news-home-mid-title" class="function-title">最新文章</div>
                        <div class="news-item-list">

                            <NewsItem v-for="article in articleList" :key="article.id" :article="article"></NewsItem>

                            <el-button ref="getArticleListBtn" v-if="btnDisplay" type="primary" size="small" class="getArticleListBtn" @click="getArticleList" :loading="loadingNotice">加 载 更 多</el-button>

                        </div>

                    </div>

                </div>
            </el-col>

            <el-col class="news-home-right-col">
                <div id="news-home-right">

                    <div><!--id="news-home-right-top-search"-->
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
import {dateFormatter} from "../assets/function";
export default {
    name: "NewsHome",
    components: {
        UserInfo: () => import("../components/UserInfo"),
        NewsItem: () => import("../components/NewsItem"),
        TrendingWidget: () => import("../components/TrendingWidget"),
        SearchWidget: () => import("../components/SearchWidget")
    },
    store,
    data() {
        return {
            /**
             * 因为每页的item数太小，导致一进页面就一次性全加载完了，先不管了
             * v-infinite-scroll要配合overflow:auto配合使用，不然不起作用
             */

            page:0,
            articleList:[],
            newArticleList:[],
            loadingNotice: true,
            btnDisplay: true,
            trendingList:[],
            defaultBanner: 'this.src = "' + store.state.defaultBanner + '"',
        }
    },
    mounted() {
        this.getArticleList();
        this.getTrendingList();
        document.title = "新闻 - " + store.state.pjtitle;
    },
    methods: {
        toTrending(_link) {
            window.open(_link,"_blank");
        },
        getTrendingList() {
            axios.get(store.state.apiUrl + "/api/trending/getTrendingList?type=banner&t=" + Math.random()).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    let resultList = response.data.data;
                    for(let i = 0;i < resultList.length; i++) {
                        resultList[i].title = (resultList[i].title.length <= 35)?(resultList[i].title):
                            (resultList[i].title.substring(0,35) + "...");
                    }
                    this.trendingList = resultList;
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                }
            });
        },
        getArticleList: function() {
            this.loadingNotice = true;
            axios.get(store.state.apiUrl + "/api/article/getArticleList?t=" + Math.random(), {params:{"page":this.page}}).then(response => {
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



.banner-bg {
    /**
     * el走马灯下只能跟一个root标签，还不原生支持标题显示
     * https://blog.csdn.net/weixin_48931875/article/details/111058475
     * z-index只在定位元素上才生效，即position:absolute
     * 使背景透明而文字不透明：使用rgba()来设定背景颜色和透明度
     * https://www.cnblogs.com/dududyx/p/4885010.html
     * 背景颜色渐变：https://www.runoob.com/css3/css3-gradients.html
     * 仅支持background-image,不支持background-color
     *
     */
    position: absolute;
    z-index: 3;
    top: 240px;
    height: 27px;
    width: 720px;
    background-image: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,0.5));
    padding: 13px 15px 20px 15px;
    font-size: 20px;
    color: white;
}
.hover-pointer:hover {
    cursor: pointer;
}

</style>