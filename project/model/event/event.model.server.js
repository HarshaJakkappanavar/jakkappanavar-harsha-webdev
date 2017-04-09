/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var EventSchema = require('./event.schema.server');
var EventModel = mongoose.model('EventModel', EventSchema);
var model = '';

EventModel.setModel = setModel;
module.exports = EventModel;

function setModel(_model) {
    model = _model;
}

