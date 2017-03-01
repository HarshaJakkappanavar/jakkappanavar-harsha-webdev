/**
 * Created by harsh on 2/12/2017.
 */

(function (){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;

        vm.update = update;
        vm.deleteUser = deleteUser;


        function init(){
            vm.userId = $routeParams.uid;
            UserService.findUserById(vm.userId)
                .success(function (user) {
                    if(user != null) {
                        vm.user = user;
                    }
                })
                .error(function (err) {
                    vm.error = "User not found.";
                });
        }
        init();

        function update(user) {

            if(user.username == null
                    || user.username === "") {
                vm.error = "Username cannot be empty.";
                return;
            }
            UserService
                .updateUser(vm.userId, user)
                .success(function (user) {
                    if(user != null) {
                        vm.user = user;
                        vm.message = "Successfully updated user."
                    }
                })
                .error(function (err) {
                    vm.error = "Could not update user.";
                });
        }

        function deleteUser() {
            UserService
                .deleteUser(vm.userId)
                .success(function (response) {
                    $location.url("/");
                })
                .error(function (err) {
                    vm.error = "Could not delete the user.";
                });
        }
    }
})();
