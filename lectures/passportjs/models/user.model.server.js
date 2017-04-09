/**
 * Created by harsh on 3/24/2017.
 */

var mongoose = require('mongoose');
var connectionString = 'mongodb://127.0.0.1:27017/webdev_spring_2017_passportjs';
mongoose.connect(connectionString);
var q = require('q');
mongoose.Promise = q.Promise;

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
}, {collection: 'lectures_morning_passportjs_user'});

var userModel = mongoose.model('LecturesMorningPassportJsUser', userSchema);

userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
module.exports = userModel;

function createUser(user) {
    return userModel.create(user);
}
/*
createUser({username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonder'});
createUser({username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley'});
createUser({username: 'charley', password: 'charley', firstName: 'Charley', lastName: 'Garcia'});*/

function findUserByCredentials(username, password) {
    return userModel.findOne({username: username, password: password});
}

// findUserByCredentials('alice', 'alice');

function findUserById(userId) {
    return userModel.findById(userId);
}