/**
 * Controllers
 * @module controllers
 */
define(function (require, exports) {

    'use strict';

    /**
     * Main controller
     * @ngInject
     * @constructor
     */
    /*function MainCtrl() {



    }*/

    /**
     * Export Controllers
     */
    //exports.MainCtrl = MainCtrl;
    exports.MainCtrl = function(lpWidget, $timeout, $scope, lpCoreBus){
        var ctrl = this;

        ctrl.limit = lpWidget.model.getPreference('limit') || 5;

        lpWidget.model.addEventListener('preferencesSaved', function(){
            ctrl.limit = lpWidget.model.getPreference('limit') || 5;    
        });        

        ctrl.tasks = [];

        ctrl.addTask = function(dt){

            var itemLimit = function(){
               var returnCnt = 0;
               for (var i = 0; i < ctrl.tasks.length; i++) {
                    if(ctrl.tasks[i].complete){
                        returnCnt++; 
                    }
                }

                returnCnt = ctrl.tasks.length-returnCnt;

                if(returnCnt>=ctrl.limit){
                    ctrl.sendNotification('Limit exceeded');
                    return false;
                }
                return true;
            };

            if(itemLimit()){
                var tmp = {
                    description:dt.description,
                    complete:false
                };
                ctrl.tasks.push(tmp);
                ctrl.sendNotification('Task added');
            }
        };

        ctrl.removeTask = function(indx){
            ctrl.tasks.splice(indx, 1);
            ctrl.sendNotification('Task removed');
        };

        ctrl.completeTask = function(indx){
            ctrl.tasks[indx].complete = (ctrl.tasks[indx].complete)?true:false;
            ctrl.sendNotification('Task completed');
        };

        ctrl.completeTaskOnRow = function(indx){
            ctrl.tasks[indx].complete = !ctrl.tasks[indx].complete;
            ctrl.sendNotification('Complete by click on row because checkbox is hidden');
        };

        ctrl.checkSize = function(sz){
            ctrl.narrow = (sz.width && sz.width <400)?true:false;
        };

        ctrl.sendNotification = function(msg){
            lpCoreBus.publish('todo-message', {
                message:msg
            });
        }

    };
});
