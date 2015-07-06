'use strict';

import { dom } from 'util';

export default {

    bind(size) {
        this.size = size;
        this.handler = function() {
            this.setSize(this.size);
        }.bind(this);

        dom(window).on('resize', this.handler);
    },

    update(size) {
        this.setSize(size);
    },

    unbind() {
        dom(window).off('resize', this.handler);
    },

    setSize(size) {
        var innerWidth = window.innerWidth;
        this.el.style.minHeight = size[1] * innerWidth / size[0] + 'px';
    }

}
