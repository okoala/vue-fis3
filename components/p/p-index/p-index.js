'use strict';

import Vue from 'vue';

Vue.component('p-index', {
    template: __inline('p-index.tpl'),
    data() {
        return {
        }
    },
    methods: {
        onTap(item, index) {
            if (item.params) Vue.go(item.type, item.params);
            else Vue.go(item.type);
        }
    }
});
