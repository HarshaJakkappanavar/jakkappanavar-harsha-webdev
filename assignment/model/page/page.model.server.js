/**
 * Created by harsh on 3/9/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
var PageSchema = require('./page.schema.server');
var PageModel = mongoose.model('PageModel', PageSchema);
var model = '';

PageModel.setModel = setModel;
PageModel.createPage = createPage;
PageModel.findAllPagesForWebsite = findAllPagesForWebsite;
PageModel.findPageById = findPageById;
PageModel.updatePage = updatePage;
PageModel.deletePage = deletePage;
PageModel.deletePagesForWebsite = deletePagesForWebsite;
PageModel.reorderWidgetForPage = reorderWidgetForPage;
PageModel.addWidgetToPage = addWidgetToPage;
PageModel.deleteWidgetForPage = deleteWidgetForPage;
module.exports = PageModel;

function setModel(_model) {
    model = _model;
}

function createPage(websiteId, page) {
    var deferred = q.defer();
    page._website = websiteId;
    PageModel
        .create(page, function (err, newPage) {
            if(err) {
                deferred.reject(err);
            }else {
                model.websiteModel
                    .addPageToWebsite(websiteId, newPage._id)
                    .then(function (pages) {
                        deferred.resolve(newPage);
                    });
            }
        });
    return deferred.promise;
}

function findAllPagesForWebsite(websiteId) {
    var deferred = q.defer();
    PageModel
        .find({_website: websiteId}, function (err, pages) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(pages);
            }
        });
    return deferred.promise;
}

function findPageById(pageId) {
    var deferred = q.defer();
    PageModel
        .findById(pageId, function (err, page) {
           if(err) {
               deferred.reject(err);
           }else {
               deferred.resolve(page);
           }
        });
    return deferred.promise;
}

function updatePage(pageId, page) {
    var deferred = q.defer();
    findPageById(pageId)
        .then(function (pageObj) {
            pageObj.name = page.name;
            pageObj.description = page.description;
            pageObj.save(function (err, pageObj) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(pageObj);
                }
            });
        });
    return deferred.promise;
}

function deletePage(pageId) {
    var deferred = q.defer();
    model.widgetModel
        .deleteWidgetsForPage(pageId)
        .then(function (status) {
            findPageById(pageId)
                .then(function (page) {
                    model.websiteModel
                        .deletePageForWebsite(page._website, pageId)
                        .then(function (website) {
                            deferred.resolve(website);
                        });
                });
        });
    return deferred.promise;
}

function deletePagesForWebsite(websiteId) {
    var deferred = q.defer();
    PageModel
        .remove({_website: websiteId}, function (err, status) {
            if(err){
                deferred.reject(err);
            }else {
                deferred.resolve(status);
            }
        });
    return deferred.promise;
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

function addWidgetToPage(pageId, widgetId) {
    var deferred = q.defer();
    findPageById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            page.save(function (err, page) {
                deferred.resolve(page);
            });
        });
    return deferred.promise;
}

function deleteWidgetForPage(pageId, widgetId) {
    var deferred = q.defer();
    PageModel
        .update({_id: pageId},
            {$pull: {widgets: widgetId}},
            function (err, page) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(page);
                }
            });
    return deferred.promise;
}