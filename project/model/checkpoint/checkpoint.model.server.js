/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var CheckpointSchema = require('./checkpoint.schema.server');
var CheckpointModel = mongoose.model('CheckpointModel', CheckpointSchema);
var model = '';

CheckpointModel.setModel = setModel;
CheckpointModel.findCheckpointById = findCheckpointById;
CheckpointModel.findCheckpointsForEvent = findCheckpointsForEvent;
CheckpointModel.createCheckpointForEvent = createCheckpointForEvent;
CheckpointModel.reorderCheckpoint = reorderCheckpoint;
module.exports = CheckpointModel;

function setModel(_model) {
    model = _model;
}

function findCheckpointById(checkpointId) {
    var deferred = q.defer();
    CheckpointModel
        .findById(checkpointId)
        .populate('location')
        .exec(function (err, checkpoint) {
            deferred.resolve(checkpoint);
        });
    return deferred.promise;
}

function findCheckpointsForEvent(eventId) {

    var deferred = q.defer();
    model.EventModel
        .findById(eventId)
        .populate({
            path: 'checkpoints',
            model: 'CheckpointModel',
            populate: {
                path: 'location',
                model: 'LocationModel'
            }
        })
        .exec(function (err, event) {
            deferred.resolve(event.checkpoints);
        });
    return deferred.promise;
}

function createCheckpointForEvent(eventId, checkpoint) {
    var deferred = q.defer();
    checkpoint._event = eventId;
    CheckpointModel
        .create(checkpoint, function(err, newCheckpoint) {
            if(err) {

                deferred.reject(err);
            }else {
                model.EventModel
                    .addCheckpointToEvent(eventId, newCheckpoint._id)
                    .then(function (checkpoints) {
                        deferred.resolve(newCheckpoint);
                    });
            }
        });
    return deferred.promise;
}

function reorderCheckpoint(eventId, startPos, endPos) {
    return model.EventModel.reorderCheckpointForEvent(eventId, startPos, endPos);
}