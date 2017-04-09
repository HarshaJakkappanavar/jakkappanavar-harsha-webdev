/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var CheckpointSchema = require('./checkpoint.schema.server');
var CheckpointModel = mongoose.model('CheckpointModel', CheckpointSchema);
var model = '';

CheckpointModel.setModel = setModel;
module.exports = CheckpointModel;

function setModel(_model) {
    model = _model;
}
