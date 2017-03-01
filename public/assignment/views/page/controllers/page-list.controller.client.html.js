/**
 * Created by harsh on 2/14/2017.
 */

(function (){

    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {

        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;


        init();

        function init(){
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });
        }
    }
})();
