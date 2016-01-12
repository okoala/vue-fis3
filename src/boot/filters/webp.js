'use strict';

export default function(imgSrc) {
    return window.isSupportWebp && typeof imgSrc === 'string' ? imgSrc.replace(/(\.png)|(\.jpg)/i, '.webp') : imgSrc;
}
