/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
    eventName: String,
    eventDesc: String,
    eventDay: Date,
    eventLocation: {type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'},
    checkpoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'CheckpointModel'}],
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'TeamModel'}],
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.event'});

module.exports = EventSchema;
