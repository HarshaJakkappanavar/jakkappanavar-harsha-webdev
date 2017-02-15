/**
 * Created by harsh on 2/4/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService(){
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPagesByWebsiteId": findPagesByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        }

        return api;

        /*TODO function description for the following.
        * (done) createPage(websiteId, page)
        * (done) findPagesByWebsiteId(websiteId)
        * (done) findPageById(pageId)
        * (done) updatePage(pageId, page)
        * (done) deletePage(pageId)*/

        function createPage(websiteId, page) {
            var newPage = new Object();
            newPage._id = new Date().getTime() + "";
            newPage.name = page.name;
            newPage.websiteId = websiteId;
            if(null != page.description) {
                newPage.description = page.description;
            }

            pages.push(newPage);
            return(newPage);
        }

        function findPagesByWebsiteId(websiteId) {
            var pagesForWebsite = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pagesForWebsite.push(pages[p]);
                }
            }
            return pagesForWebsite;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return pages[p];
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
