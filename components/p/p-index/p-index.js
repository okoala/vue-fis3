'use strict';

import Vue from 'vue';
import restApi from '../../boot/restApi';

require('c-header');

Vue.component('p-index', {
    template: __inline('p-index.tpl'),
    data() {
        return {
            isIndex: true,
            rss: [{
                id: 0,
                name: '小云精选',
                url: '/',
                image: __uri('images/0.png'),
                desc: '订阅内容'
            }, {
                id: 14,
                name: 'Dribbble',
                url: 'https://dribbble.com',
                image: __uri('images/14.png'),
                desc: 'Dribbble - 优秀设计师的聚集地'
            }, {
                id: 34,
                name: 'UI中国',
                url: 'http://www.ui.cn/',
                image: __uri('images/34.png'),
                desc: 'UI中国 - 国内最专业的UI设计平台'
            }],
            currentRss: null
        }
    },
    ready() {
        let params = this.$data.$router.params;
        let rssId;

        if (!params || !params.rssId) {
            this.isIndex = true;
            restApi.recom.get()
                .success(res => {
                    this.currentRss = this.rss[0];
                    this.currentRss.data = res.data;
                    
                    console.log(res.data);
                })
                .error(err => {

                });
        } else {
            this.isIndex = false;

            rssId = params.rssId;

            restApi.rss.get({id: rssId})
                .success(res => {
                    console.log(res);
                })
                .error(err => {

                });
        }
    },
    methods: {
        onTap(item, index) {
            if (item.params) Vue.go(item.type, item.params);
            else Vue.go(item.type);
        }
    }
});
