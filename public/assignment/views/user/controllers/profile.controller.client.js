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
            vm.user = UserService.findUserById(vm.userId);
            if(null == vm.user) {
                vm.error = "User not found."
            }
        }
        init();

        function update(user) {

            if(user.username == null
                    || user.username === "") {
                vm.error = "Username cannot be empty.";
                return;
            }
            vm.user = UserService.updateUser(vm.userId, user);
            if(null == vm.user) {
                vm.error = "Could not update user.";
            } else {
                $location.url("/user/" + vm.user._id);
            }
        }

        function deleteUser() {
            var retVal = UserService.deleteUser(vm.userId);
            if(retVal) {
                $location.url("/");
            } else {
                vm.error = "Could not delete the user";
            }
        }
    }
})();
