/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("HomeController", HomeController);

    function HomeController($rootScope, $location, uiGmapGoogleMapApi, UserService, EventService) {

        var vm = this;

        vm.login = login;
        vm.register = register;
        vm.logout = logout;

        $rootScope.login = vm.login;
        $rootScope.register = vm.register;
        $rootScope.logout = vm.logout;

        init();

        function init() {
            $rootScope.map = { center: { latitude: 42.34, longitude: -71.09 }, zoom: 14 };
            vm.map = $rootScope.map;

            uiGmapGoogleMapApi.then(function(maps) {
                $rootScope.maps = maps;
            });

            EventService
                .getAllEvents()
                .success(function (events) {
                    vm.markerSet = getMarkers(events);
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

                    $rootScope.sessionUser = user;

                    var loginUser = user;
                    if( loginUser != null){
                        /*if(loginUser.userType == 'organizer'){
                            $location.url("/organizer/events");
                        }else if (loginUser.userType == 'participant'){
                            $location.url("/participant/" + loginUser._id);
                        }*/
                        $location.url("/profile");
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
                                   /* if(user.userType == 'organizer'){
                                        $location.url("/organizer/events");
                                    }else if (user.userType == 'participant'){
                                        $location.url("/participant/" + user._id);
                                    }*/
                                    $location.url("/profile");
                                }
                            })
                            .error(function (err) {
                                vm.error = "Could not create the user";
                            });
                    });
            }
        }

        function logout(){
            UserService
                .logout()
                .then(function () {
                    $location.url('/home');
                });
        }

        function getMarkers(events) {
            var markers = [];
            for(var e in events) {
                if(isActive(events[e].day)) {
                    var marker = events[e].marker;
                    if(marker){
                        marker.id = events[e]._id;
                        marker.events = {
                            click:function (marker, eventName, args) {
                                console.log("Something")
                                vm.show = !vm.show;
                            }
                        };
                        marker.icon = setMarkerIcon(events[e].day);
                        marker.title +=
                            '<div class="container-fluid">' +
                            '<a href="#/participant/event/'+events[e]._id+'/register" ' +
                            '       class="btn btn-primary">Register</a>' +
                            '</div>';
                        markers.push(marker);
                    }
                }
            }
            return markers;
        }

        function setMarkerIcon(eventDay) {
            var today = new Date();
            eventDay = new Date(eventDay);
            today.setHours(0,0,0,0);
            eventDay.setHours(0,0,0,0);
            if(today.toDateString() == eventDay.toDateString()) {
                return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            }else if(today < eventDay) {
                return 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
            }else {
                return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            }
        }

        function isActive(eventDay) {
            var today = new Date();
            eventDay = new Date(eventDay);
            today.setHours(0,0,0,0);
            eventDay.setHours(0,0,0,0);

            return today.getTime() <= eventDay.getTime();

        }
    }
})();