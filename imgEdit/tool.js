/**YImgEdit
 * 作者：YYC
 * 日期：2014-05-19
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */


var tool = {
    showInfo: function (info) {
        $("#info").html(info);

        setTimeout(function () {
            $("#info").html("");
        }, 3000);
    }    ,
    showError:function(errorInfo){
        $("#error").html(errorInfo);

        setTimeout(function () {
            $("#error").html("");
        }, 3000);
    }
};