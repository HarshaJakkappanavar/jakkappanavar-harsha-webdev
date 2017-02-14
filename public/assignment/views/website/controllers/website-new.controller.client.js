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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }

        function createWebsite(website) {
            if(website == null
                    || website.name == null) {
                vm.error = "The widget name cannot be empty.";
                return;
            }
            website = WebsiteService.createWebsite(vm.userId, website);
            if(website == null) {
                vm.error = "Could not create the new website.";
                return;
            }
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();
