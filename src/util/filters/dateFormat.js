'use strict';

let fixNumber = function(date) {
    const dateLength = 13;
    const len = date.length;

    let diffLen = dateLength - len;
    let diff = '';

    while(diffLen) {
        diff += '0';
        diffLen--;
    }

    return date + diff;
}

export default function(date, format) {
    format = format || 'yyyy-MM-dd';

    const d = new Date(Number(fixNumber(date)));
    const o = {
        "M+" : d.getMonth()+1, //month
        "d+" : d.getDate(), //day
        "h+" : d.getHours(), //hour
        "m+" : d.getMinutes(), //minute
        "s+" : d.getSeconds(), //second
        "q+" : Math.floor((d.getMonth()+3)/3), //quarter
        "S" : d.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(let k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }

    return format;
}
