/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, uiGmapGoogleMapApi, UserService) {

        var vm = this;

        vm.login = login;
        vm.register = register;

        $rootScope.login = vm.login;
        $rootScope.register = vm.register;

        init();

        function init() {
            $rootScope.map = { center: { latitude: 42.34, longitude: -71.09 }, zoom: 12 };
            vm.map = $rootScope.map;

            uiGmapGoogleMapApi.then(function(maps) {
                $rootScope.maps = maps;
            });
        }

        function login(user){

            if(user.username == null || user.password == null) {
                vm.error = "Please enter username and password.";
                return;
            }

            var promise = UserService.findUserByCredentials(user);
            promise
                .success(function (user) {

                    var loginUser = user;
                    if( loginUser != null){
                        if(loginUser.userType == 'organizer'){
                            $location.url("/organizer/" + loginUser._id + "/event");
                        }else if (loginUser.userType == 'participant'){
                            $location.url("/participant/" + loginUser._id);
                        }
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
                                        $location.url("/organizer/" + user._id + "/event");
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