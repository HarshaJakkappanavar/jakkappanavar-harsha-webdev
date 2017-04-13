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
TeamModel.addMemberToTeam = addMemberToTeam;
TeamModel.createTeam = createTeam;
TeamModel.findTeamByName = findTeamByName;
module.exports = TeamModel;

function setModel(_model) {
    model = _model;
}

function findTeamsForEvent(eventId) {
    var deferred = q.defer();
    TeamModel
        .find({_event: eventId})
        .populate({
            path: 'members',
            model: 'MemberModel',
            populate: {
                path: 'participant',
                model: 'UserModel'
            }
        })
        .exec(function (err, teams) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(teams);
            }
        });
    return deferred.promise;
}

function addMemberToTeam(teamId, memberId) {
    var deferred = q.defer();
    TeamModel
        .findById(teamId)
        .then(function (team) {
            team.members.push(memberId);
            team.save(function (err, team) {
                deferred.resolve(team.members);
            });
        });
    return deferred.promise;
}

function createTeam(eventId, teamName) {
    var deferred = q.defer();
    model.EventModel
        .findEventById(eventId)
        .then(function (event) {
            var team = {
                _event: eventId,
                name: teamName
            };
            if(event.checkpoints.length > 0) {
                team.checkpoints = [event.checkpoints[0]];
            }
            TeamModel
                .create(team, function (err, team) {
                    deferred.resolve(team);
                })
        });
    return deferred.promise;
}

function findTeamByName(teamName) {
    var deferred = q.defer();
    model.TeamModel
        .findOne({name: teamName}, function (err, team) {
            deferred.resolve(team);
        })
    return deferred.promise;
}
