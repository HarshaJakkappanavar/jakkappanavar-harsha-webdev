/**
 * Created by harsh on 4/9/2017.
 */
(function () {
    angular
        .module("TreasureHuntApp")
        .controller("AdminManageEventsController", AdminManageEventsController);

    function AdminManageEventsController($rootScope, $location, adminUser, EventService) {

        var vm = this;

        vm.user = adminUser;
        vm.userId = adminUser._id;
        vm.deleteEvent = deleteEvent;

        function init() {
            vm.map = $rootScope.map;
            vm.login = $rootScope.login;
            vm.register = $rootScope.register;
            vm.logout = $rootScope.logout;
            vm.updateMapCenter = $rootScope.updateMapCenter;
            vm.updateProfile = $rootScope.updateProfile;
            getAllEvents();
        }

        init();

        function getAllEvents() {
            vm.outdatedEvents = [];
            vm.upcomingEvents = [];

            var promise = EventService.getAllEvents();
            var today = new Date;
            promise
                .success(function (res) {
                    if( res != null){
                        for (var i in res) {
                            if ((new Date(res[i].day)).toDateString() == today.toDateString()) {
                                vm.upcomingEvents.push(res[i]);
                            }
                            else if ((new Date(res[i].day)) < today) {
                                vm.outdatedEvents.push(res[i]);
                            }
                            else {
                                vm.upcomingEvents.push(res[i]);
                            }
                        }
                    }
                })
                .error(function (err) {
                    vm.error = "Events could not be retrieved";
                });
        }

        function deleteEvent(eventId) {
            var promise = EventService.deleteEvent(eventId);
            promise
                .success(function (res) {
                    getAllEvents();
                })
                .error(function (err) {
                    vm.error = "Event could not be deleted";
                });
        }
    }
})();