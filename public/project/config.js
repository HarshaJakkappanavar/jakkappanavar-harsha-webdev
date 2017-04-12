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
            .when("/participant/:userId", {
                templateUrl: "views/user/template/participant.view.client.html",
                controller: "ParticipantController",
                controllerAs: "model"
            })
            .when("/organizer/:userId/event", {
                templateUrl: "views/user/template/organizer-event-list.view.client.html",
                controller: "OrganizerEventListController",
                controllerAs: "model"
            })
            .when("/organizer/:userId/event/new", {
                templateUrl: "views/user/template/organizer-event-new.view.client.html",
                controller: "OrganizerNewEventController",
                controllerAs: "model"
            })
            .when("/organizer/:userId/event/:eventId/team", {
                templateUrl: "views/team/organizer/template/team-list.view.client.html",
                controller: "OrganizerTeamListController",
                controllerAs: "model"
            })
            .when("/organizer/:userId/event/:eventId/checkpoint", {
                templateUrl: "views/checkpoint/organizer/template/checkpoint-list.view.client.html",
                controller: "OrganizerCheckpointListController",
                controllerAs: "model"
            })
            .when("/organizer/:userId/event/:eventId/checkpoint/new", {
                templateUrl: "views/checkpoint/organizer/template/checkpoint-new.view.client.html",
                controller: "OrganizerCheckpointNewController",
                controllerAs: "model"
            })
    }

    function configureGMapApi(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyDRdTvk6GpwR428KwoPqbcS0ivgHoWP17g',
            v: '3.20',
            libraries: 'weather,geometry,visualization'
        });
    }
})();