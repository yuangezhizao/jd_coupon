var delay = 1.1;//提交时间（到点前或到点后多少秒领取，提前为负值，单位秒，默认0.01秒后）
var count = 0;
var interval = 100;
var intvl = setInterval(tijiao, interval);
var consolecss = 'color:red;font-weight:bold;font-size:12px';

var now = new Date();
var deviation = 0;
var hms = "00:00:00";
var kaishi = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + hms;
if(hms == '00:00:00')
    kaishi = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + (now.getDate()+1) + ' ' + hms;

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
            console.log('%c今日优惠券领取已经开始' + timer_format(Math.abs(kk)) + '，赶快输入验证码领取吧！', consolecss);
            var code = $("#validateCode").val();
            if (code.length >= 4) {
                btnSubmit.click();
                clearInterval(intvl);
                console.log('%c领取结束!', consolecss)
            }
        }
    }
    count += 1
}