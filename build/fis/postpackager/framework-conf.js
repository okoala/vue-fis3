'use strict';

/**
 * 读取json内容，加一个统一的错误处理
 * @param {String} content
 * @param {String} path
 * @returns {*}
 */
function readJSON(content, path) {
    try {
        return JSON.parse(content);
    } catch (e) {
        fis.log.error('invalid json file [' + path + '] : ' + e.message);
    }
}

/**
 * 为npm模块目录下的模块建立别名
 * @param {fis.file.File} packageFile
 * @param {Object} map 框架配置文件对象
 * @param {Object} ret 系统整理的文件对象
 */

function makeAlias(packageFile, map, ret) {
    if (packageFile && packageFile.exists()) {
        var json = readJSON(packageFile.getContent(), packageFile.subpath);

        json.components.forEach(function(name) {
            var alias = name;
            var file = ret.src['/.tmp/' + name + '.js'];
            map.alias[alias] = file.getId();
        });
    }
}

module.exports = function(ret, conf, settings, opt) {
    var map = fis.config.get('framework', {});
    var aliasConfig = map.alias || {};
    map.version = fis.config.get('version');
    map.name = fis.config.get('name');
    map.combo = map.combo || !!opt.pack;
    map.urlPattern = map.urlPattern || '/c/%s';
    map.comboPattern = map.comboPattern || '/??%s';
    map.hash = fis.util.md5(Date.now() + '-' + Math.random());
    map.alias = {};
    map.deps = {};
    makeAlias(ret.src['/package.json'], map, ret);

    fis.util.map(aliasConfig, function(name, subpath) {
        var file = ret.src['/' + subpath.replace(/^\//, '')];
        if (file) {
            map.alias[name] = file.getId();
        } else {
            map.alias[name] = subpath;
        }
    });

    var aliased = {};
    fis.util.map(map.alias, function(alias, id) {
        aliased[id] = alias;
    });

    var views = [];
    fis.util.map(ret.src, function(subpath, file) {
        var id = file.getId();
        if (file.isViews && file.isText()) {
            views.push(file);
        } else if (file.isMod && (file.isJsLike || file.isCssLike)) {
            if (file.isJsLike) {
                var match = file.subpath.match(/^\/components\/(.*?([^\/]+))\/\2\.(js|jsx)$/i);
                if (match && match[1] && !map.alias.hasOwnProperty(match[1])) {
                    // 对于c/模块目录下的模块和p/模块目录下的文件保持纯净~
                    var name = match[1].replace(/^p\//i, '').replace(/^c\//i, '');
                    map.alias[name] = id;
                }
            }
            if (file.requires.length) {
                map.deps[id] = file;
            }
        } else if (id in aliased) {
            if (file.requires.length) {
                map.deps[id] = file;
            }
        }
    });

    aliased = {};
    fis.util.map(map.alias, function(alias, id) {
        aliased[id] = alias;
    });

    fis.util.map(map.deps, function(id, file) {
        var deps = [];
        file.requires.forEach(function(depId) {
            if (map.alias.hasOwnProperty(depId)) {
                deps.push(depId);
            } else if (aliased.hasOwnProperty(depId)) {
                deps.push(aliased[depId]);
            } else if (ret.ids.hasOwnProperty(depId)) {
                deps.push(depId);
            } else {
                fis.log.warning('undefined module [' + depId + '] require from [' + file.subpath + ']');
            }
        });
        if (deps.length) {
            map.deps[id] = deps;
        } else {
            delete map.deps[id];
        }
    });

    if (map.cache) {
        var callback = map.defineCSSCallback || 'require.defineCSS';
        fis.util.map(ret.src, function(subpath, file) {
            if (file.isCssLike && file.isMod) {
                var content = file.getContent();
                content = callback + "('" + file.getId() + "', " + JSON.stringify(content) + ');';
                var f = fis.file(file.realpath);
                f.setContent(content);
                f.compiled = true;
                f.release = file.release + '.js';
                ret.pkg[subpath + '.js'] = f;
            }
        });
    }

    var stringify = JSON.stringify(map, null, opt.optimize ? null : 4);
    views.forEach(function(file) {
        var content = file.getContent();
        var hasChange = false;

        content = content.replace(/\b__FRAMEWORK_CONFIG__\b/g, function() {
            hasChange = true;
            return stringify;
        });

        content = content.replace(/\b__FRAMEWORK_NAME__\b/g, function() {
            hasChange = true;
            return map.name;
        })

        if (hasChange) {
            file.setContent(content);
            opt.beforeCompile(file);
        }
    });
};
