/**
 * Created by harsh on 2/10/2017.
 */
(function (){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService){

        var vm = this;

        vm.login = login;


        function login(username, password){

            if(username == null || password == null) {
                vm.error = "Please enter username and password."
                return;
            }

            var newUser = UserService.findUserByCredentials(username, password);
            if( newUser != null){
                $location.url("/user/" + newUser._id);
            } else {
                vm.error="The username or password is incorrect.";
            }

        }

    }
})();