/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    app.get("/project/services/api/event/:eventId/checkpoint", findCheckpointsForEvent);
    app.post("/project/services/api/event/:eventId/checkpoint", createCheckpoint);

    app.put("/project/services/event/:eventId/checkpoint", updateCheckpointSort);
    app.get("/project/services/event/checkpoint/:checkpointId", findCheckpointById);
    app.put("/project/services/event/checkpoint", updateCheckpoint);

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

    function findCheckpointById(req, res) {
        var checkpointId = req.params.checkpointId;
        model.CheckpointModel
            .findCheckpointById(checkpointId)
            .then(function (checkpoint) {
                res.json(checkpoint);
            }, function (error) {
                res.sendStatus(400).send(error);
            })

    }

    function updateCheckpoint(req, res) {
        var checkpoint = req.body;
        var location = checkpoint.location;
        model.CheckpointModel
            .updateCheckpoint(checkpoint, function (err, checkpoint) {
                if(err) {
                    res.sendStatus(400).send(err);
                }else {
                    location.id = location._id;
                    model.LocationModel
                        .updateLocation(location, function (err, location) {
                            if(err) {
                                res.sendStatus(400).send(err);
                            }else {
                                res.json(checkpoint);
                            }
                        })
                }
            })
    }
};