'use strict';

import Vue from 'vue';
import { snabbt } from 'util';

export default {

    beforeEnter(el) {

    },

    enter(el, done) {
        snabbt(el, {
            fromOpacity: 1,
            opacity: 0,
            duration: 500,
            loop: 2,
            complete() {
                el.style.opacity = 1;
                done();
            }
        });
    },

    leave(el, done) {
        console.log('true');
    }

}
