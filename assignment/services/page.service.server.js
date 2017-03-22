/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app, model) {
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.post("/api/website/:websiteId/page", createPage);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params.websiteId;
        if(websiteId) {
            var pagesForWebsite = [];
            for(var p in pages) {
                if(pages[p].websiteId === websiteId) {
                    pagesForWebsite.push(pages[p]);
                }
            }
            res.json(pagesForWebsite);
        }
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var page = req.body;

        var newPage = new Object();
        newPage._id = new Date().getTime() + "";
        newPage.name = page.name;
        newPage.websiteId = websiteId;
        if(null != page.description) {
            newPage.description = page.description;
        }
        pages.push(newPage);
        res.sendStatus(200);
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages[p].name = page.name;
                pages[p].description = page.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {

        var pageId = req.params.pageId;
        for(var p in pages) {
            if(pages[p]._id === pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }
};
