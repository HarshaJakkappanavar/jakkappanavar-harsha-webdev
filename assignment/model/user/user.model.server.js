/**
 * Created by harsh on 3/9/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('UserModel', UserSchema);
var model = '';

UserModel.setModel = setModel;
UserModel.createUser = createUser;
UserModel.findUserById = findUserById;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.updateUser = updateUser;
UserModel.deleteUser = deleteUser;
UserModel.addWebsiteToUser = addWebsiteToUser;
UserModel.deleteWebsiteForUser = deleteWebsiteForUser;
module.exports = UserModel;

function setModel(_model) {
    model = _model;
}

function createUser(user) {
    var deferred = q.defer();
    UserModel
        .create(user, function (err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
}

function findUserById(userId) {
    var deferred = q.defer();
    UserModel
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
    UserModel
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
    UserModel
        .findOne({username: username, password: password}, function (err, user) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(user);
            }
        });
    return deferred.promise;
}

function updateUser(userId, user) {
    var deferred = q.defer();
    UserModel
        .update({_id: userId},
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            function (err, status) {
                if(err) {
                    deferred.reject(err);
                }else {
                    findUserById(userId)
                        .then(function (user) {
                            deferred.resolve(user);
                        });
                }
            });
    return deferred.promise;
}

function deleteUser(userId) {
    var deferred = q.defer();
    model.websiteModel
        .deleteWebsitesForUser(userId)
        .then(function (status) {
            UserModel
                .remove({_id: userId}, function (err, status) {
                    if(err) {
                        deferred.reject(err);
                    }else {
                        deferred.resolve(status);
                    }
                });
        });
    return deferred.promise;
}

function addWebsiteToUser(userId, websiteId) {
    var deferred = q.defer();
    findUserById(userId)
        .then(function (user) {
           user.websites.push(websiteId);
           user.save(function (err, user) {
              deferred.resolve(user);
           });
        });
    return deferred.promise;
}

function deleteWebsiteForUser(userId, websiteId){
    var deferred = q.defer();
    UserModel
        .update({_id: userId},
            {$pull: {websites: websiteId}},
            function (err, user) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(user);
                }
            });
    return deferred.promise;
}

