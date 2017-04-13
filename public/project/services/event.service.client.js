/**
 * Created by harsh on 4/9/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .factory("EventService", EventService);

    function EventService($http) {

        var api = {
            findEventsForUser: findEventsForUser,
            createEvent: createEvent,
            getAllEvents: getAllEvents,
            registerByTeamName: registerByTeamName
        }

        return api;

        function findEventsForUser(userId) {
            return $http.get("/project/services/api/user/" + userId + "/event");
        }

        function createEvent(userId, event) {
            return $http.post("/project/services/api/user/" + userId + "/event", event);
        }

        function getAllEvents() {
            return $http.get("/project/services/api/events");
        }

        function registerByTeamName(userId, eventId, teamName) {
            return $http.post("/project/services/api/user/" + userId + "/event/" + eventId + "/register/team", {teamName: teamName});
        }
    }
})();