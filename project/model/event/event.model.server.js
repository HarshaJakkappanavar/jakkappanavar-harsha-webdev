/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var EventSchema = require('./event.schema.server');
var EventModel = mongoose.model('EventModel', EventSchema);
var model = '';

EventModel.setModel = setModel;
EventModel.findEventById = findEventById;
EventModel.findEventsForUser = findEventsForUser;
EventModel.createEventForOrganizer = createEventForOrganizer;
EventModel.addCheckpointToEvent = addCheckpointToEvent;
EventModel.reorderCheckpointForEvent = reorderCheckpointForEvent;
module.exports = EventModel;

function setModel(_model) {
    model = _model;
}

function findEventById(eventId) {
    var deferred = q.defer();
    EventModel
        .findById(eventId, function (err, event) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(event);
            }
        });
    return deferred.promise;
}

function findEventsForUser(userId) {
    var deferred = q.defer();
    EventModel
        .find({organizer: userId})
        .populate('location')
        .exec(function (err, websites) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(websites);
            }
        });
    return deferred.promise;
}

function createEventForOrganizer(userId, event) {
    var deferred = q.defer();
    event.organizer = userId;
    EventModel
        .create(event, function(err, newEvent) {
            if(err) {
                deferred.reject(err);
            }else {
                model.ProjectUserModel
                    .addEventToUser(userId, newEvent._id)
                    .then(function (events) {
                        deferred.resolve(newEvent);
                    });
            }
        });

    return deferred.promise;
}

function addCheckpointToEvent(eventId, checkpointId) {
    var deferred = q.defer();
    findEventById(eventId)
        .then(function (event) {
            event.checkpoints.push(checkpointId);
            event.save(function (err, event) {
                deferred.resolve(event);
            });
        });
    return deferred.promise;
}

function reorderCheckpointForEvent(eventId, startPos, endPos) {
    var deferred = q.defer();
    EventModel
        .findById(eventId, function(err, event) {
            var checkpoints = event.checkpoints;
            checkpoints.splice(endPos-1, 0, checkpoints.splice(startPos-1, 1)[0]);
            event.checkpoints = checkpoints;
            event.save(function(err, event) {
                deferred.resolve(event);
            });
        });
    return deferred.promise;
}