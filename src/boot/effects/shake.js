'use strict';

import Vue from 'vue';
import { snabbt } from 'util';

export default {

    beforeEnter(el) {

    },

    enter(el, done) {
        snabbt(el, 'attention', {
            position: [50, 0, 0],
            springConstant: 2.4,
            springDeceleration: 0.9,
            complete() {
                done();
            }
        });
    },

    leave(el, done) {

    }

}
