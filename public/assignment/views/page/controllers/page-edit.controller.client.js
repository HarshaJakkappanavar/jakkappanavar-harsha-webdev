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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }

        function updatePage(page) {
            if(page == null
                    || page.name == null) {
                vm.error = "The page name cannot be empty.";
                return;
            }
            page = PageService.updatePage(vm.pageId, page);
            if(page == null) {
                vm.error = "Could not update the page.";
                return;
            }
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function deletePage(pageId) {
            var retVal = PageService.deletePage(pageId);
            if(retVal) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.error = "Could not delete page.";
            }
        }
    }
})();
