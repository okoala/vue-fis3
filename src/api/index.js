import Vue from 'vue'
import VueResource from 'vue-resource'

// 使用resource插件
Vue.use(VueResource)

// 设置post的为form形式。
Vue.http.options.emulateJSON = true
Vue.http.options.crossOrigin = true

Vue.http.interceptors.push({
  request (request) {
    return request
  },
  response (response) {
    return response
  }
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
  recom : Vue.resource('/api/Like/Reader/Recom'),
  // 获取36kr的内容
  rss: Vue.resource('/api/Like/Reader/GetContent/site_id/:id')
}
