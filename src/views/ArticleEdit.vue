<template>
    <div id="article-edit-container">
        <div><!--category-edit-navi-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>稿件管理</el-breadcrumb-item>
                <el-breadcrumb-item>文章撰写</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-change-content-top"><!--category-edit-content-->
            <div class="function-title">文章撰写</div>
            <div class="info-change-items-content-left" style="width: 800px;">
                <div style="margin-top: 20px;">
                    <el-input v-model="articleEditForm.articleTitle" placeholder="请输入文章标题..." size="large" minlength="1" maxlength="50" show-word-limit></el-input>
                </div>

                <div style="margin-top: 20px;">
                    <textarea id="editor"></textarea>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import store from "../store";


export default {
    name: "ArticleEdit.vue",
    mounted() {
        document.title = '文章撰写' + ' - ' + store.state.pageTitle;
        ClassicEditor.create(document.querySelector("#editor"))
            .catch(error => {
                console.log(error);
            });
    },
    data() {
        return {
            articleEditForm: {
                articleTitle: "",
            }
        }
    }
}
</script>

<style scoped>

</style>