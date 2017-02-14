/**
 * Created by harsh on 2/13/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {

        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.createPage = createPage;

        init();

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }

        function createPage(page) {
            if(page == null
                    || page.name == null) {
                vm.error = "The page name cannot be empty.";
                return;
            }
            page = PageService.createPage(vm.websiteId, page);
            if(page == null) {
                vm.error = "Could not create the new website.";
                return;
            }
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }
})();
