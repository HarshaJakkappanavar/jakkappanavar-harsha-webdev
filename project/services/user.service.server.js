/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // APIs listed from this service
    app.post("/project/services/api/user/login", passport.authenticate('local'), login);
    app.get("/project/services/api/user", findUserByUsername);
    app.post("/project/services/api/user", createUser);
    app.post("/project/services/api/loggedin", loggedin);
    app.post("/project/services/api/logout", logout);
    app.get("/project/services/api/auth/google", passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/home'
        }));
    app.put('/project/services/api/user/:userId', checkSameUser, updateProfile);
    app.get('/project/services/api/participant/:userId/events', checkSameUser, findEventsForUser);


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
                    req.login(user, function (err) {
                        if(err) {
                            res.sendStatus(400)
                        } else {
                            res.json(user);
                        }
                    });
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    var googleConfig = {
        /*clientID     : process.env.GOOGLE_CLIENT_ID_SPRING_2017,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET_SPRING_2017,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL_SPRING_2017*/

        clientID     : "137462954550-7p97patiui91n0npeq9ls4ooss8c04ki.apps.googleusercontent.com",
        clientSecret : "7NIkhbzv4pIYLZJ6ElKUB1wn",
        callbackURL  : "http://127.0.0.1:3000/google/oauth/callback"
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        model.ProjectUserModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return model.ProjectUserModel .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function checkSameUser(req, res, next) {
        if (req.user && req.user._id == req.params.userId) {
            next();
        } else {
            res.send(401);
        }
    }

    function updateProfile(req, res) {
        model.ProjectUserModel
            .updateUser(req.params.userId, req.body)
            .then(function (user) {
                res.send(user);
            });
    }

    function findEventsForUser(req, res) {
        var userId = req.params.userId;
        model.ProjectUserModel
            .findEventsForUser(userId)
            .then(function (events) {
                res.send(events);
            })
    }
};