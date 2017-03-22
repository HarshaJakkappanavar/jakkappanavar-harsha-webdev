/**
 * Created by harsh on 3/9/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server');
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
var model = '';

WidgetModel.setModel = setModel;
WidgetModel.reorderWidget = reorderWidget;
module.exports = WidgetModel;

// createWidget: createWidget,
// findAllWidgetForPage: findAllWidgetForPage,
// findWidgetById: findWidgetById,
// updateWidget: updateWidget,
// deleteWidget: deleteWidget,

function setModel(_model) {
    model = _model;
}

function reorderWidget(pageId, startPos, endPos) {
    return model.pageModel.reorderWidgetForPage(pageId, startPos, endPos);
}

//    TODO the implemetation for api attribute functions.
/*
 * createWidget
 * findAllWidgetForPage
 * findWidgetById
 * updateWidget
 * deleteWidget
 * reorderWidget
 * */
