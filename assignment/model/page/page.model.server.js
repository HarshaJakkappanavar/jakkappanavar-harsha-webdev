/**
 * Created by harsh on 3/9/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
var PageSchema = require('./page.schema.server');
var PageModel = mongoose.model('PageModel', PageSchema);
var model = '';

PageModel.setModel = setModel;
PageModel.reorderWidgetForPage = reorderWidgetForPage;
module.exports = PageModel;


// createPage: createPage,
// findAllPagesForWebsite: findAllPagesForWebsite,
// findPageById: findPageById,
// updatePage: updatePage,
// deletePage: deletePage

function setModel(_model) {
    model = _model;
}

function reorderWidgetForPage(pageId, startPos, endPos) {
    var deferred = q.defer();
    PageModel
        .findById(pageId, function(err, page) {
            var pageWidgets = page.widgets;
            pageWidgets.splice(endPos - 1, 0, pageWidgets.splice(startPos-1, 1)[0]);
            page.widgets = pageWidgets;
            page.save(function(err, page) {
                deferred.resolve(page);
            });
        });
    return deferred.promise;
}

//    TODO write implementation for the api attribute functions
/*
 * createPage
 * findAppPagesForWebsite
 * findPageById
 * updatePage
 * deletePage
 * */

