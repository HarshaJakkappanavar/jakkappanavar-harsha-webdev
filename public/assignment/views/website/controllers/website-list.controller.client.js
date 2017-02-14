/**
 * Created by harsh on 2/13/2017.
 */

(function (){

    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.userId = $routeParams.uid;

        init();

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }


    }
})();
