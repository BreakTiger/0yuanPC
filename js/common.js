/* common.js文件，创建于2019/04/28 author:wen*/
var ajaxUrl = '';//请求域名
var imgUrl = '';//图片链接
/*封装通用ajax请求*/
var userToken = localData('get', 'userLoginInfo').token || '';
function ajax_get(surl, param, call) {
    $.ajax({
        headers: { 'token': userToken },
        url: ajaxUrl + (surl.substring(0, 1) == '/' ? surl.substring(1) : surl),
        data: param || {},
        type: 'get',
        dataType: 'json',
        timeout: 15000,
        success: call,
    })
}
function ajax_post(surl, param, call) {
    $.ajax({
        headers: { 'token': userToken },
        url: ajaxUrl + (surl.substring(0, 1) == '/' ? surl.substring(1) : surl),
        data: param || {},
        type: 'post',
        dataType: 'json',
        timeout: 15000,
        success: call,
    })
}
function callBack(r, j) {
    j = j || {};
    if (r.status == 100) { //重新登录
        if (window.location.pathname.indexOf('/login.html') > 0 || window.location.pathname.indexOf('/register.html') > 0) {
            return false;
        }
        alert('请先登录！', function () {
            window.location.href = 'login.html';
        });
    } else if (r.status == 200) { // 操作成功
        j.success && j.success(r.data);
    } else if (r.status == 201) { // 操作失败
        if (j.fail) {
            j.fail(r.msg);
        }else {
            return;
        }
    } else if (r.status == 202) { // 操作成功，需要跳转页面
    } else if (r.status == 203) { // 操作失败，需要跳转页面
    } else { }
}

//本地数据操作,(存于localStorge中)
function localData(t, key, data) {
    if (t == 'set') { // 保存
        localStorage.setItem(key, JSON.stringify(data));
    } else if (t == 'get') { // 读取
        var data = localStorage.getItem(key) || '{}';
        return JSON.parse(data == 'undefined' ? '{}' : data);
    } else if (t == 'remove') { // 删除某个值
        localStorage.removeItem(key);
    } else if (t == 'clear') {
        localStorage.clear();
    }
}
//设置cookies
function setCookie(name, value) { //设置cookie
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 30);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookies
function getCookie(name) {  //获取Cookie
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}