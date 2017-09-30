
import Vue from 'vue';

export let setLocalStorage = function(key, value, exp) {
	var curTime = new Date().getTime();
	curTime = exp + curTime;
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
};

export let getLocalStorage = function(key) {
	var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time > 0) {
        // console.log('信息已过期');
        new Vue().$message('登录信息已过期');
    }else{
        return dataObj.data;
    }
}

export let formDataInit = function(o) {
    var s,a = [];
    for(let i in o) {
        s = o[i];
        a.push(i + '=' + s);
    }
    return a.join('&');
}

export let format = function(t) {
    var e = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    /(y+)/i.test(t) && (t = t.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var a in e) new RegExp("(" + a + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[a] : ("00" + e[a]).substr(("" + e[a]).length)));
    return t
}