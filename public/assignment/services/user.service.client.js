/**
 * Created by harsh on 2/4/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService(){

        var users = [
            {_id: "123", username: "alice", password: "alice", firstname: "Alice", lastname: "Wonder", email: "alice@wonder.com"},
            {_id: "234", username: "bob", password: "bob", firstname: "Bob", lastname: "Marley", email: "bob@marley.com"},
            {_id: "345", username: "charly", password: "charly", firstname: "Charly", lastname: "Garcia", email: "charly@garcia.com"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstname: "Jose", lastname: "Annunzi", email: "jose@annunzi.com"}
        ]

      var api = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };

        return api;

        function createUser(user){
            user._id = (new Date().getTime()) + "";
            users.push(user);
            return user;
        }

        function findUserById(userId){
            for(var u in users){
                if(users[u]._id === userId){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByUsername(username){

            for(var u in users){
                if(users[u].username === username){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password){

            for(var u in users){
                if(users[u].username === username && users[u].password === password){
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function updateUser(userId, user){

            for(var u in users){
                if(users[u]._id === userId){
                    users[u].firstname = user.firstname;
                    users[u].lastname = user.lastname;
                    users[u].email = user.email;
                    return angular.copy(users[u]);
                }
            }
            return null;
        }

        function deleteUser(userId){

            for(var u in users){
                if(users[u]._id === userId){
                    users.splice(u, 1);
                    return true;
                }
            }
            return false;
        }

    }
})();