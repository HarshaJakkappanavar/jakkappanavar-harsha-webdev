/**
 * Created by harsh on 3/9/2017.
 */

var userModel = require('./user/user.model.server');
var websiteModel = require('./website/website.model.server');
var pageModel = require('./page/page.model.server');
var widgetModel = require('./widget/widget.model.server');


var model = {
    userModel: userModel,
    websiteModel: websiteModel,
    pageModel: pageModel,
    widgetModel: widgetModel
};

userModel.setModel(model);
websiteModel.setModel(model);
pageModel.setModel(model);
widgetModel.setModel(model);

module.exports = model;
