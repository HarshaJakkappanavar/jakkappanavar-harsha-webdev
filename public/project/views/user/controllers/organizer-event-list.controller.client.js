/**
 * Created by harsh on 4/9/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerEventListController", OrganizerEventListController);

    function OrganizerEventListController($rootScope, $routeParams, EventService) {

        var vm = this;

        vm.userId = $routeParams.userId;
        vm.showEventsOnMap = showEventsOnMap;

        init();
        function init(){
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;

            EventService
                .findEventsForUser(vm.userId)
                .success(function (events) {
                    vm.events = events;
                    vm.markerSet = showEventsOnMap(events);

                });
        }

        function showEventsOnMap(events) {
            var markers = [];

            for(var e in events) {
                markers.push({
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
                })
            }
            return markers;
        }

        function populateEventTitle(event) {
            var title = '<h2>' + event.name + '</h2>';
            title += event.desc;
            return title;
        }
    }
})();
