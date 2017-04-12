/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {
    // APIs listed from this service
    app.get("/project/services/api/user/:userId/event", findEventsForUser);
    app.post("/project/services/api/user/:userId/event", createEvent);

    function findEventsForUser(req, res) {
        var userId = req.params['userId'];
        model.EventModel
            .findEventsForUser(userId)
            .then(function (events) {
                    res.json(events);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function createEvent(req, res) {
        var userId = req.params['userId'];
        var event = req.body;
        model.LocationModel
            .createLocation(event.location)
            .then(function (location) {
                event.location = location._id;
                model.EventModel
                    .createEventForOrganizer(userId, event)
                    .then(function () {
                        res.sendStatus(200);
                    }, function () {
                        res.sendStatus(404);
                    });
            })
    }
};