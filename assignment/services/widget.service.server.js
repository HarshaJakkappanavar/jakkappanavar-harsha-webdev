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

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRUgCbdk_lE58TXH_sEL_tk8OEJQVx8yBm9LfgeHmCAn7OJLzt1-A"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://www.youtube.com/embed/uLWLashCXHE" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

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
        var widgetsForPage = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                widgetsForPage.push(widgets[w]);
            }
        }
        res.json(widgetsForPage);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = getWidgetById(widgetId);
        if(widget != null) {
            res.json(widget);
        } else{
            res.sendStatus(404);
        }
    }

    function getWidgetById(widgetId){
        return widgets.find(function (w) {
            return w._id === widgetId;
        });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        var newWidget = new Object();

        newWidget._id = new Date().getTime() + "";
        newWidget.widgetType = widget.widgetType;
        newWidget.pageId = pageId;
        switch (widget.widgetType) {

            case 'HEADER' : newWidget.size = "1";
                            newWidget.text = "New Header";
                            break;

            case 'HTML' :   newWidget.text = "New HTML";
                            break;

            case 'IMAGE' :  newWidget.width = "100%";
                            newWidget.url = "http://www.baligotours.net/images/thumbnail.png";
                            break;

            case 'YOUTUBE' :    newWidget.width = "100%";
                                newWidget.url = "https://www.youtube.com/embed/ScMzIvxBSi4?ecver=1";
                                break;
            default:
                res.sendStatus(404);
                return;

        }
        widgets.push(newWidget);
        res.send(newWidget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                switch (widgets[w].widgetType) {

                    case 'HEADER' : widgets[w].size = widget.size;
                        widgets[w].text = widget.text;
                        break;

                    case 'HTML' :   widgets[w].text = widget.text;
                        break;

                    case 'IMAGE' :  widgets[w].width = widget.width;
                        if(widgets[w].url != widget.url){
                            updateImageUrl(widgets[w], widget.url)
                        }
                        break;

                    case 'YOUTUBE' :    widgets[w].width = widget.width;
                        widgets[w].url = widget.url;
                        break;
                }
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
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
        const fs = require('fs');
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                if(widgets[w].widgetType == 'IMAGE'){
                    fs.unlink(__dirname +'/../../public/' + widgets[w].url,
                        function (err) {
                            console.log(err);
                        });
                }
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidgetSort(req, res) {
        var pageId = req.params.pageId;
        var startPos = req.query.start;
        var endPos = req.query.end;

        model.widgetModel.reorderWidget(pageId, startPos, endPos);
        res.sendStatus(200);
    }
};
