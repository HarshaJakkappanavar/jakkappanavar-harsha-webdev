/**
 * Created by harsh on 4/10/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .factory("TeamService", TeamService);

    function TeamService($http) {

        var api = {
            findTeamsForEvent: findTeamsForEvent,
            findTeamForUser: findTeamForUser,
            addCheckpointToTeam : addCheckpointToTeam
        }

        return api;

        function findTeamsForEvent(eventId) {
            return $http.get("/project/services/api/event/" + eventId + "/teams");
        }

        function findTeamForUser(userId, eventId) {
            return $http.get("/project/services/api/user/" + userId + "/event/" + eventId + "/team")
        }

        function addCheckpointToTeam(teamId, checkpointId) {
            return $http.put("/project/services/api/team/" + teamId + "/next-checkpoint", {checkpointId: checkpointId});
        }
    }
})();