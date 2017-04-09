/**
 * Created by harsh on 4/8/2017.
 */

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'}],
    currentLocation: {type: mongoose.Schema.Types.ObjectId, ref: 'LocationModel'},
    userType: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'project.model.user'});

module.exports = UserSchema;