/**
 * Created by harsh on 4/10/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerTeamListController", OrganizerTeamListController);

    function OrganizerTeamListController($routeParams, $location, uiGmapGoogleMapApi, $rootScope, TeamService) {
        var vm = this;

        vm.userId = $routeParams.userId;
        vm.eventId = $routeParams.eventId;
        vm.showTeam = showTeam;

        init();

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;

            TeamService
                .findTeamsForEvent(vm.eventId)
                .success(function (teams) {
                    vm.teams = teams;
                });
        }

        function showTeam(team) {

        }

    }
})();