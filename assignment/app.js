/**
 * Created by harsh on 2/17/2017.
 */

module.exports = function (app) {

    var model = require('./model/models.server');
    // Including all the services and passing them the "app" from one place.
    // Later sending model along with app
    require ("./services/user.service.server.js")(app, model);
    require ("./services/website.service.server.js")(app, model);
    require ("./services/page.service.server.js")(app, model);
    require ("./services/widget.service.server.js")(app, model);
};