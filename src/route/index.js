import { setDocTitle } from '../util/index'

export default function configRouter (router) {
  router.map({
    '/': {
      component (resolve) {
        require.async(['../views/App.vue'], resolve)
      },
      title: '首页',
      subRoutes: {
        '/:rssId': {
          name: 'rss',
          component (resolve) {
            require.async(['../views/RSS.vue'], resolve)
          },
          title: 'RSS'
        }
      }
    },
    '*': {
      component (resolve) {
        require.async(['../views/NotFound.vue'], resolve)
      }
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
