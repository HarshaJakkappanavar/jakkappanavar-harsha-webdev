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
            registerByTeam: registerByTeam,
            deleteEvent : deleteEvent,
            findEventById: findEventById,
            updateEvent: updateEvent,
            registerByTeamMember: registerByTeamMember,
            unregisterEventForUser: unregisterEventForUser
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

        function registerByTeam(userId, eventId, team) {
            return $http.post("/project/services/api/user/" + userId + "/event/" + eventId + "/register/team", {name: team});
        }

        function deleteEvent(eventId) {
            return $http.delete("/project/services/api/event/" + eventId, deleteEvent);
        }

        function findEventById(eventId) {
            return $http.get("/project/services/api/event/" + eventId);
        }

        function updateEvent(event) {
            return $http.put("/project/services/api/event/update", event);
        }

        function registerByTeamMember(userId, eventId, teamId) {
            return $http.post("/project/services/api/user/" + userId + "/event/" + eventId + "/register/team/teamId", {id: teamId});
        }

        function unregisterEventForUser(eventId, userId) {
            return $http.delete("/project/services/user/" + userId + "/event/" + eventId + "/unregister");
        }
    }
})();