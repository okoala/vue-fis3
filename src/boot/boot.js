'use strict';

import Vue from 'vue';

// 暴露vue到全局作用下，browser sync
window.Vue = Vue;

// 使用resource插件
Vue.use(require('vue-resource'));

// 使用vue view插件
Vue.use(require('vue-view'));

// 加载directive组件
Vue.directive('lazyload', require('./directives/lazyload.js'));
Vue.directive('minheight', require('./directives/minheight.js'));

// 加载动画效果
Vue.transition('shake', require('./effects/shake'));
Vue.transition('flash', require('./effects/flash'));
Vue.transition('bigIn', require('./effects/big-in'));
Vue.transition('slideDown', require('./effects/slide-down'));
Vue.transition('slideVertical', require('./effects/slide-vertical'));
Vue.transition('slideHorizontal', require('./effects/slide-horizontal'));
// 子孙的动画系列
Vue.transition('childSlideIn', require('./effects/child-slide-in'));

// 加载filter
Vue.filter('dateFormat', require('./filters/dateFormat'));
Vue.filter('webp', require('./filters/webp'));
Vue.filter('encode', function(str) {
    return encodeURIComponent(str);
});
Vue.filter('decode', function(str) {
    return decodeURIComponent(str);
});

export default function(options) {
    // 若有的http请求头都带上x-csrf-token，增强安全性。
    Vue.http.headers.common['x-csrf-token'] = options._csrf;
    // 设置响应成功的code.
    Vue.http.response.success['status'] = 1;
    // 设置post的为form形式。
    Vue.http.options.emulateJSON = true;
    // 加载路由.
    Vue.use(require('./routes'));
}
