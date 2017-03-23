/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app, model) {
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    /*var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];*/

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        model.pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            },
            function (error) {
                res.sendStatus(404).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        model.pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;
        model.pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        model.pageModel
            .updatePage(pageId, page)
            .then(function (page) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        model.pageModel
            .deletePage(pageId)
            .then(function (website) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
};
