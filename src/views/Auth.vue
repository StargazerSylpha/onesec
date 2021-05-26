<template>

    <div id="auth-content">
        <div id="logo-area">
            <span id="login-title" @click="backNewsHome">{{pjtitle}}</span>
        </div>
        <div id="auth-area" class="element-light-shadow">
            <router-view></router-view>
            <div id="notice-area" >
                <span id="notice">注册、登录、使用本站服务即代表你已阅读并同意本站相关</span><el-link type="primary" @click="showAgreement">协议和政策</el-link>
            </div>
        </div>
        <div id="auth-copyright">
            <span class="copyright">{{ $store.state.copyright }}</span>

        </div>
    </div>
</template>

<script>
import store from '../store';
export default {
    name: "Auth",
    store,
    data: function () {
        return {
            pjtitle: store.state.pjtitle,

        }
    },
    methods: {
        showAgreement: function () {
            this.$message({
                message: "暂时还没有什么协议...",
                type: "error"
            });
        },
        backNewsHome: function () {
            this.$router.push("/news")
        }
    },



}
</script>

<style scoped>
    #login-title:hover {
        cursor: pointer;
    }
    #auth-content{
        width: 500px;
        margin: 50px auto 0px auto;

    }

    #logo-area {
        font-size: 30px;

    }
    #login-title {
        color: #606266; /* element文档文字颜色*/
        /* text-shadow: #eaeaea ;*/
    }

    #auth-area {
        background-color: white;
        padding:20px 20px 20px 20px; /*上右下左*/
        margin-top: 5px;
        border-radius: 4px;

    }
    .element-light-shadow {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); /*element提供*/
    }

    #auth-copyright {
        text-align: center;
        margin-top: 15px;

    }

    .copyright {
        color: #999999;
        font-size: 13px;
    }

    #notice {
        color: #999999; /*mihoyo notice color*/

    }
    #notice-area {
        margin-top: 20px;
        font-size: 13px;
        text-align: center;
    }

</style>
