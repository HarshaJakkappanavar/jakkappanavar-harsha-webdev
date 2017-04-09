/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app) {

    var model = require('./model/models.server');

    require("./services/user.service.server")(app, model);
    require("./services/event.service.server")(app, model);
    require("./services/checkpoint.service.server")(app, model);
    require("./services/team.service.server")(app, model);
    require("./services/member.service.server")(app, model);
    require("./services/location.service.server")(app, model);

}