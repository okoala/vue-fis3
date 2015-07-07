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
                desc: '订阅内容',
                isActive: false
            }, {
                id: 14,
                name: 'Dribbble',
                url: 'https://dribbble.com',
                image: __uri('images/14.png'),
                desc: 'Dribbble - 优秀设计师的聚集地',
                isActive: false
            }, {
                id: 34,
                name: 'UI中国',
                url: 'http://www.ui.cn/',
                image: __uri('images/34.png'),
                desc: 'UI中国 - 国内最专业的UI设计平台',
                isActive: false,
            }],
            currentRss: {
                data: {
                    current_page: null,
                    items: [],
                    page_count: null
                }
            }
        }
    },
    ready() {
        let params = this.$data.$router.params;
        let rssId;

        if (!params || !params.rssId) {
            restApi.recom.get()
                .success(res => {
                    let data = res.data;
                    data.items = this._mapFeed(this._mapHost(data.items));

                    this.currentRss = this.rss[0];
                    this.currentRss.data = data;
                    this.rss[0].isActive = true;
                    console.log(res.data);
                })
                .error(err => {

                });
        } else {
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
        _mapHost(data) {
            let originalHost = 'http://idesign.qq.com';
            data.forEach(function(item) {
                item.thumb = originalHost + item.thumb;
                item.thumb_src = originalHost + item.thumb_src;
                item.url = originalHost + item.url;
            });

            return data;
        },

        _mapFeed(data) {
            const t = new Date();
            const year = t.getFullYear();
            const month = ("00000" + (t.getMonth() + 1)).substr(("00000" + (t.getMonth() + 1)).length - 2);
            const today = ("00000" + t.getDate()).substr(("00000" + t.getDate()).length - 2);
            const yestoday = ("00000" + (t.getDate() - 1)).substr(("00000" + (t.getDate() - 1)).length - 2);

            const tDate = year + "-" + month + "-" + today;
            const yDate = year + "-" + month + "-" + yestoday;
            const bDate = year + "-" + month + "-" + (yestoday - 1);

            let todayData = {
                dataName: '今天',
                dateTime: tDate,
                data: []
            };

            let yestodayData = {
                dataName: '昨天',
                dateTime: yDate,
                data: []
            };

            let beforeData = {
                dataName: '以前',
                dateTime: bDate,
                data: []
            };

            data.forEach(function(item, index) {
                let _date;
                _date = item.create_on && item.create_on.substring(0, 10) ? item.create_on.substring(0, 10) : bDate;

                if (_date === tDate) {
                    todayData.data.push(item);
                } else if (_date === yDate) {
                    yestodayData.data.push(item);
                } else {
                    beforeData.data.push(item);
                }
            });

            return [todayData, yestodayData, beforeData];
        },

        onTap(item, index) {
            if (item.params) Vue.go(item.type, item.params);
            else Vue.go(item.type);
        }
    }
});
