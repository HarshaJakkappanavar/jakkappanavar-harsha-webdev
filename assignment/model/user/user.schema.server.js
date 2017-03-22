/**
 * Created by harsh on 3/9/2017.
 */

module.exports = function () {

    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'}],
        dateCreated: Date
    }, {collection: 'user'});

    return UserSchema;

};
