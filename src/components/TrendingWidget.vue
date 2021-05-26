<template>
    <div>
        <div class="function-title">推荐阅读</div>
        <div class="trending-list">
            <div v-if="loadingNotice">趋势列表加载中...</div>
            <el-timeline :reverse="false">

                <el-timeline-item v-for="item in trendingList" :key="item.id" :item="item" :hide-timestamp="true" :timestamp="item.itemindex">
                    <el-link :underline="false" @click="toTrending(item.link)">{{item.title}}</el-link>
                    <div class="timeline-timestamp">{{item.lastchange}}</div>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
import store from "../store";
import {dateFormatter} from "../assets/function";

export default {
    name: "TrendingWidget",
    store: () => import("../store"),
    data() {
        return {
            trendingList:[],
            loadingNotice: true,
        }

    },
    mounted() {
        this.getTrendingList();
    },
    methods: {
        toTrending(_link) {
            window.open(_link,"_blank");
        },
        getTrendingList() {
            axios.get(store.state.apiUrl + "/api/trending/getTrendingList").then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    let resultList = response.data.data;
                    let resultSize = resultList.length <= 5 ? resultList.length : 5;
                    for(let i = 0;i < resultSize; i++) {
                        resultList[i].lastchange = dateFormatter(resultList[i].lastchange,true);
                        resultList[i].itemindex = dateFormatter(resultList[i].itemindex * 1000,true);
                        //这里用int代替timestamp会在console报warn，所以需要转换成一个能够排序的timestamp,long类型的timestamp为毫秒数
                        this.trendingList.push(resultList[i]);
                    }
                    this.loadingNotice = false;
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    //加载失败不用解除表格转圈圈
                }
            });
        },
    }
}
</script>

<style scoped>
.trending-list {
    margin-top: 15px;
}
ul {
    padding-inline-start: 5px;
}

.timeline-timestamp {
    color: #909399;
    font-size: 13px;
    margin-top: 10px;
}

</style>