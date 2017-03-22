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

    var users = [
        {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder", email: "alice@wonder.com"},
        {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Marley", email: "bob@marley.com"},
        {_id: "345", username: "charly", password: "charly", firstname: "Charly", lastname: "Garcia", email: "charly@garcia.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstname: "Jose", lastname: "Annunzi", email: "jose@annunzi.com"}
    ];

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

        var user = users.find(function (u) {
           return u.username === username && u.password === password;
        });
        if(user) {
            res.send(user);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        var user = users.find(function (u) {
            return u.username === username;
        });
        if(user) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];
        var user = users.find(function (u) {
            return u._id === userId;
        });

        if(user != null)
            res.send(user);
        else
            res.sendStatus(404);
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];

        for(var u in users) {
            if(users[u]._id === userId) {
                var newUser = req.body;
                users[u].firstname = newUser.firstname;
                users[u].lastname = newUser.lastname;
                res.send(users[u]);
                return;
            }
        }
        res.sendStatus(404);

    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];

        for(var u in users){
            if(users[u]._id === userId){
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
       res.sendStatus(404);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date().getTime()) + "";
        users.push(user);
        res.send(user);
    }
};