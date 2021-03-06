/**
 * Created by harsh on 3/9/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
var WidgetSchema = require('./widget.schema.server');
var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);
var model = '';

WidgetModel.setModel = setModel;
WidgetModel.createWidget = createWidget;
WidgetModel.findAllWidgetForPage = findAllWidgetForPage;
WidgetModel.findWidgetById = findWidgetById;
WidgetModel.updateWidget = updateWidget;
WidgetModel.deleteWidget = deleteWidget;
WidgetModel.deleteWidgetsForPage = deleteWidgetsForPage;
WidgetModel.reorderWidget = reorderWidget;
module.exports = WidgetModel;

function setModel(_model) {
    model = _model;
}

function createWidget(pageId, widget){
    var deferred = q.defer();
    widget._page = pageId;
    WidgetModel
        .create(widget, function (err, newWidget) {
            if(err) {
                deferred.reject(err);
            }else {
                model.pageModel
                    .addWidgetToPage(pageId, newWidget._id)
                    .then(function (widgets) {
                        deferred.resolve(newWidget);
                    });
            }
        });
    return deferred.promise;
}

function findAllWidgetForPage(pageId) {
    var deferred = q.defer();
    model.pageModel
        .findById(pageId)
        .populate('widgets')
        .exec(function (err, page) {
            deferred.resolve(page.widgets);
        });
    return deferred.promise;
}

function findWidgetById(widgetId) {
    var deferred = q.defer();
    WidgetModel
        .findById(widgetId, function (err, widget) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(widget);
            }
        });
    return deferred.promise;
}

function updateWidget(widgetId, widget) {
    var deferred = q.defer();
    findWidgetById(widgetId)
        .then(function (widgetObj) {
            switch (widgetObj.type) {

                case 'HEADER' : widgetObj.size = widget.size;
                                widgetObj.text = widget.text;
                                break;

                case 'HTML' :   widgetObj.text = widget.text;
                                break;

                case 'IMAGE' :  widgetObj.width = widget.width;
                                if(widgetObj.url != widget.url){
                                    updateImageUrl(widgetObj, widget.url)
                                    widgetObj.url = widget.url;
                                }
                                break;

                case 'YOUTUBE' :    widgetObj.width = widget.width;
                                    widgetObj.url = widget.url;
                                    break;

                case 'TEXT' :   widgetObj.name = widget.name;
                                widgetObj.text = widget.text;
                                widgetObj.rows = widget.rows;
                                widgetObj.placeholder = widget.placeholder;
                                widgetObj.formatted = widget.formatted;
                                break;
            }
            widgetObj.save(function (err, widgetObj) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(widgetObj);
                }
            });
        });
    return deferred.promise;
}

function updateImageUrl(widget, newUrl) {
    const fs = require('fs');
    fs.unlink(__dirname +'/../../../public/' + widget.url,
        function (err) {
            console.log(err);
        });
}

function deleteWidget(widgetId) {
    var deferred = q.defer();
    findWidgetById(widgetId)
        .then(function (widget) {
            model.pageModel
                .deleteWidgetForPage(widget._page, widgetId)
                .then(function (page) {
                    WidgetModel
                        .remove({_id: widgetId}, function (err, status) {
                            const fs = require('fs');
                            if(widget.type == 'IMAGE') {
                                fs.unlink(__dirname +'/../../../public/' + widget.url,
                                    function (err) {
                                        console.log(err);
                                    });
                            }
                            deferred.resolve(status);
                        });
                });
        });
    return deferred.promise;
}

function deleteWidgetsForPage(pageId) {
    var deferred = q.defer();
    WidgetModel
        .remove({_page: pageId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(status);
            }
        });
    return deferred.promise;
}

function reorderWidget(pageId, startPos, endPos) {
    return model.pageModel.reorderWidgetForPage(pageId, startPos, endPos);
}