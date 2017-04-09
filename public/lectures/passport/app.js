/**
 * Created by harsh on 4/8/2017.
 */

(function (){
    angular
        .module('passportApp', [])
        .controller('loginController', loginController);

    function loginController($http) {
        var vm = this;

        vm.login = function (user) {
            $http.post('/api/lecture-morning/login', user)
                .then(function (response) {
                    console.log(response);
                    vm.message="Welcome";
                    vm.user = response;
                }, function (err) {
                    console.log(err);
                    vm.error = err;
                });
        }
    }
})();
