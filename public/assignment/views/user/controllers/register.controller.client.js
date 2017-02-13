/**
 * Created by harsh on 2/12/2017.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService){

        var vm = this;

        vm.register = register;

        function register(username, password, verifypassword) {
            if(username == null
                    || password == null
                    || verifypassword == null) {
                vm.error = "Please enter all the fields.";
                return;
            } else if(password != verifypassword) {
                vm.error = "The passwords did not match.";
                return;
            } else {
                var user = UserService.findUserByUsername(username);
                if(user != null) {
                    vm.error = "Username already exists.";
                    return;
                }
            }
            var user = new Object();
            user.username = username;
            user.password = password;
            var newUser = UserService.createUser(user);
            if(newUser != null) {
                $location.url("/user/" + newUser._id);
            } else {
                vm.error = "Could not create the user."
            }
        }
    }
})();
