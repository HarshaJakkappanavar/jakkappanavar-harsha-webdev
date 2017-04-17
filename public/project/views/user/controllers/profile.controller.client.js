/**
 * Created by harsh on 4/12/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(currentUser, $location, $rootScope, UserService) {

        var vm = this;

        vm.user = currentUser;
        vm.setUserType = setUserType;

        init();

        function init(){
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;
            redirectUser(currentUser);
        }

        function setUserType(userType) {
            currentUser.userType = userType;
            UserService
                .updateProfile(currentUser)
                .success(function (user) {
                    redirectUser(user);
                });
        }

        function redirectUser(user) {
            if(user.userType) {
                if(user.userType == 'organizer'){
                    $location.url("/organizer/events");
                }else if (user.userType == 'participant'){
                    $location.url("/participant/events");
                }
            }
        }

    }
})();