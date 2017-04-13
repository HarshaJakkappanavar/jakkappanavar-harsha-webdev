/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
    name: String,
    desc: String,
    day: Date,
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'},
    place: String,
    checkpoints: [{type: mongoose.Schema.Types.ObjectId, ref: 'CheckpointModel'}],
    organizer: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'TeamModel'}],
    formatted: Boolean,
    marker: {
        latitude: Number,
        longitude: Number,
        title: String,
        icon: String,
        options: {
            labelClass: String,
            labelAnchor: String,
            labelContent: String
        }
    },
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.event'});

module.exports = EventSchema;
