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
            createUser: createUser,
            loggedin: loggedin,
            logout: logout,
            updateProfile: updateProfile,
            findEventsForUser: findEventsForUser
        };

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

        function loggedin() {
            return $http.post('/project/services/api/loggedin')
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            return $http.post('/project/services/api/logout')
                .then(function (response) {
                    return response.data;
                });
        }

        function updateProfile(user) {
            return $http.put('/project/services/api/user/' + user._id, user);
        }

        function findEventsForUser(userId) {
            return $http.get('/project/services/api/participant/' + userId + '/events');
        }
    }
})();
