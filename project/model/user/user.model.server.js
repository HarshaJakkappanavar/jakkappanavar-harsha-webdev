/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var UserSchema = require('./user.schema.server');
var UserModel = mongoose.model('UserModel', UserSchema);
var model = '';

UserModel.setModel = setModel;
UserModel.findUserByUsername = findUserByUsername;
UserModel.findUserByCredentials = findUserByCredentials;
UserModel.createUser = createUser;
module.exports = UserModel;

function setModel(_model) {
    model = _model;
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