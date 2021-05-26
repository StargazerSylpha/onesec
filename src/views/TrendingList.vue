<template>
    <div id="trending-list-container">
        <div><!--trending-list-navi-->
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>控制台</el-breadcrumb-item>
                <el-breadcrumb-item>站点设置</el-breadcrumb-item>
                <el-breadcrumb-item>推荐位管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="info-change-content-top"><!--category-edit-content-->
            <div class="function-title">推荐位管理</div>

            <div id="trending-list-table" class="info-change-items-content-left">
                <el-table class="trending-list-table" :data="trendingList" v-loading="getTrendingListLoading">
                    <el-table-column sortable prop="id" width="100" label="条目ID"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="title"  label="标题"></el-table-column>
                    <el-table-column prop="link" width="300" label="链接" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-link :underline="false" @click="toTrendingLink(scope.row.link)">{{scope.row.link}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="banner" width="300" label="横幅" show-overflow-tooltip></el-table-column>
                    <el-table-column sortable prop="itemindex" width="80" label="顺序"></el-table-column>
                    <el-table-column sortable prop="lastchange" width="160" label="最后修改"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" @click="openEditTrending(scope.row.id,scope.row.title,scope.row.banner,
                            scope.row.link,scope.row.itemindex)">编辑</el-button>
                            <el-button type="text" @click="deleteTrending(scope.row.id,scope.row.title)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <div id="add-trending-container" class="edit-form-item-row-space"><!--add-category-container-->
                    <el-button type="primary" size="small"  @click="openAddTrending">添加条目</el-button>

                </div>

                <el-dialog :close-on-click-modal="false" id="edit-trending-dialog" title="编辑推荐位条目" :visible="editTrendingForm.dialogVisible" width="15%" :before-close="closeEditTrendingDialog">
                    <div><!--editCategoryForm-->

                        <div><strong>标题：</strong></div>
                        <el-input show-word-limit type="text" v-model="editTrendingForm.title" class="edit-form-item-row-space" size="small" placeholder="推荐位标题（1~50字符，实际显示时可能会有截取）" minlength="1" maxlength="50" >
                        </el-input>

                        <div class="edit-form-item-row-space"><strong>链接：</strong></div>
                        <el-input show-word-limit type="text" v-model="editTrendingForm.link" class="edit-form-item-row-space" size="small" placeholder="链接（6~200字符）" minlength="6" maxlength="200" >
                        </el-input>

                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color: red">提示：</section>
                            <section>链接需以<span style="color: red">「http://」、「https://」或双斜杠「//」开头</span>，否则会出错。</section>
                        </div>

                        <div class="edit-form-item-row-space"><strong>条目顺序：</strong></div>
                        <el-input type="number" v-model="editTrendingForm.itemindex" class="edit-form-item-row-space" size="small" placeholder="请输入新的条目顺序..." minlength="1"  >
                        </el-input>

                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color: red">提示：</section>
                            <section>条目顺序为<span style="color: red">大于0且小于100的整数</span>，值越大则优先度越高，在首页横幅处及侧边推荐位内<span style="color: red">越靠前显示</span>。</section>
                        </div>


                        <div class="edit-form-item-row-space"><strong>横幅URL：<span style="color: red">*</span></strong></div>
                        <el-input show-word-limit type="text" v-model="editTrendingForm.banner" class="edit-form-item-row-space" size="small" placeholder="横幅URL（6~200字符）" minlength="6" maxlength="200"  >
                        </el-input>

                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color:red;">提示：</section>
                            <section>横幅URL：非必填，可为空；值为空时将<span style="color: red">不会显示在首页走马灯上</span>。
                                建议尺寸：750px × 300px。URL需以<span style="color: red">「http://」、「https://」或双斜杠「//」开头</span>，否则会出错。</section>
                        </div>

                        <div class="edit-form-item-row-space"><strong>横幅预览：</strong></div>
                        <img class="edit-form-item-row-space" width="220" height="85" :src="editTrendingForm.banner" :onerror="defaultBanner" >


                        <!--两个btn放在一起会让中间出现间隔，所以需要用div隔开！-->
                        <div class="edit-form-item-row-space">
                            <el-button type="primary" size="small" style="width: 100%;" @click="editTrending" :loading="editTrendingForm.submitBtnLoading">提 交</el-button>
                        </div>


                        <div class="edit-form-item-row-space">
                            <el-button size="small" style="width: 100%;" @click="closeEditTrendingDialog">关 闭</el-button>
                        </div>


                    </div>

                </el-dialog>

                <el-dialog :close-on-click-modal="false" id="add-trending-dialog" title="添加推荐位条目" :visible="addTrendingForm.dialogVisible" width="15%" :before-close="closeAddTrendingDialog">
                    <div><!--editCategoryForm-->

                        <div><strong>标题：</strong></div>
                        <el-input show-word-limit type="text" v-model="addTrendingForm.title" class="edit-form-item-row-space" size="small" placeholder="推荐位标题（1~50字符，实际显示时可能会有截取）" minlength="1" maxlength="50" >
                        </el-input>

                        <div class="edit-form-item-row-space"><strong>链接：</strong></div>
                        <el-input show-word-limit type="text" v-model="addTrendingForm.link" class="edit-form-item-row-space" size="small" placeholder="链接（6~200字符）" minlength="6" maxlength="200" >
                        </el-input>

                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color: red">提示：</section>
                            <section>链接需以<span style="color: red">「http://」、「https://」或双斜杠「//」开头</span>，否则会出错。</section>
                        </div>

                        <div class="edit-form-item-row-space"><strong>条目顺序：</strong></div>
                        <el-input type="number" v-model="addTrendingForm.itemindex" class="edit-form-item-row-space" size="small" placeholder="请输入新的条目顺序..." minlength="1"  >
                        </el-input>

                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color: red">提示：</section>
                            <section>条目顺序为<span style="color: red">大于0且小于100的整数</span>，值越大则优先度越高，在首页横幅处及侧边推荐位<span style="color: red">越靠前显示</span>。</section>
                        </div>


                        <div class="edit-form-item-row-space"><strong>横幅URL：<span style="color: red">*</span></strong></div>
                        <el-input show-word-limit type="text" v-model="addTrendingForm.banner" class="edit-form-item-row-space" size="small" placeholder="横幅URL（6~200字符）" minlength="6" maxlength="200"  >
                        </el-input>

                        <div class="imp-info-item-descrption edit-form-item-row-space">
                            <section style="color:red;">提示：</section>
                            <section>横幅URL：非必填，可为空；值为空时将<span style="color: red">不会显示在首页走马灯上</span>。
                                建议尺寸：750px × 300px。URL需以<span style="color: red">「http://」、「https://」或双斜杠「//」开头</span>，否则会出错。</section>
                        </div>

                        <div class="edit-form-item-row-space"><strong>横幅预览：</strong></div>
                        <img class="edit-form-item-row-space" width="220" height="85" :src="addTrendingForm.banner" :onerror="defaultBanner" >


                        <!--两个btn放在一起会让中间出现间隔，所以需要用div隔开！-->
                        <div class="edit-form-item-row-space">
                            <el-button type="primary" size="small" style="width: 100%;" @click="addTrending" :loading="addTrendingForm.submitBtnLoading">提 交</el-button>
                        </div>


                        <div class="edit-form-item-row-space">
                            <el-button size="small" style="width: 100%;" @click="closeAddTrendingDialog">关 闭</el-button>
                        </div>


                    </div>

                </el-dialog>
            </div>

        </div>
    </div>
</template>

<script>
import store from "../store";
import {autoLogout, dateFormatter} from "../assets/function";

export default {
    name: "TrendingList",
    store,
    data() {
        return {
            trendingList:[],
            getTrendingListLoading: false,
            defaultBanner: 'this.src = "' + store.state.defaultBanner + '"',

            editTrendingForm: {
                id:-1,
                title:"",
                banner:"",
                link:"",
                itemindex:-1,

                dialogVisible:false,
                submitBtnLoading:false,
            },
            addTrendingForm: {
                title:"",
                banner:"",
                link:"",
                itemindex:-1,

                dialogVisible:false,
                submitBtnLoading:false,
            }

        }
    },
    mounted() {
        document.title = '推荐位管理' + ' - ' + store.state.pageTitle;
        this.getTrendingList();
    },
    methods: {
        addTrending() {
            this.addTrendingForm.submitBtnLoading = true;
            let accessToken = localStorage.getItem("accessToken");
            let postData = {
                "title":this.addTrendingForm.title,
                "itemindex":this.addTrendingForm.itemindex,
                "link":this.addTrendingForm.link,
                "banner": this.addTrendingForm.banner
            }


            if(postData.title === null || postData.title.length < 1 || postData.title.length > 50) {
                this.$message({
                    type:"error",
                    message: "条目标题应当为1~50位字符！",
                });
                this.addTrendingForm.submitBtnLoading = false;
                return;
            }
            if(postData.itemindex === null || postData.itemindex < 0 || postData.itemindex > 100) {
                this.$message({
                    type:"error",
                    message: "条目顺序应当为介于0到100之间的整数！",
                });
                this.addTrendingForm.submitBtnLoading = false;
                return;
            }
            if(postData.link === null || postData.link.length < 6 || postData.link.length > 200) {
                this.$message({
                    type:"error",
                    message: "条目链接应当为6~200位字符！",
                });
                this.addTrendingForm.submitBtnLoading = false;
                return;
            }

            axios.post(store.state.apiUrl + "/api/trending/addTrending?accessToken=" + accessToken,postData).then(response => {
                if(response.status === 200) {
                    if(response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "添加成功！",
                        });
                        this.closeAddTrendingDialog();
                        this.addTrendingForm.submitBtnLoading = false;
                        this.getTrendingList();

                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.addTrendingForm.submitBtnLoading = false;
                    }
                }
            });
        },
        deleteTrending(_id,_title) {
            this.$confirm("请确认是否要删除推荐位条目：[" + _id + "]" + _title ,"删除推荐位条目",{
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let authData = "id=" + _id + "&accessToken=" + localStorage.getItem("accessToken");
                axios.post(store.state.apiUrl + "/api/trending/deleteTrending",authData).then(response => {
                    if(response.status === 200 && response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "删除成功！",
                        });
                        this.getTrendingList();
                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                    }
                });
            });
        },
        toTrendingLink(_link) {
            window.open(_link,"_blank");
        },
        editTrending() {
            this.editTrendingForm.submitBtnLoading = true;
            let accessToken = localStorage.getItem("accessToken");
            let postData = {
                "id":this.editTrendingForm.id,
                "title":this.editTrendingForm.title,
                "itemindex":this.editTrendingForm.itemindex,
                "link":this.editTrendingForm.link,
                "banner": this.editTrendingForm.banner
            }


            if(postData.title === null || postData.title.length < 1 || postData.title.length > 50) {
                this.$message({
                    type:"error",
                    message: "条目标题应当为1~50位字符！",
                });
                this.editTrendingForm.submitBtnLoading = false;
                return;
            }
            if(postData.itemindex === null || postData.itemindex < 0 || postData.itemindex > 100) {
                this.$message({
                    type:"error",
                    message: "条目顺序应当为介于0到100之间的整数！",
                });
                this.editTrendingForm.submitBtnLoading = false;
                return;
            }
            if(postData.link === null || postData.link.length < 6 || postData.link.length > 200) {
                this.$message({
                    type:"error",
                    message: "条目链接应当为6~200位字符！",
                });
                this.editTrendingForm.submitBtnLoading = false;
                return;
            }

            axios.post(store.state.apiUrl + "/api/trending/editTrending?accessToken=" + accessToken,postData).then(response => {
                if(response.status === 200) {
                    if(response.data.errcode === 0) {
                        this.$message({
                            type:"success",
                            message: "修改成功！",
                        });
                        this.getTrendingList();
                        this.editTrendingForm.submitBtnLoading = false;

                    } else if(response.data.errcode === 1001) {
                        autoLogout();
                    } else {
                        this.$message({
                            type: "error",
                            message: "[" + response.data.errcode + "]" + response.data.msg,
                        });
                        this.editTrendingForm.submitBtnLoading = false;
                    }
                }
            }).catch(error => {
                this.$message({
                    type: "error",
                    message: "[" + error.response.data.errcode + "]" + error.response.data.msg,
                });
                this.editTrendingForm.submitBtnLoading = false;

            });
        },
        closeEditTrendingDialog() {
            this.editTrendingForm.dialogVisible = false;
        },
        closeAddTrendingDialog() {
            this.addTrendingForm.dialogVisible = false;
            this.addTrendingForm.title = "";
            this.addTrendingForm.banner = "";
            this.addTrendingForm.link = "";
            this.addTrendingForm.itemindex = -1;
        },
        openEditTrending(_id,_title,_banner,_link,_itemindex) {
            this.editTrendingForm.id = _id;
            this.editTrendingForm.title = _title;
            this.editTrendingForm.banner = _banner;
            this.editTrendingForm.link = _link;
            this.editTrendingForm.itemindex = _itemindex;

            this.editTrendingForm.dialogVisible = true;
        },
        openAddTrending() {
            this.addTrendingForm.dialogVisible = true;
            this.addTrendingForm.title = "";
            this.addTrendingForm.banner = "";
            this.addTrendingForm.link = "";
            this.addTrendingForm.itemindex = -1;
        },
        getTrendingList() {
            this.getTrendingListLoading = true;
            axios.get(store.state.apiUrl + "/api/trending/getTrendingList").then(response => {
                if(response.status === 200 && response.data.errcode === 0) {
                    let resultList = response.data.data;
                    for(let i = 0;i < resultList.length; i++) {
                        resultList[i].lastchange = dateFormatter(resultList[i].lastchange,true);
                    }
                    this.trendingList = resultList;
                    this.getTrendingListLoading = false;
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

<style>
.trending-list-table .el-button{
    padding: 5px;
}
#edit-trending-dialog .el-dialog__body {
    /*trendinglist,categoryedit与userlist的dialog上边距不同*/
    padding: 10px 15px 15px 15px;
}
#add-trending-dialog .el-dialog__body {
    /*trendinglist,categoryedit与userlist的dialog上边距不同*/
    padding: 10px 15px 15px 15px;
}




</style>