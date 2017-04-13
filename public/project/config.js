/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular.module("TreasureHuntApp")
        .config(configuration);

    function configuration($routeProvider, uiGmapGoogleMapApiProvider) {

        configureGMapApi(uiGmapGoogleMapApiProvider);

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/template/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/", {
                templateUrl: "views/home/template/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("default", {
                templateUrl: "views/home/template/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            /*.when("/admin", {
                templateUrl: "views/admin/template/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    adminUser: isAdmin
                }
            })*/
            .when("/profile", {
                templateUrl: "views/user/template/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLogin
                }
            })
            .when("/participant/events", {
                templateUrl: "views/user/template/participant-event-list.view.client.html",
                controller: "ParticipantEventListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkParticipant
                }
            })
            .when("/participant/event/:eventId/register", {
                templateUrl: "views/user/template/participant-event-new.view.client.html",
                controller: "ParticipantNewEventController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkParticipant
                }
            })
            .when("/organizer/events", {
                templateUrl: "views/user/template/organizer-event-list.view.client.html",
                controller: "OrganizerEventListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkOrganizer
                }
            })
            .when("/organizer/events/new", {
                templateUrl: "views/user/template/organizer-event-new.view.client.html",
                controller: "OrganizerNewEventController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkOrganizer
                }
            })
            .when("/organizer/event/:eventId/teams", {
                templateUrl: "views/team/organizer/template/team-list.view.client.html",
                controller: "OrganizerTeamListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkOrganizer
                }
            })
            .when("/organizer/event/:eventId/checkpoints", {
                templateUrl: "views/checkpoint/organizer/template/checkpoint-list.view.client.html",
                controller: "OrganizerCheckpointListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkOrganizer
                }
            })
            .when("/organizer/event/:eventId/checkpoint/new", {
                templateUrl: "views/checkpoint/organizer/template/checkpoint-new.view.client.html",
                controller: "OrganizerCheckpointNewController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkOrganizer
                }
            })
            .otherwise({
                redirectTo: '/home'
            })
    }

    function configureGMapApi(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: "AIzaSyDRdTvk6GpwR428KwoPqbcS0ivgHoWP17g",
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }

    /*function isAdmin($q, userService, $location) {
        var deffered = $q.defer();
        userService
            .isAdmin()
            .then(function (user) {
                if(user == '0') {
                    deffered.reject();
                    $location.url('/profile')
                } else {
                    deffered.resolve(user);
                }
            });
        return deffered.promise;
    }*/

    function checkOrganizer($q, UserService, $location, $rootScope) {
        var deferred = $q.defer();
        checkLogin($q, UserService, $location, $rootScope)
            .then(function (user) {
                if(user.userType && user.userType == 'organizer') {
                     deferred.resolve(user);
                }else{
                    $location.url('/profile')
                }
            });
        return deferred.promise;
    }

    function checkParticipant($q, UserService, $location, $rootScope) {
        var deferred = $q.defer();
        checkLogin($q, UserService, $location, $rootScope)
            .then(function (user) {
                if(user.userType && user.userType == 'participant') {
                    deferred.resolve(user);
                }else{
                    $location.url('/profile')
                }
            });
        return deferred.promise;
    }

    function checkLogin($q, UserService, $location, $rootScope) {
        var deferred = $q.defer();
        UserService
            .loggedin()
            .then(function (user) {
                if(user == '0') {
                    $rootScope.sessionUser = null;
                    deferred.reject();
                    $location.url('/home')
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();