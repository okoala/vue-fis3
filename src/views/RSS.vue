<template>
<div class="p-index">
  <c-header></c-header>
  <div class="container">
    <div class="feed-sidebar">
      <div class="feed-sidebar-header">
        <h2>订阅源</h2>
      </div>
      <div class="feed-sidebar-list">
        <ul>
          <li v-for="item in rss" :class="{'current': item.isActive}" @click="chooseRss(item, $index)">
            <span class="feed-logo">
              <img :src="item.image" :alt="item.id" />
            </span>
            <span class="feed-name">{{item.name}}</span>
            <a class="feed-url" :href="item.url" :title="item.name" target="_blank">
              <i class="g-icon icon-link"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="feed-container">
      <div class="feed-container-header">
        <h2>{{currentRss.desc}}</h2>
      </div>
      <div class="feed-items-container">
        <div v-for="rssItem in currentRss.data.items" v-show="rssItem.data.length">
            <div class="feed-items-timeline">{{rssItem.dataName}}</div>
            <div class="feed-item" v-for="item in rssItem.data">
              <div class="feed-thumb" :style="'background-image: url('+item.thumb+')'">
                <a :href="item.url" target="_blank"><img :src="item.thumb" alt="Flux – Joseph a avoué"></a>
              </div>
              <div class="feed-describe">
                <h2 class="feed-title"><a :href="item.url" target="_blank">{{title}}</a></h2>
                <p class="feed-description">{{description}}</p>
                <div class="feed-item-info">
                  <div class="feed-item-count">
                    <span class="feed-fav">
                      <i class="g-icon icon-fav favHandler"></i>
                      <i class="feed-fav-total">{{faved}}</i>
                    </span>
                    <span class="feed-view">
                      <i class="g-icon icon-viewed"></i>
                      <i class="feed-view-total">{{click}}</i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</div>

</template>
<script>
import restApi from '../api/index'
import cHeader from '../components/Header.vue'

export default {
  data () {
    return {
      isIndex: true,
      rss: [{
        id: 0,
        name: '小云精选',
        url: '/',
        image: __uri('../styles/img/0.png'),
        desc: '订阅内容',
        isActive: false
      }, {
        id: 14,
        name: 'Dribbble',
        url: 'https://dribbble.com',
        image: __uri('../styles/img/14.png'),
        desc: 'Dribbble - 优秀设计师的聚集地',
        isActive: false
      }, {
        id: 34,
        name: 'UI中国',
        url: 'http://www.ui.cn/',
        image: __uri('../styles/img/34.png'),
        desc: 'UI中国 - 国内最专业的UI设计平台',
        isActive: false
      }],
      currentRss: {
        data: {
          current_page: null,
          items: [],
          page_count: null
        }
      }
    }
  },

  components: { cHeader },

  // 禁止服用模块，每次调用都要走完成流程。
  route: {
    canReuse: false
  },

  ready () {
    let params = this.$route.params
    let rssId = params && params.rssId ? params.rssId : 'rss_0'

    rssId = parseInt(rssId.replace('rss_', ''), 10)

    let setData = function (data) {
      this.currentRss = this.rss.filter(item => {
        /* eslint eqeqeq:0 */
        return item.id == rssId
      })

      if (this.currentRss) {
        this.currentRss = this.currentRss[0]
      } else {
        alert('参数错误')
        return
      }

      data.items = this._mapFeed(this._mapHost(data.items))

      this.currentRss.isActive = true
      this.currentRss.data = data
    }

    if (rssId === 0) {
      restApi.recom.get()
        .then(res => {
          setData.call(this, res.data.data)
        })
        .catch(err => {

        })
    } else {
      restApi.rss.get({
          id: rssId
        })
        .then(res => {
          setData.call(this, res.data.data)
        })
        .catch(err => {

        })
    }
  },
  methods: {
    _mapHost (data) {
      const originalHost = 'http://idesign.qq.com'
      data.forEach(item => {
        item.thumb = originalHost + item.thumb
        item.thumb_src = originalHost + item.thumb_src
        item.url = originalHost + item.url
      })
      return data
    },
    _mapFeed (data) {
      const t = new Date()
      const year = t.getFullYear()
      const month = ('00000' + (t.getMonth() + 1)).substr(('00000' + (t.getMonth() + 1)).length - 2)
      const today = ('00000' + t.getDate()).substr(('00000' + t.getDate()).length - 2)
      const yestoday = ('00000' + (t.getDate() - 1)).substr(('00000' + (t.getDate() - 1)).length - 2)

      const tDate = year + '-' + month + '-' + today
      const yDate = year + '-' + month + '-' + yestoday
      const bDate = year + '-' + month + '-' + (yestoday - 1)

      let todayData = {
        dataName: '今天',
        dateTime: tDate,
        data: []
      }

      let yestodayData = {
        dataName: '昨天',
        dateTime: yDate,
        data: []
      }

      let beforeData = {
        dataName: '以前',
        dateTime: bDate,
        data: []
      }

      data.forEach((item, index) => {
        let _date
        _date = item.create_on && item.create_on.substring(0, 10) ? item.create_on.substring(0, 10) : bDate

        if (_date === tDate) {
          todayData.data.push(item)
        } else if (_date === yDate) {
          yestodayData.data.push(item)
        } else {
          beforeData.data.push(item)
        }
      })

      return [todayData, yestodayData, beforeData]
    },
    chooseRss (item, index) {
      const rssId = item.id
      this.$route.router.go({name: 'rss', params: {rssId: 'rss_' + rssId}})
    }
  }
}
</script>
<style lang='sass'>
@import '../styles/css/base/variable';

.feed-sidebar-list .feed-default-logo,
.feed-sidebar-list .feed-logo,
.feed-sidebar-list .feed-url {
  height: 30px;
  margin-top: 14px;
  width: 30px;
  text-align: center;
}

.feed-sidebar-list .feed-name,
.feed-source-desp,
.feed-source-title {
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  word-wrap: normal;
}

.feed-sidebar {
  float: left;
  width: 298px;
  border: 1px solid #ececec;
  border-bottom: 1px solid #cfcfcf;
  background-color: #fff;
}

.feed-sidebar-header {
  height: 30px;
  padding: 15px 20px;
}

.feed-sidebar-header h2 {
  float: left;
  line-height: 30px;
  font-size: 20px;
  font-weight: 500;
}

.feed-sidebar-list {
  padding: 11px 0 10px;
  border-bottom: 1px solid #ececec;
}

.feed-sidebar-list li {
  position: relative;
  height: 58px;
  margin-top: -1px;
  padding: 0 20px;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  font-size: 14px;
  cursor: pointer;
  vertical-align: top;
}

.feed-sidebar-list .current,.feed-sidebar-list .current:hover {
  border-color: #f8d4bc;
  background-color: #fff5ee;
  color: #f60;
}

.feed-sidebar-list .feed-logo {
  float: left;
  line-height: 30px;
  overflow: hidden;
  font-size: 0;
}

.feed-sidebar-list .feed-logo.choice {
  background-image: url(images/sidebar-icons.png);
  background-image: -webkit-image-set(url(images/sidebar-icons.png) 1x,url(images/sidebar-icons-2x.png) 2x);
  background-position: 0 0;
}

.feed-sidebar-list .feed-logo.default {
  background-image: url(images/sidebar-icons.png);
  background-image: -webkit-image-set(url(images/sidebar-icons.png) 1x,url(images/sidebar-icons-2x.png) 2x);
  background-position: 0 -30px;
}

.feed-sidebar-list .feed-default-logo {
  float: left;
  line-height: 30px;
  overflow: hidden;
  font-size: 0;
  background-image: url(images/sidebar-icons.png);
  background-image: -webkit-image-set(url(images/sidebar-icons.png) 1x,url(images/sidebar-icons-2x.png) 2x);
}

.feed-sidebar-list .feed-choice {
  background-position: 0 0;
}

.feed-sidebar-list .feed-uichina {
  background-position: 0 -60px;
}

.feed-sidebar-list .feed-dribbble {
  background-position: 0 -90px;
}

.feed-sidebar-list .feed-awwwards {
  background-position: 0 -120px;
}

.feed-sidebar-list .feed-huxiu {
  background-position: 0 -150px;
}

.feed-sidebar-list .feed-behance {
  background-position: 0 -180px;
}

.feed-sidebar-list .feed-uisdc {
  background-position: 0 -210px;
}

.feed-sidebar-list .feed-logo img {
  max-width: 30px;
  max-height: 30px;
  vertical-align: middle;
}

.feed-sidebar-list .feed-name {
  float: left;
  margin-left: 10px;
  line-height: 58px;
  max-width: 150px;
  overflow: hidden;
}

.feed-sidebar-list .feed-update-count {
  float: right;
  line-height: 58px;
  padding-left: 8px;
  font-size: 12px;
  color: #666;
}

.feed-sidebar-add.on,
.feed-sidebar-add:hover,
.feed-sidebar-list li:hover,
.feed-sidebar-list li:hover .feed-update-count {
  color: #f60;
}

.feed-sidebar-list .feed-url {
  float: right;
  margin-right: -8px;
  overflow: hidden;
  visibility: hidden;
  line-height: 30px;
}

.feed-sidebar-list .icon-link {
  visibility: hidden;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  background-position: -14px -6px;
}

.feed-sidebar-list .current .icon-link,
.feed-sidebar-list li:hover .icon-link {
  visibility: visible;
}

.feed-sidebar-add {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0;
  vertical-align: middle;
  font-size: 14px;
  border: 0;
  text-align: left;
  outline: 0;
  overflow: hidden;
  background-color: transparent;
}

.feed-sidebar-add .icon-feed-add {
  float: left;
  width: 30px;
  height: 30px;
  margin-left: 20px;
  margin-top: 15px;
  margin-right: 10px;
  background-image: url(images/sidebar-icons.png);
  background-image: -webkit-image-set(url(images/sidebar-icons.png) 1x,url(images/sidebar-icons-2x.png) 2x);
  background-position: 0 -240px;
  overflow: hidden;
}

.feed-chrome-app {
  display: block;
  height: 44px;
  line-height: 44px;
  margin: 20px;
  padding: 0 20px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  font-size: 14px;
  text-align: center;
  -webkit-transition: all .2s ease-in;
  -moz-transition: all .2s ease-in;
  transition: all .2s ease-in;
}

.feed-chrome-app .icon-chrome-store {
  float: left;
  width: 30px;
  height: 30px;
  margin-top: 7px;
  margin-right: 5px;
  background-image: url(images/sidebar-icons.png);
  background-image: -webkit-image-set(url(images/sidebar-icons.png) 1x,url(images/sidebar-icons-2x.png) 2x);
  background-position: 0 -270px;
}

.feed-chrome-app:hover {
  color: #f60;
  border-color: #f60;
}

.feed-container {
  margin-left: 320px;
  margin-bottom: 0;
}

.feed-source {
  padding: 10px 20px;
}

.feed-source-header {
  height: 38px;
  padding: 10px;
  border-bottom: 1px solid #ececec;
  background: url(/static/images/icons/icon-source-marker.png)left center no-repeat;
  background-image: -webkit-image-set(url(/static/images/icons/icon-source-marker.png) 1x,url(/static/images/icons/icon-source-marker-2x.png) 2x);
}

.feed-source-header h2 {
  float: left;
  line-height: 38px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
  font-weight: 500;
}

.feed-source-header span {
  float: left;
  line-height: 38px;
  font-size: 14px;
  color: #888;
}

.feed-source-list {
  padding: 5px 0;
  overflow: hidden;
}

.feed-source-item {
  float: left;
  width: 33.3%;
  height: 86px;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: hidden;
}

.feed-source-icon {
  float: left;
  width: 86px;
  height: 86px;
  background-color: #f6f6f6;
  overflow: hidden;
}

.feed-source-icon img {
  width: 86px;
  height: 86px;
  vertical-align: top;
}

.feed-source-info {
  position: relative;
  height: 86px;
  overflow: hidden;
  margin-left: 100px;
}

.feed-source-title {
  height: 28px;
  margin-top: -4px;
  line-height: 28px;
  font-size: 14px;
  font-weight: 500;
  color: #222;
  overflow: hidden;
}

.feed-source-desp {
  margin-top: 5px;
  line-height: 26px;
  font-size: 12px;
  color: #8c8c8c;
  width: 80%;
  overflow: hidden;
}

.feed-source-control {
  position: absolute;
  left: 0;
  bottom: -6px;
  height: 28px;
}

.feed-source-control a {
  float: left;
  line-height: 28px;
  color: #f60;
}

.feed-source-control .attention {
  float: left;
  line-height: 28px;
  color: #8c8c8c;
}

.feed-source-control .attention .icon-plus {
  margin-right: 3px;
}

@media screen and (max-width: 1301px) {
  .feed-source-item {
    width: 50%;
  }
}

@media screen and (max-width: 981px) {
  .feed-chrome-app,.feed-sidebar-add {
    font-size:0;
    text-indent: -99em;
  }

  .container {
    width: 752px;
  }

  .feed-sidebar {
    width: 68px;
  }

  .feed-sidebar-header {
    padding: 0;
    height: 60px;
    display: none;
  }

  .feed-sidebar-header h2 {
    display: none;
  }

  .feed-sidebar-list li {
    padding: 0;
  }

  .feed-sidebar-list li:hover .feed-update-count {
    color: #fff;
  }

  .feed-sidebar-list .feed-default-logo,.feed-sidebar-list .feed-logo {
    float: none;
    display: block;
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }

  .feed-sidebar-list .feed-name,.feed-sidebar-list .feed-url {
    display: none;
  }

  .feed-sidebar-list .feed-update-count {
    position: absolute;
    top: 8px;
    left: 36px;
    z-index: 10;
    min-width: 8px;
    height: 18px;
    line-height: 18px;
    padding: 0 5px;
    background-color: #f54139;
    border-radius: 9px;
    text-align: center;
    color: #fff;
  }

  .feed-container {
    margin-left: 90px;
  }

  .feed-chrome-app {
    margin: 20px 0;
    overflow: hidden;
  }

  .feed-chrome-app .icon-chrome-store {
    padding: 0;
    margin: 7px auto;
  }
}

@media only screen and (max-device-width: 621px) {
  .mobile-toolbar .feed-sidebar {
    position:relative;
    z-index: 1000;
    float: left;
    margin-left: 10px;
    margin-top: 6px;
    border: 0;
    background: 0 0;
  }

  .mobile-toolbar .feed-sidebar-header {
    display: block;
    position: relative;
    height: 30px;
    line-height: 30px;
  }

  .mobile-toolbar .feed-sidebar-header h2 {
    position: relative;
    display: block;
    line-height: 30px;
    font-size: 14px;
    font-weight: 500;
    color: #f60;
    max-width: 50%;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    word-wrap: normal;
  }

  .mobile-toolbar .feed-sidebar-header h2:after {
    position: absolute;
    content: "";
    top: 12px;
    right: -20px;
    width: 0;
    height: 0;
    border-width: 5px;
    border-style: solid;
    border-color: #bebebe transparent transparent;
  }

  .mobile-toolbar .feed-sidebar-list {
    position: absolute;
    left: 0;
    top: 32px;
    z-index: 3000;
    display: none;
    padding: 5px 0;
    border: 1px solid #e8e8e8;
    background-color: #fff;
  }

  .mobile-toolbar .feed-sidebar-list li {
    height: 28px;
    line-height: 28px;
    font-size: 14px;
  }

  .mobile-toolbar .feed-sidebar-list a {
    -webkit-tap-highlight-color: transparent;
  }

  .mobile-toolbar .feed-sidebar-list .current {
    background-color: transparent;
    border-color: transparent;
    color: #555;
  }

  .mobile-toolbar .feed-sidebar-list .feed-logo {
    display: none;
  }

  .mobile-toolbar .feed-sidebar-list .feed-name {
    display: block;
    height: 28px;
    margin-right: 10px;
    line-height: 28px;
  }

  .mobile-toolbar .feed-chrome-app,.mobile-toolbar .feed-sidebar-add {
    display: none;
  }

  .container {
    width: 100%;
  }

  .feed-container {
    margin-left: 0;
  }
}
</style>
