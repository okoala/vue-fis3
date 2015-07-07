var config = require('./config');
// 利用package.json文件定义项目名和版本
var meta = require('./package.json');

var plugins = {
    define : require('./build/fis/postprocessor/define.js'),
    frameworkConf : require('./build/fis/postpackager/framework-conf.js')
};

/****************环境变量*****************/
fis
    // 排除指定目录
    .set('project.files', ['**', '.**', '.**/**'])
    .set('project.ignore', ['node_modules/**', '**/_*.scss', '.docs/**', '.dist/**', '.git/**', '.svn/**', 'fis-conf.js'])
    // 把scss映射为css
    .set('project.ext', {
        scss : 'css'
    })
    .set('name', meta.name)
    .set('version', meta.version)
    .set('urlPrefix', config.urlPrefix)
    .set('framework', {
        cache: config.LSCache, //开启localstorage缓存
        combo: config.combo, // 开启合并
        comboPattern: config.comboPattern,
        urlPattern: config.urlPattern, // 静态资源加载路径模式
        urlPrefix: config.urlPrefix // 静态资源加载路径模式
    });

// 测试环境屏蔽Hash
if (config.env === 'development') {
    fis.set('framework.useHash', false);
} else {
    fis.set('framework.useHash', true);
}

// 开启模块化包装amd，cmd
fis.hook('module', {
    mode: 'auto'
});

/****************语言编译*****************/
fis

    .match(/(.*\.js)$/i, {
        // 设置js文件为babel解析，支持es6的写法。
        parser: fis.plugin('babel'),

        // 自己的define包装
        postprocessor: plugins.define
    })

    .match(/.*scss$/i, {
        rExt: '.css', // from .scss to .css
        parser: fis.plugin('sass3', {
            //fis-parser-sass option
        })
    })

    .match('::package', {
        // npm install [-g] fis3-postpackager-loader
        // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
        spriter: fis.plugin('csssprites', {
            htmlUseSprite: true,
            layout: 'matrix',
            margin: '15',
            styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig
        }),

        // 主要框架的逻辑
        postpackager: plugins.frameworkConf
    });


/*************************目录规范*****************************/
fis
    // 默认情况下不添加hash
    .match('**', {
        useHash: false,
        release: false
    })

    .match(/^\/components\/(.*)$/i, {
        // components下开启同名依赖，通常是为了自动加载样式文件。
        useSameNameRequire: true
    })

    .match(/^\/components\/(.*)$/i, {
        url : '${urlPrefix}/c/${name}/${version}/$1',
        release : '/public/c/${name}/${version}/$1'
    })
    // components相关
    .match(/^\/components\/(.*\.tpl)$/i, {
        useCache: false,
        isViews: true,
    })
    .match(/^\/components\/(.*\.js)$/i, {
        moduleId: '${name}/${version}/$1',
        id : '${name}/${version}/$1',
        isMod : true,
        isES6 : true,
        isComponent : true,
        useHash : false,
        url : '${urlPrefix}/c/${name}/${version}/$1',
        release : '/public/c/${name}/${version}/$1'
    })
    .match(/^\/components\/(.*)\.(scss|css)$/i, {
        moduleId: '${name}/${version}/$1.css',
        id : '${name}/${version}/$1.css',
        isMod : true,
        useSprite : true,
        useHash : false,
        url : '${urlPrefix}/c/${name}/${version}/$1.$2',
        release : '/public/c/${name}/${version}/$1.$2'
    })

    // client文件夹相关
    .match(/^\/client\/(.*)$/, {
        useSprite : true,
        isViews : true,
        url : '${urlPrefix}/${name}/${version}/$1',
        release : '/public/${name}/${version}/$1'
    })
    .match(/^\/client\/(.*\.(?:html?|js))$/, {
        useCache: false,
        isViews: true,
        isES6: false,
        url : '${urlPrefix}/${name}/${version}/$1',
        release : '/public/${name}/${version}/$1'
    })
    .match(/^\/client\/static\/(.*)$/, {
        url : '/static/$1',
        release : '/static/$1'
    })

    // DOC 文件夹不发布
    .match("docs/**", {
        release: false
    })

    // tmp文件夹
    .match(/^\/\.tmp\/(.*\.js)$/i, {
        moduleId : '$1',
        id : '$1',
        isBaseMod: true,
        isMod : true,
        useHash : false,
        url : '${urlPrefix}/c/$1',
        release : '/public/c/$1'
    })

    // release一下，不然在postpackager无法获取到数据
    .match('package.json', {
        release : 'package.json'
    })

    .match('map.json', {
        release: false
    });


/**********************测试/生产环境下*****************/
fis
    .media('prod')

    .match(/\.nvmrc$/, {
        release : '.nvmrc'
    })

    .match(/^\/client\/(.*)$/, {
        useHash: true
    })

    .match('*.(html|tpl)', {
        useHash: false,

        // 指定压缩插件 fis-optimizer-html-minifier
        optimizer: fis.plugin('html-minifier', {
            // fis直接将此配置传递给html-minfier模块
            // 因此相关配置项请直接参阅html-minifier文档
            removeComments: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true
        })
    })

    .match('*.js', {
        // 指定压缩插件 fis-optimizer-uglify-js
        optimizer: fis.plugin('uglify-js', {
            // option of uglify-js
        }),

        lint: fis.plugin('jshint')
    })

    .match('*.{css,scss}', {
        optimizer: fis.plugin('clean-css')
    })

    .match('*.png', {
        optimizer: fis.plugin('png-compressor')
    })

    // server文件不编译
    .match(/^\/config\/(.*)$/, {
        useCompile: false,
        release : '/config/$1'
    })

    // server文件不编译
    .match(/^\/server\/(.*)$/, {
        useCompile: false,
        release : '/server/$1'
    });
