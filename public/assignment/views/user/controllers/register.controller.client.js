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
                UserService
                    .findUserByUsername(username)
                    .success(function (response) {
                        vm.error = "Username already exists.";
                    })
                    .error(function () {
                        var user = new Object();
                        user.username = username;
                        user.password = password;
                        UserService
                            .createUser(user)
                            .success(function (user) {
                                if(user != null) {
                                    $location.url("/user/" + user._id);
                                }
                            })
                            .error(function (err) {
                                vm.error = "Could not create the user";
                            });
                    });
            }
        }

    }
})();
