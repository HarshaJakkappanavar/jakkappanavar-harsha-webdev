/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    app.get("/project/services/api/event/:eventId/teams", findTeamsForEvent);

    function findTeamsForEvent(req, res) {
        var eventId = req.params['eventId'];
        model.TeamModel
            .findTeamsForEvent(eventId)
            .then(function (teams) {
                    res.json(teams);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

};