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
TeamModel.findTeamById = findTeamById;
TeamModel.addCheckpointToTeam = addCheckpointToTeam;
TeamModel.unregisterMemberForTeam = unregisterMemberForTeam;
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
                model: 'ProjectUserModel'
            }
        })
        .populate({
            path: 'members',
            model: 'MemberModel',
            populate: {
                path: 'locations',
                model: 'LocationModel'
            }
        })
        .populate({
            path: 'checkpoints',
            model: 'CheckpointModel',
            populate: {
                path: 'location',
                model: 'LocationModel'
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

function findTeamByName(teamName, eventId) {
    var deferred = q.defer();
    model.TeamModel
        .findOne({name: teamName, _event: eventId}, function (err, team) {
            deferred.resolve(team);
        })
    return deferred.promise;
}

function findTeamById(teamId) {
    var deferred = q.defer();
    model.TeamModel
        .findById(teamId)
        .populate({
            path: 'members',
            model: 'MemberModel',
            populate: {
                path: 'participant',
                model: 'ProjectUserModel'
            }
        })
        .populate({
            path: 'members',
            model: 'MemberModel',
            populate: {
                path: 'locations',
                model: 'LocationModel'
            }
        })
        .populate({
            path: 'checkpoints',
            model: 'CheckpointModel',
            populate: {
                path: 'location',
                model: 'LocationModel'
            }
        })
        .exec(function (err, team) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(team);
            }
        });
    return deferred.promise;
}

function addCheckpointToTeam(teamId, checkpointId) {
    var deferred = q.defer();
    TeamModel
        .findById(teamId, function (err, team) {
            team.checkpoints.push(checkpointId);
            team.save(function (err, team) {
                deferred.resolve(team);
            });
        });
    return deferred.promise;
}

function unregisterMemberForTeam(memberId, teamId){
    var deferred = q.defer();
    TeamModel
        .findById(teamId, function (err, team) {
            var members = [];
            for(var i =0; i < team.members; i++) {
                if(team.members[i] != memberId) {
                    members.push(team.members[i]);
                }
            }
            team.members = members;
            team.save(function (err, team) {
                deferred.resolve(team);
            });
        });
    return deferred.promise;
}