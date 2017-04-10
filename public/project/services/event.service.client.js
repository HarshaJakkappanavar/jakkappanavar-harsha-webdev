/**
 * Created by harsh on 4/9/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .factory("EventService", EventService);

    function EventService($http) {

        var api = {
            findEventsForUser: findEventsForUser
        }

        return api;

        function findEventsForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/event");
        }
    }
})();