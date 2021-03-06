/**
 * Created by harsh on 3/9/2017.
 */

var mongoose = require('mongoose');

var WidgetSchema = mongoose.Schema({

    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'},
    type: {type: String, enum: ['HEADER', 'HTML', 'IMAGE', 'YOUTUBE', 'TEXT']},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: Number,
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: Boolean,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "assignment.model.widget"});

module.exports = WidgetSchema;
