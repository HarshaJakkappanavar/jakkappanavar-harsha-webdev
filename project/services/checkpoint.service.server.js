/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    app.get("/project/services/api/event/:eventId/checkpoint", findCheckpointsForEvent);
    app.post("/project/services/api/event/:eventId/checkpoint", createCheckpoint);

    app.put("/project/services/event/:eventId/checkpoint", updateCheckpointSort);

    function findCheckpointsForEvent(req, res) {
        var eventId = req.params['eventId'];
        model.CheckpointModel
            .findCheckpointsForEvent(eventId)
            .then(function (checkpoints) {
                    res.json(checkpoints);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function createCheckpoint(req, res) {
        var eventId = req.params['eventId'];
        var checkpoint = req.body;
        model.LocationModel
            .createLocation(checkpoint.location)
            .then(function (location) {
                checkpoint.location = location._id;
                model.CheckpointModel
                    .createCheckpointForEvent(eventId, checkpoint)
                    .then(function () {
                        res.sendStatus(200);
                    }, function () {
                        res.sendStatus(404);
                    });
            });
    }

    function updateCheckpointSort(req, res) {
        var eventId = req.params.eventId;
        var startPos = req.query.start;
        var endPos = req.query.end;

        model.CheckpointModel.reorderCheckpoint(eventId, startPos, endPos);
        res.sendStatus(200);
    }
};