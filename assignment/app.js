/**
 * Created by harsh on 2/17/2017.
 */

module.exports = function (app) {
    // Including all the services and passing them the "app" from one place.
    require ("./services/user.service.server.js")(app);
    require ("./services/website.service.server.js")(app);
    require ("./services/page.service.server.js")(app);
    require ("./services/widget.service.server.js")(app);
};