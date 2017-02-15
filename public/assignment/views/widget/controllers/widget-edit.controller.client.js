/**
 * Created by harsh on 2/15/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {

        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;

        vm.getTemplateUrl = getTemplateUrl;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        init();

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }

        function getTemplateUrl(widgetType) {
            return 'views/widget/template/editors/widget-' + widgetType + '-editor.view.client.html';
        }

        function updateWidget(widget) {
            widget = WidgetService.updateWidget(vm.widgetId, widget);
            if(widget == null) {
                vm.error = "Could not update the widget.";
            } else {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/"
                    + vm.pageId + "/widget");
            }
        }

        function deleteWidget() {
            var retVal = WidgetService.deleteWidget(vm.widgetId);
            if(retVal) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                    + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Could not delete widget.";
            }
        }
    }
})();

