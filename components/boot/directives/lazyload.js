'use strict';

import { dom } from 'util';

export default {
    /**
     * 绑定节点懒加载
     *
     * @return {[type]} [description]
     */
    bind() {
        try {
            const timeout = parseInt(this.key) || 2000;
            this.url = dom(this.el).data('src');

            this.loadHandler = function() {
                if (this._isLoaded || document.body.scrollTop >= 500) {
                    this.imgload();
                }
            }.bind(this);

            dom(window).on('scroll', this.loadHandler);
            this.timer = setTimeout(this.imgload.bind(this), timeout);
        } catch(e) {
            this.el.src = dom(this.el).data('src');
        }
    },

    /**
     * 图片加载
     *
     * @return {[type]} [description]
     */
    imgload() {
        if (this.url && this.el) {
            this.el.url = this.url;
            this._isLoaded = true;
            this.unbind();
        }
    },

    update() {},

    /**
     * 取消绑定
     *
     * @return {[type]} [description]
     */
    unbind() {
        dom(window).off('scroll', this.loadHandler);
        clearTimeout(this.timer);
    }
}
