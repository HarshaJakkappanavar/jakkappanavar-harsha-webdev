/**
 * Created by harsh on 4/10/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerNewEventController", OrganizerNewEventController);

    function OrganizerNewEventController($routeParams, $rootScope, EventService, $location) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.createEvent = createEvent;
        vm.updateMapCenter = updateMapCenter;

        vm.map = $rootScope.map;

        init();
        function init(){
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
        }

        function createEvent(event) {
            var pos = getPosition($rootScope.gLocation);
            event.location = pos;
            EventService
                .createEvent(vm.userId, event)
                .success(function () {
                    $location.url("/organizer/" + vm.userId + "/event");
                })
                .error(function () {
                    vm.error = "Could not create the new event";
                });

        }

        function getPosition(gLocation) {
            if(gLocation){
                var geoComponents = gLocation.getPlace();
                var latitude = geoComponents.geometry.location.lat();
                var longitude = geoComponents.geometry.location.lng();
                return {latitude: latitude, longitude: longitude};
            }
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
            vm.markerSet = markers;
        }
    }
})();