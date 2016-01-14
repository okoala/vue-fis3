import Vue from 'vue'
import dom from './dom'

export function isEmptyObject (obj) {
  var name
  for ( name in obj ) {
    return false
  }
  return true
}

export function setDocTitle (title) {
  document.title = title

  // 部分手机不能动态设置title，需要通过hack的手段处理~~
  if ((/iphone|ipad/gi).test(window.navigator.appVersion)) {
    let iframe = document.createElement('iframe')
    iframe.src = '/favicon.ico'
    iframe.frameBorder = 'no'
    iframe.style.width="0"
    iframe.style.height="0"
    let $iframe = dom(iframe)
    let fn = function() {
      setTimeout(() => {
        $iframe.off('load', fn).remove()
      }, 0)
    };
    $iframe.on('load', fn)
    document.body.appendChild(iframe)
  }
}

export * from './dom'
export function noop () {}
export * from './snabbt'
export * from './envi'
export * from './uuid'

