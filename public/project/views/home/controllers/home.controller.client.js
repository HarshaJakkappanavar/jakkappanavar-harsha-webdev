/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("HomeController", HomeController);

    function HomeController(uiGmapGoogleMapApi, UserService) {

        var vm = this;

        vm.login = login;
        vm.register = register;

        init();

        function init() {
            vm.map = { center: { latitude: 42.34, longitude: -71.09 }, zoom: 12 };

            uiGmapGoogleMapApi.then(function(maps) {

            });
        }

        function login(username, password){

            if(username == null || password == null) {
                vm.error = "Please enter username and password.";
                return;
            }

            var promise = UserService.findUserByCredentials(username, password);
            promise
                .success(function (user) {

                    var loginUser = user;
                    if( loginUser != null){
                        $location.url("/user/" + loginUser._id);
                    } else {
                        vm.error="The username or password is incorrect.";
                    }
                })
                .error(function (err) {
                    vm.error = "User not found";
                });

        }

        function register(user) {
            if(user.username == null
                || user.password == null
                || user.verifypassword == null) {
                vm.error = "Please enter all the fields.";
                return;
            } else if(user.password != user.verifypassword) {
                vm.error = "The passwords did not match.";
                return;
            } else {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (response) {
                        vm.error = "Username already exists.";
                    })
                    .error(function () {
                        UserService
                            .createUser(user)
                            .success(function (user) {
                                if(user != null) {
                                    if(user.userType == 'organizer'){
                                        $location.url("/organizer/" + user._id);
                                    }else if (user.userType == 'participant'){
                                        $location.url("/participant/" + user._id);
                                    }
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