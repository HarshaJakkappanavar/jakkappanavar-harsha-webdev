/**
 * Created by harsh on 4/9/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            createUser: createUser
        }

        return api;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user?username=" + username);
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }
    }
})();
