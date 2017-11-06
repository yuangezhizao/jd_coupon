var delay = getDelay(myBrowser());//提交时间（到点前或到点后多少秒领取，提前为负值，单位毫秒，默认0秒后）

var count = 0;
var interval = 10;
var intvl = setInterval(tijiao, interval);
var consolecss = 'color:red;font-weight:bold;font-size:12px';
var host = window.location.host;

var now = new Date();
var deviation = 0;
var hms = "";
var kaishi;

if (hms != '' && hms != '00:00:00')
{
    kaishi = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + hms;
}
else if(hms == '00:00:00')
{
    kaishi = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate()+1) + ' ' + hms;
}
else
{
    kaishi = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + (now.getHours()+1) + ':00:00';
}

function getDelay(browser)
{
    var d;

    switch(browser)
    {
        case "Chrome":
            d = 0.89;
        break;
        case "Safari":
            d = 0.93;
        break; 
        case "Opera":
            d = 0.89;
        break;
        case "Firefox":
            d = 0.91;
        break;
        case "Edge":
            d = 0.91;
        break;
        default:
            d = 0.60;
        break;
    }
    return d;
}

function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("OPR") > -1;
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    } //判断是否Edge浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
}

function timer_format(s) {
    var t;
    if (s > -1) {
        hour = Math.floor(s / 3600);
        min = Math.floor(s / 60) % 60;
        sec = s % 60;
        day = parseInt(hour / 24);
        if (day > 0) {
            hour = hour - 24 * day;
            t = day + '天 ' + hour + '时'
        } else t = hour + '时';
        if (min < 10) {
            t += '0'
        }
        t += min + '分';
        if (sec < 10) {
            t += '0'
        }
        t += sec + '秒'
    }
    return t
}

function tijiao() {
    var nowTime = new Date((new Date()).setTime(new Date().getTime() + deviation));
    var diff = nowTime - new Date(kaishi);
    var kk = parseInt((1000 * delay - diff) / 1000);
    if (! ((interval * count) % 1000) || kk <= 0) {
        if (kk > 0) console.log('%c' + timer_format(Math.abs(kk)) + '后开始领取优惠券！', consolecss);
        else {
            //console.log('%c今日优惠券领取已经开始' + timer_format(Math.abs(kk)) + '，赶快输入验证码领取吧！', consolecss);
           // var code = $("#validateCode").val();
           // if (code.length >= 4) {
                if(host == "coupon.m.jd.com")
                    submitForm();
                else if(host == "jcode.jd.com")
                    obtainJcodeForM();
                
                clearInterval(intvl);
                console.log('%c领取结束!', consolecss)
           // }
        }
    }
    count += 1
}