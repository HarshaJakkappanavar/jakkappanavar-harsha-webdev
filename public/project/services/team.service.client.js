/**
 * Created by harsh on 4/10/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .factory("TeamService", TeamService);

    function TeamService($http) {

        var api = {
            findTeamsForEvent: findTeamsForEvent
        }

        return api;

        function findTeamsForEvent(eventId) {
            return $http.get("/project/services/api/event/" + eventId + "/team");
        }
    }
})();