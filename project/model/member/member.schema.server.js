/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var MemberSchema = mongoose.Schema({
    _team: {type: mongoose.Schema.Types.ObjectId, ref: 'TeamModel'},
    participant: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    locations: [{type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.member'});

module.exports = MemberSchema;