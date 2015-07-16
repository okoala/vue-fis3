/**
 * 检测浏览器webp
 * 原理：加载一张webp格式的base64图片，如果可以正常识别则说明浏览器支持webp
 *
 * @return {[type]} [description]
 */
(function() {
    if (!window.localStorage || typeof localStorage !== 'object') return;

    var name = 'webp';
    if (!localStorage.getItem(name) || (localStorage.getItem(name) !== 'available' && localStorage.getItem(name) !== 'disable')) {
        var img = document.createElement('img');

        img.onload = function () {
            if (img.width == 1) {
                // 写入localstorage
                try {localStorage.setItem(name, 'available');} catch (e) {}

                window.isSupportWebp = true;
            } else {
                window.isSupportWebp = false;
            }
        };

        img.onerror = function () {
            try {localStorage.setItem(name, 'disable');} catch (e) {}
            window.isSupportWebp = false;
        };

        img.src = 'data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA==';
    } else {
        if (localStorage.getItem(name) === 'available') {
            window.isSupportWebp = true;
        } else if (localStorage.getItem(name) === 'disable') {
            window.isSupportWebp = false;
        }
    }
})();
