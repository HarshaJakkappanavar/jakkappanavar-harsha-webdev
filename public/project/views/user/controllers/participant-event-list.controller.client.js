/**
 * Created by harsh on 4/13/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("ParticipantEventListController", ParticipantEventListController);

    function ParticipantEventListController($rootScope, $compile, currentUser, EventService, UserService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.showAllMarkers = showAllMarkers;
        vm.showMyMarkers = showMyMarkers;
        vm.unregisterEvent = unregisterEvent;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;

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
                            marker.title += '<a href="#/participant/event/' + myEvents[e]._id + '/start" class="btn btn-success btn-block">Start / Resume</a>'
                        }
                        var unregisterHTML = '<a ng-click=\'$parent.unregisterEvent("' + myEvents[e]._id + '")\' class="btn btn-danger btn-block">Unregister</a>';
                        // marker.title += $compile(unregisterHTML)(vm)[0];
                        // marker.title += unregisterHTML;
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
                            '<div>' +
                                '<a href="#/participant/event/'+notMyEvents[e]._id+'/register" ' +
                            '       class="btn btn-primary btn-block">Register</a>' +
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

        function unregisterEvent(eventId) {
            EventService
                .unregisterEventForUser(eventId, vm.userId)
                .success(function (status) {
                   init();
                });
        }
    }
})();