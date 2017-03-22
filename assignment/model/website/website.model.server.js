/**
 * Created by harsh on 3/9/2017.
 */

module.exports = function () {

    var mongoose = require('mongoose');
    var WebsiteSchema = require('./website.schema.server')();
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    var model = '';

    var api = {

        setModel: setModel,
        // createWebsiteForUser: createWebsiteForUser,
        // findAllWebsiteForUser: findAllWebsiteForUser,
        // findWebsiteById: findWebsiteById,
        // updateWebsite: updateWebsite,
        // deleteWebsite: deleteWebsite
    };

    return api;


    function setModel(_model) {
        model = _model;
    }

//    TODO write implementation methods for the attributes of api.
    /*
    * createWebsiteForUser
    * findAllWebsiteForUser
    * findWebsiteById
    * updateWebsite
    * deleteWebsite
    * */
};
