/**
 * Created by harsh on 2/13/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($location, $routeParams, PageService) {

        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        init();

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                });
        }

        function updatePage(page) {
            if(page == null
                    || page.name == null) {
                vm.error = "The page name cannot be empty.";
                return;
            }
            PageService
                .updatePage(vm.pageId, page)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                    vm.error = "Could not update the page.";
                });
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function () {
                    vm.error = "Could not delete page.";
                });
        }
    }
})();
