/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("AdminManageUsersController", AdminManageUsersController);

    function AdminManageUsersController($rootScope, $location, adminUser, UserService) {

        var vm = this;

        vm.user = adminUser;
        vm.userId = adminUser._id;
        vm.deleteUser = deleteUser;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            getAllUsers();
        }

        function getAllUsers () {
            var promise = UserService.findAllUsers();
            vm.allUsers = [];
                promise
                    .success(function (res) {
                        if( res != null){
                            vm.allUsers = res;
                            vm.organizer = "organizer";
                            vm.participant = "participant";
                        }
                    })
                    .error(function (err) {
                        vm.error = "Users could not be retrieved";
                    });
        }

        function deleteUser(userId) {
            var promise = UserService.deleteUser(userId);
            promise
                .success(function (res) {
                    getAllUsers();
                })
                .error(function (err) {
                    vm.error = "User could not be deleted";
                });
        }
    }
})();