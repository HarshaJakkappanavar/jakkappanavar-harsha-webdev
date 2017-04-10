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
            .when("/organizer", {
                templateUrl: "views/user/template/organizer.view.client.html",
                controller: "OrganizerController",
                controllerAs: "model"
            })
            .when("/participant", {
                templateUrl: "views/user/template/participant.view.client.html",
                controller: "ParticipantController",
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