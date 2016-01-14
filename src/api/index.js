import Vue from 'vue'
import VueResource from 'vue-resource'

// 使用resource插件
Vue.use(VueResource)

// 设置post的为form形式。
Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true

Vue.http.interceptors.push({
  request (request) {
    // request.params.userId = store.state.user.userId || 10000013
    return request
  },
  response (response) {
    const code = response.data.code
    const msg  = response.data.message || response.data.msg
    // 如果为用户为登陆就跳到首页
    if (code == '408') {
      router.go('/login')
      return
    } else if (code == '200') {
      return response
    } else if (code != '1009' &&
      code != '1000' &&
      msg.indexOf('字段为空') == -1 &&
      msg.indexOf('参数为空') == -1 &&
      msg.indexOf('用户ID') == -1 &&
      msg.indexOf('用户id') == -1) { // 不显示参数错误和非绑定手机号的错误的提示
      Tips.warn(msg)
    }
  }
})

let mainCache = Vue.cache('mainCache', {
  storageMode: 'localStorage', // 使用localstorage
  deleteOnExpire: 'aggressive', // 过期后立即删除数据
  recycleFreq: 60 * 1000, // 循环检测频率
  maxAge: 60 * 60 * 1000 // 缓存一小时
})

// 使用方式
//
// restApi.xxxxx.get(params);
// restApi.xxxxx.save(params);
// restApi.xxxxx.query(params);
// restApi.xxxxx.remove(params);
// restApi.xxxxx.delete(params);
//
//
// 例如：
// restApi.coupon.get()
//     .success(function(data, status, request) {
//         console.log('true');
//     })
//     .error(function(data, status, error) {
//         console.log('error', error);
//     });

export default {
  // 获取推荐内容
  recom : Vue.resource('/api/Like/Reader/Recom', { cache: mainCache }),
  // 获取36kr的内容
  rss: Vue.resource('/api/Like/Reader/GetContent/site_id/:id', { cache: mainCache })
}
