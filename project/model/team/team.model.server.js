/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var TeamSchema = require('./team.schema.server');
var TeamModel = mongoose.model('TeamModel', TeamSchema);
var model = '';

TeamModel.setModel = setModel;
TeamModel.findTeamsForEvent = findTeamsForEvent;
module.exports = TeamModel;

function setModel(_model) {
    model = _model;
}

function findTeamsForEvent(eventId) {
    var deferred = q.defer();
    TeamModel
        .find({_event: eventId}, function (err, teams) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(teams);
            }
        });
    return deferred.promise;
}