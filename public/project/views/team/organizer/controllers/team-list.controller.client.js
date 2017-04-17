/**
 * Created by harsh on 4/10/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerTeamListController", OrganizerTeamListController);

    function OrganizerTeamListController($routeParams, currentUser, $location, uiGmapGoogleMapApi, $rootScope, TeamService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.eventId = $routeParams.eventId;
        vm.showTeam = showTeam;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;

            TeamService
                .findTeamsForEvent(vm.eventId)
                .success(function (teams) {
                    vm.teams = teams;
                });
        }

        function showTeam(team) {
            vm.allMembers = getMarkerForMembers(team.members);
            vm.checkpointMarkers = getMarkerForCheckpoint(team.checkpoints);
            vm.markerSet = vm.allMembers.concat(vm.checkpointMarkers);
        }

        function getMarkerForMembers(members) {
            var memberMarkers = [];
            for(var m in members) {
                var locations = members[m].locations;
                if(locations.length > 0) {
                    memberMarkers.push(getMemberMarker(members[m], locations[locations.length - 1]));
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
    }
})();