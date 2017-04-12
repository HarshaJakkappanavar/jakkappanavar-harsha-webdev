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
            createEvent: createEvent
        }

        return api;

        function findEventsForUser(userId) {
            return $http.get("/project/services/api/user/" + userId + "/event");
        }

        function createEvent(userId, event) {
            return $http.post("/project/services/api/user/" + userId + "/event", event);
        }
    }
})();