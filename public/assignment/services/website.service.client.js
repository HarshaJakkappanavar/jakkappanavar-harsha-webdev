/**
 * Created by harsh on 2/4/2017.
 */
(function (){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    
    function WebsiteService() {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", "created": new Date() },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", "created": new Date() },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", "created": new Date() },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", "created": new Date() },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", "created": new Date() },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", "created": new Date() }
        ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        }

        return api;

        /*TODO descriptions for the following funcitons.
        * (done) createWebsite(userId, website)
        * (done) findWebsitesByUser(userId)
        * (done) findWebsiteById(websiteId)
        * (done) updateWebsite(websiteId, website)
        * (done) deleteWebsite(websiteId)*/

        function createWebsite(userId, website) {
            var newWebsite = new Object();
            newWebsite._id = new Date().getTime() + "";
            newWebsite.name = website.name;
            newWebsite.developerId = userId;
            if(null != website.description) {
                newWebsite.description = website.description;
            }
            newWebsite.created = new Date();

            websites.push(newWebsite);
            return(newWebsite);
        }

        function findWebsitesByUser(userId) {
            var sites = [];
            for(var w in websites) {
                if(websites[w].developerId === userId) {
                    sites.push(websites[w]);
                }
            }
            return sites;
        }

        function findWebsiteById(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    return angular.copy(websites[w]);
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites[w].name = website.name;
                    websites[w].description = website.description;
                    return websites[w];
                }
            }
            return null;
        }

        function deleteWebsite(websiteId) {
            for(var w in websites) {
                if(websites[w]._id === websiteId) {
                    websites.splice(w, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
