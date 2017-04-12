/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var LocationSchema = mongoose.Schema({
    latitude: Number,
    longitude: Number,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.location'});

module.exports = LocationSchema;