'use strict';

var exec = require('child_process').exec;
var path = require('path');

module.exports = function(content, file, settings) {
    var args = ['-quiet', '-mt'];

    if (settings.preset) {
        args.push('-preset', settings.preset);
    }

    if (settings.quality) {
        args.push('-q', settings.quality);
    }

    if (settings.alphaQuality) {
        args.push('-alpha_q', settings.alphaQuality);
    }

    if (settings.method) {
        args.push('-m', settings.method);
    }

    if (settings.size) {
        args.push('-size', settings.size);
    }

    if (settings.sns) {
        args.push('-sns', settings.sns);
    }

    if (settings.filter) {
        args.push('-f', settings.filter);
    }

    if (settings.autoFilter) {
        args.push('-af');
    }

    if (settings.sharpness) {
        args.push('-sharpness', settings.sharpness);
    }

    if (settings.lossless) {
        args.push('-lossless');
    }

    var dest = fis.config.get('dest');

    if (file.useWebP && file.exists()) {
        var fileSrc = file.realpath;
        var realpathNoExt = file.realpathNoExt;
        var webpFile = fis.file.wrap(/\.webp$/i.test(realpathNoExt) ? realpathNoExt : realpathNoExt + '.webp');
        var releasePath = path.join(dest, webpFile.release);

        exec('cwebp ' + args.concat([fileSrc, '-o', releasePath]).join(' '), function(err) {
            if (err) throw err;
        });
    }

    return content;
};
