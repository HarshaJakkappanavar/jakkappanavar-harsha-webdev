/**
 * Created by harsh on 4/9/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerEventListController", OrganizerEventListController);

    function OrganizerEventListController($rootScope, $location, currentUser, EventService, UserService) {

        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.showEventsOnMap = showEventsOnMap;

        init();
        function init(){
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;

            EventService
                .findEventsForUser(currentUser._id)
                .success(function (events) {
                    vm.events = events;
                    vm.markerSet = showEventsOnMap(events);

                });
        }

        function showEventsOnMap(events) {
            var markers = [];

            for(var e in events) {
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
                    marker.map_icon_label = '<span class="map-icon map-icon-point-of-interest"></span>';
                }else{
                    marker = {
                        id: events[e]._id,
                        latitude: events[e].location.latitude,
                        longitude: events[e].location.longitude,
                        title: populateEventTitle(events[e]),
                        icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        options: {
                            labelClass:'marker_labels',
                            labelAnchor:'12 60',
                            labelContent:'<label style="background-color: black; color: white; opacity: 0.85; padding: 2px;">' + events[e].name +'</label>'
                        },
                        events:{
                            click:function (marker, eventName, args) {
                                console.log("Something")
                                vm.show = !vm.show;
                            }
                        }
                    }
                }
                markers.push(marker);

            }
            return markers;
        }

        function populateEventTitle(event) {
            var title = '<h2>' + event.name + '</h2>';
            title += event.desc;
            return title;
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

    }
})();
