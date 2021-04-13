<template>
    <div>
        <router-view></router-view>
    </div>

</template>

<script>


export default {
  name: 'app',
  components: {


  }
}
</script>

<style>
    body {
        background-color: #eaeaea;
        /**
         * masadora #f5f5f5 稍淡一些
         * mihoyo login #eaeaea
         */
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        margin: 0px; /*解决element ui 组件边距问题*/
    }
</style>
