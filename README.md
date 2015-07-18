# fis3-vue

这个demo集成了目前前端开发比较流行的开源工具。
适用用于简单的前后端分离，移动端开发。

开发关键字：**MVVM**， **模块化**，**ES6**，**Combo**，**自动化部署**

------

包括：

  * Node.js
  * Express
  * Fis3
  * Vue
  * Sass
  * PM2
  * Gulp
  * Babel
  * Webpack
  * BrowserSync


界面和样式是直接copy腾讯CDC的idesign.qq.com

### 截图

![](http://i1.tietuku.com/8f4dd53803c48148.png)

![](http://i1.tietuku.com/50a4afbf50a549fc.png)

------

[点击查看demo](http://idesign.kulife.net/)

------

#### 快速开始

    // 安装fis及相关插件
    npm i -g fis3 (需要3.0.7以上)
    npm i -g fis3-hook-module
    npm i -g fis-parser-sass3
    npm i -g fis-parser-babel2
    npm i -g fis-optimizer-uglify-js
    npm i -g fis-optimizer-html-minifier
    npm i -g fis-optimizer-clean-css

    // 其他编译工具
    npm i -g cwebp-bin
    npm i -g eslint
    npm i -g babel-eslint

    // 其他构建工具
    npm i -g gulp
    npm i -g webpack

    // node调试工具
    npm i -g node-dev
    npm i -g node-inspector (如果在iojs环境安装失败，可以安装版本@0.9.2)

    // 性能调优工具, 下载安装。
    Mac: http://profiler.oss-cn-hangzhou.aliyuncs.com/node-profiler-v0.12.6.pkg
    Win: http://profiler.oss-cn-hangzhou.aliyuncs.com/node-profiler-v0.12.6-x64.msi
    npm run profiler

    // 类似livereload的工具
    npm i -g browser-sync
    npm i -g browser-sync-vue

    // 发布工具
    npm i -g pm2

    // 下载项目
    git clone https://github.com/okoala/fis3-vue.git

    // 运行项目
    cd fis3-vue
    npm install
    npm run dev

    // 需要预先配置好发布信息
    // 初始化服务器环境
    npm run setup

    // 发布项目
    npm run deploy

    // 回滚操作
    npm run revert

    // 服务器启动/重启服务
    npm run start

------

#### 目录结构

![](http://i1.tietuku.com/c13327378bc09699.png)

-----
#### 项目说明
    1. 无分号，2Tab缩进.

    2. 通过package.json的components字段，可以添加指定的库。例如：
      "components": [
        "vue",
        "vue-resource",
        "vue-view"
      ]
      说明指定vue,vue-resource,vue-view,这三个为前端库。
      使用的时候可以直接require('vue'),require('vue-resource')。
      当然你需要确认库是否已经在node_modules里了。

    3. 通过配置config/config.json可以配置pm2相关设置，发布相关也在这个配置文件中.

    4. 可以把图片命名为xxx.webp.jpg或xxx.webp.png
      这样可以同时生成webp和(png, jpg)两个版本的图片, 然后通过filter webp进行自动切换.

    5. 新手可以使用我的编辑器配置:
      Sublime Text 3: https://github.com/okoala/sublime-bak.git
      Atom: https://github.com/okoala/atom-bak.git
      已经集成目前比较流行的插件~~项目解压覆盖到对应的文件, 然后重启编辑器即可.


------
