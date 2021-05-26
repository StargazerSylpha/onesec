<template>
    <div>
        <el-input placeholder="请输入要搜索的关键词..." v-model="searchKeyword"  prefix-icon="el-icon-search" clearable>
            <el-button slot="append" @click="articleSearch" >搜 索</el-button>
        </el-input>
    </div>
</template>

<script>
export default {
    name: "SearchWidget",
    data() {
        return {
            searchKeyword:"",
        }
    },
    methods: {
        articleSearch() {
            if(this.searchKeyword.length < 1) {
                this.$message({
                    type:"error",
                    message:"请输入搜索关键词！",
                });
                return;
            }
            /**
             * 在/news/search路由下再次push，虽然url会更变，但组件并不会重新加载
             * 别的解法特别麻烦，我这个在更换了url后重新reload一下即可，简单粗暴
             */
            if(this.$route.path === "/news/search") {
                this.$router.push({
                    path:"/news/search",
                    query:{
                        keyword:this.searchKeyword,
                    }
                });
                window.location.reload();
            } else {
                /**
                 * 不在search页面的请求 使用以上方法会导致页面刷新搜索失败
                 */
                this.$router.push("/news/search?keyword=" + this.searchKeyword);
            }

        }
    }
}
</script>

<style scoped>

</style>