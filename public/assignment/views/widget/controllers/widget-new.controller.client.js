/**
 * Created by harsh on 2/15/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = new Object();
            widget.widgetType = widgetType;
            widget = WidgetService.createWidget(vm.pageId, widget);
            if(widget == null) {
                vm.error = "Could not create the new widget";
            } else {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                    + "/page/" + vm.pageId + "/widget/" + widget._id);
            }

        }
    }
})();
