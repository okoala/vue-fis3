import dom from '../dom'

export default {
  bind(size) {
    this.size = size
    this.handler = () => {
      this.setSize(this.size)
    }

    dom(window).on('resize', this.handler)
  },
  update(size) {
    this.setSize(size)
  },
  unbind() {
    dom(window).off('resize', this.handler)
  },
  setSize(size) {
    const innerWidth = window.innerWidth
    this.el.style.minHeight = size[1] * innerWidth / size[0] + 'px'
  }
}
