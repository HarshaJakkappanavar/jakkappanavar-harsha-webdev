/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var TeamSchema = mongoose.Schema({
    teamName: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'MemberModel'}],
    checkpoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'CheckpointModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.team'});

module.exports = TeamSchema;