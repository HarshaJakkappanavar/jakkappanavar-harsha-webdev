/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var UserSchema = require('./user.schema.server');
var ProjectUserModel = mongoose.model('ProjectUserModel', UserSchema);
var model = '';

ProjectUserModel.setModel = setModel;
ProjectUserModel.findUserById = findUserById;
ProjectUserModel.findUserByUsername = findUserByUsername;
ProjectUserModel.findUserByCredentials = findUserByCredentials;
ProjectUserModel.createUser = createUser;
ProjectUserModel.addEventToUser = addEventToUser;
ProjectUserModel.findUserByGoogleId = findUserByGoogleId;
ProjectUserModel.updateUser = updateUser;
ProjectUserModel.findEventsForUser = findEventsForUser;
module.exports = ProjectUserModel;

function setModel(_model) {
    model = _model;
}

function findUserById(userId) {
    var deferred = q.defer();
    ProjectUserModel
        .findById(userId, function (err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
}


function findUserByUsername(username) {
    var deferred = q.defer();
    ProjectUserModel
        .findOne({username: username}, function (err, user) {
            if(err || !user) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
}

function findUserByCredentials(username, password) {
    var deferred = q.defer();
    ProjectUserModel
        .findOne({username: username, password: password}, function (err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
}

function createUser(user) {
    var deferred = q.defer();
    ProjectUserModel
        .create(user, function (err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
}

function addEventToUser(userId, eventId) {
    var deferred = q.defer();
    findUserById(userId)
        .then(function (user) {
            user.events.push(eventId);
            user.save(function (err, user) {
                deferred.resolve(user);
            });
        });
    return deferred.promise;
}

function findUserByGoogleId(googleId) {
    return ProjectUserModel.findOne({'google.id': googleId});
}

function updateUser(userId, user) {
    var deferred = q.defer();
    ProjectUserModel
        .update({_id: userId}, {$set: user})
        .then(function () {
            findUserById(userId)
                .then(function (user) {
                    deferred.resolve(user);
                });
        });
    return deferred.promise;
}

function findEventsForUser(userId) {
    var deferred = q.defer();
    ProjectUserModel
        .findById(userId)
        .populate({
            path: 'events',
            model: 'EventModel',
            populate: {
                path: 'location',
                model: 'LocationModel'
            }
        })
        .exec(function (err, user) {
            deferred.resolve(user.events);
        });
    return deferred.promise;
}