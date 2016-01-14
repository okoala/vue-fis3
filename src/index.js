'use strict';

import Vue from 'vue'
import VueRouter from 'vue-router'
import { configRouter } from './route'

// 暴露vue到全局作用下，browser sync
window.Vue = Vue

Vue.config.debug = true
// 使用vue view插件
Vue.use(VueRouter)

// 加载directive组件
Vue.directive('lazyload', require('./util/directives/lazyload.js'))
Vue.directive('minheight', require('./util/directives/minheight.js'))

// 加载动画效果
Vue.transition('shake', require('./util/effects/shake'))
Vue.transition('flash', require('./util/effects/flash'))
Vue.transition('bigIn', require('./util/effects/big-in'))
Vue.transition('slideDown', require('./util/effects/slide-down'))
Vue.transition('slideVertical', require('./util/effects/slide-vertical'))
Vue.transition('slideHorizontal', require('./util/effects/slide-horizontal'))
// 子孙的动画系列
Vue.transition('childSlideIn', require('./util/effects/child-slide-in'))

// 加载filter
Vue.filter('dateFormat', require('./util/filters/dateFormat'))
Vue.filter('webp', require('./util/filters/webp'))
Vue.filter('encode', function(str) {
    return encodeURIComponent(str)
});
Vue.filter('decode', function(str) {
    return decodeURIComponent(str)
});

// 路由相关
// create router
const router = new VueRouter({
  hashbang: true, //hash路由
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})
// configure router
configRouter(router)
// boostrap the app
router.start(Vue.extend(App), '#root')
// just for debugging
window.router = router
