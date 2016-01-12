'use strict';

import Vue from 'vue';

let _ = Vue.util;
let extend = _.extend;

exports.isEmptyObject = function(obj) {
    var name;

    for ( name in obj ) {
        return false;
    }

    return true;
}

extend(exports, {
    dom: require('./dom')
});

extend(exports, {
    noop: function() {}
});

extend(exports, {
	snabbt: require('./snabbt')
});

extend(exports, require('./envi'));
extend(exports, require('./uuid'));

