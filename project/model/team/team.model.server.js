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
module.exports = TeamModel;

function setModel(_model) {
    model = _model;
}