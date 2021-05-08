/**
 *
 * 这里不要学vue使用import()或import{}
 * 会直接导致下面函数名变红，前台提示找不到定义的函数！
 *  前面不要加const!
 */

dateFormatter = function (dateStr, needTime) {
    /**
     * date方法中：
     * getMonth方法返回1月为0，2月为1，...，故使用时需+1
     * getDay方法返回当天周几，getDate才是返回几号
     * 记得补全一位数前面的0
     */
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

authLogout = function () {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("accessToken");
}

