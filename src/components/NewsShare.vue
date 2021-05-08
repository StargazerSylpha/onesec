<template>
    <div id="news-share-component">
        <el-row>
            <el-col style="width: 40px;">
                <div class="author-avatar"><img @click="toUserDetail" class="news-share-avatar-border" width="40" height="40" :src="article.authorAvatar"></div>
            </el-col>
            <el-col id="author-nickname-col">
                <div><span @click="toUserDetail">{{article.authorNickname}}</span></div>

            </el-col>
            <el-col class="news-share-text-col">
                <div id="news-share-text-div">
                    <el-row>
                        <el-col class="col-line">
                            <div class="news-share-line"></div>

                        </el-col>
                        <el-col class="col-margin">
                            <div class="item-cursor-hover"><span><i class="el-icon-star-off"></i> 收藏</span></div>

                        </el-col>
                        <el-col class="col-margin">
                            <div class="item-cursor-hover" @click="toComment"><span><i class="el-icon-s-comment"></i> 评论</span></div>
                        </el-col>
                        <el-col class="col-margin">
                            <div id="news-share-btn" class="item-cursor-hover" @mouseover="shareBoxDisplay" @mouseout="shareBoxDisappear"><span><i class="el-icon-share"></i> 分享</span></div>
                            <!--弹出分享框-->
                            <div id="news-share-box" @mouseover="shareBoxDisplay" @mouseout="shareBoxDisappear" ref="news-share-box" class="news-share-box" style="display: none;">
                                <el-row>
                                    <el-col style="width: 139px;">
                                        <div id="news-share-box-title" class="function-title">分享</div>
                                        <div id="news-share-box-left">
                                            <a :href="weiboShareUrl" target="_blank"><i class="news-share-box-left-icon">
                                                <svg t="1619521062611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4681" width="50" height="50"><path d="M918.485 209.078c-62.138-69.905-155.345-95.796-238.195-77.672-20.713 5.178-31.069 23.301-28.48 44.014 5.178 20.713 23.302 31.069 44.014 28.48 59.55-12.945 126.865 5.178 170.88 54.37 44.014 49.193 56.96 116.509 36.247 176.058-2.59 10.356-2.59 18.123 2.589 28.48 5.178 7.767 12.945 15.534 20.712 18.123 18.124 5.178 38.836-5.178 46.604-23.302 23.301-85.44 7.767-178.646-54.371-248.551z" fill="#FFAE36" p-id="4682"></path><path d="M807.155 436.917c15.534 5.178 33.658-2.59 38.836-20.713 12.945-41.425 5.178-85.44-25.89-119.097-31.07-33.658-75.084-46.604-116.51-38.837-18.123 2.59-28.48 20.713-23.301 36.248 2.59 18.123 20.713 28.48 36.247 23.301 20.713-5.178 41.425 2.59 56.96 18.124 15.534 15.534 18.123 38.836 12.945 59.549-5.178 18.123 5.178 36.247 20.713 41.425z m-62.138 59.549c-12.945-5.179-23.302-7.768-15.535-23.302 15.535-38.836 15.535-72.494 0-95.796-31.068-44.014-116.508-41.425-212.304 0 0 0-31.069 12.945-23.302-10.356 15.535-49.193 12.946-88.029-10.356-111.33-51.781-51.782-191.592 2.588-310.689 121.686-88.029 90.618-139.81 183.824-139.81 266.675 0 157.934 201.948 253.73 398.718 253.73 258.907 0 429.786-150.167 429.786-269.265 0-72.494-62.138-113.919-116.508-132.042zM431.739 840.813c-157.934 15.534-292.566-56.96-302.922-157.934-10.357-103.563 108.74-199.359 266.675-214.893 157.933-15.535 292.565 56.96 302.922 157.933 10.356 103.563-108.742 199.36-266.675 214.894z" fill="#D81E06" p-id="4683"></path><path d="M447.273 545.658c-75.083-20.713-160.523 18.124-191.592 82.85-33.658 67.316 0 142.4 75.084 165.701 77.672 25.891 170.879-12.945 201.948-85.44 31.069-69.904-7.768-142.398-85.44-163.111z m-56.96 173.468c-15.534 23.302-46.603 36.247-72.494 23.302-23.301-10.356-31.069-38.836-15.534-62.138 15.534-23.302 46.603-33.658 69.905-23.302 25.89 7.768 33.658 36.247 18.123 62.138z" p-id="4684"></path></svg>
                                            </i></a>
                                            <a :href="qzoneShareUrl" target="_blank"><i class="news-share-box-left-icon">
                                                <svg t="1619521026074" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3799" width="50" height="50"><path d="M955.728 428.224c8.385-8.785 3.76-23.536-8.073-25.753l-276.832-51.854c-4.838-0.906-9.02-3.987-11.38-8.383L525.873 93.229c-2.798-5.23-8.342-7.85-13.875-7.896-5.532 0.045-11.075 2.667-13.873 7.896L364.558 342.234c-2.36 4.396-6.543 7.477-11.381 8.383L76.345 402.471c-11.833 2.217-16.458 16.968-8.073 25.753L269.64 639.086c3.564 3.733 5.205 8.952 4.433 14.1l-46.015 282.032c-1.819 12.126 10.394 21.407 21.298 16.182L505 827.827a16.098 16.098 0 0 1 7-1.58 16.1 16.1 0 0 1 7.003 1.58L774.644 951.4c10.904 5.225 23.117-4.056 21.298-16.182l-46.88-287.298 206.666-219.696z" fill="#FFCD00" p-id="3800"></path><path d="M559.42 493.63c-4.517-3.772-110.987-40.332-273.968-16-3.16 0.47-5.913-0.394-8.04-1.992-0.717 4 3.587 7.152 8.988 7.527 115.064 8.021 179.42 54.987 199.492 71.501 40.78-28.923 71.882-50.606 73.063-51.527 3.668-2.856 3.695-6.811 0.465-9.51m135.65-29.972c-41.744 35.168-160.159 116.897-201.52 148.468-4.864 3.711-3.177 9.424 2.098 11.43 17.045 6.488 36.23 11.95 56.421 16.445l159.784-152.228c12.544-13.184 5.238-29.152-10.422-32.661-1.025 3.011-3.259 5.933-6.36 8.546M817.187 640l-0.101 0.045c-70.456 29.709-241.54 79.623-451.762 72.33-25.386-0.88-50.63-3.715-64.786-6.325-2.067-0.38-3.878-1.012-5.476-1.846-10.567 12.224 2.073 21.462 47.148 30.58 131.886 26.676 286.047 38.934 415.304 30.665l-8.884-54.324c43.727-31.431 64.996-58.546 67.524-62.57 2.899-4.616 1.033-8.555 1.033-8.555" fill="#F1A308" p-id="3801"></path><path d="M818.863 646.995c-53.31 5.137-215.894 3.686-311.826-33.167-5.107-1.962-6.834-7.566-2.129-11.194 40.025-30.84 154.62-110.68 195.014-145.035 7.872-6.696 9.95-15.437 0.375-22.542-18.36-13.623-83.168-36.203-158.198-36.816-107.373-0.88-212.858 29.498-259.133 54.09-10.983 5.837-4.392 21.221 6.83 19.495 164.223-25.24 271.495 12.756 276.045 16.67 3.255 2.798 3.074 6.906-0.5 9.715-3.036 2.389-199.263 143.36-258.23 193.11-9.286 7.834-6.845 24.246 8.35 27.018 14.152 2.582 39.406 5.412 64.784 6.284 210.173 7.214 381.314-42.24 451.755-71.63 0 0-2.148-7.057-13.137-5.998" fill="#FFFFFF" p-id="3802"></path></svg>
                                            </i></a>
                                        </div>
                                    </el-col>
                                    <el-col style="width: 1px;">
                                        <div id="news-share-box-line"></div>
                                    </el-col>
                                    <el-col style="width: 130px;">
                                        <div id="news-share-box-right-notice" class="imp-info-item-descrption" style="text-align: center">微信、QQ扫描二维码<br>在手机上观看、分享</div>
                                        <div id="news-share-box-right-qrcode">
                                            <img :src="qrcodeUrl" width="100" height="100">
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>

                        <el-col class="col-margin">
                            <div class="item-cursor-hover"><span><i class="el-icon-service"></i> 建议</span></div>
                        </el-col>

                        <el-col class="col-margin">
                            <div class="item-cursor-hover" @click="backTop"><span><i class="el-icon-top"></i> 最上</span></div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>





    </div>
</template>

<script>
export default {
    name: "NewsShare",
    props:["article"],
    methods: {
        backTop: function () {
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        },
        toComment() {
            document.documentElement.scrollTop += 200;
            document.body.scrollTop += 200;
        },
        shareBoxDisplay() {
            this.$refs['news-share-box'].style.display = "";
        },
        shareBoxDisappear() {
            this.$refs['news-share-box'].style.display = "none";
        },
        toUserDetail() {
            console.log("authorUid:" + this.article.author);
        }
    },

    data: function () {
        return {


        }
    },

    computed: {
        qrcodeUrl:function () {
            return "//api.qrserver.com/v1/create-qr-code/?size=100x100&data=" + encodeURIComponent(window.location.href);
        },
        weiboShareUrl: function () {
            return "//service.weibo.com/share/share.php?title=" + this.article.title
                + "&url=" + encodeURIComponent(window.location.href)
                + "&pic=" + encodeURIComponent(this.article.banner);
        },
        qzoneShareUrl: function () {
            //qq需要在url里获取图片，获取不到的话不管是否传入数据都直接报undefined，属实煞笔
            return "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+ encodeURIComponent(window.location.href)
                + "&desc=" + this.article.title
                + "&title=" + this.article.title
                + "&pics=" + encodeURIComponent(this.article.banner);
        }
    },
}
</script>
<style scoped>
.news-share-avatar-border {
    border: 1px solid #409eff;
    border-radius: 50%;
}
.author-avatar:hover {
    cursor: pointer;
}
.news-share-box-left-icon {
    width:50px;
    height: 50px;
    margin-left: 15px;

}
.news-share-box-left-icon:hover {
    cursor: pointer;
}
#news-share-box-left {
    margin-top: 30px;
}
#news-share-text-div {
    height: 30px;
    margin-left: 20px;
    margin-top: 10px;

}
.news-share-text-col {
    width: 450px;

}
#news-share-box-right-qrcode {
    width: 100px;
    height: 100px;
    margin-left: 20px;
    margin-top: 10px;
}
#news-share-box-line {
    width: 1px;
    height: 150px;
    background-color: #eaeaea;

}
.news-share-box {
    left: 150px;
    width: 270px;
    height: 150px;
    background-color: white;
    padding: 10px;
    position: absolute; /*一定要设置*/
    border: 1px solid #eaeaea;
    border-radius: 5px;
    z-index: 3;
}

#news-share-component {
    border-top: 5px solid #409eff;

    height: 40px;
    background-color: #f5f5f5;
    padding: 5px 20px 5px 20px;

    display: flex;
    display: -webkit-flex;
    align-items: center;

}

.col-margin {
    margin-left: 20px;
    width: 60px;
    font-size: 17px;
    color: #909399;
}

.item-cursor-hover:hover {
    cursor: pointer;
    color: #c0c4cc;
}

#author-nickname-col {
    font-size: 20px;
    color: #409eff;
    width: 200px;
    margin-left: 20px;
    margin-top: 10px;
}

#author-nickname-col:hover {
    cursor: pointer;
}

.col-line {
    margin-left: 20px;
    width: 1px;
}
.news-share-line {
    width: 1px;
    height: 25px;
    background-color: #999999;
    vertical-align: top;
}

</style>