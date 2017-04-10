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
UserModel.findEventsForUser = findEventsForUser;
module.exports = EventModel;

function setModel(_model) {
    model = _model;
}

function findEventsForUser(userId) {
    var deferred = q.defer();
    EventModel
        .find({organizer: userId}, function (err, websites) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(websites);
            }
        });
    return deferred.promise;
}

