/**
 * Created by harsh on 4/9/2017.
 */
(function (){
    angular
        .module("TreasureHuntApp")
        .controller("OrganizerController", OrganizerController);

    function OrganizerController($routeParams, EventService, uiGmapGoogleMapApi) {

        var vm = this;

        vm.userId = $routeParams.userId;

        init();

        function init(){
            vm.map = { center: { latitude: 42.34, longitude: -71.09 }, zoom: 12 };

            uiGmapGoogleMapApi.then(function(maps) {

            });

            EventService
                .findEventsForUser(vm.userId)
                .success(function (events) {
                    vm.events = events;
                });;
        }
    }
})();
