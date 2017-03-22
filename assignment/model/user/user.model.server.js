/**
 * Created by harsh on 3/9/2017.
 */

module.exports = function () {

    var mongoose = require('mongoose');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);
    var model = '';

    var api = {

        setModel: setModel,
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById({_id: userId});
    }

    function findUserByUsername(username) {
        return UserModel.find({username: username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({username: username, password: password});
    }

    function updateUser(userId, user) {
        return UserModel
            .update({_id: userId},
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: email
                }
            );
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId})
    }
};
