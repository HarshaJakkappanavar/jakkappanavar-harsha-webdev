/**
 * Created by harsh on 2/27/2017.
 */

module.exports = function(app, model) {
    // APIs listed from this service
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user", createUser);

    /*var users = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder", email: "alice@wonder.com"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Marley", email: "bob@marley.com"},
        {_id: "345", username: "charly", password: "charly", firstname: "Charly", lastname: "Garcia", email: "charly@garcia.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstname: "Jose", lastname: "Annunzi", email: "jose@annunzi.com"}
    ];*/

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
        model.userModel
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
        model.userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        model.userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            })
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var user = req.body;
        model.userModel
            .updateUser(userId, user)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];
        model.userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            },
            function (error) {
                res.sendStatus(404);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        model.userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            },
            function (error) {
                res.sendStatus(404);
            });
    }
};