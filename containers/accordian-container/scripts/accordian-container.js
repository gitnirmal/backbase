/* global b$ */
(function () {
    'use strict';

    var Container = b$.bdom.getNamespace('http://backbase.com/2013/portalView').getClass('container');
 
    Container.extend(function() {
        Container.apply(this, arguments);
        this.isPossibleDragTarget = true;
    }, {
        localName: 'accordianTemplate',
        namespaceURI: 'templates_accordianTemplate'
    }, {
        template: function(json) {
            var data = {item: json.model.originalItem};
            return window[this.namespaceURI][this.localName](data);
        },
        handlers: {
            DOMReady: function(){
                //add code, DOM ready
                var $container = $(this.htmlNode);
                $container.on('click', '.acc-tab', function (event) {
                    event.preventDefault();
                    $container.find('.acc-panel').slideUp(400);
                    $container.find('.'+$(this).data('target')).slideDown(400);
                });
            },
            preferencesSaved: function(event){
                if(event.target === this) {
                    this.refreshHTML(function(item){
                        //add code, HTML refreshed
                    });
                }
            }
        }
    });
})();
