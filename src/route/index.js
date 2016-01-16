import { setDocTitle } from '../util/index'

export default function configRouter (router) {
  router.map({
    '/': {
      component: require('../views/App.vue'),
      title: '首页',
      subRoutes: {
        '/:rssId': {
          name: 'rss',
          component: require('../views/RSS.vue'),
          title: 'RSS'
        }
      }
    },
    '*': {
      component: require('../views/NotFound.vue')
    }
  })

  router.redirect({
    // 重定向 / 到 /0
    '/': '/0',
  })

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  router.beforeEach((transition) => {
    setDocTitle(transition.to.title)
    transition.next()
  })
}
