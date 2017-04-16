/**
 * Created by harsh on 4/10/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .factory("CheckpointService", CheckpointService);

    function CheckpointService($http, $rootScope) {

        var api = {
            findCheckpointsForEvent: findCheckpointsForEvent,
            createCheckpoint: createCheckpoint,
            updateCheckpointSort: updateCheckpointSort,
            findCheckpointById: findCheckpointById,
            updateCheckpoint: updateCheckpoint
        }

        return api;

        function findCheckpointsForEvent(eventId) {
            return $http.get("/project/services/api/event/" + eventId + "/checkpoint");
        }

        function createCheckpoint(eventId, checkpoint) {
            return $http.post("/project/services/api/event/" + eventId + "/checkpoint", checkpoint);
        }

        function updateCheckpointSort(startPos, endPos) {
            var eventId = $rootScope.eventId;
            return $http.put("/project/services/event/"+eventId+"/checkpoint?start="+startPos+"&end=" + endPos);
        }

        function findCheckpointById(checkpointId) {
            return $http.get("/project/services/event/checkpoint/" + checkpointId);
        }

        function updateCheckpoint(checkpoint) {
            return $http.put("/project/services/event/checkpoint", checkpoint);
        }
    }
})();