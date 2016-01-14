/**
 * 水平方向移动
 *
 */
import Vue from 'vue';
import snabbt from '../snabbt'
import dom from '../dom'

export default {
  beforeEnter(el) {

  },
  enter(el, done) {
    snabbt(el, {
      fromPosition: ['-100%', 0, 0],
      position: [0, 0, 0],
      duration: 300,
      easing: 'linear',
      complete() {
        done()
      }
    })
  },
  leave(el, done) {
    done()
  }
}
