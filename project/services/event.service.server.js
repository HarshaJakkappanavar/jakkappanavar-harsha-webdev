/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {
    // APIs listed from this service
    app.get("/api/project/user/" + userId + "/event", findEventsForUser);

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
};