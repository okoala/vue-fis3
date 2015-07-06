'use strict';

var Vue = require('vue');

var Child = Vue.extend({
  created: function () {
  	alert("123")
    this.$dispatch('child-created', this)
  }
})

Vue.component('c-selector', {
    template: __inline('c-selector.tpl'),
    props: [
        {name: 'items',type: Array},
        {name: 'callback',type: Function}
    ],
    data: function() {
        return {
            items: [{
                title: 'R8',
                isShown: false,
                items: [{
                    content: '3.2 HFI 2007.06-2004'
                }, {
                    content: '3.0 HFI 2007.06-2004'
                }, {
                    content: '2.4 HFI 2007.06-2004'
                }]
            }, {
                title: 'A2',
                isShown: false,
                items: [{
                    content: '001'
                }, {
                    content: '002'
                }, {
                    content: '003'
                }]
            }],

            callback: (item,index) => {
                alert(index)
                console.log(item);
            }
        }
    },
    methods: {
        onToggle: function(item,index) {
            let isShown = !item.isShown;
            for (let i = 0;i < this.$data.items.length;i++) {
                this.$data.items[i].isShown = false;
            };
            item.isShown = isShown;

            setTimeout(()=>{
                if(item.isShown){
                    this.callback(item,index);
                }
            },5)

        },
        nidong: function(){
        	alert("123");
        }

    },
    compiled: function() {
    	this.$on('choose-series-tap', function(e) {
    		console.log('true');
    	});
    }
});
