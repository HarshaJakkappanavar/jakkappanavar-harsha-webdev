/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {
    // APIs listed from this service
    app.get("/project/services/api/user/:userId/event", findEventsForUser);
    app.post("/project/services/api/user/:userId/event", createEvent);
    app.get("/project/services/api/events", getAllEvents);
    app.post("/project/services/api/user/:userId/event/:eventId/register/team", registerByTeam);
    app.delete("/project/services/api/event/:eventId", checkAdmin, deleteEvent);
    app.get("/project/services/api/event/:eventId", findEventById);
    app.put("/project/services/api/event/update", updateEvent);
    app.post("/project/services/api/user/:userId/event/:eventId/register/team/teamId", registerByTeamMember);

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

    function deleteEvent(req, res) {
        var eventId  = req.params.eventId;
        model.EventModel
            .deleteEvent(eventId)
            .then(function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function checkAdmin(req, res, next) {
        if(req.user && req.user.userType == 'admin') {
            next();
        } else {
            res.send(401);
        }
    }

    function findEventById(req, res){
        var eventId = req.params.eventId;
        model.EventModel
            .findEventById(eventId)
            .then(function (event) {
                res.json(event);
            }, function (error) {
                res.sendStatus(400);
            })
    }

    function updateEvent(req, res) {
        var event = req.body;
        model.EventModel
            .updateEvent(event)
            .then(function (event) {
                res.json(event);
            }, function (error) {
                res.sendStatus(400);
            })
    }

    function registerByTeamMember(req, res) {
        var userId = req.params.userId;
        var eventId = req.params.eventId;
        var team = req.body;
        var teamId = team.id;

        model.ProjectUserModel
            .addEventToUser(userId, eventId)
            .then(function (user) {
                model.MemberModel
                    .createMember(teamId, userId)
                    .then(function (member) {
                        res.sendStatus(200);
                    });
            });
    }
};