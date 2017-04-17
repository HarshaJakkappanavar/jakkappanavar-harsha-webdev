/**
 * Created by harsh on 4/10/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerCheckpointListController", OrganizerCheckpointListController);

    function OrganizerCheckpointListController($routeParams, currentUser, $location, uiGmapGoogleMapApi, $rootScope, CheckpointService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.eventId = $routeParams.eventId;
        $rootScope.eventId = vm.eventId;
        vm.showCheckpoint = showCheckpoint;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;

            CheckpointService
                .findCheckpointsForEvent(vm.eventId)
                .success(function (checkpoints) {
                    vm.checkpoints = checkpoints;
                    vm.markerSet = showCheckpointsOnMap(checkpoints);
                });
        }

        function showCheckpoint(checkpoint) {

        }

        function showCheckpointsOnMap(checkpoints) {
            var markers = [];

            for(var c in checkpoints) {
                markers.push({
                    id: checkpoints[c]._id,
                    latitude: checkpoints[c].location.latitude,
                    longitude: checkpoints[c].location.longitude,
                    title: populateCheckpointTitle(checkpoints[c]),
                    icon:'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    options: {
                        labelClass:'marker_labels',
                        labelAnchor:'12 60',
                        labelContent:'<label style="background-color: black; color: white; opacity: 0.85; padding: 2px;">' + checkpoints[c].name +'</label>'
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

        function populateCheckpointTitle(checkpoint) {
            var title = '<h2>' + checkpoint.name + '</h2>';
            title += checkpoint.question;
            return title;
        }

    }
})();