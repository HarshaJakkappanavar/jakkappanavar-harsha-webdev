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
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }

        function createPage(page) {
            if(page == null
                    || page.name == null) {
                vm.error = "The page name cannot be empty.";
                return;
            }
            PageService
                .createPage(vm.websiteId, page)
                .success(function() {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function() {
                    vm.error = "Could not create the new website.";
                });
        }
    }
})();
