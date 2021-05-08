<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div class="news-home-mid">
                    <!-- 新闻列表-->
                    <div id="news-home-mid-list">
                        <div id="news-home-mid-title" class="function-title">搜索结果</div>
                        <div>
                            <NewsItem></NewsItem>
                            <NewsItem></NewsItem>
                            <NewsItem></NewsItem>
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
                        <UserInfo :user="user"></UserInfo>
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
export default {
    name: "NewsSearch",
    components: {
        UserInfo,
        NewsItem,
    },
    mounted() {
        this.user.username = (typeof (JSON.parse(localStorage.getItem("userInfo")).username) === 'undefined')?
            (""): (JSON.parse(localStorage.getItem("userInfo")).username) ;
    },
    data() {
        return {
            searchKeyword:"",
            user: {
                isLogin: false,
                username: "",
            }
        }
    },
    methods: {

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