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
                <div class="article-edit-item-row-space">
                    <el-input v-model="articleEditForm.title" placeholder="请输入文章标题...（1~50字符）" size="large" minlength="1" maxlength="50" show-word-limit></el-input>
                </div>

                <div class="article-edit-item-row-space">
                    <div id="editor"></div>
                </div>

                <div class="imp-info-item-line article-edit-item-row-space" style="width: 100%"></div>

                <div class="article-edit-item-row-space" >
                    <span class="article-edit-item-title">文章分类：</span>
                    <el-select style="margin-left: 5px;" v-model="articleEditForm.category" placeholder="请选择文章分类..." :disabled="articleEditForm.categoryDisabled">
                        <el-option v-for="cat in articleEditForm.categoryList" :key="cat.catid" :value="cat.catid" :label="'[' + cat.catid + '] ' + cat.catname"></el-option>
                    </el-select>
                </div>
                <div class="article-edit-item-row-space">
                    <span class="article-edit-item-title">横幅URL：</span>
                    <el-input style="width: 720px;margin-left: 5px;" show-word-limit type="text" v-model="articleEditForm.banner" size="large" placeholder="请输入横幅URL（6~200字符）" minlength="6" maxlength="200" ></el-input>
                    <div>
                        <el-row class="article-banner-preview">
                            <el-col style="width: 200px"><img width="200" height="120" :src="articleEditForm.banner" :onerror="defaultBanner"></el-col>
                            <el-col class="article-banner-notice">
                                <section>横幅URL：非必填，可为空。建议尺寸：200px × 120px。URL需以<span style="color: red">「http://」、「https://」或双斜杠「//」开头</span>，否则会出错。</section>
                            </el-col>
                        </el-row>
                    </div>

                    <div class="article-edit-item-row-space" style="margin-left: 80px;">
                        <el-button type="primary" size="large" style="width: 200px" @click="submit" :loading="articleEditForm.submitBtnLoading">提 交</el-button>
                    </div>
                </div>




            </div>
        </div>
    </div>

</template>

<script>
import store from "../store";
import wangEditor from "../assets/wangEditor.min";
import {autoLogout, dateFormatter} from "../assets/function";


export default {
    name: "ArticleEdit.vue",
    store,
    mounted() {
        /**
         * wangeditor用于div，和百度ueditor不一样，不是textarea！
         */
        document.title = '文章撰写' + ' - ' + store.state.pageTitle;
        this.initEditor();
        this.getCategoryList();
        this.articleEditForm.banner = "//arraycats-1253302621.cos.ap-shanghai.myqcloud.com/img/newsimg.jpg";
        if(this.$route.query.type === "edit") {
            let articleId = this.$route.query.id;
            if(articleId === null || articleId.length < 1 || typeof articleId === "undefined") {
                this.$router.push("articleEdit");
                window.location.reload();
            } else {
                axios.get(store.state.apiUrl + "/api/article/getArticle?t=" + Math.random(), {params:{"id":articleId}}).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.changeFlag = true;
                        this.articleEditForm.title = response.data.data.title;
                        this.changeArticleId = response.data.data.id;
                        this.articleEditForm.category = response.data.data.category;
                        this.articleEditForm.banner = response.data.data.banner;
                        this.editor.txt.html(response.data.data.content);

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
            }
        }

    },
    data() {
        return {
            defaultBanner: 'this.src = "' + store.state.defaultBanner + '"',
            changeFlag:false,
            changeArticleId:-1,
            articleEditForm: {
                title: "",
                content:"",

                category:"",
                categoryDisabled: true,
                categoryList:[],

                banner: "",

                submitBtnLoading:false,


            },
            editor:null,
        }
    },
    methods: {
        submit() {
            if(this.changeFlag) {
                this.editArticle();
            } else {
                this.addArticle();
            }
        },
        editArticle() {

            this.articleEditForm.submitBtnLoading = true;
            let postData = {
                category: this.articleEditForm.category,
                title:this.articleEditForm.title,
                content: this.articleEditForm.content,
                banner: this.articleEditForm.banner,
                id: this.changeArticleId
            }
            if(postData.id == null || postData.id.length < 1 || typeof postData.id === "undefined" || postData.id < 1) {
                this.$message({
                    type: "error",
                    message: "所要修改的文章ID不合法！",
                });
                this.articleEditForm.submitBtnLoading = false;
                return;
            }
            if(postData.category == null || postData.category.length < 1 || typeof postData.category === "undefined" || postData.category < 0) {
                this.$message({
                    type: "error",
                    message: "请选择文章分类！",
                });
                this.articleEditForm.submitBtnLoading = false;
                return;
            }
            if(postData.title.length < 1) {
                this.$message({
                    type: "error",
                    message: "请输入标题！",
                });
                this.articleEditForm.submitBtnLoading = false;
                return;
            }
            if(postData.content.length < 1) {
                this.$message({
                    type: "error",
                    message: "请输入文章内容！",
                });
                this.articleEditForm.submitBtnLoading = false;
            } else{
                axios.post(store.state.apiUrl + "/api/article/editArticle?accessToken=" + localStorage.getItem("accessToken") + "&t=" + Math.random(),postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "修改成功！",
                        });
                        this.articleEditForm.submitBtnLoading = false;
                        //这里不强制跳转，使之可以继续修改

                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.articleEditForm.submitBtnLoading = false;
                    }
                });
            }

        },
        addArticle() {

            this.articleEditForm.submitBtnLoading = true;
            let postData = {
                category: this.articleEditForm.category,
                title:this.articleEditForm.title,
                content: this.articleEditForm.content,
                banner: this.articleEditForm.banner
            }

            if(postData.category == null || postData.category.length < 1 || typeof postData.category === "undefined" || postData.category < 0) {
                this.$message({
                    type: "error",
                    message: "请选择文章分类！",
                });
                this.articleEditForm.submitBtnLoading = false;
                return;
            }
            if(postData.title.length < 1) {
                this.$message({
                    type: "error",
                    message: "请输入标题！",
                });
                this.articleEditForm.submitBtnLoading = false;
                return;
            }
            if(postData.content.length < 1) {
                this.$message({
                    type: "error",
                    message: "请输入文章内容！",
                });
                this.articleEditForm.submitBtnLoading = false;
            } else{
                axios.post(store.state.apiUrl + "/api/article/addArticle?accessToken=" + localStorage.getItem("accessToken") + "&t=" + Math.random(),postData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "发布成功！",
                        });
                        this.articleEditForm.submitBtnLoading = false;
                        this.$router.push("articleList");

                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.articleEditForm.submitBtnLoading = false;
                    }
                });
            }

        },

        initEditor() {
            this.editor = new wangEditor("#editor");
            this.editor.config.placeholder = "请输入正文内容...";
            /**
             * wangeditor默认zindex 10000，会遮住下面的分类选择器弹出框
             */
            this.editor.config.zIndex = 0;

            // 配置 onchange 回调函数，将数据同步到 vue 中
            this.editor.config.onchange = (newHtml) => {
                this.articleEditForm.content = newHtml;
            }
            // 创建编辑器

            this.editor.create();
        },
        destroyEditor() {
            this.editor.destroy();
            this.editor = null;
        },
        getCategoryList() {
            axios.get(store.state.apiUrl + "/api/category/getCategoryList?t=" + Math.random()).then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    this.articleEditForm.categoryList = response.data.data;
                    this.articleEditForm.categoryDisabled = false;
                } else {
                    this.$message({
                        type: "error",
                        message: "[" + response.data.errcode + "]" + response.data.msg,
                    });
                    //分类列表加载失败禁止选择
                }
            });
        },

    },
    beforeDestroy() {
        this.destroyEditor();
    }
}
</script>

<style scoped>

.article-edit-item-row-space {
    margin-top: 20px;
}

.article-edit-item-title {
    color: #303133;
    font-size: 15px;

}

.article-banner-preview {
    margin-top: 10px;
    margin-left: 80px;
}

.article-banner-notice {
    width: 500px;
    margin-left: 20px;
    font-size: 15px;
    color: #909399;
}

</style>