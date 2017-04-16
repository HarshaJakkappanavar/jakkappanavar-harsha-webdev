/**
 * Created by harsh on 4/15/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("AdminHomeController", AdminHomeController);

    function AdminHomeController($rootScope, adminUser) {
        var vm = this;

        vm.user = adminUser;
        vm.userId = adminUser._id;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
        }
    }
})();