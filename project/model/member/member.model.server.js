/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var MemberSchema = require('./member.schema.server');
var MemberModel = mongoose.model('MemberModel', MemberSchema);
var model = '';

MemberModel.setModel = setModel;
MemberModel.createMember = createMember;
MemberModel.addLocationToMember = addLocationToMember;
MemberModel.deleteMemberById = deleteMemberById;
module.exports = MemberModel;

function setModel(_model) {
    model = _model;
}

function createMember(teamId, userId) {
    var deferred = q.defer();
    MemberModel
        .create({_team: teamId, participant: userId}, function(err, member) {
            if(err) {
                deferred.reject(err);
            }else {
                model.TeamModel
                    .addMemberToTeam(teamId, member._id)
                    .then(function (members) {
                        deferred.resolve(member);
                    });
            }
        });

    return deferred.promise;
}

function addLocationToMember(memberId, locationId) {
    var deferred = q.defer();
    MemberModel
        .findById(memberId)
        .then(function (member) {
            member.locations.push(locationId);
            member.save(function (err, member) {
                deferred.resolve(member);
            });
        });
    return deferred.promise;
}

function deleteMemberById(memberId) {
    var deferred = q.defer();
    MemberModel
        .remove({_id: memberId}, function (err, status) {
            deferred.resolve(status);
        })
}