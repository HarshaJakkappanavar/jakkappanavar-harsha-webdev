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
module.exports = UserModel;

function setModel(_model) {
    model = _model;
}