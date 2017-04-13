/**
 * Created by harsh on 4/10/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerNewEventController", OrganizerNewEventController);

    function OrganizerNewEventController(currentUser, $rootScope, EventService, $location) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.createEvent = createEvent;
        vm.updateMapCenter = updateMapCenter;

        init();
        function init(){
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
        }

        function createEvent(event) {
            var pos = getPosition($rootScope.gLocation);
            event.location = pos;
            event.marker = setMarker(event);
            EventService
                .createEvent(currentUser._id, event)
                .success(function () {
                    $location.url("/organizer/events");
                })
                .error(function () {
                    vm.error = "Could not create the new event";
                });

        }

        function setMarker(event) {
            return {
                latitude: event.location.latitude,
                longitude: event.location.longitude,
                title: populateEventTitle(event),
                icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                options: {
                    labelClass:'marker_labels',
                    labelAnchor:'12 60',
                    labelContent:'<label style="background-color: black; color: white; opacity: 0.85; padding: 2px;">' + event.name +'</label>'
                }
            }
        }

        function populateEventTitle(event) {
            var title = '<h2>' + event.name + '</h2>';
            title += event.desc;
            return title;
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