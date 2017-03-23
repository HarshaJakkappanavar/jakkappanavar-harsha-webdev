/**
 * Created by harsh on 2/28/2017.
 */

module.exports = function (app, model) {

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post ("/api/upload", upload.single('uploadFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    app.put("/page/:pageId/widget", updateWidgetSort);

    /*var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRUgCbdk_lE58TXH_sEL_tk8OEJQVx8yBm9LfgeHmCAn7OJLzt1-A"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://www.youtube.com/embed/uLWLashCXHE" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];*/

    function uploadImage(req, res) {

        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var uploadFile    = req.file;

        if(uploadFile) {
            var filename      = uploadFile.filename;     // new file name in upload folder

            var uploadUrl = "/uploads/" + filename;
            var redirectURL = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/";

            var widget = getWidgetById(widgetId);
            if(widget) {
                widget.width = width;
                updateImageUrl(widget, uploadUrl);
            }
            res.redirect(redirectURL);
        }else {
            var redirectURL = "/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
            res.redirect(redirectURL);
        }
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        model.widgetModel
            .findAllWidgetForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(404);s
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(200);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        switch (widget.type) {

            case 'HEADER' : widget.size = "1";
                            widget.text = "New Header";
                            break;

            case 'HTML' :   widget.text = "New HTML";
                            break;

            case 'IMAGE' :  widget.width = "100%";
                            widget.url = "http://www.baligotours.net/images/thumbnail.png";
                            break;

            case 'YOUTUBE' :    widget.width = "100%";
                                widget.url = "https://www.youtube.com/embed/ScMzIvxBSi4?ecver=1";
                                break;

            case 'TEXT' :   widget.name = "";
                            widget.text = "Text";
                            widget.rows = 1;
                            widget.placeholder = "";
                            widget.formatted = false;
                            break;

            default:
                res.sendStatus(404);
                return;

        }
        model.widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model.widgetModel
            .updateWidget(widgetId, widget)
            .then(function () {
                res.sendStatus(200);
            }, function () {
                res.sendStatus(404);
            });
    }

    function updateImageUrl(widget, newUrl) {
        const fs = require('fs');
        fs.unlink(__dirname +'/../../public/' + widget.url,
            function (err) {
                widget.url = newUrl;
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .deleteWidget(widgetId)
            .then(function () {
                res.sendStatus(200);
            }, function () {
                res.sendStatus(404);
            });
    }

    function updateWidgetSort(req, res) {
        var pageId = req.params.pageId;
        var startPos = req.query.start;
        var endPos = req.query.end;

        model.widgetModel.reorderWidget(pageId, startPos, endPos);
        res.sendStatus(200);
    }
};
