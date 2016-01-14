import { setDocTitle } from '../util'

export default function configRouter (router) {
  router.map({
    '/': {
      component: require('../views/Home.vue'),
      title: '首页'
    },
    '/:rssId': {
      component: require('../views/App.vue')
    },
    '*': {
      component: require('../views/NotFound.vue')
    }
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
