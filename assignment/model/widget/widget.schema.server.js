/**
 * Created by harsh on 3/9/2017.
 */

var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({

    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
    type: {type: String, enum: ['HEADER', 'HTML', 'IMAGE', 'YOUTUBE']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: String,
    size: String,
    class: String,
    icon: String,
    deletable: String,
    formatted: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "assignment.model.widget"});

module.exports = WidgetSchema;
