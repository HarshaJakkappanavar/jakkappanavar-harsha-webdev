/**
 * Created by harsh on 2/14/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService, $rootScope) {

        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.getTrustedHTML = getTrustedHTML;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;

        init();

        function init() {
            $rootScope.pageId = vm.pageId;
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                });
        }

        function getTrustedHTML(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(url) {
            var urlParts = url.split("/");
            var id = urlParts[urlParts.length - 1];
            url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }
    }
})();
