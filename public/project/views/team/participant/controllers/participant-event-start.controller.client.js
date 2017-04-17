/**
 * Created by harsh on 4/13/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("ParticipantEventStartController", ParticipantEventStartController);

    function ParticipantEventStartController($rootScope, $routeParams, $geolocation, currentUser, TeamService, MemberService, CheckpointService, UserService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.eventId = $routeParams.eventId;
        vm.checkReached = checkReached;

        init();

        initGeoLocation();

        function initGeoLocation() {
            $geolocation.getCurrentPosition().then(function(position) {
                console.log(position, 'current position');

                MemberService
                    .updateMemberLocationForTeam(vm.member._id, position.coords.latitude, position.coords.longitude)
                    .then(function () {
                        findTeamForUser();
                    });

                vm.map = {
                    center: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    zoom: 16
                };
            });
        }

        function init() {
            vm.map = $rootScope.map;
            vm.maps = $rootScope.maps;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;

            findTeamForUser();

            findAllCheckpointsForEvent();
        }

        function findTeamForUser() {
            TeamService
                .findTeamForUser(vm.userId, vm.eventId)
                .success(function (team) {
                    vm.team = team;
                    showMarkersForTeam(team);
                });
        }

        function findAllCheckpointsForEvent(){
             CheckpointService
                 .findCheckpointsForEvent(vm.eventId)
                 .success(function (checkpoints) {
                     vm.allCheckpoints = checkpoints;
                 })
        }

        function showMarkersForTeam(team) {
            vm.allMembers = getMarkerForMembers(team.members);
            vm.checkpointMarkers = getMarkerForCheckpoint(team.checkpoints);
            vm.markerSet = vm.allMembers.concat(vm.checkpointMarkers);
        }

        function getMarkerForMembers(members) {
            var memberMarkers = [];
            for(var m in members) {
                var locations = members[m].locations;
                if(members[m].participant._id == vm.userId) {
                    vm.member = members[m];
                    if(locations.length > 0) {
                        memberMarkers.push({
                            id: members[m]._id,
                            latitude: locations[locations.length - 1].latitude,
                            longitude: locations[locations.length - 1].longitude,
                            title: "<h2>Hey there, I am gonna find the next checkpoint.</h2>",
                            options: {
                                labelClass:'marker_labels',
                                labelAnchor:'12 60',
                                labelContent:'<label style="background-color: black; color: white; opacity: 0.85; padding: 2px;">' + members[m].participant.firstName +'</label>'
                            },
                            events:{
                                click:function (marker, eventName, args) {
                                    console.log("Something")
                                    vm.show = !vm.show;
                                }
                            }
                        })
                    }
                }else {
                    if(locations.length > 0) {
                        memberMarkers.push(getMemberMarker(members[m], locations[locations.length - 1]));
                    }
                }
            }
            return memberMarkers;
        }

        function getMemberMarker(member, location) {
            return {
                id: member._id,
                latitude: location.latitude,
                longitude: location.longitude,
                icon:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                options: {
                    labelClass:'marker_labels',
                    labelAnchor:'12 60',
                    labelContent:'<label style="background-color: black; color: white; opacity: 0.85; padding: 2px;">' + member.participant.firstName +'</label>'
                },
                events:{
                    click:function (marker, eventName, args) {
                        console.log("Something")
                        vm.show = !vm.show;
                    }
                }
            };
        }

        function getMarkerForCheckpoint(checkpoints) {
            var checkpointMarkers = [];
            for(var c in checkpoints) {
                var location = checkpoints[c].location;
                checkpointMarkers.push({
                    id: checkpoints[c]._id,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    title: populateCheckpointTitle(checkpoints[c]),
                    icon:'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
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
            return checkpointMarkers;
        }

        function populateCheckpointTitle(checkpoint) {
            var title = '<h2>' + checkpoint.name + '</h2>';
            title += checkpoint.question;
            return title;
        }

        function checkReached() {
            $geolocation.getCurrentPosition().then(function(position) {
                if(vm.team.checkpoints.length < vm.allCheckpoints.length){
                    var nextCheckpoint = vm.allCheckpoints[vm.team.checkpoints.length];
                    var distance = vm.maps.geometry.spherical
                                    .computeDistanceBetween(new vm.maps.LatLng(nextCheckpoint.location.latitude, nextCheckpoint.location.longitude),
                                        new vm.maps.LatLng(position.coords.latitude, position.coords.longitude));
                    if(distance <= 100) {
                        TeamService
                            .addCheckpointToTeam(vm.team._id, nextCheckpoint._id);
                    }
                    initGeoLocation();
                }
            });
        }
    }
})();