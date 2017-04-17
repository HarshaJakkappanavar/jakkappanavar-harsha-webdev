/**
 * Created by harsh on 4/10/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerCheckpointNewController", OrganizerCheckpointNewController);

    function OrganizerCheckpointNewController($routeParams, currentUser, $location, uiGmapGoogleMapApi, $rootScope, CheckpointService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.eventId = $routeParams.eventId;
        vm.createCheckpoint = createCheckpoint;
        vm.updateMapCenter = updateMapCenter;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;
        }

        function createCheckpoint(checkpoint) {
            var pos = getPosition($rootScope.gLocation);
            checkpoint.location = pos;
            CheckpointService
                .createCheckpoint(vm.eventId, checkpoint)
                .success(function () {
                    $location.url("/organizer/event/" + vm.eventId + "/checkpoints");
                })
                .error(function () {
                    vm.error = "Could not create the new checkpoint";
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