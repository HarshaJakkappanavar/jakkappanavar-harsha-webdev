/**
 * Created by harsh on 3/9/2017.
 */

var q = require('q');
var mongoose = require('mongoose');
var WebsiteSchema = require('./website.schema.server');
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);
var model = '';

WebsiteModel.setModel = setModel;
WebsiteModel.createWebsiteForUser = createWebsiteForUser;
WebsiteModel.findAllWebsiteForUser = findAllWebsiteForUser;
WebsiteModel.findWebsiteById = findWebsiteById;
WebsiteModel.updateWebsite = updateWebsite;
WebsiteModel.deleteWebsite = deleteWebsite;
WebsiteModel.deleteWebsitesForUser = deleteWebsitesForUser;
WebsiteModel.addPageToWebsite = addPageToWebsite;
WebsiteModel.deletePageForWebsite = deletePageForWebsite;
module.exports = WebsiteModel;

function setModel(_model) {
    model = _model;
}

function createWebsiteForUser(userId, website) {
    var deferred = q.defer();
    website._user = userId;
    WebsiteModel
        .create(website, function(err, newWebsite) {
            if(err) {
                deferred.reject(err);
            }else {
                model.userModel
                    .addWebsiteToUser(userId, newWebsite._id)
                    .then(function (websites) {
                        deferred.resolve(newWebsite);
                    });
            }
        });
    return deferred.promise;
}

function findAllWebsiteForUser(userId) {
    var deferred = q.defer();
    WebsiteModel
        .find({_user: userId}, function (err, websites) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(websites);
            }
        });
    return deferred.promise;
}

function findWebsiteById(websiteId) {
    var deferred = q.defer();
    WebsiteModel
        .findById(websiteId, function (err, website) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(website);
            }
        });
    return deferred.promise;
}

function updateWebsite(websiteId, website) {
    var deferred = q.defer();
    findWebsiteById(websiteId)
        .then(function (websiteObj) {
           websiteObj.name = website.name;
           websiteObj.description = website.description;
           websiteObj.save(function (err, websiteObj) {
               if(err) {
                   deferred.reject(err);
               }else {
                   deferred.resolve(websiteObj);
               }
           });
        });
    return deferred.promise;
}

function deleteWebsite(websiteId) {
    var deferred = q.defer();
    model.pageModel
        .deletePagesForWebsite(websiteId)
        .then(function (status) {
           findWebsiteById(websiteId)
               .then(function (website) {
                  model.userModel
                      .deleteWebsiteForUser(website._user, websiteId)
                      .then(function (user) {
                          WebsiteModel
                              .remove({_id: websiteId},
                                  function (err, status) {
                                      deferred.resolve(status);
                                    });
                      });
               });
        });
    return deferred.promise;
}

function deleteWebsitesForUser(userId) {
    var deferred = q.defer();
    WebsiteModel
        .remove({_user: userId}, function (err, status) {
            if(err) {
                deferred.reject(err);
            }else {
                deferred.resolve(status);
            }
        });
    return deferred.promise;
}

function addPageToWebsite(websiteId, pageId) {
    var deferred = q.defer();
    findWebsiteById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            website.save(function (err, website) {
                deferred.resolve(website);
            });
        });
    return deferred.promise;
}

function deletePageForWebsite(websiteId, pageId) {
    var deferred = q.defer();
    WebsiteModel
        .update({_id: websiteId},
            {$pull: {pages: pageId}},
            function (err, website) {
                if(err) {
                    deferred.reject(err);
                }else {
                    deferred.resolve(website);
                }
            })
    return deferred.promise;
}

