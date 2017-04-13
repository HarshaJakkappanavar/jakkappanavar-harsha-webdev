/**
 * Created by harsh on 4/13/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("ParticipantNewEventController", ParticipantNewEventController);

    function ParticipantNewEventController(currentUser, $rootScope, $routeParams, $location, TeamService, EventService) {
        var vm = this;

        vm.user = currentUser;
        vm.userId = currentUser._id;
        vm.eventId = $routeParams.eventId;
        vm.registerByTeamName = registerByTeamName;
        vm.registerByTeamMemberName = registerByTeamMemberName;

        vm.names = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie",
            "celine", "brad", "drew", "rebecca", "michel", "francis", "jean",
            "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert",
            "edouard", "benoit", "guillaume", "nicolas", "joseph"];


        init();
        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;

            TeamService
                .findTeamsForEvent(vm.eventId)
                .success(function (teams) {
                    vm.teams = teams;
                });
        }

        function registerByTeamName(teamName) {
            EventService
                .registerByTeamName(vm.userId, vm.eventId, teamName)
                .success(function () {
                    $location.url("/participatn/events")
                })
                .error(function (err) {
                    vm.error = "Could not register to the event."
                });
        }

        function registerByTeamMemberName(teamMemberName){

        }
    }
})();
