/**
 *
 * 这里不要学vue使用import()或import{}
 * 会直接导致下面函数名变红，前台提示找不到定义的函数！
 *  前面不要加const!
 */
//this.$confirm实际上是MessageBox.confirm
import {Message,MessageBox } from "element-ui";
import router from "../router"

const dateFormatter = function (dateStr, needTime) {
    /**
     * date方法中：
     * getMonth方法返回1月为0，2月为1，...，故使用时需+1
     * getDay方法返回当天周几，getDate才是返回几号
     * 记得补全一位数前面的0
     */

    /**
     * ver 0.2 20210516 00:24:06
     * debug：修正了 传入参数dateStr在为null时直接返回了1970-01-01 （timestamp 0）
     *
     */
    if(dateStr === null) {
        return null;
    }
    let date = new Date(dateStr);

    let dateMonth = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
    let dateDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let timeHour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let timeMin = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let timeSec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let dateFormatStr = date.getFullYear() + "-" + dateMonth + "-" + dateDate;
    let timeFormatStr = timeHour + ":" + timeMin + ":" + timeSec;
    if (needTime === true) {
        return dateFormatStr + " " + timeFormatStr;
    } else {
        return dateFormatStr;
    }
}

const authLogout = function () {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");

}

const autoLogout = function (typ,msg) {
    /**
     * 在外部js文件里引入elementui的组件（方法）后，不能再像vue组件里的方法一样使用
     * vue能借助$符号使用方法，是因为已在main.js中挂载并借助Vue.prototype定义$方法
     */
    /*
    authLogout();
    Message({
        type:"error",
        message:"登录状态已过期，请重新登录！",
    });
    router.push("/auth/login");
    */
    authLogout();
    if(typeof typ === "undefined" || typeof msg === "undefined") {
        Message({
            type:"error",
            message:"登录状态已过期，请重新登录！",
        });
    } else {
        Message({
            type:typ,
            message:msg,
        });
    }
    router.push("/auth/login");
}

const confirmLogout = function () {
    MessageBox.confirm("确认登出吗？","登出",{
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        authLogout();
        Message({
            type:"success",
            message:"登出成功！",
        });
        router.push("/auth/login");

    });
}

export {
    //https://blog.csdn.net/lixinyi0622/article/details/107361493/
    //https://forum.vuejs.org/t/js-vuex/42130
    //https://www.cnblogs.com/wenqiangit/p/10490443.html
    dateFormatter,authLogout,autoLogout,confirmLogout
}
