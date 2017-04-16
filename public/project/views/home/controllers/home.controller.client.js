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
        vm.updateMapCenter = updateMapCenter;

        $rootScope.login = vm.login;
        $rootScope.register = vm.register;
        $rootScope.logout = vm.logout;

        init();

        function init() {
            $rootScope.map = {
                center: {
                    latitude: 42.34,
                    longitude: -71.09
                },
                zoom: 14//,
                //styles: [{"featureType":"all","elementType":"all","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":-30}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#353535"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#656565"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#505050"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"color":"#808080"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#454545"}]},{"featureType":"transit","elementType":"labels","stylers":[{"hue":"#000000"},{"saturation":100},{"lightness":-40},{"invert_lightness":true},{"gamma":1.5}]}]
            };
            /*styles: [{
             "featureType":"all",
             "elementType":"all",
             "stylers":[{
             "saturation":-100
             }, {
             "gamma":0.5
             }]
             }]*/

            vm.map = $rootScope.map;

            uiGmapGoogleMapApi.then(function(maps) {
                $rootScope.maps = maps;
            });

            EventService
                .getAllEvents()
                .success(function (events) {
                    vm.markerSet = getMarkers(events);
                    vm.allEvents = vm.markerSet;
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
                        if(loginUser.userType == 'admin'){
                            $location.url("/admin/home");
                        }else {
                            $location.url("/profile");
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
                            '<div>' +
                            '<button data-toggle="modal" data-target="#login" ' +
                            '       class="btn btn-primary btn-block">Register</button>' +
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

        function updateMapCenter() {
            var pos = getPosition($rootScope.gLocation);
            if(pos) {
                vm.map.center.latitude = pos.latitude;
                vm.map.center.longitude = pos.longitude;
                vm.map.center.zoom = 15;
            }

            var markers = [];

            markers.push({
                id: new Date().getTime(),
                latitude: pos.latitude,
                longitude: pos.longitude,
                events:{
                    click:function (marker, eventName, args) {
                        console.log("Something")
                        vm.show = !vm.show;
                    }
                }
            });
            vm.markerSet = vm.allEvents.concat(markers);
        }

        function getPosition(gLocation) {
            if(gLocation){
                var geoComponents = gLocation.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                return {latitude: latitude, longitude: longitude};
            }
        }
    }
})();