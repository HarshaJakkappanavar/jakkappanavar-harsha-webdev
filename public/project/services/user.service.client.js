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

        function findUserByCredentials(user) {
            return $http.post("/project/services/api/user/login", user);
        }

        function findUserByUsername(username) {
            return $http.get("/project/services/api/user?username=" + username);
        }

        function createUser(user) {
            return $http.post("/project/services/api/user", user);
        }
    }
})();
