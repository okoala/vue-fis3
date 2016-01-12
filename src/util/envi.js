'use strict';

let mobileCache = {};
let browserCache = {};

function getMobileInfo(currentMobile) {
    let mobileMap = {
            iphone: 'IOS',
            ipad: 'IOS',
            apad: 'Android',
            aphone: 'Android',
            androidtv: 'Android'
        };
    let ua = navigator.userAgent;

    mobileCache.android = false;
    mobileCache.ios = false;
    mobileCache.iphone = false;
    mobileCache.ipad = false;
    mobileCache.aphone = false;
    mobileCache.apad = false;
    mobileCache.androidtv = false;

    let android = ua.match(/(Android)\s+([\d.]+)/);
    let wp = ua.match(/wp|WP/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    let iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    if (currentMobile) {
        mobileCache.name = mobileMap[currentMobile] || currentMobile;
    } else {
        if (android) {
            mobileCache.name = 'Android';
        } else if (wp) {
            mobileCache.name = 'WP';
        }

        if (ipad || iphone) {
            mobileCache.name = 'IOS';
        }

        if (ipad) {
            mobileCache.ipad = true;
        }

        if (iphone) {
            mobileCache.iphone = true;
        }

        if (android) {
            mobileCache.version = android[2] || '';
        }

        if (ipad) {
            mobileCache.version = ipad[2] ? ipad[2].replace(/_/g, '.') : '';
        }

        if (iphone) {
            mobileCache.version = iphone[2] ? iphone[2].replace(/_/g, '.') : '';
        }

        mobileCache.android = mobileCache.name && 'android' === mobileCache.name.toLowerCase();
        mobileCache.ios = mobileCache.name && 'ios' === mobileCache.name.toLowerCase();
        mobileCache.wp = mobileCache.name && 'wp' === mobileCache.name.toLowerCase();

        if (!mobileCache.name) mobileCache.name = '';

        return mobileCache;
    }
}

function getBrowserInfo() {
    let ua = navigator.userAgent;
    let webkit = ua.match(/WebKit\/([\d.]+)/);
    let uc = ua.match(/UC[a-zA-Z]*?\/([\d.]+)/);

    browserCache.version = null;
    browserCache.uc = !!uc;
    browserCache.safari = !(!ua.match(/(iPhone|iPad)/) || !ua.match(/AppleWebKit/));
    browserCache.webkit = !!webkit;

    return browserCache;
}

export default {
    // detect: detect,
    os: getMobileInfo,
    browser: getBrowserInfo
    // network: network
}
