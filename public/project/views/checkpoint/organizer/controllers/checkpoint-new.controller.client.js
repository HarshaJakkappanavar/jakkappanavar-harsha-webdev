/**
 * Created by harsh on 4/10/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerCheckpointNewController", OrganizerCheckpointNewController);

    function OrganizerCheckpointNewController($routeParams, $location, uiGmapGoogleMapApi, $rootScope, CheckpointService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.eventId = $routeParams.eventId;
        vm.createCheckpoint = createCheckpoint;
        vm.updateMapCenter = updateMapCenter;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
        }

        function createCheckpoint(checkpoint) {
            var pos = getPosition($rootScope.gLocation);
            checkpoint.location = pos;
            CheckpointService
                .createCheckpoint(vm.eventId, checkpoint)
                .success(function () {
                    $location.url("/organizer/" + vm.userId + "/event/" + vm.eventId + "/checkpoint");
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
        }
    }
})();