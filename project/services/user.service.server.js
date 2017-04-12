/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // APIs listed from this service
    app.post("/project/services/api/user/login", passport.authenticate('local'), login);
    app.get("/project/services/api/user", findUserByUsername);
    app.post("/project/services/api/user", createUser);

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }

    }

    function localStrategy(username, password, done) {
        model.ProjectUserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.ProjectUserModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model.ProjectUserModel
            .findUserByUsername(username)
            .then(function (user) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function createUser(req, res) {
        var user = req.body;
        model.ProjectUserModel
            .createUser(user)
            .then(function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }
};