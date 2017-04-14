/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {
    // APIs listed from this service
    app.get("/project/services/api/user/:userId/event", findEventsForUser);
    app.post("/project/services/api/user/:userId/event", createEvent);
    app.get("/project/services/api/events", getAllEvents);
    app.post("/project/services/api/user/:userId/event/:eventId/register/team", registerByTeam);

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

    function getAllEvents(req, res) {
        model.EventModel
            .getAllEvents()
            .then(function (events) {
                    res.json(events);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function registerByTeam(req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        var team = req.body;
        teamName = team.name;

        model.ProjectUserModel
            .addEventToUser(userId, eventId)
            .then(function (user) {
                model.TeamModel
                    .findTeamByName(teamName, eventId)
                    .then(function (team){
                        if(team) {
                            model.MemberModel
                                .createMember(team._id, userId);
                            res.sendStatus(200);
                        }else {
                            model.TeamModel
                                .createTeam(eventId, teamName)
                                .then(function (team) {
                                    model.MemberModel
                                        .createMember(team._id, userId);
                                    model.EventModel
                                        .addTeamToEvent(eventId, team._id);
                                    res.sendStatus(200);
                                })
                        }
                    }, function (error) {
                        res.sendStatus(400);
                    });
            })
    }
};