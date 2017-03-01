/**
 * Created by harsh on 2/13/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($location, $routeParams, WebsiteService) {

        var vm = this;

        vm.userId = $routeParams.uid;

        vm.createWebsite = createWebsite;

        init();

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }

        function createWebsite(website) {
            if(website == null
                    || website.name == null) {
                vm.error = "The widget name cannot be empty.";
                return;
            }
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "Could not create the new website.";
                });
        }
    }
})();
