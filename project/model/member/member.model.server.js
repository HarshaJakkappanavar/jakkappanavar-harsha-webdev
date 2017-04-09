/**
 * Created by harsh on 4/8/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = q.Promise;
var MemberSchema = require('./member.schema.server');
var MemberModel = mongoose.model('MemberModel', MemberSchema);
var model = '';

MemberModel.setModel = setModel;
module.exports = MemberModel;

function setModel(_model) {
    model = _model;
}