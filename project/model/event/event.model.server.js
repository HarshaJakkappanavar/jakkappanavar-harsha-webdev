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
EventModel.getAllEvents = getAllEvents;
EventModel.addTeamToEvent = addTeamToEvent;
EventModel.deleteEvent = deleteEvent;
EventModel.updateEvent = updateEvent;
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
        .exec(function (err, events) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(events);
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

function getAllEvents() {
    var deferred = q.defer();
    EventModel
        .find()
        .populate('location')
        .exec(function (err, events) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(events);
            }
        });
    return deferred.promise;
}

function addTeamToEvent(eventId, teamId) {
    var deferred = q.defer();
    EventModel
        .findById(eventId, function(err, event) {
            var teams = event.teams;
            teams.push(teamId);
            event.teams = teams;
            event.save(function(err, event) {
                deferred.resolve(event);
            });
        });
    return deferred.promise;
}

function deleteEvent(eventId) {
    return EventModel.remove({_id: eventId});
}

function updateEvent(event) {
    var deferred = q.defer();
    EventModel
        .findById(event._id, function (err, eventObj) {
            if(err) {
                deferred.reject(err);
            }else {
                eventObj.name = event.name;
                eventObj.desc = event.desc;
                eventObj.day = event.day;
                eventObj.place  = event.place;
                eventObj.marker = event.marker;
                eventObj.save(function (err, neweventObj) {
                    if(event.location && event.location.id){
                        model.LocationModel
                            .updateLocation(event.location, function (err, location) {
                                deferred.resolve(neweventObj);
                            })
                    }else {
                        deferred.resolve(neweventObj);
                    }
                });
            }
        });
    return deferred.promise;
}
