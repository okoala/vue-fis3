'use strict';

import Vue from 'vue';

const _ = Vue.util;

let toString = Object.prototype.toString,
    join = function() {
        return this && this.length ? Array.prototype.join.apply(this, arguments) : '';
    };

let getType = function(o) {
    let _t = typeof o;
    let result;

    if (_t == 'object') {
        if (o == null) result = 'null';
        else result = Object.prototype.toString.call(o).slice(8,-1);
    } else {
        result = _t;
    }

    return result.toLowerCase();

}

let getStyle = function(el, styleName) {
    if (el.style[styleName]) {
        return el.style[styleName];
    } else if (el.currentStyle) {
        return el.currentStyle[styleName];
    } else {
        return window.getComputedStyle(el, null)[styleName];
    }
}

let getStyleNum = function(el, styleName) {
    return parseInt(getStyle(el, styleName).replace(/px|pt|em/ig,''));
}

let setStyle = function(el, obj) {
    if (getType(obj) === 'object') {
        for (let s in obj) {
            let cssArrt = s.split('-');
            for (let i = 1; i < cssArrt.length; i++) {
                cssArrt[i] = cssArrt[i].replace(cssArrt[i].charAt(0), cssArrt[i].charAt(0).toUpperCase());
            }
            let cssArrtNew = cssArrt.join('');
            el.style[cssArrtNew] = obj[s];
        }
    } else {
        if (getType(obj) === 'string') {
            el.style.cssText = obj;
        }
    }
}

let getSize = function(el) {
    if (getStyle(el, 'display') != 'none' && (el.parentNode && el.parentNode.nodeType != 11)) {
        return {
            width: el.offsetWidth || getStyleNum(el, 'width'),
            height: el.offsetHeight || getStyleNum(el, 'height')
        };
    } else {
        document.body.appendChild(el);
    }

    let _newCss = {
        display: '',
        position: 'absolute',
        left: -9999,
        visibility: 'hidden'
    };

    let _oldCss = {};

    for (let i in _newCss) {
        _oldCss[i] = getStyle(el, i);
    }

    setStyle(el, _newCss);

    let width = el.clientWidth || getStyleNum(el, 'width');
    let height = el.clientHeight || getStyleNum(el, 'height');

    for (let j in _oldCss) {
        setStyle(el, _oldCss);
    }

    return { width, height };
}

class Dom {
    constructor(el) {
        if ('[object String]' == toString.call(el) && el.match(/^\s*\</)) {
            let div = document.createElement('div');
            div.innerHTML = el;
            this.$el = div.firstChild;
        } else {
            if ('[object String]' != toString.call(el) || el.match(/^\s*\</)) {
                this.$el = el;
            } else {
                this.$el = document.querySelector(el);
            }
        }
    }

    children() {
        this.$el = this.$el.children;
        return this;
    }

    /**
     * 插入节点
     *
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    append(el) {
        // 如果el是一个dom实例的话
        if (el instanceof Dom) el = el.$el;

        if (typeof el === 'string') {
            let _el = document.createElement('div');
            _el.innerHTML = el;
            this.$el.appendChild(_el.children[0]);
        } else {
            this.$el.appendChild(el);
        }

        return this;
    }

    // Todo
    hasClass(className) {

    }

    /**
     * 添加class
     *
     * @param {[type]} el [description]
     */
    addClass(className) {
        let fn = function(_el) {
            // 过滤重复的类
            let classList = join.call(_el.classList, '|').replace(className, '').split('|');
            classList.push(className);
            _el.setAttribute('class', join.call(classList, ' '));
        }

        if (this.$el) {
            if (this.$el.length) {
                Array.prototype.slice.call(this.$el).forEach(function(_el) {
                    fn(_el);
                });
            } else {
                fn(this.$el);
            }
        }

        return this;
    }

    /**
     * 删除class
     *
     * @param  {[type]} el [description]
     * @return {[type]}    [description]
     */
    removeClass(className) {
        let fn = function(_el) {
            let classList = join.call(_el.classList, '|').replace(className, '').split('|');
            _el.setAttribute('class', join.call(classList, ' '));
        }

        if (this.$el) {
            if (this.$el.length) {
                Array.prototype.slice.call(this.$el).forEach(function(_el) {
                    fn(_el);
                });
            } else {
                fn(this.$el);
            }
        }

        return this;
    }

    /**
     * 删除节点
     *
     * @return {[type]} [description]
     */
    remove() {
        let fn = function(_el) {
            let el = _el.parentNode;
            el.removeChild(_el);
        }

        if (this.$el) {
            if (this.$el.length) {
                Array.prototype.slice.call(this.$el).forEach(function(_el) {
                    fn(_el);
                });
            } else {
                fn(this.$el);
            }
        }

        return this;
    }

    /**
     * 获取data
     *
     * @param  {[type]} key   [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    data(key, value) {
        if (key && value) {
            this.$el.setAttribute('data-' + key, value);

            return this;
        } else if (key) {
            return this.$el.getAttribute('data-' + key);
        } else {
            return this.$el.dataset;
        }
    }

    on(type, fn) {
        this.$el.addEventListener(type, fn, false);

        return this;
    }

    off(type, fn) {
        this.$el.removeEventListener(type, fn);

        return this;
    }

    trigger(type) {
        let evObj;

        if (document.createEvent) {
            setTimeout(() => {
                evObj = document.createEvent("MouseEvents");
                evObj.initEvent(type, true, true);
                this.$el.dispatchEvent(evObj);
            }, 0);
        } else {
            setTimeout(() => {
                if (document.createEventObject) {
                    evObj = document.createEventObject();
                    evObj.cancelBubble = true;
                    this.$el.fireEvent("on" + type, evObj);
                }
            }, 0);
        }
    }

    attr(attr) {
        return _.attr(this.$el, attr);
    }

    width(value) {
        if (value != null) {
            this.$el.style.width = value;
        } else {
            return getSize(this.$el).width;
        }
    }

    height(value) {
        if (value != null) {
            this.$el.style.height = value;
        } else {
            return getSize(this.$el).height;
        }
    }

    matchNode(el) {
        let current;
        let isMatch = false;

        if (this.$el === el) isMatch = true;
        else {
            let parentNode = this.$el.parentNode;

            if (!parentNode) return false;

            this.$el = this.$el.parentNode;
            return this.matchNode(el);
        }

        return isMatch;
    }

    // todo
    closest() {

    }

    parent() {
        return new Dom(this.$el.parentNode || this.$el);
    }

    find(el) {
        return new Dom(this.$el.querySelector(el));
    }

    is(str) {
        let match;

        if (match = /^\.(.*)/.exec(str)) {
            let className = match[1];
            let classNameStr = join.call(this.$el.classList, '|');

            if (classNameStr.indexOf(className) > -1) return true;
        } else if (match = /^#(.*)/.test(str)) {
            let id = match[1];
            if (this.$el.id === id) return true;
        }

        return false;
    }
}

export default function(el) {
    return el instanceof Dom ? el : new Dom(el);
}
