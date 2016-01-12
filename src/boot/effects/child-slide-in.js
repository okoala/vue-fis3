'use strict';

/**
 * 水平方向移动
 *
 */
import Vue from 'vue';
import { dom, snabbt } from 'util';

export default {
    beforeEnter(el) {
        let childs = el.children;

        for (let i = 0; i < childs.length; i++) {
            let node = childs[i];
            node.style.opacity = 0;
        }
    },

    enter(el, done) {
        let childs = el.children;

        snabbt(childs, {
            fromPosition: [-50, 0, 0],
            position: [0, 0, 0],
            fromOpacity: 0.8,
            opacity: 1,
            duration: 600,
            easing: 'easeOut',
            delay(i) {
                return i * 80;
            },
            complete() {
                el.style.opacity = 1;
                done();
            }
        });
    },

    leave(el, done) {
        done();
    }

}
