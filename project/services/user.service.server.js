/**
 * Created by harsh on 4/8/2017.
 */

module.exports = function (app, model) {
    // APIs listed from this service
    app.get("/api/project/user", findUser);
    app.post("/api/project/user", createUser);

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }

    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        model.UserModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];
        model.UserModel
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
        model.UserModel
            .createUser(user)
            .then(function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404);
                });
    }
};