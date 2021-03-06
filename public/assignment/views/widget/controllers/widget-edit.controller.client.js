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
        vm.goBackToWidgetList = goBackToWidgetList;

        init();

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }

        function getTemplateUrl(widgetType) {
            return 'views/widget/template/editors/widget-' + widgetType + '-editor.view.client.html';
        }

        function updateWidget(widget) {
            if((widget.url && widget.width) || widget.type != "IMAGE"){

                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .success(function () {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/"
                            + vm.pageId + "/widget");
                    })
                    .error(function () {
                        vm.error = "Could not update the widget.";
                    });
            } else {
                if(!widget.url){
                    vm.error = "Invalid URL.";
                }else {
                    vm.error = "Incorrect fields entered.";
                }
            }
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId
                        + "/page/" + vm.pageId + "/widget");
                })
                .error(function () {
                    vm.error = "Could not delete widget.";
                });
        }

        function goBackToWidgetList() {
            var currentUrl = $location.url();
            var urlParts = currentUrl.split("/");
            if(urlParts[urlParts.length-2] === "new"){
                deleteWidget();
            } else{
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/"
                    + vm.pageId + "/widget");
            }

        }

    }
})();

