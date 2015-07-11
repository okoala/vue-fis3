'use strict';

export default function(Vue) {

    let options = {
        // 设置跟节点
        el: 'body',

        //路由状态
        router: {
            states: {
                'index': {
                    url: '/',
                    component: 'p-index'
                },

                'rss': {
                    url: '/:rssId',
                    component: 'p-index'
                },

                //404找不到页面
                //404必须放到最后
                'notFound': {
                    url: '*',
                    component: 'p-notFound'
                }
            },
            options: {
                // 页面模块默认全异步加载。
                async: true,
                // 使用html5 mode
                hashbang: false,
                // 设置页面间的转场效果
                transition: true
            },
            // 全局中间件
            middleware: {
                // 在路由进入前执行
                // 可以用作获取用户信息，登陆/授权相关~~
                beforeEnter: function(location, next, router) {
                    // 这里可以加载restApi
                    // Vue.$root.isLogin = true;
                }
            }
        },

        //设置路由的事件~
        events: {
            'router:beforeEnter': function(to, from) {

            },

            'router:onEnter': function(to, from) {
                console.log('true');
            },

            'router:beforeLeave': function() {

            }
        }
    };

    new Vue(options);
}
