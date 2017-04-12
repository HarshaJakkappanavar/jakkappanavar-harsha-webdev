/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var CheckpointSchema = mongoose.Schema({
    _event: {type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'},
    name: String,
    question: String,
    place: String,
    location: {type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'},
    teams: {type: mongoose.Schema.Types.ObjectId, ref: 'TeamModel'},
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.checkpoint'});

module.exports = CheckpointSchema;
