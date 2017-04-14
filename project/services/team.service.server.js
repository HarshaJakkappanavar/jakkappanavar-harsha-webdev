/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    app.get("/project/services/api/event/:eventId/teams", findTeamsForEvent);
    app.get("/project/services/api/user/:userId/event/:eventId/team", findTeamForUser);
    app.put("/project/services/api/team/:teamId/next-checkpoint", addCheckpointToTeam);

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

    function findTeamForUser(req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        model.TeamModel
            .findTeamsForEvent(eventId)
            .then(function (teams) {
                for(var t = 0; t < teams.length; t++) {
                    var members = teams[t].members;
                    for(var m = 0; m < members.length; m++) {
                        if(members[m].participant._id == userId) {
                            model.TeamModel
                                .findTeamById(teams[t]._id)
                                .then(function (team) {
                                    res.json(team);
                                    return;
                                })
                        }
                    }
                }
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function addCheckpointToTeam(req, res) {
        var teamId = req.params.teamId;
        var checkpoint = req.body;
        model.TeamModel
            .addCheckpointToTeam(teamId, checkpoint.checkpointId)
            .then(function () {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            })
    }

};