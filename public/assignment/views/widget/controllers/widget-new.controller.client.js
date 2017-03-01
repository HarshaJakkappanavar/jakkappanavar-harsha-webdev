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
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (widget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                        + "/page/" + vm.pageId + "/widget/new/" + widget._id);
                })
                .error(function () {
                    vm.error = "Could not create the new widget";
                });
        }
    }
})();
