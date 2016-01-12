'use strict';

import Vue from 'vue';
import { snabbt } from 'util';

export default {

    beforeEnter(el) {
        let matrix = snabbt.createMatrix();
        matrix.scale(1.2, 1.2);
        snabbt.setElementTransform(el, matrix);
        el.style.opacity = 0;
    },

    enter(el, done) {
        snabbt(el, {
            fromScale: [1.2, 1.2],
            scale: [1, 1],
            fromOpacity: 0,
            opacity: 1,
            duration: 300,
            easing: 'ease',
            complete() {
                done();
            }
        });
    },

    leave(el, done) {

    }

}
