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