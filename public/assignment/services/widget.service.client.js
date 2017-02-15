/**
 * Created by harsh on 2/4/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", widgetService);

    function widgetService(){
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRUgCbdk_lE58TXH_sEL_tk8OEJQVx8yBm9LfgeHmCAn7OJLzt1-A"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://www.youtube.com/embed/uLWLashCXHE" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            "createWidget": createWidget,
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget
        }

        return api;


        /*TODO description for the following funcitons.
        * (done) createWidget(pageId, widget)
        * (done) findWidgetsByPageId(pageId)
        * (done) findWidgetById(widgetId)
        * (done) updateWidget(widgetId, widget)
        * (done) deleteWidget(widgetId)*/

        function createWidget(pageId, widget) {
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

            }
            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {
            var widgetsForPage = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    widgetsForPage.push(widgets[w]);
                }
            }
            return widgetsForPage;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    switch (widgets[w].widgetType) {

                        case 'HEADER' : widgets[w].size = widget.size;
                                        widgets[w].text = widget.text;
                                        break;

                        case 'HTML' :   widgets[w].text = widget.text;
                                        break;

                        case 'IMAGE' :  widgets[w].width = widget.width;
                                        widgets[w].url = widget.url;
                                        break;

                        case 'YOUTUBE' :    widgets[w].width = widget.width;
                                            widgets[w].url = widget.url;
                                            break;

                    }
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
