/**
 * Created by harsh on 2/13/2017.
 */

(function () {

    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, $routeParams, WebsiteService) {

        var vm = this;

        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.delete = deleteWebsite;

        init();

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                });

            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                });

        }

        function updateWebsite(website) {
            if(website == null
                    || website.name == null
                    || website.name.length == 0) {
                vm.error = "The widget name cannot be empty.";
                return;
            }
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "Could not update the website";
                });
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)
                .success(function () {
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function () {
                    vm.error = "Could not delete website.";
                });
        }
    }
})();
