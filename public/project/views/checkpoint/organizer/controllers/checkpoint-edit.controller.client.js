/**
 * Created by harsh on 4/10/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerCheckpointEditController", OrganizerCheckpointEditController);

    function OrganizerCheckpointEditController($routeParams, currentUser, $location, $rootScope, CheckpointService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.eventId = $routeParams.eventId;
        vm.checkpointId = $routeParams.checkpointId;
        vm.updateCheckpoint = updateCheckpoint;
        // vm.deleteCheckpoint = deleteCheckpoint;
        vm.updateMapCenter = updateMapCenter;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;

            CheckpointService
                .findCheckpointById(vm.checkpointId)
                .success(function (checkpoint) {
                    vm.checkpoint = checkpoint;
                })
        }

        function updateCheckpoint(checkpoint) {
            var pos = getPosition($rootScope.gLocation);
            if(pos) {
                checkpoint.location.latitude = pos.latitude;
                checkpoint.location.longitude = pos.longitude;
            }
            CheckpointService
                .updateCheckpoint(checkpoint)
                .then(function (checkpoint) {
                    $location.url("/organizer/event/" + vm.eventId + "/checkpoints");
                }, function (error) {
                    vm.error = "Could not update Event."
                })
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