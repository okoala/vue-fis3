'use strict';

module.exports = function(content, file){
    if(file.isMod && file.isJsLike){
        // 由于webpack会自动转移require，所以这边要先保留require.async
        content = content.replace(/(__webpack_require__\(\d+\)).async/, 'require.async');

        // npm中的基础前段模块单独包装。
        if (file.isBaseMod) {
            content = 'define(\'' + file.getId() + '\', function(require, exports, module){' + content + '\n\n});';
        }
    }

    return content;
};
