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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }

        function updateWebsite(website) {
            if(website == null
                    || website.name == null
                    || website.name.length == 0) {
                vm.error = "The widget name cannot be empty.";
                return;
            }
            website = WebsiteService.updateWebsite(vm.websiteId, website);
            if(website == null) {
                vm.error = "Could not update the website.";
                return;
            }
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite(websiteId) {
            var retVal = WebsiteService.deleteWebsite(websiteId);
            if(retVal) {
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.error = "Could not delete website.";
            }
        }
    }
})();
