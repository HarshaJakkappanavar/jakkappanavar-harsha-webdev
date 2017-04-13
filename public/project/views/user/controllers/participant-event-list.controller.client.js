/**
 * Created by harsh on 4/13/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("ParticipantEventListController", ParticipantEventListController);

    function ParticipantEventListController($rootScope, currentUser, EventService, UserService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.showAllMarkers = showAllMarkers;
        vm.showMyMarkers = showMyMarkers;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;

            EventService
                .getAllEvents()
                .success(function (events) {
                   vm.allEvents = events;
                   UserService
                       .findEventsForUser(vm.userId)
                       .success(function (events) {
                           vm.myEvents = events;
                           var notMyEvents = _.differenceBy(vm.allEvents, vm.myEvents, "_id");
                           vm.allMarkers = getMarkers(vm.myEvents, notMyEvents);

                       });
                });
        }

        function getMarkers(myEvents, notMyEvents) {
            var markers = [];
            vm.myMarkers = [];


            /*
            * Markers from my events
            * */
            for(var e in myEvents) {
                if(isActive(myEvents[e].day)) {
                    var marker = myEvents[e].marker;
                    if(marker){
                        marker.id = myEvents[e]._id;
                        marker.events = {
                            click:function (marker, eventName, args) {
                                console.log("Something")
                                vm.show = !vm.show;
                            }
                        };
                        marker.icon = setMarkerIcon(myEvents[e].day);
                        if(isToday(myEvents[e].day)){
                            marker.title += '<a class="btn btn-success">Start</a>'
                        }
                        marker.title += '<a class="btn btn-danger">Unregister</a>';
                        markers.push(marker);
                        vm.myMarkers.push(marker);
                    }
                }
            }

            /*
            * Markers from not my events
            * */
            for(var e in notMyEvents) {
                if(isActive(notMyEvents[e].day)) {
                    var marker = notMyEvents[e].marker;
                    if(marker){
                        marker.id = notMyEvents[e]._id;
                        marker.events = {
                            click:function (marker, eventName, args) {
                                console.log("Something")
                                vm.show = !vm.show;
                            }
                        };
                        marker.icon = setMarkerIcon(notMyEvents[e].day);
                        marker.title +=
                            '<div class="container-fluid">' +
                                '<a href="#/participant/event/'+notMyEvents[e]._id+'/register" ' +
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

        function isToday(eventDay) {
            var today = new Date();
            eventDay = new Date(eventDay);
            today.setHours(0,0,0,0);
            eventDay.setHours(0,0,0,0);

            return today.toDateString() == eventDay.toDateString();
        }

        function showAllMarkers() {
            vm.markerSet = vm.allMarkers;
        }

        function showMyMarkers() {
            vm.markerSet = vm.myMarkers;
        }
    }
})();