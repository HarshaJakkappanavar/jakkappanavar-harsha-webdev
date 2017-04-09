/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var LocationSchema = require('./location.schema.server');
var LocationModel = mongoose.model('LocationModel', LocationSchema);
var model = '';

LocationModel.setModel = setModel;
module.exports = LocationModel;

function setModel(_model) {
    model = _model;
}