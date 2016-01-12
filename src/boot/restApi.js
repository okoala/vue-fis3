'use strict';

import Vue from 'vue';

let mainCache = Vue.cache('mainCache', {
    storageMode: 'localStorage', // 使用localstorage
    deleteOnExpire: 'aggressive', // 过期后立即删除数据
    recycleFreq: 60 * 1000, // 循环检测频率
    maxAge: 60 * 60 * 1000 // 缓存一小时
});

// 使用方式
//
// restApi.xxxxx.get(params);
// restApi.xxxxx.save(params);
// restApi.xxxxx.query(params);
// restApi.xxxxx.remove(params);
// restApi.xxxxx.delete(params);
//
//
// 例如：
// restApi.coupon.get()
//     .success(function(data, status, request) {
//         console.log('true');
//     })
//     .error(function(data, status, error) {
//         console.log('error', error);
//     });

export default {
    // 获取推荐内容
    recom : Vue.resource('/api/Like/Reader/Recom', { cache: mainCache }),

    // 获取36kr的内容
    rss: Vue.resource('/api/Like/Reader/GetContent/site_id/:id', { cache: mainCache })

}
