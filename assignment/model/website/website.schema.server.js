/**
 * Created by harsh on 3/9/2017.
 */

module.exports = function () {

    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        page: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        dateCreated: Date
    }, {collection: 'website'});

    return WebsiteSchema;
}
