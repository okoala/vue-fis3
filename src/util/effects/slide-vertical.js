'use strict';

/**
 * 竖直方向移动
 *
 */

import Vue from 'vue';
import { dom, snabbt } from 'util';

export default {

    beforeEnter(el) {
        let height = dom(el).height();
        el.style.height = 0;
        dom(el).data('height', height);
    },

    enter(el, done) {
        let height = dom(el).data('height');
        snabbt(el, {
            fromHeight: 0,
            height: height,
            duration: 300,
            easing: 'linear',
            complete() {
                el.style.height = height + 'px';
                done();
            }
        });
    },

    leave(el, done) {
        done();
    }

}
