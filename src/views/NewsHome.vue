<template>
    <div id="news-home-container">
        <el-row>
            <el-col class="news-home-mid-col">
                <div id="news-home-mid">
                    <div id="news-banner" class="swiper-container">
                        <!--swiper 主要图片-->
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <img src="//img.36krcdn.com/20210412/v2_ae552ee88c9f4066a0abc79ecb6d70fe_img_jpg" width="100%" height="300">
                            </div>
                            <div class="swiper-slide">
                                <img src="//img.36krcdn.com/20210411/v2_851121309a99417c8d6f6df682f3a2b3_img_jpeg" width="100%" height="300">
                            </div>
                            <div class="swiper-slide">
                                <img src="//img.36krcdn.com/20210412/v2_8a0631cbc25b40c6996635c50e9871bc_img_png" width="100%" height="300">
                            </div>
                        </div>

                        <!--swiper 前进后退按钮-->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>

                        <!--swiper顶部进度条-->
                        <div class="swiper-scrollbar"></div>
                    </div>

                    <div id="news-home-mid-title" class="function-title">最新文章</div>
                </div>
            </el-col>

            <el-col class="news-home-right-col">
                <div id="news-home-right">
2
                </div>
            </el-col>

        </el-row>



    </div>
</template>

<script>

import Swiper from '../assets/swiper-bundle.min.js';
export default {
    name: "NewsHome",

    mounted() {
        new Swiper('.swiper-container',{

            loop: true,
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    },
}
</script>

<style scoped>

.news-home-mid-col {
    width: 750px;
}

#news-home-mid {
    background-color: white;
}
.news-home-right-col {
    margin-left: 20px;
    width: 290px;
}

#news-home-right {
    background-color: white;
}

#news-banner {
    width: 100%;
    height: 300px;
}

#news-home-mid-title {
    margin-top: 20px;
    
}

</style>